import './App.css';
import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useThemeProps } from '@mui/material';

export default function ReloadPillVerification() {


  return (
    
    <Stack spacing={2} alignItems="center">
      <h1>Reload Pill</h1>
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack alignItems = "center">
          <Typography variant="body1">
            Module 1 - Tylenol
          </Typography>
          <img
            src="/images/tylenol-extra-strength.jpeg"
            alt="Description"
            style={{ width: '200px', height: 'auto' }}
          />
        </Stack>
        <Typography variant="h5">Reload the illuminated pill module and hit the reload complete button.</Typography>
      </Stack>

      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Button sx={{ width: "200px" }} variant="contained">Reload Complete</Button>
      </Stack>
    </Stack>
  );
}