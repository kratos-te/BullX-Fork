export const SupraOracleClientAbi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
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
