#include <wiringPiI2C.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

#define MODULE_1_ID 0x17

// This file allows for reading and writing with I2C using a cmdline argument
// argv[1] will be "r"/"w"

int main(int argc, char *argv[]) {
   int fd = wiringPiI2CSetup(MODULE_1_ID);
   if (!strcmp("r", argv[1])) {
      printf("%d", wiringPiI2CRead(fd));
   } else {
      wiringPiI2CWrite(fd, atoi(argv[2]));
   }
}
