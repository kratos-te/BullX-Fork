"use server";

import "server-only";

import { PullRequest } from "@/proto/pull_service/PullRequest";
import PullServiceClient from "../../proto/pullServiceClient";

const SUPRA_GRPC_SERVER = "testnet-dora-2.supra.com"; // we use v2 now
const SUPRA_CHAIN_TYPE = "evm";

const hexes = Array.from({ length: 256 }, (v, i) =>
  i.toString(16).padStart(2, "0"),
);

export async function bytesToHex(value: Uint8Array): Promise<string> {
  let string = "";
  for (let i = 0; i < value.length; i++) {
    string += hexes[value[i]];
  }
  const hex = `0x${string}`;

  return hex;
}

export async function getBytesProof(pairIds: number[]) {
  const client = new PullServiceClient(SUPRA_GRPC_SERVER);

  const request: PullRequest = {
    pair_indexes: pairIds,
    chain_type: SUPRA_CHAIN_TYPE,
  };

  return new Promise(
    (
      resolve: (
        value:
          | {
              pair_indexes: number[];
              proofHex: string;
            }
          | undefined
          | null,
      ) => void,
    ) => {
      client.getProof(request, async (_err, response) => {
        if (!response || !response.evm) {
          return null;
        }

        const proofHex = await bytesToHex(
          new Uint8Array(response.evm.proof_bytes),
        );

        resolve({
          pair_indexes: response.evm.pair_indexes,
          proofHex,
        });
      });
    },
  );
}
