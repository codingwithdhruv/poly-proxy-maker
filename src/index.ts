import { deployProxyWallet } from "./relay";
import { initClobClient } from "./clob";

async function main() {
    try {
        console.log(" starting poly-proxy-maker...");

        // 1. Deploy or get Proxy Wallet
        const proxyAddress = await deployProxyWallet();
        if (proxyAddress) {
            console.log(`\nProxy Wallet is ready at: ${proxyAddress}`);
        }

        // 2. Initialize CLOB Client
        // Pass the proxy address if available to configure the client for proxy trading
        const clobClient = await initClobClient(proxyAddress);
        if (clobClient) {
            console.log("\nCLOB Client initialized successfully.");
            // Example check
            const markets = await clobClient.getMarkets();
            console.log("\nFetched 1 market to verify connection:", markets.data.length > 0 ? "Success" : "No markets found");
        }

        console.log("\nSetup complete.");
    } catch (error) {
        console.error("\nAn error occurred:", error);
        process.exit(1);
    }
}

main();
