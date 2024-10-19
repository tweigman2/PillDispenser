import './App.css';
import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Patients() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [patientName, setPatientName] = useState("");

  const login = (event) => {
    if (username === "jackie" && password === "1234") {
      console.log("Logged in!");
    }
  };

  return (
    <TextField label="Patient Search Bar" variant="outlined" value={patientName}
      onChange={(event) => {
        setPatientName(event.target.value);
        console.log(patientName);
      }}
    />
  );
}