
import { useState } from "react";
import useManageMenu from "../../services/ManageMenu"
import { CiCamera } from "react-icons/ci";
function CategoryForm({setCategoryModal})
{
    const manager = useManageMenu();
    
    function Save(e)
    {
        e.preventDefault();
        manager.AddCategory(e,formData);
        setCategoryModal(false);
    }

    const [formData,setFormData] = useState({name:String,description:String});
    const [selectedCategory,setSelectedCategory] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
        console.log(formData)
      };



    const [image,setImage]  = useState();
    const [imgBufer,setImgbuffer] = useState();

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

    return(
        <>

            <form onChange={handleChange} onSubmit={Save} className="flex flex-col items-center bg-white rounded-xl gap-3 w-6/12">
                <div className="flex items-center justify-between w-full border-b-2 p-4">
                    <h1 className="text-xl ">{selectedCategory?(<>Modifier {selectedCategory.name} De La</>):(<>Ajouter Nouvel Categorie</>)}  </h1>

                </div>
            <div className="p-4 flex flex-col gap-3 w-full">
                <input type="text" name="name" placeholder="Nom Du Categorie" className="p-4 bg-white border-2 rounded-xl w-full" />
                    <textarea name="description" id="" cols="30" rows="10" className="w-full bg-white border-2 rounded-xl p-4" placeholder="Description de Categorie">

                    </textarea>


                    <button className="bg-red-600 text-white p-3 rounded-xl w-full">Sauvgarder</button>

            </div>
            </form>
        </>
    )
}

export default CategoryForm