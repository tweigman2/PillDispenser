import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Alert } from '@mui/material';

export default function Login({onLogin, setUsername, setPassword, username, password, alertOpen}) {
  const onPrint = () => {
    // window.api.spawnCmd((value) => {
    //   // let data = new Uint8Array(value);
    //   // console.log(`Output: ${Utf8ArrayToStr(data)}`);
    //   console.log("Value");
    //   console.log(value);
    // })
    console.log(window.api.spawnCmd());
  };

  function Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;
  
    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
      c = array[i++];
      switch(c >> 4)
      { 
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c);
          break;
        case 12: case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++];
          out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
          break;
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++];
          char3 = array[i++];
          out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
          break;
      }
    }
  
    return out;
  }

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
      <Button variant="contained" onClick={onPrint}>Print</Button>
      <Stack sx={{ alignItems: "center" }}>
        <Button sx={{ width: "200px" }} variant="contained" onClick={onLogin}>Log In</Button>
      </Stack>
      {alertOpen && <Alert severity="error">Username or password is incorrect.</Alert>}
    </Stack>
  );
}
