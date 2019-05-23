'use strict';


import graphql from 'graphql';
import Schema from '../graphql/schema';

export function runGraphQL(event, cb) {

  let query = event.query;

  if (event.query && event.query.hasOwnProperty('query')) {
    query = event.query.query.replace("\n", ' ', "g");
  }

  graphql(Schema, query).then(function(result) {
    return cb(null, result);
  });

}