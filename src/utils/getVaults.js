const axios = require('axios');

const { fantomPools } = require('../pools/fantom');

const getVaults = async vaultsEndpoint => {
  try {
    return fantomPools;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

module.exports = getVaults;
