'use strict';

const Schema = require('./core/graphql/schema'),
      { SetUpDBSchema } = require('./core/lib/faunadb'),
      SetupDB = SetUpDBSchema,
      express = require('express'),
      graphqlHTTP = require('express-graphql'),
      serverless = require('serverless-http');

const app = express();

app.use("/.netlify/functions/server/graphql", graphqlHTTP({
    schema: Schema
}));

module.exports = app;
module.exports.handler = serverless(app);