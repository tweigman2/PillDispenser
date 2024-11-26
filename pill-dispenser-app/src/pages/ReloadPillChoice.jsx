import '../App.css';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createTheme, ThemeProvider } from '@mui/material';

export default function ReloadPillChoice({onReloadBackClick, onReloadChoiceClick, pillsInModules, setPillsInModules}) {

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={onReloadBackClick}>Back</Button>
        <Typography variant="h4" alignItems="center">Reload Pill</Typography>
        <div></div>
      </Stack>
      <Stack spacing={2} alignItems="center">
        <Typography variant="body1">
            Please select one of the pills below that you would like to restock.
        </Typography>
        <Stack direction="row" spacing={10} alignItems="center">
          <Stack alignItems="center" onClick={() => onReloadChoiceClick(1)}>
            <Typography variant="body1">
              Module 1 - Caffeine
            </Typography>
            <img
              src="/images/caffeine_pic.jpg"
              alt="Caffeine"
              style={{width: '300px', height: '225px'}}
            />
          </Stack>
          <Stack alignItems="center" onClick={() => onReloadChoiceClick(2)}>
            <Typography variant="body1">
              Module 2 - Ibuprofen
            </Typography>
            <img
              src="/images/ibuprofen_pic.jfif"
              alt="Ibuprofen"
              style={{width: '300px', height: 'auto'}}
            />
          </Stack>
          <Stack alignItems="center" onClick={() => onReloadChoiceClick(3)}>
            <Typography variant="body1">
              Module 3 - Tic Tac
            </Typography>
            <img
              src="/images/tic_tac_pic.jpg"
              alt="Tic Tac"
              style={{width: '300px', height: 'auto'}}
            />
            {/* <Typography variant="body1">
              Module 3 - Tylenol
            </Typography>
            <img
              src="/images/tylenol_pic.jpeg"
              alt="Tic Tac"
              style={{width: '300px', height: 'auto'}}
            /> */}
          </Stack>
          <Stack alignItems="center" onClick={() => onReloadChoiceClick(4)}>
            <Typography variant="body1">
              Module 4 - Aspirin
            </Typography>
            <img
              src="/images/aspirin_pic.jpg"
              alt="Aspirin"
              style={{width: '300px', height: 'auto'}}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}