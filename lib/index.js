const { graphql } = require('graphql')
const app = require('express')()
const GraphQLHTTP = require('express-graphql')
const Schema = require('../Schema/schema')
const mssql = require('mssql')
const config = require('../config/ms_sql.json')
const dataloader = require('dataloader');
const mssqlOps = require('../database/mssqlOperations')
const { MongoClient } = require('mongodb')
const {nodeEnv} = require('./util')
const dbConfig = require('../config/mongo')[nodeEnv]
const mongoOps = require('../database/mongoOperations');

mssql.connect(config).then(ctx => {
    
    MongoClient.connect(dbConfig.url).then(pool => {
        const msdb = mssqlOps(ctx);
        const mdb = mongoOps(pool);
        app.use('/graphql', (req, res) => {

            const loaders = {
                usersByApiKeys : new dataloader(msdb.getUsersByApiKeys),
                contests : new dataloader(msdb.getContests),
                usersByIds : new dataloader(msdb.getUsersByIds),
                namesByContestIds : new dataloader(msdb.getNamesByContestIds),
                countsByUserIds : new dataloader(mdb.getCountsByUserIds),
                votesByIds : new dataloader(msdb.getVotesByIds),
                activitiesForUserIds : new dataloader(msdb.getActivitiesForUserIds)
            }
    
            GraphQLHTTP({
                schema: Schema,
                graphiql: true,
                context: {msdb,mdb,loaders}
            })(req, res);
        })
    })
})

app.listen(3000, () => {
    console.log('Server Started');
})