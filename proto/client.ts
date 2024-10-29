import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { PullServiceClient as _pull_service_PullServiceClient, PullServiceDefinition as _pull_service_PullServiceDefinition } from './pull_service/PullService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  pull_service: {
    PullRequest: MessageTypeDefinition
    PullResponse: MessageTypeDefinition
    PullResponseAptos: MessageTypeDefinition
    PullResponseEvm: MessageTypeDefinition
    PullResponseSui: MessageTypeDefinition
    PullService: SubtypeConstructor<typeof grpc.Client, _pull_service_PullServiceClient> & { service: _pull_service_PullServiceDefinition }
  }
}

