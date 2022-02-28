import { ChainId } from '../packages/address-book/address-book';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

const BASE_HPY = 2190;
const MINUTELY_HPY = 525600;
const HOURLY_HPY = 8760;
const DAILY_HPY = 365;
const WEEKLY_HPY = 52;

const FANTOM_RPC = process.env.FANTOM_RPC || 'https://rpc.ftm.tools';

const FANTOM_CHAIN_ID = ChainId.fantom;

const SPIRIT_LPF = 0.003;
const SPOOKY_LPF = 0.002;

const MULTICHAIN_RPC: Record<ChainId, string> = {
  [ChainId.fantom]: FANTOM_RPC,
};

const MULTICHAIN_ENDPOINTS = {
  fantom: '',
};

const BEEFY_PERFORMANCE_FEE = 0.045;
const SHARE_AFTER_PERFORMANCE_FEE = 1 - BEEFY_PERFORMANCE_FEE;

const EXCLUDED_IDS_FROM_TVL = ['venus-wbnb'];

export {
  API_BASE_URL,
  FANTOM_RPC,
  FANTOM_CHAIN_ID,
  BASE_HPY,
  MINUTELY_HPY,
  HOURLY_HPY,
  DAILY_HPY,
  WEEKLY_HPY,
  MULTICHAIN_RPC,
  MULTICHAIN_ENDPOINTS,
  SPIRIT_LPF,
  SPOOKY_LPF,
  BEEFY_PERFORMANCE_FEE,
  SHARE_AFTER_PERFORMANCE_FEE,
  EXCLUDED_IDS_FROM_TVL,
};
