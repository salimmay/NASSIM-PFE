import { useParams } from "react-router-dom"
import confirm from "../assets/conf.png"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Checkout()
{
    const params = useParams();
    const [order,setOrder] = useState({})

    async function GetData()
    {
        const response = await axios.get("http://localhost:8080/shop/order/"+params.orderid);
        setOrder(response.data)

    }
    useEffect(()=>
    {
        GetData();
    },[])

    return(
        <div className="p-6 h-screen w-screen flex flex-col justify-between items-center">

            <a href="/"></a>
            <div className="flex flex-col gap-6 ">
                <div className="capitalize text-xl text-green-500">commande confirmee</div>
                <div className=" flex justify-between w-full">
                    <div className="font-bold text-l">récap de la commande</div>
                    <div className="font-bold text-l">commande No. #{order._id}</div>

                </div>

                <img src={confirm} className="h-4/6" alt="" />

                <div className="flex">
                    <div className="w-5/12">num table</div>
                    <div className="w-5/12">{order.table}</div>
                </div>
                <div className="flex">
                    <div className="w-5/12">temps estimé</div>
                    <div className="w-5/12">35min</div>
                </div>
                <div className="flex">
                    <div className="w-5/12">montant à payer</div>
                    <div className="w-5/12">{order.total} dt</div>
                </div>

            </div>

            <button className="w-full bg-red-600 p-3 text-white mt-auto rounded-xl">Suivre Ma Commande</button>
        </div>
    )
}