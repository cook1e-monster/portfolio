import { _ } from 'meteor/underscore';
import { updateOrCreateCoins } from '../../coins/helpers.js';
import { updateOrMarketCap } from '../../marketCap/helpers.js';

import CoinMarketCapApi from './coinMarketCapApi.js';
import Poloniex from 'poloniex-api-node';

export function getAllCoins() {
  const coinMarketCapApi = new CoinMarketCapApi();

  let poloniex = new Poloniex();
  let wrapperPoloniexCurrencies = Meteor.wrapAsync(poloniex.returnCurrencies, poloniex).apply();

  coinMarketCapApi
    .getTicker()
    .then(coins => {
      coins = typeof coins == 'string' ? JSON.parse(coins) : coins;

      coins.forEach(function(coin) {
        let poloniex = wrapperPoloniexCurrencies[coin.symbol];

        const coinObject = {
          name: coin.name,
          slug: coin.id,
          symbol: coin.symbol,
          marketCapUsd: coin.market_cap_usd ? Math.round(Number(coin.market_cap_usd)) : 0,
          percentChange7d: coin.percent_change_7d ? coin.percent_change_7d : 0,
          lastUpdated: new Date(Number(coin.last_updated) * 1000)
        };

        if (poloniex) {
          coinObject.poloniex = poloniex;
          coinObject.inPoloniex = true;
        }

        const coinId = updateOrCreateCoins({ coinObject });

        const marketCapObject = {
          coinId: coinId,
          priceUsd: coin.price_usd ? Number(coin.price_usd) : 0,
          priceBTC: coin.price_btc ? Number(coin.price_btc) : 0,
          '24hVolumeUsd': coin['24h_volume_usd'] ? Number(coin['24h_volume_usd']) : 0,
          marketCapUsd: coin.market_cap_usd ? Number(coin.market_cap_usd) : 0,
          availableSupply: coin.available_supply ? Number(coin.available_supply) : 0,
          totalSupply: coin.total_supply ? Number(coin.total_supply) : 0,
          percentChange1h: coin.percent_change_1h ? Number(coin.percent_change_1h) : 0,
          percentChange24h: coin.percent_change_24h ? Number(coin.percent_change_24h) : 0,
          percentChange7d: coin.percent_change_7d ? Number(coin.percent_change_7d) : 0,
          lastUpdated: new Date(Number(coin.last_updated) * 1000)
        };

        updateOrMarketCap({ marketCapObject });
      });
    })
    .catch(error => {
      console.log(error);
    });
}
