const EmployeeResolver = require('./EmployeeResolver');
const AuthorResolver = require('./AuthorResolvers');
const PostResolver = require('./PostResolvers');
const ContactResolver = require('./ContactResolvers');
const TaskResolver = require('./TaskResolvers');
const { EmailAddressResolver, URLResolver} = require('graphql-scalars');

module.exports = {
    EmailAddress: EmailAddressResolver,
    URL: URLResolver,
    Query:{
        ...EmployeeResolver.Query,
        ...AuthorResolver.Query,
        ...PostResolver.Query,
        ...ContactResolver.Query,
        ...TaskResolver.Query,
    },
    Mutation:{
        ...EmployeeResolver.Mutation,
        ...AuthorResolver.Mutation,
        ...PostResolver.Mutation,
        ...ContactResolver.Mutation,
        ...TaskResolver.Mutation
    }
};