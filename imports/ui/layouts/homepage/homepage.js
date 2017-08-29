//meteor core
import { Meteor } from 'meteor/meteor';

//react core
import React, { Component } from 'react';
import { render } from 'react-dom';
import { createContainer } from 'react-meteor-data';

class HomePage extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>homePage</h1>
        {this.props.account}
      </div>
    );
  }
}

export default createContainer(() => {
  return {};
}, HomePage);
