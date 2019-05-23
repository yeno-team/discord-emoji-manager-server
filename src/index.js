'use strict';

const { SetUpDBSchema } = require('./core/lib/faunadb'),
      express = require('express'),
      serverless = require('serverless-http'),
      routes = require('./core/routes');

const app = express();

for(let route in routes) {
    app.use("/.netlify/functions/index/" + route, routes[route]);
}

module.exports = app;
module.exports.handler = serverless(app);