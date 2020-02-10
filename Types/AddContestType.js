const {
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql')
const contestType = require('./ContestType')

const ContestInputType = new GraphQLInputObjectType({
    name : 'ContestInputType',
    fields : {
        apiKey : {type : new GraphQLNonNull(GraphQLString)},
        title: {type : new GraphQLNonNull(GraphQLString)},
        description : {type : GraphQLString}
    }
});

module.exports = {
    type : contestType,
    args : {
        input : {type : new GraphQLNonNull(ContestInputType)}
    },
    resolve : (obj,{input},{msdb}) => {
        return msdb.insertContest(input);
    }
}