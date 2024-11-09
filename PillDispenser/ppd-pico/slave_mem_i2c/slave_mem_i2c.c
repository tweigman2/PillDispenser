/*
 * Copyright (c) 2021 Valentin Milea <valentin.milea@gmail.com>
 * Copyright (c) 2023 Raspberry Pi (Trading) Ltd.
 *
 * SPDX-License-Identifier: BSD-3-Clause
 */

#include <hardware/i2c.h>
#include <hardware/gpio.h>
#include <pico/i2c_slave.h>
#include <pico/stdlib.h>
#include <stdio.h>
#include <string.h>

static const uint I2C_SLAVE_ADDRESS = 0x17;
static const uint I2C_BAUDRATE = 100000; // 100 kHz


#ifdef i2c_default
// For this example, we run both the master and slave from the same board.
// You'll need to wire pin GP4 to GP6 (SDA), and pin GP5 to GP7 (SCL).
// static const uint I2C_SLAVE_SDA_PIN = PICO_DEFAULT_I2C_SDA_PIN; // 4
// static const uint I2C_SLAVE_SCL_PIN = PICO_DEFAULT_I2C_SCL_PIN; // 5
static const uint I2C_SLAVE_SDA_PIN = 0;
static const uint I2C_SLAVE_SCL_PIN = 1;

static const uint IR_SENSE_PIN = 15; // GP15
static const uint SENSE_DELAY = 2; // ms


uint8_t pi_instruction = 0x00;
uint num_pills_td = 10;
uint num_pills_disp = 0;
uint8_t disp_status = 0x00;
uint pill_dip = 0;



// The slave implements a 256 byte memory. To write a series of bytes, the master first
// writes the memory address, followed by the data. The address is automatically incremented
// for each byte transferred, looping back to 0 upon reaching the end. Reading is done
// sequentially from the current memory address.
static struct
{
    uint8_t mem[256];
    uint8_t mem_address;
    bool mem_address_written;
} context;



// Our handler is called from the I2C ISR, so it must complete quickly. Blocking calls /
// printing to stdio may interfere with interrupt handling.
static void i2c_slave_handler(i2c_inst_t *i2c, i2c_slave_event_t event) {
    switch (event) {
    case I2C_SLAVE_RECEIVE: // master has written some data
        gpio_put(PICO_DEFAULT_LED_PIN, true);
        pi_instruction = i2c_read_byte_raw(i2c);
        // printf("Instruction Byte: %u\n", pi_instruction);
        break;
    case I2C_SLAVE_REQUEST: // master is requesting data
        i2c_write_byte_raw(i2c, disp_status);
        
        break;
    case I2C_SLAVE_FINISH: // master has signalled Stop / Restart
        gpio_put(PICO_DEFAULT_LED_PIN, false);
        break;
    default:
        break;
    }
}

static bool detect_ir(){
    bool last_state = 0;
    bool current_state = gpio_get(IR_SENSE_PIN);
    uint32_t last_time = 0;

    bool detected = 0;

    while(!current_state){ // wait for first edge
        if(current_state = gpio_get(IR_SENSE_PIN)) break;
    }
    while(!detected){
        current_state = gpio_get(IR_SENSE_PIN);
        if(current_state != last_state){
            last_time = to_ms_since_boot(get_absolute_time());
        }

        if(( to_ms_since_boot(get_absolute_time()) - last_time ) > SENSE_DELAY){ // state has been stable for delay time
            if(current_state == 0 && last_state == 0) { // check pulse is over
                detected = 1;
            }
        }

        last_state = current_state;
    }
    return detected;


}

static void setup_slave() {
    gpio_init(I2C_SLAVE_SDA_PIN);
    gpio_set_function(I2C_SLAVE_SDA_PIN, GPIO_FUNC_I2C);
    gpio_pull_up(I2C_SLAVE_SDA_PIN);

    gpio_init(I2C_SLAVE_SCL_PIN);
    gpio_set_function(I2C_SLAVE_SCL_PIN, GPIO_FUNC_I2C);
    gpio_pull_up(I2C_SLAVE_SCL_PIN);

    i2c_init(i2c0, I2C_BAUDRATE);
    // configure I2C0 for slave mode
    i2c_slave_init(i2c0, I2C_SLAVE_ADDRESS, &i2c_slave_handler);
}

#endif

int main() {
    stdio_init_all();

    gpio_init(PICO_DEFAULT_LED_PIN);
    gpio_set_dir(PICO_DEFAULT_LED_PIN, GPIO_OUT);

    gpio_init(IR_SENSE_PIN);
    gpio_set_dir(IR_SENSE_PIN, GPIO_IN);
    // gpio_set_irq_enabled_with_callback(IR_SENSE_PIN, GPIO_IRQ_EDGE_RISE, true, &ir_callback);

    // gpio_pull_down(IR_SENSE_PIN);

    // while (true) {
    //     printf("Hello, world!\n");
    //     sleep_ms(1000);
    // }
    #if !defined(i2c_default) || !defined(PICO_DEFAULT_I2C_SDA_PIN) || !defined(PICO_DEFAULT_I2C_SCL_PIN)
    #warning i2c / slave_mem_i2c example requires a board with I2C pins
        puts("Default I2C pins were not defined");
        return 0;
    #else
        puts("\nI2C slave example");

        setup_slave();
        
        while (true) {
            printf("%u\n", pi_instruction);
        }
        /*
        while(true){
            if(detect_ir()){
                num_pills_disp++;
            }
            printf("Pills Dispensed: %u\n", num_pills_disp);
        }
        */
        //     
        
        
    #endif
}
