

const mysql = require('mysql');

var connection;

module.exports = {

dbConnection: function () {
/*
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'nodejs',
        insecureAuth : true,
        port: 3306,
        dateStrings:true
    });
    */
   connection = mysql.createConnection({
    host: 'remotemysql.com',
    user: '8dzNSQvCCI',
    password: '7DvN71CBV2',
    database: '8dzNSQvCCI',
    insecureAuth : true,
    port: 3306,
    dateStrings:true
});
    connection.connect();
    return connection;
}

};