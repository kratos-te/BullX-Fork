// Original file: proto/client.proto


export interface PullResponseEvm {
  'pair_indexes'?: (number)[];
  'proof_bytes'?: (Buffer | Uint8Array | string);
}

export interface PullResponseEvm__Output {
  'pair_indexes': (number)[];
  'proof_bytes': (Buffer);
}
