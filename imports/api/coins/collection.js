import SimpleSchema from 'simpl-schema';

export const Coins = new Mongo.Collection('coins');

const Schemas = {};

Schemas.Coin = new SimpleSchema({
  name: {
    type: String,
    label: 'Coin Name'
  },
  slug: {
    type: String,
    label: 'Slug'
  },
  symbol: {
    type: String,
    label: 'Symbol',
    optional: true
  },
  marketCapUsd: {
    type: Number,
    label: 'Market Cap Usd',
    optional: true
  },
  createdAt: {
    type: Date,
    label: 'Created At',
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  percentChange7d: {
    type: String,
    label: 'Percent Change 7d',
    optional: true
  },
  lastUpdated: {
    type: Date,
    label: 'Last Updated',
    optional: true
  },

  inPoloniex: {
    type: Boolean,
    label: 'In poloniex',
    defaultValue: false
  },

  poloniex: {
    type: Object,
    optional: true,
    blackbox: true
  }
});

Coins.allow({
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

Coins.attachSchema(Schemas.Coin);
