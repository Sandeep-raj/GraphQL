const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} = require('graphql');
const ContestType = require('./ContestType')
const mssqlOps = require('../database/mssqlOperations')
const mongoOps = require('../database/mongoOperations')
//const { forSnakeCase } = require('../lib/util')
const Activity = require('../Types/Activity')

module.exports =  new GraphQLObjectType({
    name : 'UserType',
    fields : {
        id : { type : GraphQLID },
        email : {type : new GraphQLNonNull(GraphQLString)},
        // apikey : {type : new  GraphQLNonNull(GraphQLString),
        //           resolve: obj => obj.api_key },  Handeled here
        // firstName : forSnakeCase(GraphQLString),   Handeled in Uitls
        // lastName : forSnakeCase(GraphQLString),
        // createdAt : forSnakeCase(GraphQLString)
        apiKey : {type : new  GraphQLNonNull(GraphQLString)}, // Handeled in DAL
        firstName : {type : GraphQLString},
        lastName : {type : GraphQLString},
        createdAt : {type : GraphQLString},
        contests : {
            type : GraphQLList(ContestType),
            resolve : (obj,args,{loaders}) => {
                return loaders.contests.load(obj.id)
            }
        },
        contestsCount : {
            type : GraphQLInt,
            resolve : (obj,args,{loaders},{fieldName}) => {
                return loaders.countsByUserIds.load(obj.id).then(result => {
                    return result[fieldName];
                });
            }
        },
        namesCount : {
            type : GraphQLInt,
            resolve : (obj,args,{loaders},{fieldName}) => {
                //return mongoOps.getCount(obj.id,fieldName);
                return loaders.countsByUserIds.load(obj.id).then(result => {
                    return result[fieldName];
                });
            }
        },
        votesCount : {
            type : GraphQLInt,
            resolve : (obj,args,{loaders},{fieldName}) => {
                //return mongoOps.getCount(obj.id,fieldName);
                return loaders.countsByUserIds.load(obj.id).then(result => {
                    return result[fieldName];
                });
            }
        },
        activities : {
            type : new GraphQLList(Activity),
            resolve : (obj,args,{loaders}) => {
                return loaders.activitiesForUserIds.load(obj.id)
            }
        }
    }
});