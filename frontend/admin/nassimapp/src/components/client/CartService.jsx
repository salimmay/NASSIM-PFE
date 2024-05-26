import axios from "axios"
import { useState } from "react"

export default function CartService()
{
    const [items,setItems] = useState([])
    
    
    function GetCart()
    {
        const raw = localStorage.getItem("cart");
        return JSON.parse(raw)
    }
    
    function SaveCart(items)
    {
        const list = items;
        
        localStorage.setItem("cart",JSON.stringify(list))
    }


    let list = [];
    function AddItem(element)
    {
        const {_id,name,baseprice,modifiers} = element;
        const raw = localStorage.getItem("cart");
        const objectId = element._id + Date.now().toString();

        if(raw)
            list = JSON.parse(raw)
            
        list.push({_id,name,baseprice,objectId,modifiers})
        localStorage.setItem("cart",JSON.stringify(list));
    }


    function UpdateItem({id,item})
    {

    }

    function GetTotal(items)
    {
        var t = 0
        items.forEach(item=>
            {
                t+=item.baseprice;
            });
        return t;
    }

    function Checkout()
    {
        
    }

    return({AddItem,UpdateItem,GetCart,GetTotal,SaveCart})
}