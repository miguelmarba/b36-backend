const AuthorResolver = require('./AuthorResolvers');
const PostResolver = require('./PostResolvers');
const { EmailAddresResolver, URLResolver} = require('graphql-scalars');

module.exports = {
    EmailAddres: EmailAddresResolver,
    URL: URLResolver,
    Query:{
        ...AuthorResolver.Query,
        ...PostResolver.Query,
    },
    Mutation:{
        ...AuthorResolver.Mutation,
        ...PostResolver.Mutation
    }
};