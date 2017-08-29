//react core
import React, { Component } from 'react';
import { render } from 'react-dom';
import { createContainer } from 'react-meteor-data';
import AutocompleteItem from './autoCompleteItem.js';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);

    this.state = {
      items: []
    };
  }

  _onChange() {
    this._setValueFromInput();
  }

  _setValueFromInput() {
    if (this.refs.input.value == '' || !this.props.list) {
      return [];
    }

    var inputText = this.refs.input.value.toLowerCase();

    var items = _.filter(this.props.list, function(item) {
      let byName = item.name.toLowerCase().indexOf(inputText) >= 0;
      if (byName) {
        return byName;
      } else {
        return item.symbol.toLowerCase().indexOf(inputText) >= 0;
      }
    });

    this.setState({
      items: items
    });
  }

  _setValues(item) {
    this.refs.input.value = item.value;
    this.refs.input.dataset.id = item.id;

    this.setState({
      items: []
    });
  }

  _renderList() {
    if (this.state && this.state.items) {
      return this.state.items.map(item => {
        return <AutocompleteItem key={item._id} value={item.name} getValues={() => this._setValues({ id: item._id, value: item.name })} />;
      });
    }
  }

  render() {
    return (
      <div>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Add Coin" name="autocomplete" ref="input" onChange={this._onChange} />
          <span className="input-group-btn">
            <button name="addCoin" id="addCoin-btn" className="btn btn-flat">
              <i className="fa fa-plus" />
            </button>
          </span>
        </div>
        <div>
          <ul>
            {this._renderList()}
          </ul>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  return {};
}, Autocomplete);
