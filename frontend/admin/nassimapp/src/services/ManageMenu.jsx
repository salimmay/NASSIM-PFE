import axios from "axios";
import { useCategoriesContext } from "../hooks/useMenuContext";
import useAuthAdmin from "../hooks/useAuth";

import { useContext } from "react";
import {SnackBarContext }  from "../hooks/useSnackBar";

export default function useManageMenu()
{
    const URL = "/api/admin/"
    const admin = useAuthAdmin();
    const token = admin.getAdminToken();
    const userId = token.userId;


    const {categories,dispatch} = useCategoriesContext();
        const {ShowMessage} = useContext(SnackBarContext)

    async function setAvailable(id,value)
    {
        const request = {id,value}
        const response = await axios.patch(URL+"available")
    }

    async function GetMenu()
    {
        const request = {userId}
        const response = await axios.get(URL+"menu"+"/"+userId,request);
        const data = response.data;
        console.log(data)
        return data;
    }


    async function AddCategory(e,categoryData)
    {
        const {name,description} = categoryData;

        e.preventDefault();

        const categoryName=name;
        const categoryDescription = description;

        const request = {userId,categoryName,categoryDescription}
        const response = await axios.post(URL+"category",request);
        const data = await GetMenu();

        console.log(response.data)
        ShowMessage("categories ajouter avec successé","green",3)
        dispatch({type:"UPDATE_CATEGORY",payload:data})        


    }
    
    async function DeleteCategory(id)
    {   
        try
        {
            
            const response = await axios.delete(URL+"category/"+id);
            if(response.status==200)
            {
                ShowMessage(response.data,"green",3)
            }
            const data = await GetMenu();
            dispatch({type:"UPDATE_CATEGORY",payload:data});
        }
        catch(e)
        {
            ShowMessage(response.data,"red",3)
        }

    }
    
    async function DeleteElement(categoryId,itemId)
    {
        const request = {categoryId,itemId,userId};
        
        const response = await axios.post(URL+"deleteitem",request)
        const data = await GetMenu();
        dispatch({type:"UPDATE_CATEGORY",payload:data});
        return data;
    }
    async function GetElement()
    {
        
    }
    async function UpdateElement(id,elementData)
    {
        const request = {id,elementData};
        
        const response = await axios.patch(URL+"item",request)
        console.log(response.data)
        
        const data = await GetMenu();
        dispatch({type:"UPDATE_CATEGORY",payload:data});
    }

    async function AddElement(categoryId,elementData)
    {
        //const {name,basePrice,time,description,modifiers}  = elementData;

        const name = elementData.name;
        const baseprice = elementData.baseprice;
        const description = elementData.description;
        const time = elementData.time;
        
        console.log(elementData.img)
        const img = elementData.img
        const modifiers = elementData.assignedModifiers;
        
        const item = {name,baseprice,description,time,img,modifiers}
        
        const request = {categoryId,item,userId};
        const response = await axios.patch(URL+"category",request,{header:{"content-type":"application/octet-stream"}})
        
        if(response.status==200)
        {
            ShowMessage("Element Ajouter Avec Successé","green",3);
        }
        else
        {
            ShowMessage("Ereur","red",3);

        }
        const data = await GetMenu();

        dispatch({type:"UPDATE_CATEGORY",payload:data});
        console.log(data);
        return data;
    }
    
    async function AddModifier()
    {
        const response = await axios.post(URL+"modifier/"+cagtegoryId)
        const data = response.data;
        return data;
    }
    
    async function RemoveModifier()
    {
        const response = await axios.delete(URL+"modifier");
        const data = response.data;
        return data;
    }

    return {UpdateElement,GetElement,DeleteElement,DeleteCategory,AddCategory,AddElement,AddModifier,RemoveModifier,GetMenu}
}

