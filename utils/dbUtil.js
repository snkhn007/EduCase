const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "school_management",
    port: process.env.DB_PORT || 3306,
    user : "root", 
    password : "root",
    database : "school_management"
});

module.exports = pool.promise();