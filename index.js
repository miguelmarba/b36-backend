require('dotenv').config();

const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./src/resolvers');
const AuthDirective = require('./src/resolvers/Directives/AuthDirectives');
const verifyToken = require('./src/utils/verifyToken');

const mongoose = require('mongoose');

const MONGO_URI = process.env.NODE_ENV === 'test' ?
process.env.MONGO_TEST_URL : process.env.MONGO_URL;

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const mongo = mongoose.connection;

mongo.on('error', (error) => console.log(error))
    .once('open', () => console.log('Connected to database'));

const typeDefs = importSchema(__dirname + '/schema.graphql');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
        AuthDirective,
    }
});

const server  = new GraphQLServer({
    schema, 
    context: async (contextParams) => ({
        ...contextParams,
        user: contextParams.request ? await verifyToken(contextParams.request): {},
    }),
});

// root, context, params, info

// Para definir un puerto, cuando el puerto 4000 esté ocupado
// const port = process.env.PORT || 4001;
// server.start(({ port }) => console.log(`It works! in port ${port}`));

server.start(() => console.log('It works!'));