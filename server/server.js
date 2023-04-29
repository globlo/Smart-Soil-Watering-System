
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
let humidityVal = [];
parser.on('data', function(data) {
	humidityVal = data.toString('UTF-8');
	// console.log(str);
});


//////////////// COMMUNICATION TO FRONT-END ///////////////////////

// Create an Express app and define routes:  
const express = require('express');  //read module by using require()
const app = express();

const bodyParser = require('body-parser');  //read module by using require()
app.use(bodyParser.json());

let presetVal =[]
app.post('/sendPreset', (req, res) => {  // Receive presetVal from Front-End
	// const { presetVal } = req.body;
	presetVal = req.body.presetVal;
	console.log(presetVal);
	
	res.json({ 
		"humidity": humidityVal,
		"preset": presetVal
    });
});

app.get('/getMoisture', (req, res) => {
    
  res.json({ 
	"humidity": humidityVal,
	"preset": presetVal
 })
});


app.listen(4000, function () {
  console.log('App listening on port 4000!');
});

