#include <wiringPi.h>

int power = 9;
int units = 10;
int tare1 = 22;
int tare2 = 27;
int weigh = 17;

int main(void)
{
    wiringPiSetupGpio();
    pinMode(weigh, OUTPUT);
    pinMode(tare2, OUTPUT);
    pinMode(tare1, OUTPUT);
    pinMode(units, OUTPUT);
    pinMode(power, OUTPUT);
    digitalWrite(weigh, LOW);
    digitalWrite(tare2, LOW);
    digitalWrite(tare1, LOW);
    digitalWrite(units, LOW);
    digitalWrite(power, HIGH);
    delay(1000);
    digitalWrite(power, LOW);
    delay(10000);
    int delayNum = 400;
    int period = 1000;
    while (1)
    {
        digitalWrite(weigh, HIGH);
        delay(delayNum);
        digitalWrite(weigh, LOW);
        delay(period - delayNum);
    }
}
