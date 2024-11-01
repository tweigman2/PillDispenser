import '../App.css';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Paper, Typography } from '@mui/material';
const patientData = require('../patientData.json');
const pillData = require('../pillData.json');
// const { spawn } = require('child_process');

// const exampleCode = spawn('../firmware/example');

// exampleCode.stdout.on('data', (data) => {
//     console.log(data);
// })

// window.nodeSpawn.call("../example");

// const proc = await window.api.spawnCmd();
// proc.output.on('data', (data) => {
//     console.log(`stdout: ${data}`);
// });

export default function Dispense({onDispenseClick, patientName, patientId, prescriptionNumber, pillNumber}) {

    const prescriptionData = patientData[patientId].prescriptions[prescriptionNumber];
    const pills = Object.keys(prescriptionData);
    const pillName = pills[pillNumber];
    const pillAmount = prescriptionData[pillName];
    const concentration = pillData[pillName].concentration;

    let pillWeight = 0;

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
            <Paper>{`Current weight: ${pillWeight} g`}</Paper>
        </Stack>
    );
}
