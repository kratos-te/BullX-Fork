"use server";
import "server-only";

import {
  loadPackageDefinition,
  credentials,
  requestCallback,
} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import type { ProtoGrpcType } from "@/proto/client";
import type { PullServiceClient as IPullServiceClient } from "@/proto/pull_service/PullService";
import type { PullRequest } from "@/proto/pull_service/PullRequest";
import type { PullResponse__Output } from "@/proto/pull_service/PullResponse";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../");

class PullServiceClient {
  client: IPullServiceClient;

  constructor(address: string) {
    const protoPath = path.resolve(process.cwd(), "proto", "client.proto");
    console.log("Looking for proto file at:", protoPath);
    const packageDefinition = loadSync(protoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });

    const pullProto = loadPackageDefinition(
      packageDefinition,
    ) as unknown as ProtoGrpcType;

    this.client = new pullProto.pull_service.PullService(
      address,
      credentials.createSsl(),
    );
  }

  getProof(
    request: PullRequest,
    callback: requestCallback<PullResponse__Output>,
  ) {
    return this.client.getProof(request, callback);
  }
}

export default PullServiceClient;
