import './App.css';
import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useThemeProps } from '@mui/material';

export default function ErrorDetected() {


  return (
    
    <Stack spacing={2}>
      <h1>Error Detected</h1>

      <Typography variant="body1">
        Error Message 1
      </Typography>

      <Typography variant="body1">
        or
      </Typography>

      <Typography variant="body1">
        Error Message 2
      </Typography>

      <Button sx={{ width: "200px" }} variant="contained" >Clear Error</Button>      
    </Stack>
  );
}