import SimpleSchema from 'simpl-schema';

export const MarketCap = new Mongo.Collection('market_cap');

MarketCap.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc) {
    return true;
  },
  remove: function(userId, doc) {
    return !!userId;
  }
});

const Schemas = {};
Schemas.MarketCap = new SimpleSchema({
  coinId: {
    type: String,
    label: 'Coind Id'
  },
  priceUsd: {
    type: Number,
    label: 'Price Usd'
  },
  priceBTC: {
    type: Number,
    label: 'Price Btc'
  },
  '24hVolumeUsd': {
    type: Number,
    label: '24h volume usd'
  },
  marketCapUsd: {
    type: Number,
    label: 'Market Cap Usd'
  },
  availableSupply: {
    type: Number,
    label: 'Available Supply'
  },
  totalSupply: {
    type: Number,
    label: 'Total Supply'
  },
  percentChange1h: {
    type: Number,
    label: 'Percent Change 1h'
  },
  percentChange24h: {
    type: Number,
    label: 'Percent Change 24h'
  },
  percentChange7d: {
    type: Number,
    label: 'Percent Change 7d'
  },
  lastUpdated: {
    type: Date,
    label: 'Last Updated'
  }
});
