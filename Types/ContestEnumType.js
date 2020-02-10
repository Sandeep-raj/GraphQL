const {
    GraphQLEnumType,
    GraphQLObjectType
} = require('graphql')

module.exports = new GraphQLEnumType({
    name : 'ContestEnumType',
    values : {
        DRAFT : {value : 'draft'},
        PUBLISHED : {value : 'published'},
        ARCHIVED : {value : 'archived'}
    }
})