
// These constants won't change. They're used to give names to the pins used:
const int analogInPin = A0;  // Analog input pin that the potentiometer is attached to
const int DigitalOutPin = D2;


const int dry = 882;
const int wet = 390;

int preset = 50;


void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
  // OtherSerial.begin(9600);
  pinMode(DigitalOutPin, OUTPUT); 
  pinMode(D3, OUTPUT); 
}

void loop() {

  // Humidity sensor
  int sensorValue = analogRead(analogInPin);
  int percentageHumidity = map(sensorValue, wet, dry, 100, 0); // map the sensor read value to 0-100% scale
  
  //sending data to node.js
  Serial.print(percentageHumidity);
  Serial.print(",");
  Serial.print(preset);
  Serial.println();
  delay(20); //dealying for water gets to the soil

  if(percentageHumidity < preset){ // in the air, enable watering pump
    digitalWrite(DigitalOutPin, HIGH);
  }else{  // in the water
    digitalWrite(DigitalOutPin, LOW);
  }

  if (Serial.available()) {  // setting the desired huidity value from node.js
    String data = Serial.readStringUntil('\n');
    preset = data.toInt();

    if( preset >= 50){
      digitalWrite(D3, HIGH); 
    }
    else{
      digitalWrite(D3, LOW);
    }
    
    Serial.print("Data received from Node.js: ");
    Serial.println(data);
  }


}
