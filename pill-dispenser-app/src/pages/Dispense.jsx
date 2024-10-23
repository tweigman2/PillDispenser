import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Paper, Slider, Typography } from '@mui/material';

export default function Dispense() {

  return (
    <Stack>
        <h1>Dispensing</h1>
        <Stack direction="row">
            <img src={"tylenol-8hr.png"} width={288} height={216} />
            <Paper>
                Dispensing: 2 Tylenol
                <Paper sx={{whiteSpace: "pre-wrap"}} elevation={2}>
                    <Typography borderBottom={1}>{"Pill Information"}</Typography>
                    <Typography>{"Concentration/Pill: 100 mg\nTotal Dosage: 500 mg"}</Typography>
                </Paper>
            </Paper>
        </Stack>
    </Stack>
  );
}
