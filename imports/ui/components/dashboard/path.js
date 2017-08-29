//meteor core
import { Meteor } from 'meteor/meteor';

//react core
import React, { Component } from 'react';
import { render } from 'react-dom';
import { createContainer } from 'react-meteor-data';

var createReactClass = require('create-react-class');

class DashboarPath extends Component {
  componentDidMount() {}

  render() {
    return (
      <section className="content-header">
        <h1>
          Dashboard <small>Control panel</small>
        </h1>
        <ol className="breadcrumb">
          <li>
            <a href="#">
              <i className="fa fa-dashboard" /> Home
            </a>
          </li>
          <li className="active">Dashboard</li>
        </ol>
      </section>
    );
  }
}

export default createContainer(() => {
  return {};
}, DashboarPath);
