import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

//homepage
import HomePage from '/imports/ui/layouts/homepage/homepage.js';
import Login from '/imports/ui/components/account-ui/login.js';
import Register from '/imports/ui/components/account-ui/register.js';

//dashboard
import DashboardHeader from '/imports/ui/components/dashboard/header.js';
import DashboardAside from '/imports/ui/components/dashboard/aside.js';
import DashboardFooter from '/imports/ui/components/dashboard/footer.js';
import DashboarPath from '/imports/ui/components/dashboard/path.js';
import DashboardLayout from '/imports/ui/layouts/dashboard/dashboard.js';

//coins
import Form from '/imports/ui/components/addCoin/form.js';

cleanBodyClass = function() {
  return $('body').addClass('sidebar-mini skin-blue fixed');
};

//flow router groups
const loggedIn = FlowRouter.group({});
const appRoutes = loggedIn.group({
  name: 'app',
  prefix: '/app',
  triggersEnter: [cleanBodyClass]
});

FlowRouter.route('/', {
  name: 'homepage',
  action: function() {
    return mount(HomePage, {
      account: <Login />
    });
  }
});

FlowRouter.route('/signIn', {
  name: 'login',
  action: function() {
    return mount(HomePage, {
      account: <Login />
    });
  }
});

FlowRouter.route('/signUp', {
  name: 'register',
  action: function() {
    return mount(HomePage, {
      account: <Register />
    });
  }
});

appRoutes.route('/', {
  triggersEnter: [cleanBodyClass],
  name: 'dashboard',
  action: function() {
    return mount(DashboardLayout, {
      header: <DashboardHeader />,
      aside: <DashboardAside />,
      path: <DashboarPath />,
      main: <Form />,
      footer: <DashboardFooter />
    });
  }
});

appRoutes.route('/add-coin', {
  triggersEnter: [cleanBodyClass],
  name: 'addCoin',
  action: function() {
    return mount(DashboardLayout, {
      header: <DashboardHeader />,
      aside: <DashboardAside />,
      path: <DashboarPath />,
      main: <Form />,
      footer: <DashboardFooter />
    });
  }
});
