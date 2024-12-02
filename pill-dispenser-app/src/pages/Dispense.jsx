import '../App.css';
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import Stack from '@mui/material/Stack';
import { createTheme, Paper, ThemeProvider, Typography } from '@mui/material';
const patientData = require('../patientData.json');
const pillData = require('../pillData.json');

const MODULE_1_ADDR = 0x17; // If this doesn't work, replace with 23

const theme = createTheme({
    typography: {
        fontSize: 25
    }
});

export default function Dispense({onDispenseClick, patientName, patientId, prescriptionNumber, pillNumber, scaleWeight, startDispensing, setStartDispensing}) {

    const prescriptionData = patientData[patientId].prescriptions[prescriptionNumber];
    const pills = Object.keys(prescriptionData);
    const pillName = pills[pillNumber];
    const pillAmount = prescriptionData[pillName];
    const concentration = pillData[pillName].concentration;
    const imagePath = pillData[pillName].image;
    const pillWeight = pillData[pillName].weight;
    const tolerance = pillData[pillName].tolerance;
    const lowerBound = pillWeight * (1 - tolerance / 100);
    const upperBound = pillWeight * (1 + tolerance / 100);
    const i2c_address = pillData[pillName].i2c_address;

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [halfDay, setHalfDay] = useState("AM");
    const scaleWeightRef = useRef();
    scaleWeightRef.current = scaleWeight;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const updateClock = () => {
        let currentTime = new Date();
        let newHours = currentTime.getHours();
        let newHalfDay = "AM";
        if (newHours > 12) {
            newHours -= 12;
            newHalfDay = "PM";
        } else if (newHours === 12) {
            newHalfDay = "PM";
        } else if (newHours === 0) {
            newHours += 12;
        }
        let newMinutes = currentTime.getMinutes();
        if (newMinutes < 10) {
            newMinutes = "0" + newMinutes;
        }
        setHours(newHours);
        setMinutes(newMinutes);
        setHalfDay(newHalfDay);
    }

    useEffect(() => {
        updateClock();
        const updateClockInterval = setInterval(updateClock, 1000);

        return () => clearInterval(updateClockInterval);
    });

    useEffect(async () => {
        while (scaleWeightRef.current < lowerBound * pillAmount) {
            // MSB of 1 byte is commanding the pico to be in filling state
            // This causes the LED on the dispensing module to turn on
            // 1 is on, 0 is off
            window.api.sendCommand("src/firmware/i2c", ["w", i2c_address, 1]);
            await sleep(1000);
        }
    });

    useEffect(() => {
        const i2cRead = setInterval(() => {
            // try {
            //     console.log(window.api.execCommand("src/firmware/example2", []));
            // } catch (err) {

            // }
            // window.api.sendCommand("src/firmware/i2c", ["r"]);
            // window.api.onOutput((data) => {
            //     console.log("Value:", data);
            // });
            const dispensing_status = window.api.execCommand("src/firmware/i2c", ["r", i2c_address]);
            console.log(dispensing_status);
            console.log(parseFloat(scaleWeight));
            console.log(lowerBound * pillAmount);
            console.log(upperBound * pillAmount);
            if (parseInt(dispensing_status) === 1) {
                if (parseFloat(scaleWeightRef.current) >= (lowerBound * pillAmount) && parseFloat(scaleWeightRef.current) <= (upperBound * pillAmount)) {
                    onDispenseClick();
                } else {
                    console.error("Pill weight is outside of the expected range! Double check that there are the right number of pills!");
                }
            }
        }, 2000);

        return () => clearInterval(i2cRead);
    }, []);

    return (
        <Stack>
            <Stack direction="row" justifyContent="space-between" pb={3}>
                <Typography variant="h4">Dispensing</Typography>
                <Paper sx={{whiteSpace: "pre-wrap"}}>
                    <Typography>{`Patient Name: ${patientName}\nPatient ID: ${patientId}`}</Typography>
                </Paper>
                <Paper>
                    <Typography paddingTop={3}>{`${hours}:${minutes} ${halfDay}`}</Typography>
                </Paper>
            </Stack>
            <Stack direction="row" justifyContent="center" spacing={10}>
                <img src={"images/" + imagePath} width={648} height={486} alt="Pill being dispensed"/>
                <Paper onClick={onDispenseClick} sx={{whiteSpace: "pre-wrap", p: "5px"}}>
                    <Typography>{`Dispensing: ${pillAmount} ${pillName}\n\n`}</Typography>
                    {/* <Paper sx={{whiteSpace: "pre-wrap"}} elevation={2}> */}
                    <Typography borderBottom={1}>{"Pill Information"}</Typography>
                        {/* In pillData.json, concentration is in mg, weight is in g, tolerance is in percent */}
                    <Typography>{`\tConcentration/Pill: ${concentration} mg\n\tTotal Dosage: ${concentration * pillAmount} mg`}</Typography>
                    {/* </Paper> */}
                    <Typography fontSize={100}>{`\nCurrent weight: ${scaleWeight} g`}</Typography>
                </Paper>
            </Stack>
        </Stack>
    );
}
