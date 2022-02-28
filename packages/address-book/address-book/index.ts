import { fantom } from './fantom';
import Chain from '../types/chain';
import { ChainId } from '../types/chainid';
import { ConstRecord } from '../types/const';

export * from '../types/chainid';

const _addressBook: {
  readonly fantom: Chain;
} = {
  fantom,
} as const;

const _addressBookByChainId: {
  readonly '250': Chain;
} = {
  [ChainId.fantom]: fantom,
} as const;

export const addressBook: ConstRecord<typeof _addressBook, Chain> = _addressBook;

export const addressBookByChainId: ConstRecord<typeof _addressBookByChainId, Chain> =
  _addressBookByChainId;
