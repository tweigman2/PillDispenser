#include <wiringPiI2C.h>
#include <stdlib.h>

#define MODULE_1_ID 0x17

int main(int argc, char *argv[]) {
   int fd = wiringPiI2CSetup(MODULE_1_ID);
   wiringPiI2CWrite(fd, atoi(argv[1]));
}
