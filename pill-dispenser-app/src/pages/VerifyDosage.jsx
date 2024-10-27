import '../App.css';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
const patientData = require('../patientData.json');
const pillData = require('../pillData.json');

export default function VerifyDosage({onCorrectDosageClick, prescriptionNumber, patientName, patientId, pillNumber}) {

  const prescriptionData = patientData[patientId].prescriptions[prescriptionNumber];
  const pills = Object.keys(prescriptionData);
  const pillName = pills[pillNumber];
  const pillAmount = prescriptionData[pillName];
  const concentration = pillData[pillName].concentration;

  return (
    
    <Stack spacing={2}>
      <Stack direction="row">
        <h1>Verify Dosage</h1>
        <Paper sx={{whiteSpace: "pre-wrap"}}>
          <Typography>{`Patient Name: ${patientName}\nPatient ID: ${patientId}`}</Typography>
        </Paper>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
      <img
        src="/images/tylenol-extra-strength.jpeg"
        alt="Description"
        style={{ width: '200px', height: 'auto' }}
      />
      <Stack>
        <Typography variant="h5">{`Dispensed: ${pillAmount} ${pillName}`}</Typography>
        <Typography variant="body1">
          {`Concentration/Pill: ${concentration} mg`}
        </Typography>
        <Typography variant="body1">
          {`Total Dosage: ${concentration * pillAmount} mg`}
        </Typography>
      </Stack>
    </Stack>

      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Button sx={{ width: "200px" }} variant="contained" onClick={onCorrectDosageClick}>Correct</Button>
        <Button sx={{ width: "200px" }} variant="contained" >Incorrect</Button>
      </Stack>
    </Stack>
  );
}