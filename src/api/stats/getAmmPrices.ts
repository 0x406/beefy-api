`use strict`;

import { fetchAmmPrices } from '../../utils/fetchAmmPrices';
import { fetchXPrices } from '../../utils/fetchXPrices';
import { fetchCoinGeckoPrices } from '../../utils/fetchCoinGeckoPrices';

import mooTokens from '../../data/mooTokens.json';
import getNonAmmPrices from './getNonAmmPrices';
import spookyPools from '../../data/fantom/spookyLpPools.json';
import tombPools from '../../data/fantom/tombLpPools.json';
import spiritPools from '../../data/fantom/spiritPools.json';
import geistPools from '../../data/fantom/geistLpPools.json';
import popsicleFantomPools from '../../data/fantom/popsicleLpPools.json';
import t2ombLpPools from '../../data/fantom/2ombLpPools.json';
import oxdaoPools from '../../data/fantom/0xdaoPools.json';
import sushiFtmPools from '../../data/fantom/sushiFtmLpPools.json';
import creditumPools from '../../data/fantom/creditumPools.json';
import wigoPools from '../../data/fantom/wigoLpPools.json';
import solidlyPools from '../../data/fantom/solidlyLpPools.json';
import { solidly } from '../../../packages/address-book/address-book/fantom/platforms/solidly';

const INIT_DELAY = 0 * 60 * 1000;
const REFRESH_INTERVAL = 5 * 60 * 1000;

// FIXME: if this list grows too big we might hit the ratelimit on initialization everytime
// Implement in case of emergency -> https://github.com/beefyfinance/beefy-api/issues/103
const pools = [
  ...solidlyPools,
  ...wigoPools,
  ...creditumPools,
  ...sushiFtmPools,
  ...oxdaoPools,
  ...t2ombLpPools,
  ...popsicleFantomPools,
  ...geistPools,
  ...spiritPools,
  ...tombPools,
  ...spookyPools,
];

const coinGeckoCoins = [
  'stasis-eurs',
  'tether-eurt',
  'par-stablecoin',
  'jarvis-synthetic-euro',
  'jpyc',
  'cad-coin',
];

const knownPrices = {
  BUSD: 1,
  USDT: 1,
  HUSD: 1,
  DAI: 1,
  USDC: 1,
  UST: 1,
  USDN: 1,
  cUSD: 1,
  asUSDC: 1,
};

let tokenPricesCache: Promise<any>;
let lpPricesCache: Promise<any>;

const updateAmmPrices = async () => {
  console.log('> updating amm prices');
  try {
    const coinGeckoPrices = fetchCoinGeckoPrices(coinGeckoCoins);
    const ammPrices = fetchAmmPrices(pools, knownPrices);

    const xPrices = ammPrices.then(async pools => {
      return await fetchXPrices(pools.tokenPrices);
    });

    const tokenPrices = ammPrices.then(async ({ _, tokenPrices }) => {
      const xTokenPrices = await xPrices;
      return {
        ...tokenPrices,
        ...xTokenPrices,
        ...(await coinGeckoPrices),
      };
    });

    const lpPrices = ammPrices.then(async ({ poolPrices, _ }) => {
      const nonAmmPrices = await getNonAmmPrices(await tokenPrices);
      return { ...poolPrices, ...nonAmmPrices };
    });

    await tokenPrices;
    await lpPrices;

    tokenPricesCache = tokenPrices;
    lpPricesCache = lpPrices;

    return {
      tokenPrices,
      lpPrices,
    };
  } catch (err) {
    console.error(err);
  } finally {
    setTimeout(updateAmmPrices, REFRESH_INTERVAL);
    console.log('> updated amm prices');
  }
};

export const getAmmTokensPrices = async () => {
  return await tokenPricesCache;
};

export const getAmmLpPrices = async () => {
  return await lpPricesCache;
};

export const getAmmTokenPrice = async tokenSymbol => {
  const tokenPrices = await getAmmTokensPrices();
  if (tokenPrices.hasOwnProperty(tokenSymbol)) {
    return tokenPrices[tokenSymbol];
  }
  console.error(`Unknown token '${tokenSymbol}'. Consider adding it to .json file`);
};

export const getAmmLpPrice = async lpName => {
  const lpPrices = await getAmmLpPrices();
  if (lpPrices.hasOwnProperty(lpName)) {
    return lpPrices[lpName];
  }
  console.error(`Unknown liquidity pair '${lpName}'. Consider adding it to .json file`);
};

const init =
  // Flexible delayed initialization used to work around ratelimits
  new Promise((resolve, reject) => {
    setTimeout(resolve, INIT_DELAY);
  }).then(updateAmmPrices);

tokenPricesCache = init.then(({ tokenPrices, lpPrices }) => tokenPrices);
lpPricesCache = init.then(({ tokenPrices, lpPrices }) => lpPrices);
