const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql')
const ContestEnumType = require('./ContestEnumType')
const NameType = require('./Name')
const mssqlOps = require('../database/mssqlOperations')

module.exports = new GraphQLObjectType({
    name : 'ContestType',
    fields : {
        id : { type : GraphQLID },
        code : {type : new GraphQLNonNull(GraphQLString)},
        title : {type : new GraphQLNonNull(GraphQLString)},
        description : {type : GraphQLString},
        status :{type : new GraphQLNonNull(ContestEnumType)},
        createdAt : {type : new GraphQLNonNull(GraphQLString)},

        names : {
            type : GraphQLList(NameType),
            resolve : (obj,args,{loaders}) => {
                return loaders.namesByContestIds.load(obj.id)
            }
        }
    }
})