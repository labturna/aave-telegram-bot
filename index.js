const { Telegraf } = require('telegraf');
const axios = require('axios');
const { ethers, JsonRpcProvider } = require('ethers');
const { telegramToken, aaveApiUrl } = require('./config');

const bot = new Telegraf(telegramToken);

const provider = new JsonRpcProvider('https://mainnet.infura.io/v3/<Change_with_infura_project_id>');

bot.start((ctx) => {
  ctx.reply('Welcome to Aave Telegram Bot. Use /help to see available commands.');
});

bot.help((ctx) => {
  ctx.reply(`
    Available commands:
    /balance - Get your wallet balance
    /liquidity - Get your provided liquidity
    /borrow - Get your borrow information
    /apy - Get current APY rates
  `);
});

async function getWalletBalance(walletAddress) {
  const balance = await provider.getBalance(walletAddress);
  return ethers.formatEther(balance);
}

async function getAaveLiquidity(walletAddress) {
  const query = `
    {
      userReserves(where: { user: "${walletAddress.toLowerCase()}" }) {
        reserve {
          name
          symbol
        }
        currentATokenBalance
      }
    }
  `;
  const response = await axios.post(aaveApiUrl, { query });
  return response.data.data.userReserves;
}

async function getAaveBorrowInfo(walletAddress) {
  const query = `
    {
      userReserves(where: { user: "${walletAddress.toLowerCase()}" }) {
        reserve {
          name
          symbol
        }
        currentTotalDebt
      }
    }
  `;
  const response = await axios.post(aaveApiUrl, { query });
  return response.data.data.userReserves;
}

async function getAaveAPY() {
  const query = `
    {
      reserves {
        name
        symbol
        liquidityRate
      }
    }
  `;
  const response = await axios.post(aaveApiUrl, { query });
  return response.data.data.reserves;
}

bot.command('balance', async (ctx) => {
  const walletAddress = ctx.message.text.split(' ')[1];
  if (!walletAddress) {
    ctx.reply('Please provide your wallet address.');
    return;
  }

  const balance = await getWalletBalance(walletAddress);
  ctx.reply(`Your wallet balance is ${balance} ETH`);
});

bot.command('liquidity', async (ctx) => {
  const walletAddress = ctx.message.text.split(' ')[1];
  if (!walletAddress) {
    ctx.reply('Please provide your wallet address.');
    return;
  }

  const liquidity = await getAaveLiquidity(walletAddress);
  let reply = 'Your provided liquidity:\n';
  liquidity.forEach(item => {
    reply += `${item.reserve.name} (${item.reserve.symbol}): ${item.currentATokenBalance}\n`;
  });

  ctx.reply(reply);
});

bot.command('borrow', async (ctx) => {
  const walletAddress = ctx.message.text.split(' ')[1];
  if (!walletAddress) {
    ctx.reply('Please provide your wallet address.');
    return;
  }

  const borrowInfo = await getAaveBorrowInfo(walletAddress);
  let reply = 'Your borrow information:\n';
  borrowInfo.forEach(item => {
    reply += `${item.reserve.name} (${item.reserve.symbol}): ${item.currentTotalDebt}\n`;
  });

  ctx.reply(reply);
});

bot.command('apy', async (ctx) => {
  const apyData = await getAaveAPY();
  let reply = 'Current APY rates:\n';
  apyData.forEach(item => {
    reply += `${item.name} (${item.symbol}): ${(item.liquidityRate / 1e27 * 100).toFixed(2)}%\n`;
  });

  ctx.reply(reply);
});

bot.launch();
