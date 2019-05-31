'use strict';


import express from 'express';
import graphqlHTTP from 'express-graphql';
import { graphqlUploadExpress } from 'graphql-upload';
import Schema from '../graphql/schema';

const router = express.Router();

router.use(
    "/", 
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }),
    graphqlHTTP({
        schema: Schema
}));

export default router;