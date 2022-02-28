import Web3 from 'web3';
import { addressBookByChainId, ChainId } from '../../packages/address-book/address-book';
import { BeefyFinance } from '../../packages/address-book/types/beefyfinance';

import { FANTOM_RPC, FANTOM_CHAIN_ID } from '../constants';

const MULTICALLS: Record<ChainId, Pick<BeefyFinance, 'multicall'>['multicall']> = {
  [ChainId.fantom]: addressBookByChainId[ChainId.fantom].platforms.beefyfinance.multicall,
};

const clients: Record<keyof typeof ChainId, Web3[]> = {
  fantom: [],
};

clients.fantom.push(new Web3(FANTOM_RPC));

export const chainRandomClients = {
  fantomRandomClient: () => clients.fantom[~~(clients.fantom.length * Math.random())],
};

export const _web3Factory = (chainId: ChainId) => {
  switch (chainId) {
    case FANTOM_CHAIN_ID:
      return chainRandomClients.fantomRandomClient();
  }
};

export const _multicallAddress = (chainId: ChainId) => MULTICALLS[chainId];
