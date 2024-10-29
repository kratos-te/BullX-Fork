"use client";

export const testNetChainIds = [3636, 421614];

export enum CollateralTypes {
  WBTC = "WBTC",
  USDT = "USDT",
}

export const collateralPairIds = {
  [CollateralTypes.WBTC]: 18,
  [CollateralTypes.USDT]: 48,
};

export const collateralPrecisions = {
  [CollateralTypes.WBTC]: 1e8,
  [CollateralTypes.USDT]: 1e18,
};

export const collateralTokenIcons = {
  [CollateralTypes.WBTC]: "btc",
  [CollateralTypes.USDT]: "usdt",
};

export const env = process.env.NEXT_PUBLIC_ENV;

export const pairsCount = "+";//process.env.NEXT_PUBLIC_PAIRS_COUNT;
export const feesCount = "+";//process.env.NEXT_PUBLIC_FEES_COUNT;
export const groupsCount = "+";//process.env.NEXT_PUBLIC_GROUPS_COUNT;

const scAddresses = {
  botanix: {
    global: {
      TizzToken: "0x4749fd965b94620822477f781739a3897933df77",
      TizzTimelockManager: "0x8c2653b57145a232f759967170b89b1b55238acd",
      TizzTimelockOwner: "0x3aa59c4b00373232921e78e83942f49f2b3b2772",
      MultiCollatDiamond: "0xbfc1909f6ead72442435b27ecff233061ddcb405",
      TizzStaking: "0x6f95ee8fdb5991b8dffe5edc8f8a398824838713",
    },
    USDT: {
      DAI: "0xf254a134af9ba7ed0a4a6a793b5a59669350fdcd",
      LockedDepositNft: "0x464ca6e007ece4ccd1677cc76c4cec9ac86c8484",
      LockedDepositNftDesign: "0x21f389debe9a9436535bcb8c797e99263173e2f9",
      FundingFees: "0x749f57e1ca8dbf7877347631d8e7e054fc09ebe1",
      TradingCallbacks: "0x9b8edef70b8af3e07abe114f28fad9164a3cbb10",
      Trading: "0x5951a5f1e6e78bfd34a9eb485462692edd6e6cbd",
      PriceAggregator: "0x2163dc1aadd8067d2deae1c9bf307194a53f8525",
      tDAI: "0xae78d3f98f36e9496528971ca2cac36a8575e296",
      OpenPnlFeed: "0xadf91143c428049c9a82f9e02172e615b62adabc",
      TradingStorage: "0x4cc5bd5ab715b8f00ff10302f98312f9919b1dba",
      TizzFrontEndInfoAggregator: "0x174CeAa4Ac3263ABd701D5056cfe7499dB000DB0",
    },
    WBTC: {
      DAI: "0xa04f3fae0ad0b183351c5e3098b5f697697b2982",
      LockedDepositNft: "0xb58975d0ccba7cf865e568c54e9da8309a8d50e6",
      LockedDepositNftDesign: "0x2675c5db6ce40b42e8b007344fee73b2eb98997c",
      FundingFees: "0xb5d5093e3e5e216031581a80f91b3e7f4d34aa11",
      TradingCallbacks: "0x73f9fc928d64f98fe92c517f2f013c489b7fb6a5",
      Trading: "0x54c1b39fe6d2bd8b632b4f65cedcfcdff51a46f1",
      PriceAggregator: "0xafaecd1e244bd5a99dbd2abab292f6bad2c14a97",
      tDAI: "0x99397eab4cb013d96832bac8aeb71d94102d6b00",
      OpenPnlFeed: "0xd0e3120c93e995b361344d98804f7048d1a16071",
      TradingStorage: "0x82d66f9f5bca5bdb49ba3dce8301a7b7af6bcd5c",
      // DAI: "0x23a62E7A0b8541b6C217A5a1E750CDb01E954807",
      // LockedDepositNft: "0xFb07301F79b20E1019a07aC12A497DA606E7f05a",
      // LockedDepositNftDesign: "0x93e38CebBB249e7B0C7DA91F82d84E4569D24d75",
      // FundingFees: "0x3ae2497122996Ea53489A5653593ff6B6BDa76ab",
      // TradingCallbacks: "0xb9Dada2578ec79b3202d63306DeB59c9aAE2d184",
      // Trading: "0xdbE6eB78DCBd4315DC15deA4c484359D45c8791F",
      // PriceAggregator: "0xef6d19f015eEE70d68d4C3e450e1D283b5E42dD2",
      // tDAI: "0x209b24c45E7a672580f3ab98E45eCda7E806d53B",
      // OpenPnlFeed: "0x79EdA026B2C105937C970c06A7730993893564e3",
      // TradingStorage: "0xE1e4dD39C4DFf7a7425799f8DB51AF25540Bf458",
      TizzFrontEndInfoAggregator: "0x174CeAa4Ac3263ABd701D5056cfe7499dB000DB0",
    },
    NATIVE: {
      DAI: "0xa04f3fae0ad0b183351c5e3098b5f697697b2982",
      LockedDepositNft: "0xb58975d0ccba7cf865e568c54e9da8309a8d50e6",
      LockedDepositNftDesign: "0x2675c5db6ce40b42e8b007344fee73b2eb98997c",
      FundingFees: "0xb5d5093e3e5e216031581a80f91b3e7f4d34aa11",
      TradingCallbacks: "0x73f9fc928d64f98fe92c517f2f013c489b7fb6a5",
      Trading: "0x54c1b39fe6d2bd8b632b4f65cedcfcdff51a46f1",
      PriceAggregator: "0xafaecd1e244bd5a99dbd2abab292f6bad2c14a97",
      tDAI: "0x99397eab4cb013d96832bac8aeb71d94102d6b00",
      OpenPnlFeed: "0xd0e3120c93e995b361344d98804f7048d1a16071",
      TradingStorage: "0x82d66f9f5bca5bdb49ba3dce8301a7b7af6bcd5c",
      // DAI: "0x23a62E7A0b8541b6C217A5a1E750CDb01E954807",
      // LockedDepositNft: "0xFb07301F79b20E1019a07aC12A497DA606E7f05a",
      // LockedDepositNftDesign: "0x93e38CebBB249e7B0C7DA91F82d84E4569D24d75",
      // FundingFees: "0x3ae2497122996Ea53489A5653593ff6B6BDa76ab",
      // TradingCallbacks: "0xb9Dada2578ec79b3202d63306DeB59c9aAE2d184",
      // Trading: "0xdbE6eB78DCBd4315DC15deA4c484359D45c8791F",
      // PriceAggregator: "0xef6d19f015eEE70d68d4C3e450e1D283b5E42dD2",
      // tDAI: "0x209b24c45E7a672580f3ab98E45eCda7E806d53B",
      // OpenPnlFeed: "0x79EdA026B2C105937C970c06A7730993893564e3",
      // TradingStorage: "0xE1e4dD39C4DFf7a7425799f8DB51AF25540Bf458",
      TizzFrontEndInfoAggregator: "0x174CeAa4Ac3263ABd701D5056cfe7499dB000DB0",
    },
  },
  sepolia: {
    global: {
      TizzToken: "0x54bc62b2A4349C7e098fA61c56A4e98f96690e3E",
      TizzTimelockManager: "0x5def6ded61C8c81CA4E4Abe6229b78388db0B166",
      TizzTimelockOwner: "0x37290209a247C09D486F55D24d28667A10230e00",
      MultiCollatDiamond: "0x87474F6c7Eb4a684DB255C75c8c58CA204ABCE36",
      TizzStaking: "0xF724A7261a3f1091e69ADb70e12c5907b7F349Eb",
    },
    USDT: {
      DAI: "0x1CFEA7ecB518B3e4C5f72f11bc0F8E75A070A5C0",
      LockedDepositNft: "0x3fD0B14b9dE81998e691685Cc07e7E72Ff6759C2",
      LockedDepositNftDesign: "0xCB774C457b3FC2a87A451d18c2C78351E56485B7",
      FundingFees: "0x05B08aF305A60A2A6621268332Dc808fd025Ed71",
      TradingCallbacks: "0xD623ff0EffE8C5a61f5bfA7104898F8c664D3312",
      Trading: "0x4bDaba30e233F9C90080308A7A5E4787FCF6d531",
      PriceAggregator: "0x712b1A0441D512f8cd74C6D9454065D354FcB74f",
      tDAI: "0x1ee6046Bbab27468B2B8ACC1f57907a19F161234",
      OpenPnlFeed: "0x819C80502aD9B17CBbeE5810C524898dce2761eB",
      TradingStorage: "0x12255f153Cb12D7F5e4F6401bB03979994f58c54",
      TizzFrontEndInfoAggregator: "0x3aA59c4b00373232921e78e83942F49f2B3b2772",
    },
    WBTC: {
      DAI: "0xD98A3871421c4daC2F6eea03536326f2279D0Bd2",
      LockedDepositNft: "0x93a93c2e5b55FAE848eBf0F5728A0040D7654D54",
      LockedDepositNftDesign: "0x58Df63E09CC9AeBB465398e8f17624204324F1D6",
      FundingFees: "0xf1f0A91e966E6579b43C20F21E398293430e41b0",
      TradingCallbacks: "0x880Ff438358524b7Cad0E2cfdfBD49af26a0fFc2",
      Trading: "0x3A35A5C5B1019D33962ccD92FdC012dE8b890f87",
      PriceAggregator: "0xc01E3D5dF8Db376E40BD59422dB79770CFa99665",
      tDAI: "0x0f8D6109d9e975DF99abd8670554Cf38b2AF03c3",
      OpenPnlFeed: "0x2a75f4c37D34Fba2D6B0caaf61FB754D2C2B2Ad6",
      TradingStorage: "0xa51100B8866bE77e2447c00bf83622Ae1EEC2bF2",
      TizzFrontEndInfoAggregator: "0x8c2653B57145A232f759967170b89B1b55238ACD",
    },
    NATIVE: {
      DAI: "0x980B62Da83eFf3D4576C647993b0c1D7faf17c73",
      LockedDepositNft: "0x54c1B39fe6d2Bd8b632b4f65CedCfCdFF51A46F1",
      LockedDepositNftDesign: "0xa9Ed5089CC5Ac8e4Fa63F76910227E65caf41abE",
      FundingFees: "0xb5d5093E3e5e216031581a80f91b3e7F4D34Aa11",
      TradingCallbacks: "0xD0E3120c93E995B361344d98804F7048d1A16071",
      Trading: "0xaFaecd1e244BD5A99dBD2AbAb292F6bAD2C14a97",
      PriceAggregator: "0x64F9f350185519Ff26485DBaC9ad9948492bb396",
      tDAI: "0xF0A997acA0a8AFeBcAd932f075d8193fB4f2B81E",
      OpenPnlFeed: "0x807A303597028aeF201bEE9b989B6F4A98cBf665",
      TradingStorage: "0xc70CfaC6f7C79861F8EceAd1eD588CD2dcF3c65F",
      TizzFrontEndInfoAggregator: "0x84EB308cd0A4dC8bc1028E57FC55ffDDc7591ee5",
      WrappedTizzToken: "0x789ff0d17eee99de7b02ab1d9824bfbebd49ce5a",
    },
  },
};

export const tizzContractAddresses =
  scAddresses[env as keyof typeof scAddresses];
