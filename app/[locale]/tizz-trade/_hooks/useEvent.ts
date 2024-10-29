"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { TRADE_EVENT } from "@/types/index";
import { useAccount } from "wagmi";

export const TRADING_EVENT = "trading-event";

export function useEvent() {
  const account = useAccount();

  const { enqueueSnackbar } = useSnackbar();

  const marketOrderInitiatedQuery = useQuery({
    queryKey: [TRADING_EVENT, TRADE_EVENT.MARKET_ORDER_INITIATED],
    queryFn: () => {
      return new Promise((resolve) => resolve(null));
    },
  });
  const marketExecutedQuery = useQuery({
    queryKey: [TRADING_EVENT, TRADE_EVENT.MARKET_EXECUTED],
    queryFn: () => {
      return new Promise((resolve) => resolve(null));
    },
  });
  const marketOpenCanceledQuery = useQuery({
    queryKey: [TRADING_EVENT, TRADE_EVENT.MARKET_OPEN_CANCELED],
    queryFn: () => {
      return new Promise((resolve) => resolve(null));
    },
  });
  const marketCloseCanceled = useQuery({
    queryKey: [TRADING_EVENT, TRADE_EVENT.MARKET_CLOSE_CANCELED],
    queryFn: () => {
      return new Promise((resolve) => resolve(null));
    },
  });
  const openLimitPlacedQuery = useQuery({
    queryKey: [TRADING_EVENT, TRADE_EVENT.OPEN_LIMIT_PLACED],
    queryFn: () => {
      return new Promise((resolve) => resolve(null));
    },
  });
  const openLimitUpdatedQuery = useQuery({
    queryKey: [TRADING_EVENT, TRADE_EVENT.OPEN_LIMIT_UPDATED],
    queryFn: () => {
      return new Promise((resolve) => resolve(null));
    },
  });
  const openLimitCanceledQuery = useQuery({
    queryKey: [TRADING_EVENT, TRADE_EVENT.OPEN_LIMIT_CANCELED],
    queryFn: () => {
      return new Promise((resolve) => resolve(null));
    },
  });
  const limitExecutedQuery = useQuery({
    queryKey: [TRADING_EVENT, TRADE_EVENT.LIMIT_EXECUTED],
    queryFn: () => {
      return new Promise((resolve) => resolve(null));
    },
  });
  const tpUpdatedQuery = useQuery({
    queryKey: [TRADING_EVENT, TRADE_EVENT.TP_UPDATED],
    queryFn: () => {
      return new Promise((resolve) => resolve(null));
    },
  });
  const slUpdatedQuery = useQuery({
    queryKey: [TRADING_EVENT, TRADE_EVENT.SL_UPDATED],
    queryFn: () => {
      return new Promise((resolve) => resolve(null));
    },
  });

  useEffect(() => {
    const payload = marketOrderInitiatedQuery.data as {
      trader: string;
    };

    if (payload?.trader === undefined || payload?.trader !== account?.address) {
      return;
    }

    enqueueSnackbar(TRADE_EVENT.MARKET_ORDER_INITIATED, {
      variant: "info",
    });
  }, [account?.address, enqueueSnackbar, marketOrderInitiatedQuery.data]);

  useEffect(() => {
    const payload = openLimitPlacedQuery.data as {
      "0": string;
    };

    if (payload?.["0"] === undefined || payload?.["0"] !== account?.address) {
      return;
    }

    enqueueSnackbar(TRADE_EVENT.OPEN_LIMIT_PLACED, {
      variant: "info",
    });
  }, [account?.address, enqueueSnackbar, openLimitPlacedQuery.data]);

  useEffect(() => {
    const payload = openLimitUpdatedQuery.data as {
      "0": string;
    };

    if (payload?.["0"] === undefined || payload?.["0"] !== account?.address) {
      return;
    }

    enqueueSnackbar(TRADE_EVENT.OPEN_LIMIT_UPDATED, {
      variant: "success",
    });
  }, [account?.address, enqueueSnackbar, openLimitUpdatedQuery.data]);

  useEffect(() => {
    const payload = tpUpdatedQuery.data as {
      "0": string;
    };

    if (payload?.["0"] === undefined || payload?.["0"] !== account?.address) {
      return;
    }

    enqueueSnackbar(TRADE_EVENT.TP_UPDATED, {
      variant: "success",
    });
  }, [account?.address, enqueueSnackbar, tpUpdatedQuery.data]);

  useEffect(() => {
    const payload = slUpdatedQuery.data as {
      "0": string;
    };

    if (payload?.["0"] === undefined || payload?.["0"] !== account?.address) {
      return;
    }

    enqueueSnackbar(TRADE_EVENT.SL_UPDATED, {
      variant: "success",
    });
  }, [account?.address, enqueueSnackbar, slUpdatedQuery.data]);

  useEffect(() => {
    const payload = openLimitCanceledQuery.data as {
      "0": string;
    };

    if (payload?.["0"] === undefined || payload?.["0"] !== account?.address) {
      return;
    }

    enqueueSnackbar(TRADE_EVENT.OPEN_LIMIT_CANCELED, {
      variant: "success",
    });
  }, [account?.address, enqueueSnackbar, openLimitCanceledQuery.data]);

  useEffect(() => {
    const payload = marketOpenCanceledQuery.data as {
      "1": string;
      cancelReason: string;
    };

    if (payload?.["1"] === undefined || payload?.["1"] !== account?.address) {
      return;
    }

    enqueueSnackbar(
      `${TRADE_EVENT.MARKET_OPEN_CANCELED} ${payload.cancelReason}`,
      {
        variant: "error",
      },
    );
  }, [account?.address, enqueueSnackbar, marketOpenCanceledQuery.data]);

  useEffect(() => {
    const payload = marketCloseCanceled.data as {
      "1": string;
      cancelReason: string;
    };

    if (payload?.["1"] === undefined || payload?.["1"] !== account?.address) {
      return;
    }

    enqueueSnackbar(
      `${TRADE_EVENT.MARKET_OPEN_CANCELED} ${payload.cancelReason}`,
      {
        variant: "error",
      },
    );
  }, [account?.address, enqueueSnackbar, marketCloseCanceled.data]);

  useEffect(() => {
    const payload = limitExecutedQuery.data as {
      "2": {
        "0": string;
      };
    };

    if (
      payload?.["2"]?.["0"] === undefined ||
      payload?.["2"]?.["0"] !== account?.address
    ) {
      return;
    }

    enqueueSnackbar(TRADE_EVENT.LIMIT_EXECUTED, {
      variant: "success",
    });
  }, [account?.address, enqueueSnackbar, limitExecutedQuery.data]);

  useEffect(() => {
    const payload = marketExecutedQuery.data as {
      "1": {
        "0": string;
      };
    };

    if (
      payload?.["1"]?.["0"] === undefined ||
      payload?.["1"]?.["0"] !== account?.address
    ) {
      return;
    }

    enqueueSnackbar(TRADE_EVENT.MARKET_EXECUTED, {
      variant: "success",
    });
  }, [account?.address, enqueueSnackbar, marketExecutedQuery.data]);
}
