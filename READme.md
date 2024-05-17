# Aave Telegram Bot

Welcome to the Aave Telegram Bot project! This bot allows users to interact with the Aave protocol directly from Telegram. Users can check their wallet balances, liquidity, borrow information, and current APY rates easily through this bot.

## Getting Started

To use the Aave Telegram Bot, follow these simple steps:

1. **Install Dependencies**: Make sure you have Node.js installed on your machine. Then, run `npm install` to install all necessary dependencies.

2. **Set Up Your Telegram Bot**: You need to create a new bot on Telegram using BotFather. Obtain your bot token and replace the `telegramToken` variable in the `config.js` file with your token.

3. **Set Up Infura**: Obtain your Infura Project ID and replace the `YOUR_INFURA_PROJECT_ID` placeholder in the `index.js` file with your Project ID.

4. **Run the Bot**: Start the bot by running `node index.js` in your terminal.

5. **Interact with the Bot**: Now, you can interact with the Aave Telegram Bot directly from Telegram. Use commands like `/balance`, `/liquidity`, `/borrow`, and `/apy` to perform various actions.

## Available Commands

- `/balance <wallet_address>`: Get the wallet balance for a specific Ethereum wallet address.
- `/liquidity <wallet_address>`: Get the provided liquidity for a specific wallet address on Aave.
- `/borrow <wallet_address>`: Get the borrow information for a specific wallet address on Aave.
- `/apy`: Get the current APY rates for different assets on Aave.

## Contributing

Contributions to the Aave Telegram Bot project are welcome! If you have any ideas for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
