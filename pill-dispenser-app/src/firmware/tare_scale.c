#include <wiringPi.h>

int power = 9;
int units = 10;
int tare1 = 22;
int tare2 = 27;
int weigh = 11;

int main(void) {
    wiringPiSetupGpio();
    pinMode(weigh, OUTPUT);
    pinMode(tare2, OUTPUT);
    pinMode(tare1, OUTPUT);
    pinMode(units, OUTPUT);
    pinMode(power, OUTPUT);
    digitalWrite(weigh, LOW);
    digitalWrite(tare2, LOW);
    digitalWrite(units, LOW);
    digitalWrite(power, LOW);

    digitalWrite(tare1, HIGH);
    delay(500);
    digitalWrite(tare1, LOW);
}