//meteor core
import { Meteor } from 'meteor/meteor';

//react core
import React, { Component } from 'react';
import { render } from 'react-dom';
import { createContainer } from 'react-meteor-data';

var createReactClass = require('create-react-class');

class DashboardHeader extends Component {
  componentDidMount() {}

  render() {
    return (
      <footer className="main-footer">
        <div className="pull-right hidden-xs">
          <b>Version</b> 2.4.0
        </div>
        <strong>Copyright &copy; 2014-2016 <a href="https://adminlte.io">Almsaeed Studio</a>.</strong> All rights reserved.
      </footer>
    );
  }
}

export default createContainer(() => {
  return {};
}, DashboardHeader);
