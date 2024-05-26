import axios from "axios";
import { useEffect, useState } from "react";
import { MdInfo,MdCheck,MdClose } from "react-icons/md";
import useAuthAdmin from "../hooks/useAuth";

import BasicModal from "./Modal";

const ManageOrders = ({}) =>
{
    const [orders,setOrders] =useState([])
    const admin = useAuthAdmin();
    const token = admin.getAdminToken();

    async function getOrders()
    {
        const response = await axios.get("http://localhost:8080/admin/orders/"+token.userId)
        const data = response.data;
        setOrders(data)
    }

    async function Delete()
    {
        const response = await axios.delete("http://localhost:8080/admin/order/"+selectedOrder._id)
        const newOrders = orders.filter(item => item._id !== selectedOrder._id);
        setOrders(newOrders)
        setOrderModal(false)
    }
    
    useEffect(()=>
    {
        getOrders();
    },[])


    const [orderModal,setOrderModal] = useState(false);
    const [selectedOrder,setSelectedOrder] = useState([])

    return(
        <>

                <BasicModal 
                    modalOpen={orderModal}
                    setModalOpen={setOrderModal}
                >
                    <div className="bg-white w-3/6 h-5/6 rounded-xl ">

                        <div className="p-3 font-bold border-b-2" style={{height:"10%"}}> Order  for table   {selectedOrder.table}</div>
                        <div className="flex flex-col gap-2 h-4/5 overflow-y-scroll" height={{height:"80%"}}>
                            {
                                selectedOrder.items&&selectedOrder.items.map((item,index)=>(
                                    <div className="border-b-2 p-3" key={index}>

                                        <div className="text-xl">{item.name}</div>

                                        <div>
                                            {
                                                item.modifiers&&item.modifiers.map((mod,index)=>(
                                                    <div key={index} className="flex border-b-2 p-2 gap-2">
                                                        <div className="w-2/12">{mod.name}</div>
                                                        <div className="w-9/12">{mod.price}dt</div>
                                                        <div className="w-1/12">
                                                            {mod.on?(<div className="text-green-500">Oui</div>):(<div className="text-red-500">Non</div>)}

                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className=" flex justify-between p-2 gap-2" style={{height:"10%"}}>
                            <button className="p-2 bg-blue-600 rounded-xl text-white w-full">Accepter</button>
                            <button className="p-2 bg-green-600 rounded-xl text-white w-full">Refuser</button>
                            <button className="p-2 bg-red-600 rounded-xl text-white w-full" onClick={Delete}>Supprimer</button>
                        </div>
                    </div>

                </BasicModal>

        
        <div className="">
            <h1 className="font-bold text-xl">Orders</h1>
            <div className="flex flex-col gap-2 p-2">
                {
                    orders.map((order,index)=>(
                        <Order key={index} order={order} setOpen={setOrderModal} setSelected={setSelectedOrder} />
                    ))
                }
                
            </div>
        </div>
        </>
    )
}
export default ManageOrders;
function Order({order,setSelected,setOpen})
{
    const date = Date.now();
    return(

        <div className="border-2 rounded-xl p-4 flex justify-between content-center items-center" onClick={()=>{
            setSelected(order)
            setOpen(true)
        }}>
            <div className="w-4/12">
                <div>{order._id}</div>
            </div>
            <div className="w-2/12">
                Table:{order.table}
            </div>
            <div className="">
                {
                    order.items.map(item=>
                        (
                            <>
                            {item.name}
                            </>
                        ))

                }
            </div>

            <div className="w-3/12">
                {new Date(date).toLocaleString()}
            </div>

            <div className="flex gap-5 w-2/12">
                <button>
                    <MdCheck fill="" size={"1.5rem"}/>
                </button>
                <button className="">
                    <MdClose fill="" size={"1.5rem"}/>
                </button>
                <button className="" onClick={()=>setOpen(true)}>
                    <MdInfo fill="" size={"1.5rem"}/>
                </button>
            </div>
        </div>
        
    )
}