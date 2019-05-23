'use strict';

const express = require('express'),
      graphqlHTTP = require('express-graphql'),
      Schema = require('../graphql/schema');

const router = express.Router();

router.use("/", graphqlHTTP({
    schema: Schema
}));

module.exports = router;