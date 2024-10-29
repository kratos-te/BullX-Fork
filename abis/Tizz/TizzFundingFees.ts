export const TizzFundingFeesAbi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "BlockOrder",
    type: "error",
  },
  {
    inputs: [],
    name: "Overflow",
    type: "error",
  },
  {
    inputs: [],
    name: "Overflow",
    type: "error",
  },
  {
    inputs: [],
    name: "WrongAccess",
    type: "error",
  },
  {
    inputs: [],
    name: "WrongExponent",
    type: "error",
  },
  {
    inputs: [],
    name: "WrongLength",
    type: "error",
  },
  {
    inputs: [],
    name: "WrongParams",
    type: "error",
  },
  {
    inputs: [],
    name: "WrongSlot",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroGroup",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint16",
        name: "groupIndex",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "currentBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "accFeeLong",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "accFeeShort",
        type: "uint64",
      },
    ],
    name: "GroupAccFeesUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint16",
        name: "groupIndex",
        type: "uint16",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "long",
        type: "bool",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "increase",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint112",
        name: "amount",
        type: "uint112",
      },
      {
        indexed: false,
        internalType: "uint112",
        name: "oiLong",
        type: "uint112",
      },
      {
        indexed: false,
        internalType: "uint112",
        name: "oiShort",
        type: "uint112",
      },
    ],
    name: "GroupOiUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint16",
        name: "groupIndex",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "feePerBlock",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint72",
        name: "maxOi",
        type: "uint72",
      },
      {
        indexed: false,
        internalType: "uint48",
        name: "feeExponent",
        type: "uint48",
      },
    ],
    name: "GroupUpdated",
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
        name: "pairIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "currentBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "accFeeLong",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "accFeeShort",
        type: "uint64",
      },
    ],
    name: "PairAccFeesUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint16",
        name: "prevGroupIndex",
        type: "uint16",
      },
      {
        indexed: true,
        internalType: "uint16",
        name: "newGroupIndex",
        type: "uint16",
      },
    ],
    name: "PairGroupUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint16",
        name: "groupIndex",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "feePerBlock",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint48",
        name: "feeExponent",
        type: "uint48",
      },
      {
        indexed: false,
        internalType: "uint72",
        name: "maxOi",
        type: "uint72",
      },
    ],
    name: "PairParamsUpdated",
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
        internalType: "bool",
        name: "open",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "long",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "positionSizeBaseAsset",
        type: "uint256",
      },
    ],
    name: "TradeActionHandled",
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
        internalType: "uint64",
        name: "initialPairAccFee",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "initialGroupAccFee",
        type: "uint64",
      },
    ],
    name: "TradeInitialAccFeesStored",
    type: "event",
  },
  {
    inputs: [],
    name: "FUNDING_RATE_PRECISION",
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
    name: "baseRate",
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
    name: "getAllPairs",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint16",
                name: "groupIndex",
                type: "uint16",
              },
              {
                internalType: "uint48",
                name: "block",
                type: "uint48",
              },
              {
                internalType: "uint64",
                name: "initialAccFeeLong",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "initialAccFeeShort",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "prevGroupAccFeeLong",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "prevGroupAccFeeShort",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "pairAccFeeLong",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "pairAccFeeShort",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "_placeholder",
                type: "uint64",
              },
            ],
            internalType: "struct ITizzFundingFees.PairGroup[]",
            name: "groups",
            type: "tuple[]",
          },
          {
            internalType: "uint32",
            name: "feePerBlock",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "accFeeLong",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "accFeeShort",
            type: "uint64",
          },
          {
            internalType: "uint48",
            name: "accLastUpdatedBlock",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "feeExponent",
            type: "uint48",
          },
          {
            internalType: "uint256",
            name: "lastAccBlockWeightedMarketCap",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fundingFees",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fundingRate",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isBullish",
            type: "bool",
          },
        ],
        internalType: "struct ITizzFundingFees.Pair[]",
        name: "",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint72",
            name: "long",
            type: "uint72",
          },
          {
            internalType: "uint72",
            name: "short",
            type: "uint72",
          },
          {
            internalType: "uint72",
            name: "max",
            type: "uint72",
          },
          {
            internalType: "uint40",
            name: "_placeholder",
            type: "uint40",
          },
        ],
        internalType: "struct ITizzFundingFees.PairOi[]",
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
        name: "pairIndex",
        type: "uint256",
      },
    ],
    name: "getCollateralPairMaxOi",
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
        name: "pairIndex",
        type: "uint256",
      },
    ],
    name: "getFundingFees",
    outputs: [
      {
        internalType: "uint256",
        name: "fundingFees",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fundingRate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "groupIndex",
        type: "uint16",
      },
    ],
    name: "getGroup",
    outputs: [
      {
        components: [
          {
            internalType: "uint112",
            name: "oiLong",
            type: "uint112",
          },
          {
            internalType: "uint112",
            name: "oiShort",
            type: "uint112",
          },
          {
            internalType: "uint32",
            name: "feePerBlock",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "accFeeLong",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "accFeeShort",
            type: "uint64",
          },
          {
            internalType: "uint48",
            name: "accLastUpdatedBlock",
            type: "uint48",
          },
          {
            internalType: "uint80",
            name: "maxOi",
            type: "uint80",
          },
          {
            internalType: "uint256",
            name: "lastAccBlockWeightedMarketCap",
            type: "uint256",
          },
        ],
        internalType: "struct ITizzFundingFees.Group",
        name: "",
        type: "tuple",
      },
      {
        internalType: "uint48",
        name: "",
        type: "uint48",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "groupIndex",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "currentBlock",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "long",
        type: "bool",
      },
    ],
    name: "getGroupPendingAccFee",
    outputs: [
      {
        internalType: "uint64",
        name: "accFee",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "groupIndex",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "currentBlock",
        type: "uint256",
      },
    ],
    name: "getGroupPendingAccFees",
    outputs: [
      {
        internalType: "uint64",
        name: "accFeeLong",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "accFeeShort",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "groupAccFeeDelta",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16[]",
        name: "indices",
        type: "uint16[]",
      },
    ],
    name: "getGroups",
    outputs: [
      {
        components: [
          {
            internalType: "uint112",
            name: "oiLong",
            type: "uint112",
          },
          {
            internalType: "uint112",
            name: "oiShort",
            type: "uint112",
          },
          {
            internalType: "uint32",
            name: "feePerBlock",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "accFeeLong",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "accFeeShort",
            type: "uint64",
          },
          {
            internalType: "uint48",
            name: "accLastUpdatedBlock",
            type: "uint48",
          },
          {
            internalType: "uint80",
            name: "maxOi",
            type: "uint80",
          },
          {
            internalType: "uint256",
            name: "lastAccBlockWeightedMarketCap",
            type: "uint256",
          },
        ],
        internalType: "struct ITizzFundingFees.Group[]",
        name: "",
        type: "tuple[]",
      },
      {
        internalType: "uint48[]",
        name: "",
        type: "uint48[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
    ],
    name: "getPair",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint16",
                name: "groupIndex",
                type: "uint16",
              },
              {
                internalType: "uint48",
                name: "block",
                type: "uint48",
              },
              {
                internalType: "uint64",
                name: "initialAccFeeLong",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "initialAccFeeShort",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "prevGroupAccFeeLong",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "prevGroupAccFeeShort",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "pairAccFeeLong",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "pairAccFeeShort",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "_placeholder",
                type: "uint64",
              },
            ],
            internalType: "struct ITizzFundingFees.PairGroup[]",
            name: "groups",
            type: "tuple[]",
          },
          {
            internalType: "uint32",
            name: "feePerBlock",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "accFeeLong",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "accFeeShort",
            type: "uint64",
          },
          {
            internalType: "uint48",
            name: "accLastUpdatedBlock",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "feeExponent",
            type: "uint48",
          },
          {
            internalType: "uint256",
            name: "lastAccBlockWeightedMarketCap",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fundingFees",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fundingRate",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isBullish",
            type: "bool",
          },
        ],
        internalType: "struct ITizzFundingFees.Pair",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint72",
            name: "long",
            type: "uint72",
          },
          {
            internalType: "uint72",
            name: "short",
            type: "uint72",
          },
          {
            internalType: "uint72",
            name: "max",
            type: "uint72",
          },
          {
            internalType: "uint40",
            name: "_placeholder",
            type: "uint40",
          },
        ],
        internalType: "struct ITizzFundingFees.PairOi",
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
        internalType: "uint256",
        name: "i",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint16",
            name: "groupIndex",
            type: "uint16",
          },
          {
            internalType: "uint48",
            name: "block",
            type: "uint48",
          },
          {
            internalType: "uint64",
            name: "initialAccFeeLong",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "initialAccFeeShort",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "prevGroupAccFeeLong",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "prevGroupAccFeeShort",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "pairAccFeeLong",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "pairAccFeeShort",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "_placeholder",
            type: "uint64",
          },
        ],
        internalType: "struct ITizzFundingFees.PairGroup[]",
        name: "pairGroups",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint64",
            name: "accPairFee",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "accGroupFee",
            type: "uint64",
          },
          {
            internalType: "uint48",
            name: "block",
            type: "uint48",
          },
          {
            internalType: "uint80",
            name: "_placeholder",
            type: "uint80",
          },
        ],
        internalType: "struct ITizzFundingFees.InitialAccFees",
        name: "initialFees",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "long",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "currentBlock",
        type: "uint256",
      },
    ],
    name: "getPairGroupAccFeesDeltas",
    outputs: [
      {
        internalType: "uint64",
        name: "deltaGroup",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "deltaPair",
        type: "uint64",
      },
      {
        internalType: "bool",
        name: "beforeTradeOpen",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
    ],
    name: "getPairGroupIndex",
    outputs: [
      {
        internalType: "uint16",
        name: "groupIndex",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
    ],
    name: "getPairMaxOi",
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
        name: "pairIndex",
        type: "uint256",
      },
    ],
    name: "getPairOpenInterestBaseAsset",
    outputs: [
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
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentBlock",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "long",
        type: "bool",
      },
    ],
    name: "getPairPendingAccFee",
    outputs: [
      {
        internalType: "uint64",
        name: "accFee",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentBlock",
        type: "uint256",
      },
    ],
    name: "getPairPendingAccFees",
    outputs: [
      {
        internalType: "uint64",
        name: "accFeeLong",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "accFeeShort",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "pairAccFeeDelta",
        type: "uint64",
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
            internalType: "uint64",
            name: "accFeeLong",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "accFeeShort",
            type: "uint64",
          },
          {
            internalType: "uint32",
            name: "feePerBlock",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "currentBlock",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "accLastUpdatedBlock",
            type: "uint256",
          },
        ],
        internalType: "struct ITizzFundingFees.PendingAccFeesInput",
        name: "input",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "fundingFees",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isBullish",
        type: "bool",
      },
    ],
    name: "getPendingAccFees",
    outputs: [
      {
        internalType: "uint64",
        name: "newAccFeeLong",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "newAccFeeShort",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "delta",
        type: "uint64",
      },
    ],
    stateMutability: "pure",
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
            internalType: "bool",
            name: "long",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "collateral",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "leverage",
            type: "uint256",
          },
        ],
        internalType: "struct ITizzFundingFees.FundingFeeInput",
        name: "input",
        type: "tuple",
      },
    ],
    name: "getTradeFundingFee",
    outputs: [
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
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
            name: "openPrice",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "long",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "collateral",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "leverage",
            type: "uint256",
          },
        ],
        internalType: "struct ITizzFundingFees.LiqPriceInput",
        name: "input",
        type: "tuple",
      },
    ],
    name: "getTradeLiquidationPrice",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "groupFeeExponents",
    outputs: [
      {
        internalType: "uint48",
        name: "",
        type: "uint48",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    name: "groups",
    outputs: [
      {
        internalType: "uint112",
        name: "oiLong",
        type: "uint112",
      },
      {
        internalType: "uint112",
        name: "oiShort",
        type: "uint112",
      },
      {
        internalType: "uint32",
        name: "feePerBlock",
        type: "uint32",
      },
      {
        internalType: "uint64",
        name: "accFeeLong",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "accFeeShort",
        type: "uint64",
      },
      {
        internalType: "uint48",
        name: "accLastUpdatedBlock",
        type: "uint48",
      },
      {
        internalType: "uint80",
        name: "maxOi",
        type: "uint80",
      },
      {
        internalType: "uint256",
        name: "lastAccBlockWeightedMarketCap",
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
        name: "positionSizeBaseAsset",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "open",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "long",
        type: "bool",
      },
    ],
    name: "handleTradeAction",
    outputs: [],
    stateMutability: "nonpayable",
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
    ],
    name: "initialAccFees",
    outputs: [
      {
        internalType: "uint64",
        name: "accPairFee",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "accGroupFee",
        type: "uint64",
      },
      {
        internalType: "uint48",
        name: "block",
        type: "uint48",
      },
      {
        internalType: "uint80",
        name: "_placeholder",
        type: "uint80",
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
        internalType: "uint256",
        name: "_baseRate",
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
        internalType: "contract ITizzMultiCollatDiamond",
        name: "_multiCollatDiamond",
        type: "address",
      },
      {
        internalType: "contract IPriceAggregator",
        name: "_priceAggregator",
        type: "address",
      },
    ],
    name: "initializeV3",
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
    name: "pairOis",
    outputs: [
      {
        internalType: "uint72",
        name: "long",
        type: "uint72",
      },
      {
        internalType: "uint72",
        name: "short",
        type: "uint72",
      },
      {
        internalType: "uint72",
        name: "max",
        type: "uint72",
      },
      {
        internalType: "uint40",
        name: "_placeholder",
        type: "uint40",
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
    name: "pairs",
    outputs: [
      {
        internalType: "uint32",
        name: "feePerBlock",
        type: "uint32",
      },
      {
        internalType: "uint64",
        name: "accFeeLong",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "accFeeShort",
        type: "uint64",
      },
      {
        internalType: "uint48",
        name: "accLastUpdatedBlock",
        type: "uint48",
      },
      {
        internalType: "uint48",
        name: "feeExponent",
        type: "uint48",
      },
      {
        internalType: "uint256",
        name: "lastAccBlockWeightedMarketCap",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fundingFees",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fundingRate",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isBullish",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceAggregator",
    outputs: [
      {
        internalType: "contract IPriceAggregator",
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
        internalType: "uint16",
        name: "groupIndex",
        type: "uint16",
      },
      {
        components: [
          {
            internalType: "uint32",
            name: "feePerBlock",
            type: "uint32",
          },
          {
            internalType: "uint72",
            name: "maxOi",
            type: "uint72",
          },
          {
            internalType: "uint48",
            name: "feeExponent",
            type: "uint48",
          },
        ],
        internalType: "struct ITizzFundingFees.GroupParams",
        name: "value",
        type: "tuple",
      },
    ],
    name: "setGroupParams",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16[]",
        name: "indices",
        type: "uint16[]",
      },
      {
        components: [
          {
            internalType: "uint32",
            name: "feePerBlock",
            type: "uint32",
          },
          {
            internalType: "uint72",
            name: "maxOi",
            type: "uint72",
          },
          {
            internalType: "uint48",
            name: "feeExponent",
            type: "uint48",
          },
        ],
        internalType: "struct ITizzFundingFees.GroupParams[]",
        name: "values",
        type: "tuple[]",
      },
    ],
    name: "setGroupParamsArray",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint16",
            name: "groupIndex",
            type: "uint16",
          },
          {
            internalType: "uint32",
            name: "feePerBlock",
            type: "uint32",
          },
          {
            internalType: "uint48",
            name: "feeExponent",
            type: "uint48",
          },
          {
            internalType: "uint72",
            name: "maxOi",
            type: "uint72",
          },
        ],
        internalType: "struct ITizzFundingFees.PairParams",
        name: "value",
        type: "tuple",
      },
    ],
    name: "setPairParams",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "indices",
        type: "uint256[]",
      },
      {
        components: [
          {
            internalType: "uint16",
            name: "groupIndex",
            type: "uint16",
          },
          {
            internalType: "uint32",
            name: "feePerBlock",
            type: "uint32",
          },
          {
            internalType: "uint48",
            name: "feeExponent",
            type: "uint48",
          },
          {
            internalType: "uint72",
            name: "maxOi",
            type: "uint72",
          },
        ],
        internalType: "struct ITizzFundingFees.PairParams[]",
        name: "values",
        type: "tuple[]",
      },
    ],
    name: "setPairParamsArray",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "proofbytes",
        type: "bytes",
      },
    ],
    name: "syncFundingFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "pairIndices",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "proofbytes",
        type: "bytes",
      },
    ],
    name: "syncFundingFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_baseRate",
        type: "uint256",
      },
    ],
    name: "updateBaseRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "long",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "positionSizeBaseAsset",
        type: "uint256",
      },
    ],
    name: "withinMaxGroupOi",
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
] as const;
