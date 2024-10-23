import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Login({onLogin, setUsername, setPassword, username, password}) {

  return (
    <Stack spacing={2}>
      <h1>Authorization</h1>
      <TextField label="Username" variant="outlined" value={username}
        onChange={(event) => {
          console.log(username);
          setUsername(event.target.value);
        }}
      />
      <TextField label="Password" variant="outlined" value={password} type="password"
        onChange={(event) => {
          console.log(password);
          setPassword(event.target.value);
        }}
      />
      <Stack sx={{ alignItems: "center" }}>
        <Button sx={{ width: "200px" }} variant="contained" onClick={onLogin}>Log In</Button>
      </Stack>
    </Stack>
  );
}
