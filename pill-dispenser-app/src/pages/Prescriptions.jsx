import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Paper, Slider, Typography } from '@mui/material';

const marks = [
    {
        value: 12,
        label: "3:00 AM"
    },
    {
        value: 25,
        label: "6:00 AM"
    },
    {
        value: 37,
        label: "9:00 AM"
    },
    {
        value: 50,
        label: "12:00 PM"
    },
    {
        value: 62,
        label: "3:00 PM"
    },
    {
        value: 75,
        label: "6:00 PM"
    },
    {
        value: 87,
        label: "9:00 PM"
    }
]

function Prescription({num, onPrescriptionClick}) {
    const [backgroundColor, setBackgroundColor] = useState('white');
    const handleClick = (event) => {
        setBackgroundColor('blue');
    }
    return (
        <Paper sx={{whiteSpace: "pre-wrap", backgroundColor: backgroundColor}} onClick={onPrescriptionClick}>
            <Typography borderBottom={1}>{`Prescription #${num}`}</Typography>
            <Typography>{"2x Tylenol\n3x Claritin\n7x Ibuprofen"}</Typography>
        </Paper>
    );
}

export default function Prescriptions({patientName, patientId, onPrescriptionClick}) {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let halfDay = "AM";
    if (hours > 12) {
        hours -= 12;
        halfDay = "PM";
    }
    let minutes = currentTime.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

  return (
    <Stack alignItems={"center"} spacing={3}>
        <Stack direction="row" sx={{justifyContent: "space-between", width: "100%"}}>
            <Button variant="contained" startIcon={<ArrowBackIcon />}>Back</Button>
            <Paper sx={{whiteSpace: "pre-wrap"}}>
                <Typography>{`Patient Name: ${patientName}\nPatient ID: ${patientId}`}</Typography>
            </Paper>
            <Paper>{`${hours}:${minutes} ${halfDay}`}</Paper>
        </Stack>
        <Slider track={false} marks={marks} sx={{ width: "90%" }}/>
        <Stack direction="row" spacing={3}>
            <Prescription num={1} onPrescriptionClick={onPrescriptionClick}/>
            <Prescription num={2} onPrescriptionClick={onPrescriptionClick}/>
            <Prescription num={3} onPrescriptionClick={onPrescriptionClick}/>
        </Stack>
    </Stack>
  );
}
