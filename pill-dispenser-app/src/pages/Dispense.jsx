import '../App.css';
import * as React from 'react';
import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { Paper, Typography } from '@mui/material';
const patientData = require('../patientData.json');
const pillData = require('../pillData.json');

let output = "";

window.api.sendCommand("src/firmware/scale");
window.api.sendCommand("cat", ["/dev/ttyUSB0"]);
window.api.onOutput((data) => {
  console.log("Output:", data);
  output = data;
});

export default function Dispense({onDispenseClick, patientName, patientId, prescriptionNumber, pillNumber}) {

    const prescriptionData = patientData[patientId].prescriptions[prescriptionNumber];
    const pills = Object.keys(prescriptionData);
    const pillName = pills[pillNumber];
    const pillAmount = prescriptionData[pillName];
    const concentration = pillData[pillName].concentration;

    useEffect(() => {
        window.api.sendCommand("src/firmware/i2c", [6]);
    })

    return (
        <Stack>
            <Stack direction="row">
                <h1>Dispensing</h1>
                <Paper sx={{whiteSpace: "pre-wrap"}}>
                    <Typography>{`Patient Name: ${patientName}\nPatient ID: ${patientId}`}</Typography>
                </Paper>
            </Stack>
            <Stack direction="row">
                <img src={"tylenol-8hr.png"} width={288} height={216} alt="8 hour Tylenol"/>
                <Paper onClick = {onDispenseClick}>
                    {`Dispensing: ${pillAmount} ${pillName}`}
                    <Paper sx={{whiteSpace: "pre-wrap"}} elevation={2}>
                        <Typography borderBottom={1}>{"Pill Information"}</Typography>
                        {/* In pillData.json, concentration is in mg */}
                        <Typography>{`Concentration/Pill: ${concentration} mg\nTotal Dosage: ${concentration * pillAmount} mg`}</Typography>
                    </Paper>
                </Paper>
            </Stack>
            <Paper>{`Current weight: ${output} g`}</Paper>
        </Stack>
    );
}
