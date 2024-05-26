import axios from "axios";
import useAuthAdmin from "../hooks/useAuth";

export default function useManageShop()
{
    const URL = "http://localhost:8080/admin";
    const admin = useAuthAdmin();
    const token = admin.getAdminToken();

    function RecoverPassword()
    {

    }
    async function GetInfo()
    {
        const response = await axios.get(URL+"/info/"+token.userId);
        console.log(response.data)
        return response.data;
    }
    async function UpdateInfo(info)
    {
        const response = await axios.patch(URL+"/info/"+token.userId,info);
        console.log(info)
        console.log(response.data)
        return response.data;
    }
    return {GetInfo,UpdateInfo}
}