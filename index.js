require('dotenv').config();

const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./src/resolvers');
const AuthDirective = requiere('./src/')

const mongoose = require('mongoose');

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

const server  = new GraphQLServer({typeDefs, resolvers});

// Para definir un puerto, cuando el puerto 4000 esté ocupado
// const port = process.env.PORT || 4001;
// server.start(({ port }) => console.log('It works!'));

server.start(() => console.log('It works!'));