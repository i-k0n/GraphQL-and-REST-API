import express from 'express'
import { graphqlHTTP } from 'express-graphql';

import schema from './schema'
const app = express()

app.use(
  '/graphiql',
  graphqlHTTP(() => {
    return {
      schema,
      graphiql: true,
    };
  }),
);

app.listen(
  5000,
  () => console.log('GraphQL Server running at http://localhost:5000')
  )