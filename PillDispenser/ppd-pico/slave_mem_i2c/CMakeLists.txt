# Generated Cmake Pico project file

cmake_minimum_required(VERSION 3.13)

set(CMAKE_C_STANDARD 11)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

set(CMAKE_FIND_DEBUG_MODE TRUE)



# Initialise pico_sdk from installed location
# (note this can come from environment, CMake cache etc)

# == DO NEVER EDIT THE NEXT LINES for Raspberry Pi Pico VS Code Extension to work ==
if(WIN32)
    set(USERHOME $ENV{USERPROFILE})
else()
    set(USERHOME $ENV{HOME})
endif()
set(sdkVersion 2.0.0)
set(toolchainVersion 13_2_Rel1)
set(picotoolVersion 2.0.0)
set(picoVscode ${USERHOME}/.pico-sdk/cmake/pico-vscode.cmake)
if (EXISTS ${picoVscode})
    include(${picoVscode})
endif()
# ====================================================================================
set(PICO_BOARD pico CACHE STRING "Board type")

# Pull in Raspberry Pi Pico SDK (must be before project)
include(pico_sdk_import.cmake)

project(slave_mem_i2c C CXX ASM)

# Initialise the Raspberry Pi Pico SDK
pico_sdk_init()



# Add executable. Default name is the project name, version 0.1
add_executable(slave_mem_i2c
    slave_mem_i2c.c
    )

pico_set_program_name(slave_mem_i2c "i2cslave")
pico_set_program_version(slave_mem_i2c "0.1")

pico_enable_stdio_uart(slave_mem_i2c 0)
pico_enable_stdio_usb(slave_mem_i2c 1)

#find_package(Threads REQUIRED)
#target_link_libraries(slave_mem_i2c PRIVATE Threads::Threads

# pico_i2c_slave
# hardware_i2c
# pico_stdlib
# hardware_pwm
# hardware_pio
# )



target_link_libraries(slave_mem_i2c

    pico_i2c_slave
    hardware_i2c
    pico_stdlib
    hardware_pwm
    hardware_pio
    pico_multicore
    hardware_adc
    
    )


pico_add_extra_outputs(slave_mem_i2c)

