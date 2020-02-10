const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} = require('graphql');

module.exports = new GraphQLObjectType({
    name : 'VotesType',
    fields : {
        nameId : {type : GraphQLInt},
        upVote : {type : GraphQLInt},
        downVote : {type : GraphQLInt}
    }
})