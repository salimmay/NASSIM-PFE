import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Manage()
{


    return(
        <>
        <Navbar/>
        <section>
        <Sidebar/>
            

        <div className="main">
            <Outlet/>
        </div>

        </section>
        </>
    )
}


import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";
function SimpleAlert({msg,_type}) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <button onClick={()=>handleClick()}>OPEN</button>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
            onClose={handleClose}
            severity={_type}
            variant="filled"
            sx={{ width: '100%' }}
        >
            <h1 className="text-white">
                {msg}
            </h1>
        </Alert>
    </Snackbar>
    </div>
  );
}
