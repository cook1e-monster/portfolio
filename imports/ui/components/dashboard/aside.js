//meteor core
import { Meteor } from 'meteor/meteor';

//react core
import React, { Component } from 'react';
import { render } from 'react-dom';
import { createContainer } from 'react-meteor-data';
import { FlowHelpers } from '/imports/api/utils/client/utils.js';

import { Coins } from '/imports/api/coins/collection.js';
import Autocomplete from '../autocomplete/autocomplete.js';

class DashboardHeader extends Component {
  componentDidMount() {}

  onSubmit(event) {
    event.preventDefault();
    const coinId = event.target.autocomplete.dataset.id;
    Meteor.call('coins.addCoin', { coinId }, (error, response) => {
      console.log(error, response);
    });
  }

  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <ul className="sidebar-menu" data-widget="tree">
            <li className="header">MAIN NAVIGATION</li>

            <li>
              <form className="sidebar-form" onSubmit={this.onSubmit} ref="addCoin">
                <Autocomplete list={this.props.coins} onClick={this.onSubmit} />
              </form>
            </li>

            <li className="active treeview">
              <a href="#">
                <i className="fa fa-dashboard" />
                <span>Coins</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right" />
                </span>
              </a>
              <ul className="treeview-menu">
                <li className="active">
                  <a href="index.html">
                    <i className="fa fa-circle-o" />
                    coin 1
                  </a>
                </li>
                <li>
                  <a href={FlowHelpers.pathFor('addCoin')}>
                    <i className="fa fa-circle-o" />
                    Add Coin
                  </a>
                </li>
              </ul>
            </li>
            <li className="treeview">
              <a href="#">
                <i className="fa fa-files-o" />
                <span>Layout Options</span>
                <span className="pull-right-container">
                  <span className="label label-primary pull-right">4</span>
                </span>
              </a>
              <ul className="treeview-menu">
                <li>
                  <a href="pages/layout/top-nav.html">
                    <i className="fa fa-circle-o" />
                    Top Navigation
                  </a>
                </li>
                <li>
                  <a href="pages/layout/boxed.html">
                    <i className="fa fa-circle-o" />
                    Boxed
                  </a>
                </li>
                <li>
                  <a href="pages/layout/fixed.html">
                    <i className="fa fa-circle-o" />
                    Fixed
                  </a>
                </li>
                <li>
                  <a href="pages/layout/collapsed-sidebar.html">
                    <i className="fa fa-circle-o" />
                    Collapsed Sidebar
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </aside>
    );
  }
}

export default createContainer(() => {
  const userCoinsHandle = Meteor.subscribe('userCoins');
  const loading = !userCoinsHandle.ready();
  const coins = Coins.find().fetch();

  return {
    userCoinsHandle,
    loading,
    coins
  };
}, DashboardHeader);
