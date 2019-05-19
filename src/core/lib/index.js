'use strict';

const { graphql } = require('graphql');
       Schema = require('../graphql/schema');

module.exports.runGraphQL = function(event, cb) {

  let query = event.query;

  if (event.query && event.query.hasOwnProperty('query')) {
    query = event.query.query.replace("\n", ' ', "g");
  }

  graphql(Schema, query).then(function(result) {
    return cb(null, result);
  });

}