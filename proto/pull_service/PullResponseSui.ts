// Original file: proto/client.proto


export interface PullResponseSui {
  'pair_indexes'?: (number)[];
  'dkg_object'?: (string);
  'oracle_holder_object'?: (string);
  'vote_smr_block_round'?: (Buffer | Uint8Array | string);
  'vote_smr_block_timestamp'?: (Buffer | Uint8Array | string);
  'vote_smr_block_author'?: (Buffer | Uint8Array | string);
  'vote_smr_block_qc_hash'?: (Buffer | Uint8Array | string);
  'vote_smr_block_batch_hashes'?: (Buffer | Uint8Array | string);
  'vote_round'?: (Buffer | Uint8Array | string);
  'min_batch_protocol'?: (Buffer | Uint8Array | string);
  'min_batch_txn_hashes'?: (Buffer | Uint8Array | string);
  'min_txn_cluster_hashes'?: (Buffer | Uint8Array | string);
  'min_txn_sender'?: (Buffer | Uint8Array | string);
  'min_txn_protocol'?: (Buffer | Uint8Array | string);
  'min_txn_tx_sub_type'?: (Buffer | Uint8Array | string);
  'scc_data_hash'?: (Buffer | Uint8Array | string);
  'scc_pair'?: (Buffer | Uint8Array | string);
  'scc_prices'?: (Buffer | Uint8Array | string);
  'scc_timestamp'?: (Buffer | Uint8Array | string);
  'scc_decimals'?: (Buffer | Uint8Array | string);
  'scc_qc'?: (Buffer | Uint8Array | string);
  'scc_round'?: (Buffer | Uint8Array | string);
  'scc_id'?: (Buffer | Uint8Array | string);
  'scc_member_index'?: (Buffer | Uint8Array | string);
  'scc_committee_index'?: (Buffer | Uint8Array | string);
  'batch_idx'?: (Buffer | Uint8Array | string);
  'txn_idx'?: (Buffer | Uint8Array | string);
  'cluster_idx'?: (Buffer | Uint8Array | string);
  'sig'?: (Buffer | Uint8Array | string);
  'pair_mask'?: (Buffer | Uint8Array | string);
}

export interface PullResponseSui__Output {
  'pair_indexes': (number)[];
  'dkg_object': (string);
  'oracle_holder_object': (string);
  'vote_smr_block_round': (Buffer);
  'vote_smr_block_timestamp': (Buffer);
  'vote_smr_block_author': (Buffer);
  'vote_smr_block_qc_hash': (Buffer);
  'vote_smr_block_batch_hashes': (Buffer);
  'vote_round': (Buffer);
  'min_batch_protocol': (Buffer);
  'min_batch_txn_hashes': (Buffer);
  'min_txn_cluster_hashes': (Buffer);
  'min_txn_sender': (Buffer);
  'min_txn_protocol': (Buffer);
  'min_txn_tx_sub_type': (Buffer);
  'scc_data_hash': (Buffer);
  'scc_pair': (Buffer);
  'scc_prices': (Buffer);
  'scc_timestamp': (Buffer);
  'scc_decimals': (Buffer);
  'scc_qc': (Buffer);
  'scc_round': (Buffer);
  'scc_id': (Buffer);
  'scc_member_index': (Buffer);
  'scc_committee_index': (Buffer);
  'batch_idx': (Buffer);
  'txn_idx': (Buffer);
  'cluster_idx': (Buffer);
  'sig': (Buffer);
  'pair_mask': (Buffer);
}
