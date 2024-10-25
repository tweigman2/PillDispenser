import '../App.css';
import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useThemeProps } from '@mui/material';

export default function VerifyDosage({onLogin, setUsername, setPassword, username, password}) {


  return (
    
    <Stack spacing={2}>
      <h1>Verify Dosage</h1>
      <Stack direction="row" spacing={2} alignItems="center">
      <img
        src="/images/tylenol-extra-strength.jpeg"
        alt="Description"
        style={{ width: '200px', height: 'auto' }}
      />
      <Stack>
        <Typography variant="h5">Dispensed: 6 Tylenol</Typography>
        <Typography variant="body1">
          Concentration/Pill : 25 mg
        </Typography>
        <Typography variant="body1">
          Total Dosage : 600 mg
        </Typography>
      </Stack>
    </Stack>

      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Button sx={{ width: "200px" }} variant="contained" >Correct</Button>
        <Button sx={{ width: "200px" }} variant="contained" >Incorrect</Button>
      </Stack>
    </Stack>
  );
}