
#include "mbed.h"
#include <string.h>
#include <stdio.h>
AnalogIn ain(A0);
DigitalOut Relay(D2);

#define  disired_moisture 80

int  ADCdata;
int wait_time = 2000000;

// main() runs in its own thread in the OS
int main()
{
    
    while (true) {

        

        ADCdata = ain.read() * 100;
        printf("Moisture value is %d\r\n", ADCdata);

        if(ADCdata < disired_moisture){ // in the water
            Relay = 0; //stop water
            // wait_us(wait_time);
        }
        else{ // air
            Relay = 1; // feed water
            // wait_us(wait_time);
        }

        ThisThread::sleep_for(1000ms);
    }
}

