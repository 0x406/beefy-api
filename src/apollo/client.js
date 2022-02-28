const fetch = require('node-fetch');
const createHttpLink = require('apollo-link-http').createHttpLink;
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import ApolloLinkTimeout from 'apollo-link-timeout';

const APOLLO_TIMEOUT = process.env.APOLLO_TIMEOUT || 30_000;
const timeoutLink = new ApolloLinkTimeout(APOLLO_TIMEOUT);

function client(url) {
  const httpLink = createHttpLink({ uri: url, fetch });
  const timeoutHttpLink = timeoutLink.concat(httpLink);
  return new ApolloClient({
    link: timeoutHttpLink,
    cache: new InMemoryCache(),
  });
}

const sushiFantomClient = client(
  'https://api.thegraph.com/subgraphs/name/sushiswap/fantom-exchange'
);
const spookyClient = client(
  'https://api.thegraph.com/subgraphs/name/eerieeight/spooky-swap-exchange'
);
const spiritClient = client(
  'https://api.thegraph.com/subgraphs/name/layer3org/spiritswap-analytics'
);

const beetClient = client('https://graph-node.beets-ftm-node.com/subgraphs/name/beethovenx');

const isSushiClient = client => {
  return client === sushiFantomClient;
};

const isBeetClient = client => {
  return client === beetClient;
};

module.exports = {
  sushiFantomClient,
  isSushiClient,
  spookyClient,
  spiritClient,
  beetClient,
  isBeetClient,
};
