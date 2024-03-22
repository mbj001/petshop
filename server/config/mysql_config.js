const mysql = require("mysql2");
const mysql2 = require("mysql2/promise");

const mysqlConnect = {
    init: function(){
        return mysql.createConnection({
            host: process.env.MYSQL_HOST,
            database: process.env.MYSQL_DB,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS,
            port: process.env.MYSQL_PORT,
            charset: process.env.MYSQL_CHARSET
        })
    },

    open: function(conn){
        conn.connect(function(err){
            if(err){
                console.error('MYSQL connection failed');
                console.error('Error Code :' + err.code);
                console.error('Error Message : ' + err.message);
            }
            else{
                console.log("MYSQL Connect Complete !!!");
            }
        })
    }
}

const conn = mysqlConnect.init();
mysqlConnect.open(conn);


const pool =  mysql2.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
});



module.exports = pool;
module.exports = conn;