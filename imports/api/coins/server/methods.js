import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Coins } from '../collection.js';

new ValidatedMethod({
  name: 'coins.addCoin', // DDP method name
  validate: new SimpleSchema({
    coinId: { type: String }
  }).validator(),

  run: function({ coinId }) {
    console.log('call coins.addCoin: ', { coinId });

    if (!Meteor.userId()) {
      throw new Meteor.Error(500, 'User not found');
    }

    const coin = Coins.findOne({ _id: coinId }, { fields: { _id: 1 } });
    if (!coin) {
      throw new Meteor.Error(500, 'Coin not found');
    }

    Meteor.users.update(Meteor.userId(), {
      $addToSet: {
        coins: coin._id
      }
    });

    return;
  }
});
