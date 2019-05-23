'use strict';


import express from 'express';
import graphqlHTTP from 'express-graphql';
import Schema from '../graphql/schema';

const router = express.Router();

router.use("/", graphqlHTTP({
    schema: Schema
}));

export default router;