import { Coins } from './collection.js';
import { check } from 'meteor/check';

export function updateOrCreateCoins({ coinId = null, coinObject, type = '$set' }, callback) {
  if (!coinId) {
    check(coinObject.slug, String);

    var search = coinObject.slug ? { slug: coinObject.slug } : { symbol: coinObject.symbol };
    const coin = Coins.findOne(search, { fields: { _id: 1, createdAt: 1 } });

    if (coin) coinId = coin._id;
  }

  if (coinId) {
    let objectToUpdate = {};
    objectToUpdate[type] = coinObject;
    Coins.update({ _id: coinId }, objectToUpdate);
  } else {
    coinId = Coins.insert(coinObject);
  }

  if (typeof callback == 'function') callback(coinId);
  else return coinId;
}
