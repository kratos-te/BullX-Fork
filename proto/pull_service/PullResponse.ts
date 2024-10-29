// Original file: proto/client.proto

import type { PullResponseEvm as _pull_service_PullResponseEvm, PullResponseEvm__Output as _pull_service_PullResponseEvm__Output } from '../pull_service/PullResponseEvm';
import type { PullResponseSui as _pull_service_PullResponseSui, PullResponseSui__Output as _pull_service_PullResponseSui__Output } from '../pull_service/PullResponseSui';
import type { PullResponseAptos as _pull_service_PullResponseAptos, PullResponseAptos__Output as _pull_service_PullResponseAptos__Output } from '../pull_service/PullResponseAptos';

export interface PullResponse {
  'evm'?: (_pull_service_PullResponseEvm | null);
  'sui'?: (_pull_service_PullResponseSui | null);
  'aptos'?: (_pull_service_PullResponseAptos | null);
  'resp'?: "evm"|"sui"|"aptos";
}

export interface PullResponse__Output {
  'evm'?: (_pull_service_PullResponseEvm__Output | null);
  'sui'?: (_pull_service_PullResponseSui__Output | null);
  'aptos'?: (_pull_service_PullResponseAptos__Output | null);
  'resp': "evm"|"sui"|"aptos";
}
