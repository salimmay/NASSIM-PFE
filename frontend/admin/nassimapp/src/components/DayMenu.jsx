import "react-toggle/style.css"

import Toggle from "react-toggle";
import { useState } from "react";
import { Switch } from "@mui/material";
import useAuthAdmin from "../hooks/useAuth";
import useManageMenu from "../services/ManageMenu";
import { useEffect } from "react";
import axios from "axios";
function DayMenu()
{
    const [menuData,setMenuData] = useState([]);
    const admin = useAuthAdmin();
    const manager = useManageMenu();

    async function getMenuData()
    {
        const data = await manager.GetMenu();
        setMenuData(data)
    }

    useEffect(()=>
    {
        getMenuData();
    },[])
    return(
        <>
            <div className="title">Menu Du Jour</div>
            <h1>Disponibilité</h1>
            <div className="list w-auto">
                <div className="p-5">
                    {
                        menuData && menuData.map(categorie=>(
                            <div>
                                <h1>{categorie.name}</h1>
                                {
                                    categorie.items.map(item=>(
                                        <Item item={item}/>

                                    ))
                                }

                            </div>

                        ))
                    }
                </div>
            </div>
        </>
    )
}
function renderImage(binarystring) 
{
    if(binarystring)
    {

        const uint8Array = new Uint8Array(binarystring.data);
        const blob = new Blob([uint8Array]);
        return URL.createObjectURL(blob);
    }
    else return '';
}

function Item({item})
{

    async function handleChange()
    {
        item.available = !item.available
        await axios.patch("/api/admin/available/"+item._id,{available:item.available});
        
    }
    
    return(
        <>
            <div className="flex flex-row w-auto content-between p-1 max-w-full items-center gap-2">
                <img className="w-2/12 h-full rounded-xl" src={item&&renderImage(item.img)} alt="" />
                <h1 className="w-5/12">{item&&item.name}</h1>
                <h1 className="w-2/12">{item&&item.baseprice} dt</h1>
                <h1 className="w-2/12">{item&&item.time}min</h1>
                <Switch color="warning" checked={item&&item.available} onChange={handleChange}  className="w-1/12"/>
            </div>

        </>
    )
}
export default DayMenu