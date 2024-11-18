import { Typography } from '@mui/material';
import '../App.css';
import Stack from '@mui/material/Stack';
import React, { useEffect } from 'react';


const pageDuration = 5000; //5000 milliseconds

export default function ThankYou({afterThankYou}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // After 5 seconds, advance to the next page
      afterThankYou();
    }, pageDuration);
  
    // Cleanup the timer on unmount or if page changes to avoid memory leaks
    return () => clearTimeout(timer);
  });

  return (
    <Stack spacing={2} alignItems="center" justifyContent="center" height="90vh">
      <img
          src="/images/logo2.png"
          alt="Description"
          style={{ width: '200px', height: 'auto' }}
      />
      <Typography variant="h4">Thank You!</Typography>
    </Stack>
  );
}