module.exports = (function() {
  import request from 'request';

  function CoinMarketCapApi() {
    return;
  }

  CoinMarketCapApi.prototype = {
    constructor: CoinMarketCapApi,

    _request: function(url, method = 'GET', callback) {
      const options = {
        method: method,
        url: url,
        gzip: true,
        rejectUnauthorized: false,
        followAllRedirects: true,
        headers: {
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.5',
          Connection: 'keep-alive',
          Host: 'api.coinmarketcap.com',
          Referer: 'https://coinmarketcap.com/api/',
          'Upgrade-Insecure-Requests': 1,
          'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:54.0) Gecko/20100101 Firefox/54.0'
        }
      };

      return new Promise((resolve, reject) => {
        request(options, function(error, response, body) {
          let err = error;

          if (!err && response.statusCode !== 200) {
            let errMsg = `CoinMarketCapApi error ${response.statusCode}: ${response.statusMessage}`;
            if (typeof response.body === 'object' && response.body.hasOwnProperty('error')) {
              errMsg = `${errMsg}. ${response.body.error}`;
            }

            err = new Error(errMsg);
          }

          if (!err && (typeof response.body === 'undefined' || response.body === null)) {
            err = new Error('CoinMarketCapApi error: Empty response');
          }

          if (!err && body.error) {
            err = new Error(body.error);
          }

          if (err) {
            reject(err);
          } else {
            resolve(body);
          }
        });
      });
    },

    getTicker: function(limit, callback) {
      var url = 'https://api.coinmarketcap.com/v1/ticker/';

      if (limit) url += '?limit=' + limit;

      return this._request(url, 'GET', callback);
    }
  };

  return CoinMarketCapApi;
})();
