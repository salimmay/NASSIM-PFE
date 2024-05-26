import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BiStopwatch,BiSearch,BiCart } from "react-icons/bi";

import { MdAdd,MdRemove } from "react-icons/md";
import { BiHeart,BiSolidHeart } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

import Cart from "../components/client/Cart"

import { Modal } from "@mui/material";

import useUserService from "../services/UserService";
import Modifier from "../components/client/Modifier";

function MenuPage()
{
    const shop = useUserService();

    
    const [shopData,setShopData] = useState({})
    const[menuData,setMenuData] = useState([]);
    
    const params = useParams();
    
    const [modifierOpen, setModifierOpen] = useState(false);
    const[cartOpen,setCartOpen] = useState(false);
    const[selectedItem,setSelectedItem] = useState(false);
    
    
    async function getMenu()
    {
        const data =await shop.GetMenu();
        setShopData(data.shop)
        setMenuData(data.menu.categories)
    }   

    useEffect(()=>
    {
        getMenu()
    },[])


    return(
        <>
        <button className="cart" style={{background:shopData.primarycolor}} onClick={()=>setCartOpen(true)}>
            <BiCart size={"1.5rem"} fill={shopData.secondarycolor} color="white"/>
        </button>

        <Modal
            open={modifierOpen}
            setOpen={setModifierOpen}
            shopData = {shopData}
        >
            <Modifier element={selectedItem} setOpen={setModifierOpen} />
        </Modal>

        <Modal
            open={cartOpen}
            setOpen={setCartOpen}
        >
        <Cart setOpen={setCartOpen}/>
        </Modal>
        
            

            <img className="w-screen h-48  top-0 left-0 z-auto" src={renderImage(shopData.cover)} alt="" />

            <div className="p-4 flex flex-col gap-2 bg-white rounded-xl z-40">

{/*                 <div className="flex p-2 items-center gap-2 border-2 m-3 rounded-xl" >
                    <BiSearch size={"1.5rem"}/>
                    <input type="text" placeholder="Que pouvons-nous vous offrir" className="p-3 bg-white"/>
                </div> */}

                <img src={renderImage(shopData.logo)} alt="" className="rounded-full size-32 border-2"/>
                <h1 className="font-bold text-xl">Bienvenu a {shopData.shopname}</h1>
                <h1 className="text-xl">commande pour la table numero {params.table}</h1>

            </div>


            <div className="w-screen">

                <div className="text-xl p-2">List des categories</div>
                <div className="flex gap-2 w-100 overflow-x-scroll p-2" >
                {
                    menuData && menuData.map((e,index) => (
                        <a className="p-2 border-2 rounded-xl gap-2 " key={index} href={"#"+e._id}>
                            <div className="font-bold text-center capitalize">{e.name}</div>
                        </a>
                    ))
                }
                </div>

                {
                    menuData && menuData.map((e,index) => (
                        <div key={index} className="flex flex-col gap-4" id={e._id}>
                            <div className="flex items-center gap-3 p-2">
                                <h2 className="text-2xl font-bold p-2 capitalize">{e.name}</h2>
                            </div>
                            {
                                e.items.length>0?(
                                    <>
                                    {
                                        e.items.map((element,index)=>(
                                            <Card 
                                            key={index} 
                                            setOpen={setModifierOpen} 
                                            primarycolor={shopData.primarycolor}
                                            select={()=>{
                                                setSelectedItem(element);
                                                setModifierOpen(true)
                                            }} item={element} />
                                        ))
                                    }
                                    </>
                                ):(
                                    <>
                                    <div className="p-4">No Items To Show</div>
                                    </>
                                )
                            }
                        </div>
                    ))
                }
            </div>    
        </>
    )
}

export default MenuPage

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

function Card({item,setOpen,select,primarycolor})
{

    return(
        <>
        <div className="flex flex-col border-b-2 m-2 rounded-xl overflow-hidden" onClick={item.available?(select):(()=>{})} 
        
        style={
            item.available?({opacity:1}):({opacity:0.3})
        }
        >
{/*          <img className="h-32 w-full object-cover" src={item.image? (item.image.data):("")}  alt="" /> */}

            <img className="h-32 w-full object-cover" src={renderImage(item.img)}  alt="" />
            
            <div className="p-2 flex flex-col">
                <h1 className="font-bold">{item.name}</h1>
                <div className="flex justify-between p-1">
                    <p className="flex">
                        <BiStopwatch size={"1.5rem"} /> 20-25min
                    </p>
                    <h2>{item.baseprice}dt</h2>
                    <div className="flex">
                        <BiSolidHeart fill={primarycolor} size={"1.5rem"} /> 91%
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}