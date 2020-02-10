const {orderedFor} = require('../lib/util')

module.exports = client => {
    return {
        getCountsByUserIds: async function (user_ids) {
            const db = client.db('contests');
            const collection = db.collection('users');
            return await collection.find({ 'userId': { $in : user_ids } }).toArray().then(result => {
                return orderedFor(result,user_ids,'userId',false);
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
