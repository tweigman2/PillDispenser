import './App.css';
import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Patients from './Patients';

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    if (username === "jackie" && password === "1234") {
      console.log("Logged in!");
    }
  };

  return (
    <Patients></Patients>
  );
}
