import { MdDeleteOutline,MdCheck } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import * as React from "react";

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const icon = <MdCheck fontSize="small" />;
const checkedIcon = <MdCheck fontSize="small" />;

import { CiCamera } from "react-icons/ci";
import { MdOutlineTimer } from "react-icons/md";

import useManageMenu from "../../services/ManageMenu";
import useAuthAdmin from "../../hooks/useAuth";

function ElementForm({id,name,setModalOpen,selectedItem})
{   
    const manager = useManageMenu();
    const admin  = useAuthAdmin();
    const token = admin.getAdminToken();

    const[modifiers,setModifiers] = useState([]);
    const[assignedModifiers,setAssignedModifiers] = useState([]);

    const [formData,setFormData] = useState({});
    const [imgbuffer,setImgbuffer] = useState()
    const[image,setImage]= useState();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
        console.log(formData)
    };

    const [category,setCategory] = useState();

    function RemoveModifier(mod)
    {
        console.log(mod)
        const newModifiers = assignedModifiers.filter(item => item._id !== mod._id);
        setAssignedModifiers(newModifiers)
    }

    function Save(e)
    {
        e.preventDefault();
        setModalOpen(false);

        if(selectedItem)
        {
            formData.modifiers = assignedModifiers;
            manager.UpdateElement(selectedItem._id,formData);
        }
        else
        {
            formData.assignedModifiers = assignedModifiers;
            formData.img = imgbuffer;
            manager.AddElement(category,formData);
        }
    }

    async function getModifiers()
    {
        const response = await axios.get("http://localhost:8080/admin/modifiers/"+token.userId);
        setModifiers(response.data);
    }
    
    async function assignModifier()
    {
        const request = {itemId,modifierId}
        setAssignedModifiers(assignedModifiers => [...assignedModifiers, newElement]);
    }



    async function handleImageChange(event)
    {
        const file = event.target.files[0];
        
        
        if (file) {
            const reader = new FileReader();
            reader.readAsBinaryString(file)
    
            reader.onload = ()=>
            {
                setImgbuffer(reader.result)
            }
            const previewUrl = URL.createObjectURL(file);    
            setImage(previewUrl);
        }
    };

    useEffect(
        ()=>{
            if(!selectedItem)
            {
                console.log("ADD NEW ELEMENT")
            }else
            {
                const data = manager.GetElement(selectedItem._id);
                setFormData(selectedItem)
                console.log(selectedItem.modifiers)
                setAssignedModifiers(selectedItem.modifiers);
            }
            getModifiers();
            setCategory(id)
        }
        ,[]
    )
    
    return(
        <>
        <form onChange={handleChange}  className="bg-white rounded-xl w-8/12 h-5/6" onSubmit={Save}>
            <div className="flex items-center justify-between w-full border-b-2 p-4">
                <h1 className="text-xl ">{selectedItem?(<>Modifier {selectedItem.name} De La</>):(<>Ajouter Nouvel Element Au</>)} Categorie {name} </h1>
                <button className="p-4 bg-red-600 text-white rounded-xl" >Sauvgarded</button>
            </div>

            <div className="w-full h-full overflow-y-scroll">

                <div className="flex flex-col gap-3 p-4 w-full">

                    <div className="flex justify-between gap-3">
                        <input type="text" name="name" placeholder="Nom De L'article" className="border-2 bg-white p-4 rounded-xl w-full" value={formData.name}/>
                        <input type="number" name="baseprice" placeholder="Prix De L'article" className="border-2 bg-white p-4 rounded-xl w-full" value={formData.baseprice} />
                    </div>

                    <div className="flex gap-1 items-center border-2 p-2 rounded-xl">
                        <MdOutlineTimer size={"2rem"} fill="gray"/>
                        <input name="time" type="number" placeholder="Temps" className="border-0 bg-white p-2 rounded-xl w-full" value={formData.time}/>
                    </div>

                    <div className="flex gap-3">
                        <div className=""> 
                            <label htmlFor="uploadfile">
                                <input name="" type="file" id="uploadfile" onChange={handleImageChange} hidden/>
                                <div className="border-2 w-48 h-48 flex flex-col rounded-xl justify-center items-center gap-2">
                                    {
                                        image?(
                                            <>
                                                <img src={image} alt="" />
                                            </>
                                        ):
                                        (
                                            <>
                                                <CiCamera size={"2rem"} fill="gray" />
                                                <h1 className="text-gray-400">Ajouter Image d'Element</h1>    
                                            </>
                                        )
                                    }
                                </div>
                            </label>
                        </div>

                        <textarea value={formData.description} name="description" className="bg-white border-2 rounded-xl p-4 w-full h-5/5" placeholder="Description de L'article"></textarea>

                    </div>




                    <Autocomplete 
                        multiple
                        id="checkboxes-tags-demo"
                        options={modifiers}
                        defaultValue={selectedItem?(selectedItem.modifiers):([])}
                        defaultChecked={true}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.name}
                        onChange={(event, value) => setAssignedModifiers(value)} 
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                    
                                />
                                {option.name}
                            </li>
                        )}
                        
                        renderInput={(params) => (
                            <TextField {...params} label="Ajouter des Modifieurs" placeholder="Modifierus"  />
                        )}
                    />


                    <div className="flex flex-col gap-2 p-4 border-gray w-full ">
                        <h1>List des Modifieurs</h1>

                        <div className="flex flex-col gap-2">
                            {
                                assignedModifiers.map(modifier=>(
                                    <div className="flex gap-2 border-gray content-between  border-b-2 p-2 w-4/12">
                                        <div className="w-9/12">{modifier.name}</div>
                                        <div className="w-1/12">{modifier.price}dt</div>
                                        <MdDeleteOutline onClick={()=>RemoveModifier(modifier)} className="w-2/12" fill={"red"} size={"1.5rem"}/>
                                    </div>

                                ))
                            }
                        </div>

                    </div>

                </div>

            </div>
            
        </form>
        </>
    )
}

export default ElementForm;