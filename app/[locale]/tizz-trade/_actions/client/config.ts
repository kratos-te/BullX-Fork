import { CollateralTypes } from "@/utils/tizz";

const chainById: Record<string, string> = {
  "3636": "spiderchainTestnet",
};

const collateralNameInUrl: Record<string, string> = {
  [CollateralTypes.USDT]: "USDT",
  [CollateralTypes.WBTC]: "WBTC",
};

const env = process.env.NEXT_PUBLIC_ENV;
const api = {
  sepolia: "", //process.env.NEXT_PUBLIC_SEPOLIA_API,
  botanix: "", //process.env.NEXT_PUBLIC_BOTANIX_API,
};
const socket = {
  sepolia: "", //process.env.NEXT_PUBLIC_SEPOLIA_SOCKET,
  botanix: "", //process.env.NEXT_PUBLIC_BOTANIX_SOCKET,
};

const endpoints = {
  tradingVariables: `${api[env as keyof typeof api]}/pair/trading-variables/$$collateral_type$$`,
  tradingHistory24: `${api[env as keyof typeof api]}/trades/trading-history-24h`,
  prices24Ago: `${api[env as keyof typeof api]}/price/prices-24h-ago`,
  pricingChart: `${api[env as keyof typeof api]}/charts`,
  pricingSocket: `${socket[env as keyof typeof socket]}`,
  personalTradingHistoryTable: `${api[env as keyof typeof api]}/trades/user-trade-history`,
  backendSocket: `${socket[env as keyof typeof socket]}`,
  getPairsVolume: `${api[env as keyof typeof api]}/volume/pairs/$$collateral_type$$`,
  getVolume: `${api[env as keyof typeof api]}/volume/$$collateral_type$$`,
};

export function getEndpoints(
  endpoint: keyof typeof endpoints,
  chainId: number = 137,
  collateralType: CollateralTypes = CollateralTypes.USDT,
) {
  return endpoints[endpoint]
    .replace("$$network_name$$", chainById[`${chainId}`])
    .replace("$$collateral_type$$", collateralNameInUrl[collateralType]);
}
