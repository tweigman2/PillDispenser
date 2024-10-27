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