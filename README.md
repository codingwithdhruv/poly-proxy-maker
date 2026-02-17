# Poly Proxy Maker

A simple tool to **create a Proxy Wallet (Gnosis Safe)** for Polymarket and automatically set up your trading API keys.

This tool does two things:
1.  **Deploys a Proxy Wallet** for you (or finds it if you already have one).
2.  **Connects to Polymarket** to ensure you are ready to trade.

## 🚀 Quick Start Guide (For Non-Coders)

### 1. Prerequisites
You need **Node.js** installed on your computer.
- [Download Node.js here](https://nodejs.org/) (Choose the "LTS" version).

### 2. Setup
1.  Download this folder to your computer.
2.  Open your **Terminal** (Mac) or **Command Prompt** (Windows).
3.  Type `cd` followed by a space, then drag and drop this folder into the terminal window. Press **Enter**.
4.  Run this command to install the necessary tools:
    ```bash
    npm install
    ```

### 3. Configuration
1.  Look for a file named `.env.example` in the folder.
2.  Make a copy of it and rename the copy to `.env`.
3.  Open `.env` with any text editor (Notepad, TextEdit, VS Code).
4.  Fill in your details:
    - `PRIVATE_KEY`: Your wallet's private key (Export it from MetaMask/Phantom). **Never share this!**
    - `RPC_URL`: You can leave the default or use your own from Alchemy/Infura.
    - `POLY_BUILDER_...`: Your Polymarket Builder API credentials.

### 4. Run It!
In your terminal, run:

```bash
npm start
```

### What to Expect
The script will run and print something like this:

- **"Safe Address: 0x..."**: This is your new Proxy Wallet address. **Save this!** You will use this address to deposit funds.
- **"CLOB Client initialized successfully"**: Means your connection to Polymarket is working.

---

### ⚠️ Important Notes
- **Funding**: Send USDC.e (Polygon) and MATIC (for gas) to your **Safe Address** (the Proxy Wallet), NOT just your main wallet.
- **Safety**: Keep your `.env` file private. Do not share it with anyone.
