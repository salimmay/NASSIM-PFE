import { createContext,useContext,useReducer,useState } from "react";
import Snackbar from "../UI/Snackbar";

export const SnackBarContext = createContext()

export const SnackBarContextProvider = ({ children }) => {

    const [open,setOpen] = useState(false);
    const [message,setMessage] = useState("");
    const [color,setColor] = useState("blue");

    function ShowMessage(message,color,time)
    {
        setMessage(message)
        setColor(color)
        setOpen(true)
        
        setTimeout(
            ()=>{
                setOpen(false);
            },time*1000
        )
    }

    return (
        <SnackBarContext.Provider value={{ShowMessage }}>
        { children }
        <>
            <Snackbar
                    message={message}
                    color={color}
                    time={4}
                    open={open}
                    close={()=>setOpen(false)}
                />

        </>
        </SnackBarContext.Provider>
    )
  }
