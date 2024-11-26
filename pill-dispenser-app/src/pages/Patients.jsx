import '../App.css';
import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Avatar, Box, Container, createTheme, Icon, IconButton, SvgIcon, ThemeProvider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddPillsIcon from '../addPills.svg';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const patientData = require('../patientData.json');

const theme = createTheme({
  typography: {
    fontSize: 25
  }
});

function createData(name, id) {
  return { name, id };
}

const patientIDs = Object.keys(patientData);
let rows = [];
for (let i = 0; i < patientIDs.length; i++) {
  rows.push(createData(patientData[patientIDs[i]].name, parseInt(patientIDs[i])));
}

function PatientTable({selected, setSelected, setPatientName}) {
  const handleClick = (event, id, name) => {
    let newSelected = -1;
    if (selected !== id) {
      newSelected = id;
      setPatientName(name);
    } else {
      setPatientName("");
    }
    setSelected(newSelected);
  };
  return (
    <div className="patient-table">
      <TableContainer component={Paper} sx={{width: "80%", marginLeft: "10%", marginTop: 5}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{width: "50%"}}>Patient Names:</TableCell>
              <TableCell>Patient ID:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isItemSelected = selected === row.id;
              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.id, row.name)}
                  key={row.name}
                  selected={isItemSelected}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default function Patients({selected, setSelected, onPatientNextClick, onLogoutClick, setPatientName, onReloadClick, searchName, setSearchName}) {

  let tableProps = {
    selected,
    setSelected,
    setPatientName,
  };

  const filter = (event) => {
    let text = event.target.value;
    setSearchName(text);
    rows = [];
    for (let i = 0; i < patientIDs.length; i++) {
      if (patientData[patientIDs[i]].name.toLowerCase().includes(text.toLowerCase()) || patientIDs[i].toLowerCase().includes(text.toLowerCase())) {
        rows.push(createData(patientData[patientIDs[i]].name, parseInt(patientIDs[i])));
      }
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2}>
        <Stack direction="row">
          <div>
            <TextField label="Patient Search Bar" variant="outlined" value={searchName}
              onChange={filter}
            />
          </div>
          <Button onClick={onReloadClick} variant="contained" startIcon={
            <Avatar src={AddPillsIcon}/>
          } sx={{marginLeft: "23.5%"}}>
            Reload Pills
          </Button>
          <Button variant="contained" onClick={onLogoutClick} sx={{marginLeft: "35.5%"}}>Logout</Button>
        </Stack>
        <PatientTable {...tableProps}/>
        <Box textAlign="center" paddingTop={20}>
          <Button variant="contained" disabled={selected === -1} onClick={onPatientNextClick}>Select Patient Prescription</Button>
        </Box>
      </Stack>
    </ThemeProvider>
  );
}