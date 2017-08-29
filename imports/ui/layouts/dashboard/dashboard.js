//meteor core
import { Meteor } from 'meteor/meteor';

//react core
import React, { Component } from 'react';
import { render } from 'react-dom';
import { createContainer } from 'react-meteor-data';

import './less/AdminLTE/AdminLTE.less';
import './less/bootstrap/bootstrap.less';
import './less/ionicons/ionicons.less';
import './less/AdminLTE/skins/skin-blue.less';

//import './js/jquery-ui.min.js';
import './js/bootstrap.min.js';
import './js/jquery.slimscroll.min.js';
import './js/adminlte.min.js';

class DashboardLayout extends Component {
  componentDidMount() {
    //$.widget.bridge('uibutton', $.ui.button);
  }

  render() {
    return (
      <div className="wrapper">
        {this.props.header}

        {this.props.aside}

        <div className="content-wrapper">
          {this.props.path}

          <section className="content">
            {this.props.main}
          </section>
        </div>

        {this.props.footer}
      </div>
    );
  }
}

export default createContainer(() => {
  return {};
}, DashboardLayout);
