import './App.css';
import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Patients from './pages/Patients';
import Login from './pages/Login';
import VerifyDosage from './pages/VerifyDosage';
import ThankYou from './pages/ThankYou';
import ErrorDetected from './pages/ErrorDetected';
import ReloadPillChoice from './pages/ReloadPillChoice';
import ReloadPillVerification from './pages/ReloadPillVerification';
import Prescriptions from './pages/Prescriptions';
import Dispense from './pages/Dispense';

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
  
  const onDispenseClick = () => {
    setPageNumber(4);
  }

  const onCorrectDosageClick = () => {
    setPageNumber(5);
  }

  const onPrescriptionBackClick = () => {
    setPageNumber(1);
  }

  const afterThankYou = () => {
    setPageNumber(1);
  }
  
  const onReloadClick = () => {
    setPageNumber(6);
  }

  const onReloadBackClick = () => {
    setPageNumber(1);
  }

  const onReloadChoiceClick = () => {
    setPageNumber(7);
  }

  const onReloadCompleteClick = () => { 
    setPageNumber(1);
  }


  let currentPage; 

  let verifyDosageProps ={
    onCorrectDosageClick: onCorrectDosageClick
  }

  let dispenseProps = {
    onDispenseClick: onDispenseClick
  }

  let patientProps = {
    selected: patientId,
    setSelected: setPatientId,
    onPatientNextClick: onPatientNextClick,
    onLogoutClick: onLogoutClick,
    setPatientName: setPatientName,
    onReloadClick: onReloadClick
  };

  let prescriptionProps = {
    patientName: patientName,
    patientId: patientId,
    onPrescriptionClick: onPrescriptionClick,
    onPrescriptionBackClick: onPrescriptionBackClick
  };

  let thankYouProps = {
    afterThankYou: afterThankYou
  }

  let reloadProps = {
    onReloadBackClick: onReloadBackClick,
    onReloadChoiceClick: onReloadChoiceClick
  }

  let reloadActionProps = {
    onReloadCompleteClick: onReloadCompleteClick
  }

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
      currentPage = <Dispense {...dispenseProps}/>;
      break;
    case 4: 
      currentPage = <VerifyDosage {...verifyDosageProps}/>
      break;
    case 5:
      currentPage = <ThankYou {...thankYouProps}/>
      break;
    case 6:
      currentPage = <ReloadPillChoice {...reloadProps}/>
      break;
    case 7: 
      currentPage = <ReloadPillVerification {...reloadActionProps}/>
      break;
    case 8:
      break;
    default: 
      break;
  }
  return (
    <>{currentPage}</>
    //<Prescriptions/>
  );
}
