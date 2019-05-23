'use strict';

import { SetUpDBSchema } from './core/lib/faunadb';
import express from 'express';
import serverless from 'serverless-http';
import routes from './core/routes';

const app = express();

for(let route in routes) {
    app.use("/.netlify/functions/index/" + route, routes[route]);
}

module.exports = app;
module.exports.handler = serverless(app);