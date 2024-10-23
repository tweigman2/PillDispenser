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
  // Corresponds to the 0-indexed row of what patient is selected on the Patients page
  const [patientId, setPatientId] = useState(-1);
  const [patientName, setPatientName] = useState("");

  const login = (event) => {
    if (username === "jackie" && password === "1234") {
      console.log("Logged in!");
      setPageNumber(1);
      setUsername("");
      setPassword("");
    }
  };

  const onLogoutClick = (event) => {
    setPageNumber(0);
  }

  const onPatientNextClick = (event) => {
    setPageNumber(2);
  }

  const onPrescriptionClick = (event) => {
    setPageNumber(3);
  }


  let currentPage; 

  let patientProps = {
    selected: patientId,
    setSelected: setPatientId,
    onPatientNextClick: onPatientNextClick,
    onLogoutClick: onLogoutClick,
    setPatientName: setPatientName,
  };

  let prescriptionProps = {
    patientName: patientName,
    patientId: patientId,
    onPrescriptionClick: onPrescriptionClick
  };

  switch (pageNumber) {
    case 0: 
      currentPage = <Login 
        onLogin={login}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />;
      break;
    case 1: 
      currentPage = <Patients {...patientProps}/>;
      break;
    case 2:
      currentPage = <Prescriptions {...prescriptionProps}/>;
      break;
    case 3:
      currentPage = <Dispense />;
      break;
    default: 
      break;
  }
  return (
    <>
      {currentPage}
    </>
  );
}
