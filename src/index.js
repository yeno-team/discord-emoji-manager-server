require('dotenv').config()

const Schema = require('./core/graphql/schema'),
      { SetUpDBSchema } = require('./core/lib/faunadb'),
      SetupDB = SetUpDBSchema,
      express = require('express'),
      graphqlHTTP = require('express-graphql');

const app = express();

app.use("/graphql", graphqlHTTP({
    schema: Schema
}));

app.listen(process.env.PORT || 4000);