export const TizzPriceAggregatorAbi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
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
        indexed: false,
        internalType: "struct ITizzTradingCallbacks.AggregatorAnswer",
        name: "answer",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "enum ITizzPriceAggregator.OrderType",
        name: "orderType",
        type: "uint8",
      },
    ],
    name: "CallbackExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "CollateralPriceIdUpdated",
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
        indexed: false,
        internalType: "uint256",
        name: "pair",
        type: "uint256",
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
        name: "decimals",
        type: "uint256",
      },
    ],
    name: "PairPrice",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "pairId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "bytesproof",
        type: "bytes",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "PriceReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "value",
        type: "address",
      },
    ],
    name: "SupraOracleStorageUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "value",
        type: "address",
      },
    ],
    name: "SupraOracleUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_bytesProof",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "pair_id_1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pair_id_2",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "operation",
        type: "uint256",
      },
    ],
    name: "GetDerivedPairPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_bytesProof",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "pair",
        type: "uint256",
      },
    ],
    name: "GetPairPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_bytesProof",
        type: "bytes",
      },
      {
        internalType: "uint256[]",
        name: "_pairs",
        type: "uint256[]",
      },
    ],
    name: "GetPairPrices",
    outputs: [
      {
        internalType: "int256[]",
        name: "",
        type: "int256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "PRICE_PRECISION",
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
    name: "collateralPairId",
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
    name: "dDecimal",
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
    name: "dPrice",
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
    name: "dRound",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_normalizedValue",
        type: "uint256",
      },
    ],
    name: "getCollateralFromUsdNormalizedValue",
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
    name: "getCollateralPriceUsd",
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
        internalType: "uint256",
        name: "_pairIndex",
        type: "uint256",
      },
      {
        internalType: "enum ITizzPriceAggregator.OrderType",
        name: "_orderType",
        type: "uint8",
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
        name: "_pendingOrder",
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
        name: "_pendingNft",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "_bytesproof",
        type: "bytes",
      },
    ],
    name: "getPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pairId",
        type: "uint256",
      },
    ],
    name: "getPrice",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "round",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "decimals",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
        ],
        internalType: "struct SupraStructs.priceFeed",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_pairIds",
        type: "uint256[]",
      },
    ],
    name: "getPriceForMultiplePair",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "round",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "decimals",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
        ],
        internalType: "struct SupraStructs.priceFeed[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pairId",
        type: "uint256",
      },
    ],
    name: "getPriceUsd",
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
        internalType: "uint256",
        name: "_collateralValue",
        type: "uint256",
      },
    ],
    name: "getUsdNormalizedValue",
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
        internalType: "contract ITizzMultiCollatDiamond",
        name: "_multiCollatDiamond",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_collateralPairId",
        type: "uint256",
      },
      {
        internalType: "contract ISupraOraclePull",
        name: "_supraOraclePull",
        type: "address",
      },
      {
        internalType: "contract ISupraSValueFeed",
        name: "_supraOracleStorage",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "supra_pull",
    outputs: [
      {
        internalType: "contract ISupraOraclePull",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "supra_storage",
    outputs: [
      {
        internalType: "contract ISupraSValueFeed",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenOracleId",
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
        internalType: "uint256",
        name: "_newValue",
        type: "uint256",
      },
    ],
    name: "updateCollateralPairId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISupraOraclePull",
        name: "oracle_",
        type: "address",
      },
    ],
    name: "updatePullAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISupraSValueFeed",
        name: "storage_",
        type: "address",
      },
    ],
    name: "updateStorageAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
