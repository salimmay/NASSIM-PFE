import { Children,useEffect, useLayoutEffect, useState } from "react"
import"../styles/menu.css"
import Overlay from "./Overlay";
import { MdDeleteOutline,MdAdd, MdEdit, MdDelete } from "react-icons/md";
import { Link,Outlet} from "react-router-dom";

import useManageMenu from "../services/ManageMenu";
import { useCategoriesContext } from "../hooks/useMenuContext";

import BasicModal from "./Modal";
import ElementForm from "./AddForm/ElementForm";
import CategoryForm from "./AddForm/CategoryForm";
import ModifierForm from "./AddForm/ModifierForm";


import  Alert  from "../UI/Alert";

function ManageMenu()
{   
    const manager = useManageMenu();
    const {categories,dispatch} = useCategoriesContext();  
    
    async function getCategories()
    {
        const data = await manager.GetMenu();
        dispatch({type:"SET_CATEGORIES",payload:data})
    }
    
    useEffect(()=>
    {
        
        getCategories();
    },[])

    const [elementModalOpen,setElementModalOpen] = useState(false);
    const [categoryModalOpen,setCategoryModalOpen] = useState(false);
    
    const [selectedCategory,setSelectedCategory] = useState({});
    const [selectedItem,setSelectedItem] = useState({});

    const [categoryAlert,setCategoryAlert] = useState(false);
    const [itemAlert,setItemAlert] = useState(false);

    const[modifierModalOpen,setModifierModalOpen] = useState(false);


    return(
        <>

        <Alert
            message={"are you sure u want to delete "+selectedCategory.name}
            confirm = {()=>manager.DeleteCategory(selectedCategory._id)}
            open={categoryAlert}
            setOpen={setCategoryAlert}
        />

        <Alert
            message={"are you sure u want to delete item"}
            confirm = {()=>manager.DeleteElement(selectedCategory._id,selectedItem._id)}
            open={itemAlert}
            setOpen={setItemAlert}
        />

            <h1 className="title">Gérer Le Menu</h1>  
            <div className="flex gap-3">
                <BasicModal button={
                    <div className="flex items-center p-4 bg-red-600 rounded-xl w-full">
                        <MdAdd fill="white" size={"1.5rem"}/>
                        <h1 className="text-white">Ajouter une Categorie</h1>
                    </div>
                }
                    modalOpen={categoryModalOpen}
                    setModalOpen={setCategoryModalOpen}
                >
                    <CategoryForm setCategoryModal={setCategoryModalOpen}/>
                </BasicModal>


                <BasicModal button={
                    <div className="flex items-center p-4 bg-red-600 rounded-xl w-full">

                        <h1 className="text-white">Gerer les modifieurs</h1>
                    </div>
                }
                    modalOpen={modifierModalOpen}
                    setModalOpen={setModifierModalOpen}

                >
                    <ModifierForm setModalOpen={setModifierModalOpen}/>
                </BasicModal>


            </div>



            <BasicModal button={<></>}
                modalOpen={elementModalOpen}
                setModalOpen={setElementModalOpen}
                >
                <ElementForm selectedItem={selectedItem} name={selectedCategory.name} id={selectedCategory._id} setModalOpen={setElementModalOpen}/>
            </BasicModal>
            
            <div className="menulist">
                {
                    categories && categories.map(category=>(
                        
                        <div key={category._id} className="p-5 bg-white border-gray-300 border-2 rounded-xl flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <h1 >{category.name}</h1>
                                <div className="flex gap-2">


                                <div onClick={()=>
                                {
                                    setElementModalOpen(true);
                                    setSelectedCategory(category)
                                    setSelectedItem(null)
                                }}>
                                    <MdAdd size={"1.5rem"}/>
                                </div>

                                    <MdDeleteOutline fill="red" onClick={()=>{setSelectedCategory(category); setCategoryAlert(true)}} color={"red"} size={"1.5rem"}/>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                {
                                    category.items.length>0 && category.items.map((item,index)=>(
                                        /*<Item Delete={()=>manager.DeleteElement(category._id,item._id)} category={category} key={index} item={item} elementModalOpen={elementModalOpen} setElementModalOpen={setElementModalOpen}/>*/

                                        <>

                                        <div key={index} className="flex content-between gap-10 border-gray-200 border-2 rounded-xl p-3 max-w-full">
                                            <div className="w-8/12">
                                                {item.name}
                                            </div>
                                            
                                            <div className="w-2/12">{item.baseprice}Dt</div>
                                            <div className="flex gap-2 w-2/12 max-w-full">

                                                <MdEdit size={"1.5rem"} onClick={()=>
                                                {
                                                    setElementModalOpen(true)
                                                    setSelectedItem(item)
                                                }}/>

                                                <MdDeleteOutline fill="red" onClick={()=>{setItemAlert(true);setSelectedItem(item); setSelectedCategory(category)}} size={"1.5rem"}/>
                                            </div>
                                        </div>
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                        
                    ))
                }


                </div>
        </>
    )
}


export default ManageMenu