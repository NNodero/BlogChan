const express = require('express')
const mysql = require('mysql2')

const db = mysql.createConnection({
    host:'blogchan.cczk3ut0375u.ap-southeast-2.rds.amazonaws.com',
    user:'nodero',
    password:'Npams061!',
    database:'Blogchan'

})

module.exports = db

