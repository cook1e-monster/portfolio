//react core
import React, { Component } from 'react';
import { render } from 'react-dom';
import { createContainer } from 'react-meteor-data';

class AutocompleteItem extends Component {
  constructor(props) {
    super(props);
  }

  _onInputClick() {
    this.props.getValues(this);
  }

  render() {
    return (
      <li key={this.props.key} onClick={this.props.getValues}>
        {this.props.value}
      </li>
    );
  }
}

export default createContainer(() => {
  return {};
}, AutocompleteItem);
