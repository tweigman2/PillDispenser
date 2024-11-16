import '../App.css';
import * as React from 'react';
import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { Paper, Typography } from '@mui/material';
const patientData = require('../patientData.json');
const pillData = require('../pillData.json');

// const MODULE_1_ADDR = 0x17;

let output = "";

window.api.sendCommand("src/firmware/scale");
window.api.sendCommand("cat", ["/dev/ttyUSB0"]);
window.api.onOutput((data) => {
  if (data.includes("g")) {
    data = data.replace(/\s/g, "");
    console.log("Output:", data);
    output = data;
  }
});

export default function Dispense({onDispenseClick, patientName, patientId, prescriptionNumber, pillNumber}) {

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

    // useEffect(() => {
    //     // MSB of 1 byte is commanding the pico to be in filling state
    //     // This causes the LED on the dispensing module to turn on
    //     // 1 is on, 0 is off
    //     window.api.sendCommand("src/firmware/i2c", ["w", 23, pillAmount]);
    // });

    // useEffect(() => {
    //     const i2cRead = setInterval(() => {
    //         // try {
    //         //     console.log(window.api.execCommand("src/firmware/example2", []));
    //         // } catch (err) {

    //         // }
    //         // window.api.sendCommand("src/firmware/i2c", ["r"]);
    //         // window.api.onOutput((data) => {
    //         //     console.log("Value:", data);
    //         // });
    //         const dispensing_status = window.api.execCommand("src/firmware/i2c", ["r", 0x17]);
    //         console.log(dispensing_status);
    //         if (parseInt(dispensing_status) === 1) {
    //             if (output >= lowerBound * pillAmount && output <= upperBound * pillAmount) {
    //                 onDispenseClick();
    //             } else {
    //                 console.error("Pill weight is outside of the expected range! Double check that there are the right number of pills!");
    //             }
    //         }
    //     }, 2000);

    //     return () => clearInterval(i2cRead);
    // }, []);

    return (
        <Stack>
            <Stack direction="row">
                <h1>Dispensing</h1>
                <Paper sx={{whiteSpace: "pre-wrap"}}>
                    <Typography>{`Patient Name: ${patientName}\nPatient ID: ${patientId}`}</Typography>
                </Paper>
            </Stack>
            <Stack direction="row">
                <img src={"images/" + imagePath} width={288} height={216} alt="8 hour Tylenol"/>
                <Paper onClick = {onDispenseClick}>
                    {`Dispensing: ${pillAmount} ${pillName}`}
                    <Paper sx={{whiteSpace: "pre-wrap"}} elevation={2}>
                        <Typography borderBottom={1}>{"Pill Information"}</Typography>
                        {/* In pillData.json, concentration is in mg, weight is in g, tolerance is in percent */}
                        <Typography>{`Concentration/Pill: ${concentration} mg\nTotal Dosage: ${concentration * pillAmount} mg`}</Typography>
                    </Paper>
                </Paper>
            </Stack>
            <Paper>{`Current weight: ${output} g`}</Paper>
        </Stack>
    );
}
