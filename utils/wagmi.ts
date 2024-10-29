"use client";

import { getDefaultWallets, getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createPublicClient, defineChain } from "viem";
import { arbitrumSepolia, sepolia } from "wagmi/chains";
import { fallback, unstable_connector, webSocket, http } from "wagmi";
import { injected } from "wagmi/connectors";

const { wallets } = getDefaultWallets();

const spiderchainTestnet = defineChain({
  id: 3636,
  name: "Spiderchain Testnet",
  nativeCurrency: {
    decimals: 8,
    name: "Bitcoin",
    symbol: "BTC",
  },
  rpcUrls: {
    default: {
      http: ["https://node.botanixlabs.dev"], //process.env.NEXT_PUBLIC_BOTANIX_RPC
      webSocket: ["wss://node.botanixlabs.dev/ws"], //process.env.NEXT_PUBLIC_BOTANIX_WEBSOCKET_RPC
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://blockscout.botanixlabs.dev" },
  },
  contracts: {},
});

const env = process.env.NEXT_PUBLIC_ENV;

const configs = {
  sepolia: getDefaultConfig({
    appName: "Tizz",
    projectId: "5f7ad8eb164baabb82e245bf09ba1202",
    wallets: [
      ...wallets,
      {
        groupName: "Other",
        wallets: [argentWallet, trustWallet, ledgerWallet],
      },
    ],
    chains: [arbitrumSepolia],
    pollingInterval: 5_000,
    transports: {
      [arbitrumSepolia.id]: fallback([
        // unstable_connector(injected),
        http("https://arbitrum-sepolia.blockpi.network/v1/rpc/public", {
          batch: true,
        }), //process.env.NEXT_PUBLIC_SEPOLIA_RPC
        // webSocket(process.env.NEXT_PUBLIC_SEPOLIA_WEBSOCKET_RPC),
      ]),
    },
    ssr: true,
  }),
  botanix: getDefaultConfig({
    appName: "Tizz",
    projectId: "5f7ad8eb164baabb82e245bf09ba1202",
    wallets: [
      ...wallets,
      {
        groupName: "Other",
        wallets: [argentWallet, trustWallet, ledgerWallet],
      },
    ],
    chains: [spiderchainTestnet],
    pollingInterval: 5_000,
    transports: {
      [spiderchainTestnet.id]: fallback([
        // unstable_connector(injected),
        http("https://node.botanixlabs.dev", { batch: true }), //process.env.NEXT_PUBLIC_BOTANIX_RPC
        // webSocket(process.env.NEXT_PUBLIC_BOTANIX_WEBSOCKET_RPC),
      ]),
    },
    ssr: true,
  }),
};

export const config = configs[env as keyof typeof configs];

const publicClients = {
  sepolia: createPublicClient({
    chain: arbitrumSepolia,
    transport: http(""), //process.env.NEXT_PUBLIC_SEPOLIA_RPC
    batch: {
      multicall: true,
    },
  }),
  botanix: createPublicClient({
    chain: spiderchainTestnet,
    transport: http(""), //process.env.NEXT_PUBLIC_BOTANIX_RPC
    batch: {
      multicall: true,
    },
  }),
};

export const publicClient = publicClients[env as keyof typeof publicClients];
