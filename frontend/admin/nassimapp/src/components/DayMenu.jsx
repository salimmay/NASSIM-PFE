import "react-toggle/style.css"

import Toggle from "react-toggle";
import { useState } from "react";
import { Switch } from "@mui/material";
function DayMenu()
{
    const [menuData,setMenuData] = useState([]);
    
    function getMenuData()
    {

    }

    return(
        <>
            <div className="title">Menu Du Jour</div>
            <h1>Disponibilité</h1>
            <div className="list w-auto">
                <div className="p-5">
                    <h1>Pizza</h1>
                    <div className="flex flex-row w-auto content-between p-1 max-w-full items-center">
                        <img className="w-2/12" src="" alt="" />
                        <h1 className="w-5/12">Pizza Napolitaine</h1>
                        <h1 className="w-2/12">12dt</h1>
                        <h1 className="w-2/12">20-25min</h1>
                        <Switch color="warning"  className="w-1/12"/>
                    </div>
                    <h1>burger</h1>
                    <div className="flex flex-row w-auto content-between p-1 max-w-full items-center">
                        <img className="w-2/12" src="" alt="" />
                        <h1 className="w-5/12">BigMac</h1>
                        <h1 className="w-2/12">20dt</h1>
                        <h1 className="w-2/12">20-25min</h1>
                        <Switch color="warning"  className="w-1/12"/>
                    </div>
                </div>
            </div>
        </>
    )
}

function Item()
{
    const [itemId,setItemId] = useState("");
    function setAvilable()
    {
        console.log("SET AVAILABLE 9")
    }

    return(
        <>
            <div className="flex flex-row w-auto content-between p-1 max-w-full">
                <img className="w-2/12" src="" alt="" />
                <h1 className="w-5/12">Pizza Napolitaine</h1>
                <h1 className="w-2/12">17dt</h1>
                <h1 className="w-2/12">20-25min</h1>
                <Switch color="warning"  className="w-1/12"/>
            </div>

        </>
    )
}
export default DayMenu