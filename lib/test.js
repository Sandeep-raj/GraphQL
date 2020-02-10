const test = require('../database/mongoOperations');

const mssql = require('mssql')
const config = require('../config/ms_sql.json')

const mssqlOps = require('../database/mssqlOperations')

//console.log(test.getNamesCount(2));
mssql.connect(config).then(ctx => {
    const msdb = mssqlOps(ctx);
    msdb.insertContest({apiKey : '4242', title : 'Understanding GraphQL',description : 'Description of GraphQl'});
})