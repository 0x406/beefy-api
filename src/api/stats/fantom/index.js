const getSpookyLpApys = require('./getSpookyLpApys');
const getSpookyBooApy = require('./getSpookyBooApy');
const getTombApys = require('./getTombApys');
const getSpiritApys = require('./getSpiritApys');
const getScreamApys = require('./getScreamApys');
const getSpellApys = require('./getSpellApys');
const getfBeetsApy = require('./getfBeetsApy');
const getPopsicleApys = require('./getPopsicleApys');
const get2ombApys = require('./get2ombApys');
const get0xdaoApys = require('./get0xdaoApys');
const getCreditumApys = require('./getCreditumApys');
const getWigoApys = require('./getWigoApys');

const getApys = [
  getSpookyLpApys,
  getSpookyBooApy,
  getTombApys,
  getSpiritApys,
  getScreamApys,
  getSpellApys,
  getfBeetsApy,
  getPopsicleApys,
  get2ombApys,
  get0xdaoApys,
  getCreditumApys,
  getWigoApys,
];

const getFantomApys = async () => {
  let apys = {};
  let apyBreakdowns = {};

  let promises = [];
  getApys.forEach(getApy => promises.push(getApy()));
  const results = await Promise.allSettled(promises);

  for (const result of results) {
    if (result.status !== 'fulfilled') {
      console.warn('getFantomApys error', result.reason);
      continue;
    }

    // Set default APY values
    let mappedApyValues = result.value;
    let mappedApyBreakdownValues = {};

    // Loop through key values and move default breakdown format
    // To require totalApy key
    for (const [key, value] of Object.entries(result.value)) {
      mappedApyBreakdownValues[key] = {
        totalApy: value,
      };
    }

    // Break out to apy and breakdowns if possible
    let hasApyBreakdowns = 'apyBreakdowns' in result.value;
    if (hasApyBreakdowns) {
      mappedApyValues = result.value.apys;
      mappedApyBreakdownValues = result.value.apyBreakdowns;
    }

    apys = { ...apys, ...mappedApyValues };

    apyBreakdowns = { ...apyBreakdowns, ...mappedApyBreakdownValues };
  }

  return {
    apys,
    apyBreakdowns,
  };
};

module.exports = { getFantomApys };
