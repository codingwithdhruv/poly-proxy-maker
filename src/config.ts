import dotenv from "dotenv";
import { Hex } from "viem";

dotenv.config();

if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is missing in .env");
}

if (!process.env.RPC_URL) {
    throw new Error("RPC_URL is missing in .env");
}

if (!process.env.POLY_BUILDER_API_KEY || !process.env.POLY_BUILDER_SECRET || !process.env.POLY_BUILDER_PASSPHRASE) {
    throw new Error("Builder credentials are missing in .env");
}

export const config = {
    privateKey: process.env.PRIVATE_KEY as Hex,
    rpcUrl: process.env.RPC_URL,
    builder: {
        key: process.env.POLY_BUILDER_API_KEY,
        secret: process.env.POLY_BUILDER_SECRET,
        passphrase: process.env.POLY_BUILDER_PASSPHRASE
    },
    clob: {
        host: "https://clob.polymarket.com",
        chainId: 137
    },
    relay: {
        url: "https://relayer-v2.polymarket.com",
        chainId: 137
    }
};
