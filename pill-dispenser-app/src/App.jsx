import './App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Patients from './pages/Patients';
import Login from './pages/Login';
import VerifyDosage from './pages/VerifyDosage';
import ThankYou from './pages/ThankYou';
import ReloadPillChoice from './pages/ReloadPillChoice';
import ReloadPillVerification from './pages/ReloadPillVerification';
import Prescriptions from './pages/Prescriptions';
import Dispense from './pages/Dispense';
import { createTheme, ThemeProvider } from '@mui/material';
const loginInfo = require('./login.json');
const patientData = require('./patientData.json');
const alertDuration = 5000; // 5000 ms

let initialized = false;

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginAlertOpen, setLoginAlertOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  // Corresponds to the 0-indexed row of what patient is selected on the Patients page
  const [patientId, setPatientId] = useState(-1);
  const [patientName, setPatientName] = useState("");
  const [prescriptionNumber, setPrescriptionNumber] = useState(-1);
  const [pillNumber, setPillNumber] = useState(0);
  const [numTypePills, setNumTypePills] = useState(-1);
  const [scaleWeight, setScaleWeight] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [startDispensing, setStartDispensing] = useState(false);
  const [pillsInModules, setPillsInModules] = useState([]);
  const [moduleBeingReloaded, setModuleBeingReloaded] = useState(-1);

  useEffect(() => {
    if (!initialized) {
      initialized = true;
      window.api.sendCommand("src/firmware/power_on_scale");
      window.api.sendCommand("cat", ["/dev/ttyUSB0"]);
      window.api.onOutput((data) => {
        if (data.includes("g")) {
          data = data.replace(/\s/g, "").replace("g", "");
          console.log("Output:", data);
          setScaleWeight(data);
        }
      });
    }
  });

  const theme = createTheme({
    typography: {
      fontSize: 40
    }
  });

  const login = (event) => {
    if (loginInfo.hasOwnProperty(username) && loginInfo[username] === password) {
      setPageNumber(1);
    } else if (username !== "" && password !== "" && !loginAlertOpen) {
      setLoginAlertOpen(true);
      setTimeout(() => {
        setLoginAlertOpen(false);
      }, alertDuration);
    }
  };

  const onLogoutClick = (event) => {
    setPageNumber(0);
    setUsername("");
    setPassword("");
  }

  const onPatientNextClick = (event) => {
    setPageNumber(2);
  }

  const onPrescriptionClick = (number) => {
    setPrescriptionNumber(number);
    setNumTypePills(Object.keys(patientData[patientId].prescriptions[number]).length);
    setPageNumber(3);
  }
  
  const onDispenseClick = () => {
    setPageNumber(4);
    setStartDispensing(false);
  }

  const onCorrectDosageClick = () => {
    if (pillNumber === numTypePills - 1) {
      setPageNumber(5);
      setPillNumber(0);
      setPatientId(-1);
    } else {
      setPageNumber(3);
      setPillNumber(pillNumber + 1);
    }
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

  const onReloadChoiceClick = (moduleNumber) => {
    setPageNumber(7);
    setModuleBeingReloaded(moduleNumber);
  }

  const onReloadCompleteClick = () => { 
    setPageNumber(1);
    window.api.sendCommand("src/firmware/i2c", ["w", 23, 0]);
  }


  let currentPage; 

  let verifyDosageProps ={
    onCorrectDosageClick,
    prescriptionNumber,
    patientName,
    patientId,
    pillNumber
  }

  let dispenseProps = {
    onDispenseClick,
    prescriptionNumber,
    patientName,
    patientId,
    pillNumber,
    scaleWeight,
    startDispensing,
    setStartDispensing
  }

  let patientProps = {
    selected: patientId,
    setSelected: setPatientId,
    onPatientNextClick,
    onLogoutClick,
    setPatientName,
    onReloadClick,
    searchName,
    setSearchName
  };

  let prescriptionProps = {
    patientName,
    patientId,
    onPrescriptionClick,
    onPrescriptionBackClick
  };

  let thankYouProps = {
    afterThankYou
  }

  let reloadProps = {
    onReloadBackClick,
    onReloadChoiceClick,
    pillsInModules,
    setPillsInModules
  }

  let reloadActionProps = {
    onReloadCompleteClick,
    moduleBeingReloaded
  }

  switch (pageNumber) {
    case 0: 
      currentPage = <Login 
        onLogin={login}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        alertOpen={loginAlertOpen}
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
    <ThemeProvider theme={theme}>{currentPage}</ThemeProvider>
  );
}
