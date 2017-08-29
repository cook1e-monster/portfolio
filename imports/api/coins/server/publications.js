import { Meteor } from 'meteor/meteor';
import { Coins } from '../collection.js';

Meteor.publish('allCoins', function() {
  return Coins.find({ inPoloniex: true }, { fields: { name: 1, slug: 1, symbol: 1 } });
});
