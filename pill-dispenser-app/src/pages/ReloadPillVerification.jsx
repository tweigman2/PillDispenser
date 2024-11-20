import '../App.css';
import * as React from 'react';
import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ReloadPillVerification({onReloadCompleteClick, moduleBeingReloaded}) {
  useEffect(() => {
    window.api.sendCommand("src/firmware/i2c", ["w", 23, 0x80]);
  });

  let pillText = "";
  let imagePath = "";

  switch (moduleBeingReloaded) {
    case 1:
      pillText = "Module 1 - Caffeine";
      imagePath = "/images/caffeine_pic.jpg";
      break;
    case 2:
      pillText = "Module 2 - Ibuprofen";
      imagePath = "/images/ibuprofen_pic.jfif";
      break;
    case 3:
      pillText = "Module 3 - Tic Tac";
      imagePath = "/images/tic_tac_pic.jpg";
      break;
    case 4:
      pillText = "Module 4 - Aspirin";
      imagePath = "/images/aspirin_pic.jpg";
      break;
  }

  return (
    <Stack spacing={2} alignItems="center">
      <h1>Reload Pill</h1>
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack alignItems = "center">
          <Typography variant="body1">{pillText}</Typography>
          <img
            src={imagePath}
            alt="Description"
            style={{ width: '200px', height: 'auto' }}
          />
        </Stack>
        <Typography variant="h5">Reload the illuminated pill module and hit the reload complete button.</Typography>
      </Stack>

      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Button sx={{ width: "200px" }} variant="contained" onClick={onReloadCompleteClick}>Reload Complete</Button>
      </Stack>
    </Stack>
  );
}