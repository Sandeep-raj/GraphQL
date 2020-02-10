//const mssql = require('mssql')
//const config = require('../config/ms_sql.json')
const humps = require('humps')
const { orderedFor } = require('../lib/util')
const sql = require('mssql');

// function connectToDB() {
//     return mssql.connect(config);
// }

module.exports = pool => {
    return {
        getUsersByApiKeys: async function (keys) {
            return await pool.request().query(`select * from users where api_key in ('${keys.join('\',\'')}')`).then(result => {
                //return humps.camelizeKeys(result.recordset);
                return orderedFor(result.recordset, keys, 'apiKey', false);
            }).catch(err => {
                console.log(err)
            })
        },
        getContests: async function (ids) {
            return await pool.request().query(`select * from contests where created_by in ('${ids.join('\',\'')}')`).then(result => {
                //return humps.camelizeKeys(result.recordset);
                return orderedFor(result.recordset, ids, 'createdBy', true);
            })
        },
        getUsersByIds: async function (ids) {
            return await pool.request().query(`select * from users where id in ('${ids.join('\',\'')}')`).then(result => {
                //return humps.camelizeKeys(result.recordset);
                return orderedFor(result.recordset, ids, 'id', false);
            })
        },
        getNamesByContestIds: async function (ids) {
            return await pool.request().query(`select * from names where contest_id in ('${ids.join('\',\'')}')`).then(result => {
                //return humps.camelizeKeys(result.recordset);
                return orderedFor(result.recordset, ids, 'contestId', true);
            })
        },
        getVotesByIds: async function (ids) {
            return await pool.request().query(`select * from total_votes_by_name where name_id in ('${ids.join('\',\'')}')`).then(result => {
                //return humps.camelizeKeys(result.recordset);
                return orderedFor(result.recordset, ids, 'nameId', false);
            })
        },
        insertContest: async function (inputs) {
            const tvp = new sql.Table() // You can optionally specify table type name in the first argument.

            // Columns must correspond with type we have created in database.
            tvp.columns.add('apiKey', sql.VarChar(50))
            tvp.columns.add('title', sql.VarChar(100))
            tvp.columns.add('description', sql.VarChar(100))
            // Add rows
            tvp.rows.add(inputs.apiKey, inputs.title, inputs.description) // Values are in same order as columns.

            const request = new sql.Request();
            request.input('inpContest', tvp);
            return await request.execute('InsertIntoContest').then(result => {
                return humps.camelizeKeys(result.recordset[0]);
            })
        },
        getActivitiesForUserIds : async function (Userids) {
            return await pool.request().query(`select created_by,created_at, '' as label, title , 'contests' as activityType from contests where created_by in ('${Userids.join('\',\'')}')
                union
                select created_by,created_at, label, '' as title, 'names' as activityType from names where created_by in ('${Userids.join('\',\'')}')
            `).then(result => {
                return orderedFor(result.recordset, Userids, 'createdBy', true);
            }).catch(err => {
                //console.log(err)
            })
        }
    }
}