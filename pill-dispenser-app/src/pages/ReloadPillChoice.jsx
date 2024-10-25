import '../App.css';
import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useThemeProps } from '@mui/material';

export default function ReloadPillChoice() {


  return (
    
    <Stack spacing={2} alignItems="center">
      <h1>Reload Pill</h1>
      <Typography variant="body1">
          Please select one of the pills below that you would like to restock.
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack alignItems="center">
          <Typography variant="body1">
            Module 1 - Tylenol
          </Typography>
          <img
          src="/images/tylenol-extra-strength.jpeg"
          alt="Tylenol"
          style={{ width: '200px', height: 'auto' }}
          />
        </Stack>
        <Stack alignItems="center">
          <Typography variant="body1">
            Module 2 - Ibuprofen
          </Typography>
          <img
            src="/images/ibu.jpeg"
            alt="Ibuprofen"
            style={{width: '200px', height: 'auto'}}
          />
        </Stack>
        <Stack alignItems="center">
          <Typography variant="body1">
            Module 3 - Claritin
          </Typography>
          <img
            src="/images/claritin.jpeg"
            alt="Claritin"
            style={{width: '200px', height: 'auto'}}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}