

const mysql = require('mysql');

var connection;

module.exports = {

dbConnection: function () {

    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'nodejs',
        insecureAuth : true,
        port: 3306,
        dateStrings:true
    });
    connection.connect();
    return connection;
}

};