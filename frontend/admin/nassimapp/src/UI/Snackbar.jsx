import {MdClose} from "react-icons/md"
function Snackbar({message,color,open,close})
{
    //const[open,setOpen] = useState(true);
    return(
        
            open?(
                <div className="fixed gap-3 z-50 bottom-0 m-6 p-6 text-white rounded-xl flex items-center justify-between" style={{background:color}}>
                    <div className="text-white">{message}</div>
                    <button onClick={close}>
                        <MdClose size={"1.5rem"}/>
                    </button>
                </div>

            ):(
                <></>
            )
        
    )
}

export default Snackbar