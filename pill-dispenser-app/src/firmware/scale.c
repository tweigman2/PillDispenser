#include <wiringPi.h>

int main(void)
{
    wiringPiSetupGpio();
    pinMode(17, OUTPUT);
    int delayNum = 50;
    int period = 100;
    while (1)
    {
        digitalWrite(17, HIGH);
        delay(delayNum);
        digitalWrite(17, LOW);
        delay(period - delayNum);
    }
}