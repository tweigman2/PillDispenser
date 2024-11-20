import '../App.css';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ReloadPillChoice({onReloadBackClick, onReloadChoiceClick}) {


  return (
    <>
      <Stack direction="row" width="100%">
        <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={onReloadBackClick}>Back</Button>
        <Typography variant="h4" alignItems="center">Reload Pill</Typography>
      </Stack>
      <Stack spacing={2} alignItems="center">
        <Typography variant="body1">
            Please select one of the pills below that you would like to restock.
        </Typography>
        <Stack direction="row" spacing={10} alignItems="center">
          <Stack alignItems="center">
            <Typography variant="body1" onClick={onReloadChoiceClick}>
              Module 1
            </Typography>
          </Stack>
          <Stack alignItems="center">
            <Typography variant="body1" onClick={onReloadChoiceClick}>
              Module 2
            </Typography>
          </Stack>
          <Stack alignItems="center">
            <Typography variant="body1" onClick={onReloadChoiceClick}>
              Module 3
            </Typography>
            {/* <img
              src="/images/claritin.jpeg"
              alt="Claritin"
              style={{width: '200px', height: 'auto'}}
            /> */}
          </Stack>
          <Stack alignItems="center">
            <Typography variant="body1" onClick={onReloadChoiceClick}>
              Module 4
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}