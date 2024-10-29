// Original file: proto/client.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { PullRequest as _pull_service_PullRequest, PullRequest__Output as _pull_service_PullRequest__Output } from '../pull_service/PullRequest';
import type { PullResponse as _pull_service_PullResponse, PullResponse__Output as _pull_service_PullResponse__Output } from '../pull_service/PullResponse';

export interface PullServiceClient extends grpc.Client {
  GetProof(argument: _pull_service_PullRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_pull_service_PullResponse__Output>): grpc.ClientUnaryCall;
  GetProof(argument: _pull_service_PullRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_pull_service_PullResponse__Output>): grpc.ClientUnaryCall;
  GetProof(argument: _pull_service_PullRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_pull_service_PullResponse__Output>): grpc.ClientUnaryCall;
  GetProof(argument: _pull_service_PullRequest, callback: grpc.requestCallback<_pull_service_PullResponse__Output>): grpc.ClientUnaryCall;
  getProof(argument: _pull_service_PullRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_pull_service_PullResponse__Output>): grpc.ClientUnaryCall;
  getProof(argument: _pull_service_PullRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_pull_service_PullResponse__Output>): grpc.ClientUnaryCall;
  getProof(argument: _pull_service_PullRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_pull_service_PullResponse__Output>): grpc.ClientUnaryCall;
  getProof(argument: _pull_service_PullRequest, callback: grpc.requestCallback<_pull_service_PullResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface PullServiceHandlers extends grpc.UntypedServiceImplementation {
  GetProof: grpc.handleUnaryCall<_pull_service_PullRequest__Output, _pull_service_PullResponse>;
  
}

export interface PullServiceDefinition extends grpc.ServiceDefinition {
  GetProof: MethodDefinition<_pull_service_PullRequest, _pull_service_PullResponse, _pull_service_PullRequest__Output, _pull_service_PullResponse__Output>
}
