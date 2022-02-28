import getBeethovenxPrices from './fantom/getBeethovenxPrices';

const getNonAmmPrices = async tokenPrices => {
  let prices = {};

  const promises = [getBeethovenxPrices(tokenPrices)];

  // Setup error logs
  promises.forEach(p => p.catch(e => console.warn('getNonAmmPrices error', e)));

  const results = await Promise.allSettled(promises);

  results
    .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
    .forEach(r => {
      Object.assign(prices, r.value);
    });

  return prices;
};

export default getNonAmmPrices;
