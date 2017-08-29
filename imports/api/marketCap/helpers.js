import { MarketCap } from "./collection.js"
import { check } from "meteor/check"

export function updateOrMarketCap({ marketCapId = null, marketCapObject, type = '$set' }, callback ){

  if( !marketCapId ){
    check( marketCapObject.lastUpdated, Date )

    //check per date
    const marketCap = MarketCap.findOne({ lastUpdated: marketCapObject.lastUpdated}, { fields: { _id: 1 } });

    if( marketCap )
      marketCapId = marketCap._id;
  };



  if( marketCapId ) {
    let objectToUpdate = {};
    objectToUpdate[type] = marketCapObject;
    MarketCap.update({ _id: marketCapId }, objectToUpdate );
  } else {
    marketCapId = MarketCap.insert( marketCapObject )
  }

  if( typeof(callback) == 'function' )
    callback( marketCapId )
  else
    return marketCapId;
}
