import axios from "axios";
import { useEffect, useState } from "react";
import { MdDownload } from "react-icons/md";
import useAuthAdmin from "../../hooks/useAuth";

function ManageQr()
{
    const [codes,setCodes] = useState();
    const [form,setForm] = useState(0);

    const admin = useAuthAdmin();
    const token = admin.getAdminToken();

    async function getQrCodes(e)
    {
        e.preventDefault();

        const request = {userId:token.userId,tablecount:form.tablecount}
        const response = await axios.post("http://localhost:8080/admin/qrcodes",request);
        setCodes(response.data);
        console.log(respone.data)
    }

    useEffect(()=>
    {
        getQrCodes();
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
          ...form,
          [name]: value
        });

      };

    return(
        <>
        <div className="h-full w-full">
            <h1 className="p-3 m-1 text-2xl">Generateur des codes Qr</h1>
            
            <form action="" onSubmit={getQrCodes} onChange={handleChange}>
                <input type="number" name="tablecount" className="bg-white p-4 rounded-xl border-2" placeholder="Nomber de tables" />

                <button className="bg-red-600 text-white p-3 m-1 rounded">GENERE LES CODE</button>
                <button className="bg-red-600 text-white p-3 m-1 rounded">Telecharger tous les codes</button>
            </form>


            <h1 className="p-3 m-1 text-2xl">List Des Code Qr</h1>
            <div className="grid">

                {
                    codes&&codes.map((code,index)=>(
                        <>
                            <Item number={index+1} key={index} code={code}/>
                        </>
                    ))
                }
            </div>
        </div>
        </>
    )
}

function Item({number,code})
{
    return(
            <div className="p-2 flex flex-col">
                <div className=" rounded-2xl p-2 flex flex-col items-center gap-2">
                    <img className="h-8/12" src={code} alt="" />
                    <button className="bg-red-600 text-white p-3 gap-2 items-center justify-center rounded flex flex-row w-full h-2/5">
                        <MdDownload size={"1.2rem"} fill="white"/> Table {number}
                    </button>
                </div>
            </div>
        
    )
}

export default ManageQr;