const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString
} = require('graphql')

const UserType = require('../Types/User');
const mssqlOps = require('../database/mssqlOperations')
const AddContestMutation = require('../Types/AddContestType')


const RootQueryType = new GraphQLObjectType({
    name : 'RootQueryType',

    fields : {
        me : {
            type : UserType,
            description : 'The Current User',
            args : {
                key : {type : GraphQLNonNull(GraphQLString)}
            },
            resolve :  (obj,args,{loaders} ) => {
                //let output = {};
                //  return mssqlOps.getUser(args.key).then(result => {
                //     return {
                //         id : result.recordset[0].id,
                //         email : result.recordset[0].email
                //     }
                //  })
                return loaders.usersByApiKeys.load(args.key);
            }
        }
    }
})

const RootMutationType = new GraphQLObjectType({
    name : 'RootMutationType',

    fields : () => ({
        AddContest : AddContestMutation,
        //AddName : AddNameMutation
    })
})

module.exports = new GraphQLSchema({
    query : RootQueryType,
    mutation : RootMutationType
})