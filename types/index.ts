import { CollateralTypes } from "@/utils/tizz";
import type {
  Fee,
  Pair,
  OiWindows,
  PairDepth,
  LimitOrder,
  OpenInterest,
  TradingGroup,
  Trade,
  TradeInitialAccFees,
  TradeData,
  CollateralConfig,
  OiWindowsSettings,
  PairParamsBorrowingFees,
} from "@gainsnetwork/sdk";
import { Address } from "viem";

export type TradeInfo = {
  openInterestBaseAsset: number;
  slLastUpdated: number;
  tokenPriceBaseAsset: number;
  tpLastUpdated: number;
};

export type TradeContainer = {
  trade: Trade;
  tradeInfo: TradeInfo;
  initialAccFees: TradeInitialAccFees & {
    liquidationPrice: number;
  };
  tradeData: TradeData;
  receivedAt?: number;
};

export type TradeHistoryRecord = {
  action: string;
  address: string;
  buy: number;
  collateral: CollateralTypes;
  collateralPriceUsd: number;
  date: string;
  leverage: number;
  pair: string;
  pnl_net: number;
  openPrice: number;
  closePrice?: number;
  size: number;
  tx: string;
};

export type TradingVariable = {
  lastRefreshed: Date;
  refreshId: number;
  paused: boolean;
  maxGainP: number;
  collateralConfig: CollateralConfig;
  maxPosBaseAsset: number;
  prices: {
    tizzPriceCollateral: number;
    tizzPriceUsd: number;
    collateralPriceUsd: number;
  };
  pairs: (Pair & { pairId?: number })[];
  groups: TradingGroup[];
  fees: (Fee & { oracleFeeP: bigint })[];
  pairInfos: {
    maxLeverages: number[];
    pairDepths: PairDepth[];
    borrowingFees: PairParamsBorrowingFees;
  };
  openInterests: OpenInterest[];
  maxNegativePnlOnOpenP: number;
  blockConfirmations: number;
  canExecuteTimeout: number;
  oiWindowsSettings: OiWindowsSettings;
  oiWindows: OiWindows[];
  currentBlock: number;
  currentL1Block: number | null;
  isForexOpen: boolean;
  isStocksOpen: boolean;
  isIndicesOpen: boolean;
  isCommoditiesOpen: boolean;
  maxTradesPerPair: number;
  nftSuccessTimelock: number;
  marketOrdersTimeout: number;
  sssTokenBalance: bigint;
  sssLegacyTokenBalance: bigint;
  sssRewardTokens: Address[];
  currentBalanceBaseAsset: bigint;
  maxBalanceBaseAsset: bigint;
  vaultMarketCap: bigint;
  vaultFeeP: bigint;
  lpFeeP: bigint;
  sssFeeP: bigint;
  allTrades: (TradeContainer | LimitOrder)[];
  nextFundingFeeApplyTime: number;
};

export type UserTradingVariable = {
  daiAllowance: bigint;
  daiBalance: bigint;
  linkAllowance: bigint;
  pendingMarketCloseCount: number[];
  pendingMarketOpenCount: number[];
};

export type ChartTable = {
  table: {
    open: number;
    high: number;
    low: number;
    close: number;
    time: number;
  }[];
};

export type Chart = {
  time: number;
  opens: number[];
  highs: number[];
  lows: number[];
  closes: number[];
};

export type TradeOrderType = "market" | "limit" | "stop";

export type UnregisterLimitPayload = {
  trader: Address;
  pairIndex: string;
  index: string;
};

export type AccBorrowingFeesPairUpdatedPayload = {
  pairIndex: string;
  pairBorrowingFees: {
    accFeeLong: string;
    accFeeShort: string;
    accLastUpdateBlock: number;
  };
};

export type AccBorrowingFeesGroupUpdatedPayload = {
  groupIndex: string;
  groupBorrowingFees: {
    accFeeLong: string;
    accFeeShort: string;
    accLastUpdateBlock: number;
  };
};

export type OpenInterestGroupUpdatedPayload = {
  groupIndex: string;
  groupBorrowingFees: {
    oiLong: string;
    oiShort: string;
  };
};

export type OiWindowUpdatedPayload = {
  pairIndex: string;
  windowId: string;
  newOi: {
    oiLongUsd: number | string;
    oiShortUsd: number | string;
  };
};

export type TradePayload = {
  trade: {
    buy: boolean;
    index: string;
    initialPosToken: string;
    leverage: string;
    openPrice: string;
    pairIndex: string;
    tp: string;
    sl: string;
    trader: Address;
  };
  tradeInfo: {
    tokenId: string;
    tokenPriceBaseAsset: string;
    openInterestBaseAsset: string;
    tpLastUpdated: string;
    slLastUpdated: string;
    beingMarketClosed: boolean;
  };
  initialAccFees: {
    borrowing: {
      accPairFee: string;
      accGroupFee: string;
      block: string;
    };
  };
  tradeData: {
    maxSlippageP: string;
    lastOiUpdateTs: string;
    collateralPriceUsd: string;
  };
};

export type LimitOrderPayload = {
  trader: Address;
  pairIndex: string;
  index: string;
  positionSize: string;
  spreadReductionP: string;
  buy: boolean;
  leverage: string;
  tp: string;
  sl: string;
  minPrice: string;
  maxPrice: string;
  block: string;
  type: string;
  maxSlippageP: string;
};

export type NewTradeHistoryPayload = {
  date: string;
  pair: string;
  address: string;
  action: string;
  price: number;
  collateralPriceUsd: number;
  buy: number;
  size: number;
  leverage: number;
  pnl_net: number;
  tx: string;
};

export type DaiBalancepayload = {
  name: string;
  address: Address;
  daiBalance: string;
};

export type UserJWT = {
  token: string;
  refreshToken: string;
  expirationTime: number;
  refreshTokenExpirationTime: number,
  wallet_address: string;
};

export interface IGuildUser {
  id: number;
  wallet_address: string;
  ensName: string | null;
  signature: string | null;
  bio: string | null;
  telegram: string | null;
  twitter: string | null;
  discord: string | null;
  github: string | null;
  website: string | null;
  pfp: string | null;
  is_suspended: boolean;
  role: string;
  created_at: string;
  updated_at: string;
  ownedGuilds: unknown[]; // need to update
  guildMembers: unknown[]; // need to update
}

interface IGuildSummary {
  guild_id: number;
  name: string;
  picture: string | null;
  created_at: string;
  updated_at: string;
}

interface IGuildMemberSummary {
  guild: IGuildSummary;
  joined_at: string;
  is_active: boolean;
  user_id: number;
  wallet_address?: string;
}

export interface IGeneralTradingActivity {
  pnl: string;
  volumn: string;
  timestamp: string;
  tradeID: string;
}

export interface IGuildUserWithDetails extends IGuildUser {
  ownedGuilds: IGuildSummary[];
  guildMembers: IGuildMemberSummary[];
  GeneralTradingActivity: IGeneralTradingActivity[];
  tradingActivities: unknown[];
}

export interface IGuildUserWithAggregation {
  id: number;
  wallet_address: Address;
  ensName: string | null;
  role: string;
  is_suspended: boolean;
  created_at: string;
  updated_at: string;
  tradingActivities: unknown[];
  UserWins: unknown[];
  totalPnL: number;
  totalVolume: number;
  totalWins: number;
  GeneralTradingActivity: IGeneralTradingActivity[];
  totalOverallPnL: number;
  totalOverallVolume: number;
  totalOverAllWins: number;
  rank: number;
}

export type GuildApiError = {
  error?: string;
  message?: string[];
  statusCode: number;
};

export interface IGuild {
  guild_id: number;
  name: string;
  description: string;
  telegram?: string;
  twitter?: string;
  discord?: string;
  website?: string;
  picture: string;
  owner_user_id: number;
  created_at: string;
  updated_at: string;
}

export interface IGuildWithAggregation extends IGuild {
  guildMembers: IGuildMemberSummary[];
  totalVolume: number;
  totalPnL: number;
  totalWins: number;
  totalOverAllVolume: number;
  totalOverAllPnL: number;
  totalTrades: number;
  totalOverAllWins: number;
  rank: number;
}

export interface IGuildMembershipAction {
  action_id: number;
  guild_id: number;
  user_id: number;
  action_type: string; // need to update
  status: "PENDING" | "REJECTED" | "ACCEPTED"; // need to update
  initiated_by_id: number;
  created_at: Date;
  updated_at: Date;
}

export type TradingEventPayload = any;

export type TradingEvent = {
  event: string;
  payload: TradingEventPayload;
};

export enum TRADE_EVENT {
  OPEN_LIMIT_PLACED = "OpenLimitPlaced",
  OPEN_LIMIT_UPDATED = "OpenLimitUpdated",
  OPEN_LIMIT_CANCELED = "OpenLimitCanceled",
  LIMIT_EXECUTED = "LimitExecuted",

  TP_UPDATED = "TpUpdated",
  SL_UPDATED = "SlUpdated",

  MARKET_ORDER_INITIATED = "MarketOrderInitiated",
  MARKET_OPEN_CANCELED = "MarketOpenCanceled",
  MARKET_CLOSE_CANCELED = "MarketCloseCanceled",
  MARKET_EXECUTED = "MarketExecuted",
}
