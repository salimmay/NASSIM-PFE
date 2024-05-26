import axios from "axios"
import { useEffect, useState } from "react"

import {MdClose,MdAdd,MdRemove, MdTimer, MdOutlineTimer, MdMonitorHeart, MdThumbUp, MdOutlineThumbUp} from "react-icons/md"
import CartService from "./CartService"
import { IoCaretForward, IoCart } from "react-icons/io5"

function renderImage(binarystring) 
{
    if(binarystring)
    {
        console.log(binarystring)
        const uint8Array = new Uint8Array(binarystring.data);
        const blob = new Blob([uint8Array]);
        return URL.createObjectURL(blob);
    }
    else return '';
}

export default function Modifier({element,setOpen})
{

    const cart = CartService();

    useEffect(()=>{
        
    },[])

    return(
        <div className="h-screen w-screen bg-white">

                <header className="w-full" style={{height:"15%"}}>
                    <MdClose size={"1.5rem"} fill="white" onClick={()=>setOpen(false)} className="fixed top-0 right-0 m-5 size-10" />
                    <img className="h-48 w-full object-cover" src={renderImage(element.img)} alt="" />
                </header>

                <div className="size-full bg-white flex flex-col overflow-y-scroll " style={{height:"75%",borderRadius:"0 20% 0 0"}} >
                    
                    <div className="flex flex-col gap-5 w-full bg-white" >
                        
                        <div className="p-3 rounded-tr-lg">
                            <h3 className="font-bold text-xl capitalize">{element.name}</h3>

                            <div className="flex gap-3">
                                <div className="flex items-center gap-3"><MdOutlineTimer size={"1.5rem"}/> {element.time} </div>
                                <div className="flex items-center gap-3"><MdOutlineThumbUp size={"1.5rem"}/> {element.time} </div>
                            </div>
                            <p>{element.description}</p>
                        </div>

                        <div className="w-full p-2">
                            <h3 className="font-bold text-xl">Selectioner les Modifieurs</h3>
                            {
                                element.modifiers&&element.modifiers.map(e=>(
                                    <Ingridient element={e} />
                                ))
                            }
                        </div>
                    </div>


                </div>

                <div className="flex w-full bg-white p-3" style={{height:"10%"}}>

                    <button className="bg-red-600 text-white fixed bottom-0 left-0 p-4 w-full rounded-xl flex items-center justify-center gap-2" onClick={()=>{cart.AddItem(element);setOpen(false)}}>
                        <IoCart size={"1.5rem"} fill="white" /> Ajouter
                    </button>
                </div>

            
        </div>
    )
}


function Ingridient({element})
{
    function setOn(e)
    {
        element.on = e.target.checked;
    }

    return(
        <label htmlFor={element._id} className="w-full p-4"> 
        <div className="w-full p-4 flex border-b-2 justify-between items-center">
            <div className="text-lg w-9/12">{element.name}</div>
            <div className="text-lg w-3/12">+{element.price}dt</div>
            <input type="checkbox" className="size-5" id={element._id} onChange={setOn}/>
        </div>
        </label>
    )
}