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
#include "hardware/pio.h"
#include "hardware/pwm.h"
//#include <pthread.h>
#include "pico/multicore.h"
#include "hardware/irq.h"
#include "hardware/adc.h"

static const uint I2C_SLAVE_ADDRESS = 0x17;
static const uint I2C_BAUDRATE = 100000; // 100 kHz

#define MOTOR_PWM_OUTPUT 3
#define FLAG_VALUE 123
#define CSA_IN 27
#ifdef i2c_default
// For this example, we run both the master and slave from the same board.
// You'll need to wire pin GP4 to GP6 (SDA), and pin GP5 to GP7 (SCL).
// static const uint I2C_SLAVE_SDA_PIN = PICO_DEFAULT_I2C_SDA_PIN; // 4
// static const uint I2C_SLAVE_SCL_PIN = PICO_DEFAULT_I2C_SCL_PIN; // 5
static const uint I2C_SLAVE_SDA_PIN = 2; // 4
static const uint I2C_SLAVE_SCL_PIN = 3; // 5

static const uint IR_SENSE_PIN = 15; // GP15
static const uint SENSE_DELAY = 400; // ms 

static const uint MOTOR_SENSE_PIN = 14; // GP14
static const uint IN_2_PIN = 13; // GP13
static const uint IN_1_PIN = 12; // GP12

static const uint R_LED_PIN = 11; // GP11
static const uint G_LED_PIN = 10; // GP10

static const uint numLoopNeeded = 10000; // The amount of motor spins loops before swithcing the LED

static uint STATE = 0; // State 0: Idle 1: Dispensing 2: Refilling
static uint PREVSTATE = 1000;

uint8_t pi_instruction = 0x00;
uint num_pills_td = 0;
static uint num_pills_disp = 0;
uint8_t disp_status = 0;
uint pill_dip = 0;

char instructionStr[256];



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
        STATE = (pi_instruction&0x80)>>7;
        num_pills_td = pi_instruction&0x7F;

        if(STATE == 0) disp_status = 2;
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

bool isDividableBy(int x, int n) {
    for (int i = 0; i <= n; i++) {
        if (x == i*n)
            return false;
    }
    return true;
}

// Core 0 interrupt Handler
void core0_interrupt_handler() {

 // Receive number of pills
    while (multicore_fifo_rvalid()){
        num_pills_disp = multicore_fifo_pop_blocking();   
    }
    multicore_fifo_clear_irq(); // Clear interrupt
}


bool detect_ir(){
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

void detect_ir_routine(){
    stdio_init_all();

    gpio_init(R_LED_PIN);
    gpio_set_dir(R_LED_PIN, GPIO_OUT);

    uint num_pills_disp_core1 = 0;
    //Start of routine
    while (true)
    {
        // printf("Howdy");
        if(detect_ir()){
             num_pills_disp_core1++;
             gpio_put(R_LED_PIN,1);
            //  printf("statement1 num pills according to ir: %d\n", num_pills_disp);
             multicore_fifo_push_blocking(num_pills_disp_core1); 
            //  gpio_put(R_LED_PIN, 1);
            //  gpio_put(R_LED_PIN, 0);
        }
    }
    return;


}

static void dispensePills(int numPills, int speedVal) {


    //Start IR sensing on Core 1 
    // stdio_init_all();
    multicore_launch_core1(detect_ir_routine);

    bool CWstate = 1;
    bool LEDstate = 1;
    bool LEDprevState = 0;
    bool pin_one_state = 1;
    bool pin_two_state = 0;
    // gpio_put(IN_1_PIN, pin_one_state);
    // gpio_put(IN_2_PIN, pin_two_state);
    
  
    //PWM Stuff
    gpio_set_function(IN_1_PIN, GPIO_FUNC_PWM);
    gpio_set_function(IN_2_PIN, GPIO_FUNC_PWM);
    uint slice_num_1 = pwm_gpio_to_slice_num(IN_1_PIN);
    uint slice_num_2 = pwm_gpio_to_slice_num(IN_2_PIN);
    // Start Spinning CW
    pwm_set_wrap(slice_num_1, 500);
    pwm_set_chan_level(slice_num_1, PWM_CHAN_A, speedVal*pin_one_state);
    pwm_set_enabled(slice_num_1, true);
    

    pwm_set_wrap(slice_num_2, 500);
    pwm_set_chan_level(slice_num_2, PWM_CHAN_B, speedVal*pin_two_state);
    pwm_set_enabled(slice_num_2, true);
    
    
    int numLoops = 0;
    
    while (num_pills_disp < numPills){
        // printf(pi_instruction);
        printf("numb pills disp in loop: %d\n", num_pills_disp);
        //if stuck spin other direction

        uint16_t raw = adc_read(); // GPIO 26

        int voltage_stall_sense = (int) raw;

        // printf("raw: %u, int: %u\n, state1: %u, state2: %u",raw,voltage_stall_sense,pin_one_state,pin_two_state);

        if (voltage_stall_sense > 3000)
        {
            printf("Stuck!!\n");
            pin_one_state = !pin_one_state;
            pin_two_state = !pin_two_state;
            pwm_set_chan_level(slice_num_1, PWM_CHAN_A, speedVal*pin_one_state);
            pwm_set_chan_level(slice_num_2, PWM_CHAN_B, speedVal*pin_two_state);
            sleep_ms(500);
            // pwm_set_enabled(slice_num_1, pin_one_state);
            // pwm_set_enabled(slice_num_2, pin_two_state);
        }
        numLoops++;
        if (isDividableBy(numLoopNeeded,numLoops))
        {
            gpio_put(G_LED_PIN, LEDstate);
            LEDstate = !LEDstate; 
        }
        
        
    }

    printf("done!\n");

    // Stop Spinning
    pwm_set_wrap(slice_num_1, 500);
    pwm_set_chan_level(slice_num_1, PWM_CHAN_B, speedVal);
    pwm_set_enabled(slice_num_1, false);
    

    pwm_set_wrap(slice_num_2, 500);
    pwm_set_chan_level(slice_num_2, PWM_CHAN_B, speedVal);
    pwm_set_enabled(slice_num_2, false);
    // pwm_set_chan_level(slice_num, PWM_CHAN_B, 0);
    gpio_put(IN_1_PIN, false);
    gpio_put(IN_2_PIN, false);

    // Reset Core 1
    multicore_reset_core1();

    //Reset number of dispensed pills
    num_pills_disp = 0;
    return;
        
}
    


static void setup_slave() {
    gpio_init(I2C_SLAVE_SDA_PIN);
    gpio_set_function(I2C_SLAVE_SDA_PIN, GPIO_FUNC_I2C);
    gpio_pull_up(I2C_SLAVE_SDA_PIN);

    gpio_init(I2C_SLAVE_SCL_PIN);
    gpio_set_function(I2C_SLAVE_SCL_PIN, GPIO_FUNC_I2C);
    gpio_pull_up(I2C_SLAVE_SCL_PIN);

    i2c_init(i2c1, I2C_BAUDRATE);
    // configure I2C0 for slave mode
    i2c_slave_init(i2c1, I2C_SLAVE_ADDRESS, &i2c_slave_handler);
}

#endif

int main() {
    //ADC Intitialization
    adc_init();
    adc_gpio_init(26);
    adc_select_input(0); //This is pin 26

    stdio_init_all();

    gpio_init(PICO_DEFAULT_LED_PIN);
    gpio_set_dir(PICO_DEFAULT_LED_PIN, GPIO_OUT);

    gpio_init(IR_SENSE_PIN);
    gpio_set_dir(IR_SENSE_PIN, GPIO_IN);

    gpio_init(MOTOR_SENSE_PIN);
    gpio_set_dir(MOTOR_SENSE_PIN, GPIO_IN);
    
    gpio_init(IN_1_PIN);
    gpio_set_dir(IN_1_PIN, GPIO_OUT);
    
    gpio_init(IN_2_PIN);
    gpio_set_dir(IN_2_PIN, GPIO_OUT);
    
    gpio_init(R_LED_PIN);
    gpio_set_dir(R_LED_PIN, GPIO_OUT);

    // Configure Core 0 Interrupt
    multicore_fifo_clear_irq();
    irq_set_exclusive_handler(SIO_IRQ_PROC0, core0_interrupt_handler);
    irq_set_enabled(SIO_IRQ_PROC0, true);

    setup_slave();
    // dispensePills(5,500);
    while (1)
    {
        printf("pi instruction: %u\n",pi_instruction);
        printf("disp status: %u\n",disp_status);
        switch (STATE) {
            case 0x1: // Refill
                gpio_put(R_LED_PIN, true);
                gpio_put(G_LED_PIN, false);
                break;

            case 0x0: // Dispense
                if(num_pills_td == 0){
                    gpio_put(R_LED_PIN, false);
                    gpio_put(G_LED_PIN, false);
                    disp_status = 1;
                    break;
                }
                    gpio_put(R_LED_PIN, false);
                    gpio_put(G_LED_PIN, true);

                    printf("dispensing %u...\n", num_pills_td);
                    dispensePills(num_pills_td,500);
                    num_pills_td = 0;
                    disp_status = 1;
                    
                    gpio_put(G_LED_PIN, false);
                    
                    break;   
            default:
                break;
            }
    }
    
}
