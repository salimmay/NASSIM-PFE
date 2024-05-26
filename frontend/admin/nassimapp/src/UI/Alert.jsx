import { Modal } from "@mui/material"

export default function Alert({message,confirm,cancel,open,setOpen})
{
    return(
        <>
		<Modal
            className="flex justify-center items-center"
			open={open}
			onClose={()=>setOpen(false)}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description">

            <div className="bg-white rounded-xl">
                <h1 className="p-3 border-b-2 text-xl font-bold">Alert !</h1>
                <div className="p-3">{message} ?</div>
                <div className="flex w-full gap-3 p-3">
                    <button className="w-full p-3 bg-green-500 rounded-xl text-white" onClick={()=>
                    {
                        confirm()
                        setOpen(false)
                    }}>Confirmer</button>
                    <button className="w-full p-3 bg-red-500 rounded-xl text-white" onClick={()=>setOpen(false)}>Annuler</button>
                </div>  
            </div>
        </Modal>
        </>
    )
}