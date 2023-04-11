// Create a connection to MySQL:
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "akky6223",
    database: "soilmoisturesensor",
    connectionLimit: 10
});

// Connect to MySQL:
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
  });

// Create an Express app and define routes:  
const express = require('express');
const app = express();


app.get('/getMoistures', function (req, res) {
    connection.query('SELECT * FROM moisture_sensor', function (error, results, fields) {
    if (error) throw error;
    
    // var data = JSON.parse(JSON.stringify(results))
    // console.log(results);
    res.send(results);
    // res.json({ "users": ["userOne", "two","threeer"] })
  });
});
// app.get("/getMoistures", (req, res) => {
//     // connection.query('SELECT * FROM moisture_sensor', function (error, results, fields) {
//     //   if (error) throw error;
//       res.json({ "users": ["userOne", "two","threeer"] })
// });
  


app.listen(4000, function () {
  console.log('App listening on port 4000!');
});

