'use strict';
var _ = require('lodash');

var bslash = /\\/g;
var trailer = /\(\?=\/\|\$\)|\$/g;
var slash = /\/\?/g;
var leader = /\/\(\?:\(\[\^\/\]\+\?\)\)/g;

function stripPath(path) {
  return path.slice(3,-2)
    .replace(bslash,'')
    .replace(trailer,'')
    .replace(slash,'')
    .replace(leader,'') || '/';
}

function parseRoute(route) {
  var data = {};
  data[route.path] = {
    methods: route.methods
  };
  return data;
}

function parseLayer(layer) {
  var route = {};
  var path = stripPath(layer.regexp.toString());
  var routes = parseStack(layer.handle.stack);
  if (routes['/']) {
    route[path] = routes['/'];
    delete routes['/'];
  }
  if (_.keys(routes).length) {
    var r = {};
    r[path] = {routes:routes};
    _.merge(route, r);
  }
  return route;
}

function parseStack(stack) {
  var routes = {};
  stack.forEach(function(r) {
    var route;
    if (r.route) {
      route = parseRoute(r.route);
    }
    else if (r.name === 'router') {
      route = parseLayer(r);
    }
    if (route) {
      _.merge(routes, route);
    }
  });
  return routes;
}

var reflector = function(app) {
  return parseStack(app._router.stack);
}

module.exports = reflector;
