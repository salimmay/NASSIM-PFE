import * as React from 'react';
import Modal from '@mui/material/Modal';
//import Button from '@mui/material/Button';

//import Box from '@mui/material/Box';
//import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({children,button,modalOpen,setModalOpen}) 
{
    const [open, setOpen] = React.useState(false);

    /*
    React.useEffect(()=>
    {
        setOpen(modalOpen)
    },[modalOpen])
    */

    return (
        <div>
            
            <div onClick={()=>{
                //setOpen(true)
                setModalOpen(true)
                }}>
                {button}
            </div>

            <Modal
                open={modalOpen}
                onClose={()=>{setModalOpen(close)}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='flex justify-center items-center'
            >
                <>
                    {children}
                </>

            </Modal>
        </div>
    );
}
