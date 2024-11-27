#include <wiringPi.h>

int power = 9;
int units = 10;
int tare1 = 22;
int tare2 = 27;
int calibrate = 11;

int main(void)
{
    wiringPiSetupGpio();
    pinMode(calibrate, OUTPUT);
    pinMode(tare2, OUTPUT);
    pinMode(tare1, OUTPUT);
    pinMode(units, OUTPUT);
    pinMode(power, OUTPUT);
    digitalWrite(calibrate, LOW);
    digitalWrite(tare2, LOW);
    digitalWrite(tare1, LOW);
    digitalWrite(units, LOW);
    digitalWrite(power, HIGH);
    // Press power button for 1 second and then wait 10 seconds for scale to turn on
    delay(1000);
    digitalWrite(power, LOW);
    delay(10000);
    
    // How to calibrate scale
    // 1. Single calibration
    // In the power-on state, press and hold the calibration key for 3 seconds to enter calibration mode
    digitalWrite(calibrate, HIGH);
    delay(3000);
    digitalWrite(calibrate, LOW);
}
