import '../App.css';
import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Icon, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Search from '@mui/icons-material/Search';
import addPills from '../addPills.svg';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, id) {
  return { name, id };
}

const rows = [
  createData("Adam Adams", 1243),
  createData("Billy Bob", 8947),
  createData("Cassie Cassandra", 1324),
  createData("Daniella Daniels", 3423)
];

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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Patient Names:</TableCell>
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

export default function Patients({selected, setSelected, onPatientNextClick, onLogoutClick, setPatientName}) {
  const [searchName, setSearchName] = useState("");

  let tableProps = {
    selected: selected,
    setSelected: setSelected,
    setPatientName: setPatientName
  };
  
  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{justifyContent: "space-between"}}>
        <div>
          <TextField label="Patient Search Bar" variant="outlined" value={searchName}
            onChange={(event) => {
              setSearchName(event.target.value);
            }}
          />
          <IconButton>
            <SearchIcon></SearchIcon>
          </IconButton>
        </div>
        <IconButton>
          <Icon>
            <img src={addPills} height={25} width={25}/>
          </Icon>
        </IconButton>
        <Button variant="contained" onClick={onLogoutClick}>Logout</Button>
      </Stack>
      <PatientTable {...tableProps}/>
      <Button variant="contained" disabled={selected === -1} onClick={onPatientNextClick}>Next</Button>
    </Stack>
  );
}