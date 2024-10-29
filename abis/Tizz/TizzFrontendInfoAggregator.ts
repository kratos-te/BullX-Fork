export const TizzFrontendInfoAggregatorAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_tizzFundingFees",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tizzMultiCollatDiamond",
        type: "address",
      },
      {
        internalType: "address",
        name: "_storageT",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tradingCallbacks",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "PRECISION",
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
        internalType: "address",
        name: "_trader",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_collateral",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_leverage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_pairIndex",
        type: "uint256",
      },
    ],
    name: "predictFees",
    outputs: [
      {
        internalType: "uint256",
        name: "fees",
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
    name: "tizzFundingFees",
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
    inputs: [],
    name: "tizzMultiCollatDiamond",
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
    name: "tradingCallbacks",
    outputs: [
      {
        internalType: "contract ITizzTradingCallbacks",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
