
import { MdClose } from "react-icons/md";
import CartService from "./CartService";
import axios from "axios";


import { MdDeleteOutline ,MdAdd,MdRemove} from "react-icons/md";
import { useEffect,useReducer,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function Cart({setOpen})
{

    const params = useParams();

    const cart = CartService();
    const [items,setItems] = useState([])

    const [total,setTotal] = useState(0)    

    function GetTotal()
    {
        const list = cart.GetCart();
        var t = 0
        if(list)
        list.forEach(item=>
            {
                t+=item.baseprice;
            });
            setTotal(t)
        return t;
    }
    
    const navigator = useNavigate();
    
    async function Checkout()
    {
        const URL ="/api/shop";
        const list = items;
        const userId = params.shopid;
        const table = params.table;

        localStorage.removeItem("cart");
        setOpen(false)
        const request = {userId,table,list}
        console.log(request)
        
        if(list && list.length>0)
        {
            const response = await axios.post(URL+"/checkout",request);
            const order = response.data;
            await navigator("/confirm/"+userId+"/"+table+"/checkout/"+order._id)
        }else
        {
            setOpen(false)
        }
        
    }

    useEffect(()=>
    {
        const list = cart.GetCart();
        setItems(list);
        console.log(items)
        GetTotal();

    },[])
    
    function Delete(_item)
    {
        const newItems = items.filter(item => item.objectId !== _item.objectId);
        cart.SaveCart(newItems);   
        setItems(newItems);
        GetTotal();
    }

    return(
        <>
            <div className=" size-full bg-white">
                
                <header className="p-4 flex flex-row items-center justify-between border-b-2 h-20" style={{height:"10%"}} >
                    <h1 className="title">Cart</h1>
                    <MdClose size={"2rem"} onClick={()=>setOpen(false)} />
                </header>

                <div className="flex flex-col gap-2 bg-gray-100 p-2 overflow-y-scroll" style={{height:"70%"}}>
                    {
                        items?
                        (
                            items.map((item,index)=>(
                            <CartItem key={index} item={item} Delete={()=>{Delete(item)}}/>
                        ))
                        ):
                        (
                            <>Ajouter des element au cart</>
                        )
                    }
                </div>

                <div className="flex flex-col gap-2 p-2 items-center justify-center mt-auto bg-red-100 h-32 " style={{height:"20%"}}>
                    <h3 className="font-bold">total {total}dt</h3>
                    <button className="bg-red-600 p-4 text-white rounded-2xl w-full" onClick={Checkout}>Checkout</button>
                </div>

            </div>
        </>
    )
}

function renderImage(itemData) 
{
    const uint8Array = new Uint8Array(itemData.img.data);
    const blob = new Blob([uint8Array]);
    return URL.createObjectURL(blob);
}

function CartItem({item,Delete})
{
    const [counter,setCounter] = useState(1);

    const [itemData,setItemData] = useState({});
    async function getData()
    {
        const response = await axios.get("/api/shop/item/"+item._id);
        setItemData(response.data);
    }
    
    useEffect(()=>
    {
        getData();
    },[]);
    

    return(
        <>
        <div className="flex bg-white rounded-xl">
            <div className="w-3/12">
                <img className="h-20 rounded-3xl " src="" alt="" />
            </div>


            <div className="flex flex-col gap-2 p-4 w-8/12">
                <h2 className="font-bold">{itemData.name}</h2>
                <div className="flex items-center gap-2">


                    <h2>{itemData.baseprice}dt</h2>
                    <div className="flex items-center">
                        
                        <button className="p-1">
                            <MdAdd onClick={()=>{
                                setCounter(counter+1);
                                item.counter = counter;
                            }
                                }/>
                        </button>

                        <div className="p-1">{counter}</div>
                        <button className="p-1">
                            <MdRemove onClick={()=>{
                                setCounter(counter-1);
                                item.counter = counter;
                            }
                                }/>

                        </button>

                    </div>

                    <h2>{itemData.baseprice * counter}dt</h2>

                </div>
            </div>

            <div className="w-1/12 flex gap-1 items-center">
                <MdDeleteOutline size={"1.5rem"} onClick={Delete}/>
            </div>

        </div>
        </>
    )
}