import '../App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
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
  const imagePath = pillData[pillName].image;

  const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [halfDay, setHalfDay] = useState("AM");

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

  return (
    
    <Stack spacing={2}>
      <Stack direction="row" justifyContent={"space-between"} pb={3}>
          <Typography variant="h4">Verify Dosage</Typography>
          <Paper sx={{whiteSpace: "pre-wrap"}}>
              <Typography>{`Patient Name: ${patientName}\nPatient ID: ${patientId}`}</Typography>
          </Paper>
          <Paper>
            <Typography paddingTop={3}>{`${hours}:${minutes} ${halfDay}`}</Typography>
          </Paper>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="center" spacing={10}>
        <img
          src={"/images/" + imagePath}
          alt="Description"
          style={{ width: '648px', height: 'auto' }}
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
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={5} paddingTop={8}>
        <Button variant="contained" onClick={onCorrectDosageClick}>Correct</Button>
        <Button variant="contained" >Incorrect</Button>
      </Stack>
    </Stack>
  );
}