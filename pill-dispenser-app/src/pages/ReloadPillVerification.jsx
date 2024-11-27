import '../App.css';
import * as React from 'react';
import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ReloadPillVerification({onReloadCompleteClick, moduleBeingReloaded}) {

  let pillText = "";
  let imagePath = "";
  let i2c_address = 23;

  switch (moduleBeingReloaded) {
    case 1:
      pillText = "Module 1 - Caffeine";
      imagePath = "/images/caffeine_pic.jpg";
      i2c_address = 23;
      break;
    case 2:
      pillText = "Module 2 - Ibuprofen";
      imagePath = "/images/ibuprofen_pic.jfif";
      i2c_address = 26;
      break;
    case 3:
      pillText = "Module 3 - Tic Tac";
      imagePath = "/images/tic_tac_pic.jpg";
      i2c_address = 25;
      break;
    case 4:
      pillText = "Module 4 - Aspirin";
      imagePath = "/images/aspirin_pic.jpg";
      i2c_address = 24;
      break;
  }

  useEffect(() => {
    window.api.sendCommand("src/firmware/i2c", ["w", i2c_address, 0x80]);
  });

  return (
    <Stack spacing={15} alignItems="center">
      <Typography variant="h4">Reload Pill</Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack paddingLeft={8}>
          <Typography variant="body1">{pillText}</Typography>
          <img
            src={imagePath}
            alt="Description"
            style={{ width: '300px', height: 'auto' }}
          />
        </Stack>
        <Typography variant="h5" paddingLeft={10}>Reload the illuminated pill module and hit the reload complete button.</Typography>
      </Stack>

      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Button variant="contained" onClick={onReloadCompleteClick}>Reload Complete</Button>
      </Stack>
    </Stack>
  );
}