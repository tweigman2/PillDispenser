import './App.css';
import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Patients from './Patients';
import Login from './Login';
import VerifyDosage from './VerifyDosage';
import ThankYou from './ThankYou';
import ErrorDetected from './ErrorDetected';
import ReloadPillChoice from './ReloadPillChoice';
import ReloadPillVerification from './ReloadPillVerification';

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const login = (event) => {
    if (username === "jackie" && password === "1234") {
      console.log("Logged in!");
      setPageNumber(1);
    }
  };


let currentPage; 

  switch (pageNumber) {
    case 0: 
      currentPage = <Login 
      onLogin={login}
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      />
    break;
    case 1: 
      currentPage = <Patients/>
    break;
    case 2:
    break;
    deafult: 
    break;
  }
  return (
    //<>{currentPage}</>
    <ReloadPillChoice/>
  );
}
