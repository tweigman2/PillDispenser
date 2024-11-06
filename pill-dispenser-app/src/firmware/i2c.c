#include <wiringPiI2C.h>

#define MODULE_1_ID 0x17

int main(void) {
   int fd = wiringPiI2CSetup(MODULE_1_ID);
   wiringPiI2CWrite(fd, 5);
}
