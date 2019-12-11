const AuthorResolver = require('./AuthorResolvers');
const PostResolver = require('./PostResolvers');
const ContactResolver = require('./ContactResolvers');
const TaskResolver = require('./TaskResolvers');
const { EmailAddressResolver, URLResolver} = require('graphql-scalars');

module.exports = {
    EmailAddress: EmailAddressResolver,
    URL: URLResolver,
    Query:{
        ...AuthorResolver.Query,
        ...PostResolver.Query,
        ...ContactResolver.Query,
        ...TaskResolver.Query,
    },
    Mutation:{
        ...AuthorResolver.Mutation,
        ...PostResolver.Mutation,
        ...ContactResolver.Mutation,
        ...TaskResolver.Mutation
    }
};