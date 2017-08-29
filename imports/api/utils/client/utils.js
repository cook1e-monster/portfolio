import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

function pathFor(path, params) {
  let query = params && params.query ? FlowRouter._qs.parse(params.query) : {};
  return FlowRouter.path(path, params, query);
}

function urlFor(path, params) {
  return Meteor.absoluteUrl(pathFor(path, params));
}

function currentRoute(route) {
  FlowRouter.watchPathChange();
  return FlowRouter.current().route.name === route ? 'active' : '';
}

export const FlowHelpers = {
  pathFor: pathFor,
  urlFor: urlFor,
  currentRoute: currentRoute
};
