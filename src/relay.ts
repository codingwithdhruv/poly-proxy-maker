import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { polygon } from "viem/chains";
import { RelayClient } from "@polymarket/builder-relayer-client";
import { BuilderConfig } from "@polymarket/builder-signing-sdk";
import { config } from "./config";

export async function deployProxyWallet() {
    console.log("Initializing Proxy Wallet Deployment...");

    // Create wallet
    const account = privateKeyToAccount(config.privateKey);
    const wallet = createWalletClient({
        account,
        chain: polygon,
        transport: http(config.rpcUrl)
    });

    // Configure local signing
    const builderConfig = new BuilderConfig({
        localBuilderCreds: config.builder
    });

    const client = new RelayClient(
        config.relay.url,
        config.relay.chainId,
        wallet,
        builderConfig
    );

    console.log("Checking for existing Safe...");
    // Deploy (idempotent - if already deployed, it returns the address)
    try {
        const response = await client.deploy();
        const result = await response.wait();

        if (result) {
            console.log("Safe deployed/retrieved successfully!");
            console.log("Transaction Hash:", result.transactionHash);
            console.log("Safe Address:", result.proxyAddress);
            return result.proxyAddress;
        }
    } catch (e: any) {
        if (e.message && e.message.includes("already deployed")) {
            console.log("Safe already deployed. Retrieving address...");
            // Access private method to get the deterministic safe address
            const safeAddress = await (client as any).getExpectedSafe(wallet.account.address);
            console.log("Safe Address:", safeAddress);
            return safeAddress;
        } else {
            console.error("Error deploying safe:", e);
            throw e;
        }
    }
}