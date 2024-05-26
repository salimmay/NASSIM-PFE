import axios from "axios"
import { useParams } from "react-router-dom";

export default function useUserService()
{
    const URL ="/api/shop"

    const{shopid,table} = useParams();

    async function Checkout()
    {


    }
    async function GetMenu()
    {
        const response = await axios.get(URL+"/menu/"+shopid);
        console.log(response.data)
        return response.data;
    }

    return({GetMenu})
}