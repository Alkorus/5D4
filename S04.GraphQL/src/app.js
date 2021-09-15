import cors from 'cors';
import express from 'express';

import { graphqlHTTP } from 'express-graphql';

import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';

import database from './libs/database.js'
import errors from './middlewares/errors.js';

import accountRoutes from './routes/account.routes.js';

const app = express();

database();

app.use(cors());
app.use(express.json());

app.get('/status', (req, res) => { res.status(200).end(); });
app.head('/status', (req, res) => { res.status(200).end(); });

app.use('/accounts', accountRoutes);

//GraphQL
import resolvers from './graphql/twitter.resolvers.js';

const graphqlSchema = loadSchemaSync('./src/graphql/twitter.graphql', {
    loaders:[new GraphQLFileLoader()]
});

const schemaWithResolvers = addResolversToSchema({
    schema: graphqlSchema,
    resolvers: resolvers
});
app.use('/graphql', graphqlHTTP({
    schema:schemaWithResolvers,
    graphiql:true
}))

app.use(errors);

export default app;