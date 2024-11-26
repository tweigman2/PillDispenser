import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Paper, Slider, Typography } from '@mui/material';
const patientData = require('../patientData.json');

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
];

function Prescription({num, prescriptionText, onPrescriptionClick}) {
    return (
        <Paper sx={{whiteSpace: "pre-wrap", backgroundColor: 'white'}} onClick={() => onPrescriptionClick(num - 1)}>
            <Typography borderBottom={1} paddingLeft={2} paddingRight={2}>{`Prescription #${num}`}</Typography>
            <Typography paddingLeft={2}>{prescriptionText}</Typography>
        </Paper>
    );
}

export default function Prescriptions({patientName, patientId, onPrescriptionClick, onPrescriptionBackClick}) {
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

    const prescriptionData = patientData[patientId].prescriptions;

  return (
    <Stack alignItems={"center"} spacing={3}>
        <Stack direction="row" sx={{justifyContent: "space-between", width: "100%"}}>
            <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={onPrescriptionBackClick}>Back</Button>
            <Paper sx={{whiteSpace: "pre-wrap"}}>
                <Typography>{`Patient Name: ${patientName}\nPatient ID: ${patientId}`}</Typography>
            </Paper>
            <Paper>
                <Typography paddingTop={4}>{`${hours}:${minutes} ${halfDay}`}</Typography>
            </Paper>
        </Stack>
        {/* <Slider track={false} marks={marks} sx={{ width: "90%" }}/> */}
        <Stack direction="row" spacing={3} paddingTop={25}>
            {prescriptionData !== undefined && prescriptionData.map((item, index) => {
                let text = "";
                const pillNames = Object.keys(item);
                for (let i = 0; i < pillNames.length; i++) {
                    text += item[pillNames[i]] + "x " + pillNames[i];
                    if (i !== pillNames.length - 1) {
                        text += "\n";
                    }
                }
                return <Prescription key={index} num={index + 1} prescriptionText={text} onPrescriptionClick={onPrescriptionClick}/>
            })}
        </Stack>
    </Stack>
  );
}
