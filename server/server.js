
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
let presetVal =[]
parser.on('data', function(data) {
	const [data1, data2] = data.split(',');
	humidityVal = Number(data1);
	presetVal = Number(data2);
	// console.log(presetVal);
	// console.log(humidityVal);
});

//////////////// COMMUNICATION TO FRONT-END ///////////////////////

// Create an Express app and define routes:  
const express = require('express');  //read module by using require()
const app = express();

const bodyParser = require('body-parser');  //read module by using require()
app.use(bodyParser.json());



app.post('/sendPreset', (req, res) => {  // Receive presetVal from Front-End
	// const { presetVal } = req.body;
	presetVal = req.body.presetVal;
	// console.log("tyupe off presetVal is ");
	// console.log(typeof presetVal);

	const data = presetVal.toString();
	port.write(data, (err) => {  // set the preset value in microcontroller
	  if (err) {
		console.error('Error writing to serial port:', err);
		res.status(500).send('Error sending data to Arduino');
	  } else {
		console.log('Data sent to Arduino:', data);
		// res.send('Data sent to Arduino');
	  }
	});

	console.log("humidity is ");
	console.log(humidityVal);
	// console.log("presetVal is ");
	// console.log( presetVal);
	
	res.json({ 
		"humidity": humidityVal, //int
		"preset": presetVal //int
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

