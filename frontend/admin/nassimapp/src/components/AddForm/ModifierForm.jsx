import { useEffect, useState } from "react";
import useAuthAdmin from "../../hooks/useAuth"
import axios from "axios";
import { MdDelete } from "react-icons/md";
export default function ModifierForm()
{

    const admin = useAuthAdmin();
    const token = admin.getAdminToken();

    const [formData,setFormData] = useState({});
    const[modifiers,setModifers] = useState();

    async function getModifiers()
    {
        const response = await axios.get("http://localhost:8080/admin/modifiers/"+token.userId)
        setModifers(response.data)
        
    }
    async function Delete(mod)
    {
        const response = await axios.delete("http://localhost:8080/admin/modifier/"+mod._id);
        const newModifiers = modifiers.filter(item => item._id !== mod._id);
        setModifers(newModifiers)
    }
    
    async function Add(e)
    {
        e.preventDefault()
        formData.userId = token.userId;
        setModifers([            
            ...modifiers,         
            {
                name:formData.name,
                price:formData.price
            }]


          );
        
        setFormData({name:"",price:""})
        if(formData.name)
        {
            const response = await axios.post("http://localhost:8080/admin/modifier",formData)
        }else
        {
            alert("erreur nom")
        }
    }


    useEffect(()=>
    {
        getModifiers();

    },[])
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
        console.log(formData)
    };

    return(
        <div className="w-6/12 bg-white rounded-xl h-5/6 overflow-y-scroll">

            <div className="p-3 flex justify-between">
                <div className=" text-xl font-bold">Gerer les Modifieurs</div>
            </div>

            <form onChange={handleChange} action="" className="p-3 h-auto flex flex-row justify-between gap-3 w-full" onSubmit={Add}>
                <input className="bg-white p-3 border-2 rounded-xl w-full" placeholder="Nom du Modifieur" name="name" value={formData.name}/>
                <input className="bg-white p-3 border-2 rounded-xl w-full" placeholder="Prix du Modifieur" type="float" step={0.1} name="price" value={formData.price}/>
                <button className="bg-red-600 p-3 rounded-xl text-white">Sauvgarder</button>
            </form>

            <div className="font-bold p-3">List des Modifieurs</div>
            <div className="p-3 h-2/5 ">
            {
                modifiers?(
                    modifiers.map(mod=>(
                        <>
                            <div className="flex w-full justify-between p-2">
                                <div className="w-10/12">{mod.name}</div>
                                <div className="w-1/12">{mod.price}dt</div>
                                <button className="w-1/12" onClick={()=>Delete(mod)}>
                                    <MdDelete size={"1.5rem"} fill="red"/>
                                </button>
                            </div>
                        </>
                    ))
                ):
                (
                <>Ajouter des modifieurs</>
                )
            }
            </div>
        </div>
    )
}