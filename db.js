const mysql = require('mysql');

    var connection;

    module.exports = {

    dbConnection: function () {

        connection = mysql.createConnection({
            host:process.env.SQL_HOST,
            user:process.env.SQL_USER,
            password:process.env.SQL_PASSWORD,
            database:process.env.SQL_DB_NAME
        });
        connection.connect((err)=>{
            if(!err)console.log("DB Connected");
            else console.log("DB unsuccessful\nError:",err);
        });
        return connection;
    }

};