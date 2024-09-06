const mysql = require('mysql2/promise')

const mySqlPool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'@Dong159357',
    database:'stuendts_db'
})

module.exports = mySqlPool;
