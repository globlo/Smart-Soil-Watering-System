
//////////////////// GET DATA FROM IOT DEVICE ///////////////////////
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

const port = new SerialPort({ path: "COM12", baudRate: 9600 })
const parser = port.pipe(new ReadlineParser());

// Open Port
port.on('open', function() {
	console.log('connected!!!!!');
});

// Get data from IoT Device
let str = [];
parser.on('data', function(data) {
	str = data.toString('UTF-8');
	console.log(str);
});


//////////////// COMMUNICATION TO FRONT-END ///////////////////////

// Create an Express app and define routes:  
const express = require('express');
const app = express();


app.get('/getMoisture', function (req, res) {
    
  res.json({ "humidity": str })
});


app.listen(4000, function () {
  console.log('App listening on port 4000!');
});

