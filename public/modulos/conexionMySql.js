

const mysql = require('mysql');

var connection;

module.exports = {

dbConnection: function () {

    connection = mysql.createConnection({
        host: 'bnwbswzzqeighdahjoxo-mysql.services.clever-cloud.com',
        user: 'ujolpjatza6urz2z',
        password: 'k0omwf5i4VRjalCpIHyK',
        database: 'nobnwbswzzqeighdahjoxoeJs',
        insecureAuth : true,
        port: 3306,
        dateStrings:true
    });
    connection.connect();
    return connection;
}

};