const AuthorResolver = require('./AuthorResolvers');
const PostResolver = require('./PostResolvers');
const { EmailAddresResolver} = require('graphql-scalars');

module.exports = {
    EmailAddres: EmailAddresResolver
    Query:{
        ...AuthorResolver.Query,
        ...PostResolver.Query,
    },
    Mutation:{
        ...AuthorResolver.Mutation,
        ...PostResolver.Mutation
    }
};