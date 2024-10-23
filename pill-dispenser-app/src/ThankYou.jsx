import './App.css';
import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useThemeProps } from '@mui/material';

export default function ThankYou({onLogin, setUsername, setPassword, username, password}) {


  return (
    <Stack spacing={2} alignItems="center">
    <img
        src="/images/logo2.png"
        alt="Description"
        style={{ width: '200px', height: 'auto' }}
    />
    <h1>Thank You!</h1>
    </Stack>
  );
}