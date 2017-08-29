//meteor core
import { Meteor } from 'meteor/meteor';

//react core
import React, { Component } from 'react';
import { render } from 'react-dom';
import { createContainer } from 'react-meteor-data';
import { FlowHelpers } from '/imports/api/utils/client/utils.js';

import { Coins } from '/imports/api/coins/collection.js';

import Autocomplete from '../autocomplete/autocomplete.js';

class Form extends Component {
  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="box box-solid box-primary">
          <div className="box-header">
            <h3 className="box-title">Add Coin</h3>
          </div>
          <div className="box-body">
            <Autocomplete list={this.props.coins} />
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  const coinsHandle = Meteor.subscribe('allCoins');
  const loading = !coinsHandle.ready();
  const coins = Coins.find().fetch();

  return {
    coinsHandle,
    loading,
    coins
  };
}, Form);
