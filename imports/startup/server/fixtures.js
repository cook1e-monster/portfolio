// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { getAllCoins } from '/imports/api/marketCap/server/functions.js';
import { Coins } from '/imports/api/coins/collection.js';

Meteor.startup(() => {
  if (!Coins.findOne()) {
    getAllCoins();
  }
});
