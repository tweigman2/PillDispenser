import './App.css';
import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    if (username === "jackie" && password === "1234") {
      console.log("Logged in!");
    }
  };

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
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
        <Button sx={{ width: "200px" }} variant="contained" onClick={login}>Log In</Button>
      </Stack>
    </Stack>
  );
}
