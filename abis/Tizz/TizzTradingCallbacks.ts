export const TizzTradingCallbackAbi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "Forbidden",
    type: "error",
  },
  {
    inputs: [],
    name: "WrongParams",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "valueBaseAsset",
        type: "uint256",
      },
    ],
    name: "BaseAssetVaultFeeCharged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "baseAssetVaultFeeP",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lpFeeP",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sssFeeP",
        type: "uint256",
      },
    ],
    name: "ClosingFeeSharesPUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "done",
        type: "bool",
      },
    ],
    name: "Done",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tradeValueBaseAsset",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "feeValueBaseAsset",
        type: "uint256",
      },
    ],
    name: "FundingFeeCharged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "valueBaseAsset",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "distributed",
        type: "bool",
      },
    ],
    name: "GovFeeCharged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "valueBaseAsset",
        type: "uint256",
      },
    ],
    name: "GovFeesClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "limitIndex",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "trader",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "pairIndex",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "initialPosToken",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "positionSizeBaseAsset",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "openPrice",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "buy",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "leverage",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "sl",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct ITizzTradingStorage.Trade",
        name: "t",
        type: "tuple",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nftHolder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum ITizzTradingStorage.LimitOrder",
        name: "orderType",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "priceImpactP",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "positionSizeBaseAsset",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "percentProfit",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "baseAssetSentToTrader",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "collateralPriceUsd",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "exactExecution",
        type: "bool",
      },
    ],
    name: "LimitExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum ITizzTradingCallbacks.CancelReason",
        name: "cancelReason",
        type: "uint8",
      },
    ],
    name: "MarketCloseCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "trader",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "pairIndex",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "initialPosToken",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "positionSizeBaseAsset",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "openPrice",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "buy",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "leverage",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "sl",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct ITizzTradingStorage.Trade",
        name: "t",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "open",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "priceImpactP",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "positionSizeBaseAsset",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "percentProfit",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "baseAssetSentToTrader",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "collateralPriceUsd",
        type: "uint256",
      },
    ],
    name: "MarketExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum ITizzTradingCallbacks.CancelReason",
        name: "cancelReason",
        type: "uint8",
      },
    ],
    name: "MarketOpenCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nftHolder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum ITizzTradingStorage.LimitOrder",
        name: "orderType",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "enum ITizzTradingCallbacks.CancelReason",
        name: "cancelReason",
        type: "uint8",
      },
    ],
    name: "NftOrderCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "paused",
        type: "bool",
      },
    ],
    name: "Pause",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "valueBaseAsset",
        type: "uint256",
      },
    ],
    name: "ReferralFeeCharged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "valueBaseAsset",
        type: "uint256",
      },
    ],
    name: "SssFeeCharged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "valueBaseAsset",
        type: "uint256",
      },
    ],
    name: "TriggerFeeCharged",
    type: "event",
  },
  {
    inputs: [],
    name: "baseAssetVaultFeeP",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claimGovFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "orderId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "spreadP",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "open",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "high",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "low",
            type: "uint256",
          },
        ],
        internalType: "struct ITizzTradingCallbacks.AggregatorAnswer",
        name: "a",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "trader",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "pairIndex",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "index",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "initialPosToken",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "positionSizeBaseAsset",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "openPrice",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "buy",
                type: "bool",
              },
              {
                internalType: "uint256",
                name: "leverage",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "tp",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "sl",
                type: "uint256",
              },
            ],
            internalType: "struct ITizzTradingStorage.Trade",
            name: "trade",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "block",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "wantedPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "slippageP",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "spreadReductionP",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        internalType: "struct ITizzTradingStorage.PendingMarketOrder",
        name: "o",
        type: "tuple",
      },
    ],
    name: "closeTradeMarketCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "collateralConfig",
    outputs: [
      {
        internalType: "uint128",
        name: "precision",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "precisionDelta",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "done",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "orderId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "spreadP",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "open",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "high",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "low",
            type: "uint256",
          },
        ],
        internalType: "struct ITizzTradingCallbacks.AggregatorAnswer",
        name: "a",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "nftHolder",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nftId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "trader",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "pairIndex",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            internalType: "enum ITizzTradingStorage.LimitOrder",
            name: "orderType",
            type: "uint8",
          },
        ],
        internalType: "struct ITizzTradingStorage.PendingNftOrder",
        name: "o",
        type: "tuple",
      },
    ],
    name: "executeNftCloseOrderCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "orderId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "spreadP",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "open",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "high",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "low",
            type: "uint256",
          },
        ],
        internalType: "struct ITizzTradingCallbacks.AggregatorAnswer",
        name: "a",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "nftHolder",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nftId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "trader",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "pairIndex",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            internalType: "enum ITizzTradingStorage.LimitOrder",
            name: "orderType",
            type: "uint8",
          },
        ],
        internalType: "struct ITizzTradingStorage.PendingNftOrder",
        name: "n",
        type: "tuple",
      },
    ],
    name: "executeNftOpenOrderCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fundingFees",
    outputs: [
      {
        internalType: "contract ITizzFundingFees",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "enum ITizzTradingCallbacks.TradeType",
        name: "tradeType",
        type: "uint8",
      },
    ],
    name: "getTradeLastUpdated",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "tp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "sl",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "limit",
            type: "uint256",
          },
          {
            internalType: "uint64",
            name: "created",
            type: "uint64",
          },
        ],
        internalType: "struct ITizzTradingCallbacks.LastUpdated",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "govFeesBaseAsset",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ITizzTradingStorage",
        name: "_storageT",
        type: "address",
      },
      {
        internalType: "contract ITizzStaking",
        name: "_staking",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_baseAssetVaultFeeP",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_lpFeeP",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_sssFeeP",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ITizzFundingFees",
        name: "_fundingFees",
        type: "address",
      },
      {
        internalType: "address",
        name: "vaultToApprove",
        type: "address",
      },
    ],
    name: "initializeV2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ITizzStaking",
        name: "_staking",
        type: "address",
      },
    ],
    name: "initializeV4",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ITizzMultiCollatDiamond",
        name: "_multiCollatDiamond",
        type: "address",
      },
    ],
    name: "initializeV6",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isDone",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lpFeeP",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "multiCollatDiamond",
    outputs: [
      {
        internalType: "contract ITizzMultiCollatDiamond",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "orderId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "spreadP",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "open",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "high",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "low",
            type: "uint256",
          },
        ],
        internalType: "struct ITizzTradingCallbacks.AggregatorAnswer",
        name: "a",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "trader",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "pairIndex",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "index",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "initialPosToken",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "positionSizeBaseAsset",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "openPrice",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "buy",
                type: "bool",
              },
              {
                internalType: "uint256",
                name: "leverage",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "tp",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "sl",
                type: "uint256",
              },
            ],
            internalType: "struct ITizzTradingStorage.Trade",
            name: "trade",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "block",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "wantedPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "slippageP",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "spreadReductionP",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        internalType: "struct ITizzTradingStorage.PendingMarketOrder",
        name: "o",
        type: "tuple",
      },
    ],
    name: "openTradeMarketCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pairInfos",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "pairMaxLeverage",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "referrals",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_baseAssetVaultFeeP",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_lpFeeP",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_sssFeeP",
        type: "uint256",
      },
    ],
    name: "setClosingFeeSharesP",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "trader",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "pairIndex",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            internalType: "enum ITizzTradingCallbacks.TradeType",
            name: "tradeType",
            type: "uint8",
          },
        ],
        internalType: "struct ITizzTradingCallbacks.SimplifiedTradeId",
        name: "_id",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "maxSlippageP",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastOiUpdateTs",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "collateralPriceUsd",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_placeholder",
            type: "uint256",
          },
        ],
        internalType: "struct ITizzTradingCallbacks.TradeData",
        name: "_tradeData",
        type: "tuple",
      },
    ],
    name: "setTradeData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "trader",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "pairIndex",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            internalType: "enum ITizzTradingCallbacks.TradeType",
            name: "tradeType",
            type: "uint8",
          },
        ],
        internalType: "struct ITizzTradingCallbacks.SimplifiedTradeId",
        name: "_id",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "tp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "sl",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "limit",
            type: "uint256",
          },
          {
            internalType: "uint64",
            name: "created",
            type: "uint64",
          },
        ],
        internalType: "struct ITizzTradingCallbacks.LastUpdated",
        name: "_lastUpdated",
        type: "tuple",
      },
    ],
    name: "setTradeLastUpdated",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sssFeeP",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "staking",
    outputs: [
      {
        internalType: "contract ITizzStaking",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "storageT",
    outputs: [
      {
        internalType: "contract ITizzTradingStorage",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "enum ITizzTradingCallbacks.TradeType",
        name: "",
        type: "uint8",
      },
    ],
    name: "tradeData",
    outputs: [
      {
        internalType: "uint256",
        name: "maxSlippageP",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastOiUpdateTs",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "collateralPriceUsd",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_placeholder",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "enum ITizzTradingCallbacks.TradeType",
        name: "",
        type: "uint8",
      },
    ],
    name: "tradeLastUpdated",
    outputs: [
      {
        internalType: "uint256",
        name: "tp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "sl",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "created",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
