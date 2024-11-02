#include <stdio.h>
#include <time.h>

void delay(int milli_seconds) {
    clock_t start_time = clock();
    while (clock() < start_time + milli_seconds);
}

int main(void) {
    while (1) {
        printf("Hello World\n");
        fflush(stdout);
        delay(1000);
    }
}