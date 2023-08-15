const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host:process.env.AWS_RDS_HOST,
    user:process.env.AWS_RDS_USER,
    password:process.env.AWS_RDS_PASSWORD,
    database:process.env.AWS_RDS_DATABASE

})

module.exports = db

