const mssql = require('mssql')
const dbConfig = require('../config/ms_sql.json');

function connectToDB() {
    return mssql.connect(dbConfig);
}

function CreateTableSchema(){
    connectToDB().then(pool => {

        const table1 = new mssql.Table('users')
        table1.create = true
        table1.columns.add('id', mssql.Int, { primary: true, nullable: false, identity : true })
        table1.columns.add('email', mssql.VarChar(128), { nullable: false })
        table1.columns.add('first_name', mssql.VarChar(128), { nullable: false })
        table1.columns.add('last_name', mssql.VarChar(128), { nullable: false })
        table1.columns.add('api_key', mssql.VarChar(128), { nullable: false, unique: true })
        table1.columns.add('created_at', mssql.DateTime2, { nullable: false })

        table1.rows.add(1,'samer@agilelabs.com','Samer','Buna','4242',new Date())
        table1.rows.add(2,'creative@mind.com','Creativ','Mind','0000',new Date())


        const table2 = new mssql.Table('contests')
        table2.create = true
        table2.columns.add('id', mssql.Int, { primary: true, nullable: false, identity : true })
        table2.columns.add('code', mssql.VarChar(255), { nullable: false, unique : true })
        table2.columns.add('title', mssql.VarChar(128), { nullable: false })
        table2.columns.add('description', mssql.VarChar(512), { nullable: true })
        table2.columns.add('status', mssql.VarChar(10), { nullable: false, default : 'draft' })
        table2.columns.add('created_at', mssql.DateTime2, { nullable: false })
        table2.columns.add('created_by', mssql.Int, { nullable: false })

        table2.rows.add(1,'free-programming-books-sit','Free Programming Books Sit','A list of free online programming books, categorized by languages/topics','draft',new Date(),1)
        table2.rows.add(2,'visualize-most-popular-tweets','Visualize Most Popular Tweets','A site to constantly visualize the most popular tweets in your stream','published',new Date(),1)
        table2.rows.add(3,'entrepreneurs-looknig-for-partnership','Interview Entrepreneurs Looking For Partnership',null,'archived',new Date(),1)


        const table3 = new mssql.Table('names')
        table3.create = true
        table3.columns.add('id', mssql.Int, { primary: true, nullable: false, identity : true })
        table3.columns.add('contest_id', mssql.Int, { nullable: false })
        table3.columns.add('label', mssql.VarChar(128), { nullable: false })
        table3.columns.add('normalized_label', mssql.VarChar(128), { nullable: false })
        table3.columns.add('description', mssql.VarChar(512), { nullable: true })
        table3.columns.add('created_at', mssql.DateTime2, { nullable: false })
        table3.columns.add('created_by', mssql.Int, { nullable: false })

        table3.rows.add(1,1,'RootLib','rootlib','The Root Library',new Date(),2)
        table3.rows.add(2,1,'The Free List','thefreelist',null,new Date(),2)
        table3.rows.add(3,2,'PopTweet','poptweet',null,new Date(),2)
        table3.rows.add(4,2,'TwitterScop','twitterscop',null,new Date(),2)
        

        const table4 = new mssql.Table('votes')
        table4.create = true
        table4.columns.add('id', mssql.Int, { primary: true, nullable: false, identity : true })
        table4.columns.add('name_id', mssql.Int, { nullable: false })
        table4.columns.add('up', mssql.Bit, { nullable: false })
        table4.columns.add('created_at', mssql.DateTime2, { nullable: false })
        table4.columns.add('created_by', mssql.Int, { nullable: false })

        table4.rows.add(1,1,1,new Date(),1)
        table4.rows.add(2,1,1,new Date(),2)
        table4.rows.add(3,2,1,new Date(),1)
        table4.rows.add(4,2,0,new Date(),2)
        table4.rows.add(5,3,0,new Date(),1)
        table4.rows.add(6,3,0,new Date(),2)
        table4.rows.add(7,4,1,new Date(),1)
        table4.rows.add(8,4,1,new Date(),2)
        
        const request = new mssql.Request()

        request.bulk(table1).then((result) => {
            console.log(result);
        });
        request.bulk(table2).then((result) => {
            console.log(result);
        });
        request.bulk(table3).then((result) => {
            console.log(result);
        });
        request.bulk(table4).then((result) => {
            console.log(result);
        });
    console.log('outside')
    }).catch(err => {
        console.log(err);
    })
}

// (function(){
//     CreateTableSchema();
// });

CreateTableSchema();