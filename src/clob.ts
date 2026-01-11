import { ClobClient } from "@polymarket/clob-client";
import { Wallet } from "ethers";
import { config } from "./config";

export async function initClobClient(proxyAddress?: string) {
    console.log("Initializing CLOB Client...");

    // Create ethers wallet for signing
    const signer = new Wallet(config.privateKey);
    console.log("EOA Address:", signer.address);

    // Initial client to derive keys
    const tempClient = new ClobClient(config.clob.host, config.clob.chainId, signer);

    // Get existing API key, or create one if none exists
    console.log("Creating or deriving API key...");
    const userApiCreds = await tempClient.createOrDeriveApiKey();

    console.log("API Key derived/created successfully.");

    // Determine signature type and funder address
    // 0 = EOA, 2 = Polygon Safe (Proxy)
    const SIGNATURE_TYPE = proxyAddress ? 2 : 0;
    const FUNDER_ADDRESS = proxyAddress || signer.address;

    if (proxyAddress) {
        console.log(`Using Proxy Wallet: ${proxyAddress} (Signature Type: ${SIGNATURE_TYPE})`);
    } else {
        console.log(`Using EOA Wallet: ${signer.address} (Signature Type: ${SIGNATURE_TYPE})`);
    }

    // Create the fully initialized client
    const client = new ClobClient(
        config.clob.host,
        config.clob.chainId,
        signer,
        userApiCreds,
        SIGNATURE_TYPE,
        FUNDER_ADDRESS
    );

    return client;
}