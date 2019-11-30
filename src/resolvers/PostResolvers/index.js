const PostsResolver = require('./PostResolvers')

module.exports = {
    Query:{
        ...PostsResolver.Query
    }
}