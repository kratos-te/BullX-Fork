"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useWaitForTransactionReceipt } from "wagmi";
import { Address } from "viem";
import { useSnackbar, SnackbarKey } from "notistack";

export function usePendingTransactionToast() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [tx, setTx] = useState<Address>();
  const keyRef = useRef<SnackbarKey>();
  const messageRef = useRef<string>();

  const result = useWaitForTransactionReceipt({
    hash: tx,
  });

  useEffect(() => {
    if (tx !== undefined && result.data?.transactionHash === tx) {
      setTx(undefined);
      closeSnackbar(keyRef.current);

      if (result.data.status === "reverted") {
        enqueueSnackbar(messageRef.current || "Reverted transaction", {
          variant: "error",
        });
      }
    }
  }, [closeSnackbar, enqueueSnackbar, result, tx]);

  const setPendingTransactionHash = useCallback(
    (hash: Address, pendingMessage: string, revertMessage: string) => {
      setTx(hash);
      messageRef.current = revertMessage;
      keyRef.current = enqueueSnackbar(pendingMessage, {
        variant: "info",
        persist: true,
      });
    },
    [enqueueSnackbar],
  );

  return { setPendingTransactionHash };
}
