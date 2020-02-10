const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql')

const mssqlOps = require('../database/mssqlOperations')
const VotesType = require('../Types/Votes')

module.exports = new GraphQLObjectType({
    name : 'NameType',
    fields : () => {
        const UserType = require('./User')
        return {
            id : {type: GraphQLID},
            contestId : {type : new GraphQLNonNull(GraphQLString) },
            label : {type : new GraphQLNonNull(GraphQLString) },
            normalizedLabel : {type : new GraphQLNonNull(GraphQLString) },
            description : {type : GraphQLString },
            createdAt : {type : new GraphQLNonNull(GraphQLString) },
            createdBy : { type : new GraphQLNonNull(UserType),
                resolve : (obj,args,{loaders}) => {
                    return loaders.usersByIds.load(obj.createdBy);
                }
            },
            totalVotes : {
                type : VotesType,
                resolve : (obj,args,{loaders}) => {
                    return loaders.votesByIds.load(obj.id);
                }
            }
        }
    } 
})