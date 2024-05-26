import { useEffect, useState } from "react";
import useManageShop from "../services/ManagerShop";

function renderImage(binarystring) 
{
    if(binarystring)
    {
        const uint8Array = new Uint8Array(binarystring.data);
        const blob = new Blob([uint8Array]);
        return URL.createObjectURL(blob);
    }
    else return '';
}

function Shopinfo()
{
    const [info,setInfo] = useState({});
    
    const shop = useManageShop();
    async function getInfo()
    {
        const data = await shop.GetInfo();
        setInfo(data);
        setImage(renderImage(data.logo))
        setCover(renderImage(data.cover))
    }
    async function updateInfo()
    {
        info.logo = imgbuffer;
        info.cover = coverBuffer;
        const data = await shop.UpdateInfo(info);
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo({
          ...info,
          [name]: value
        });

      };

    useEffect(()=>
    {
        getInfo();
        
    },[])

    const [imgbuffer,setImgbuffer] = useState()
    const[image,setImage]= useState();

    const [coverBuffer,setCoverBuffer] = useState()
    const[cover,setCover]= useState();

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

    async function handleCoverChange(event)
    {
        const file = event.target.files[0];
        
        
        if (file) {
            const reader = new FileReader();
            reader.readAsBinaryString(file)
    
            reader.onload = ()=>
            {
                setCoverBuffer(reader.result)
            }
            const previewUrl = URL.createObjectURL(file);    
            setCover(previewUrl);
        }
    };

    return(
        <>
            <div className="row">
                <h1 className="title">Géré Le Resturant</h1>
                <button className="bg-red-600 text-white p-3 m-1 rounded" onClick={updateInfo}>Sauvgarder</button>   
            </div>

            <form action="" className=" p-10 m-0 rounded-xl" onChange={handleChange}>
                <h1>information Sur Le Restaurant</h1>
                
                <input name="shopname" className="bg-white border-2 w-full rounded-xl p-3" placeholder="Nom Du Shop" value={info.shopname} />
                <div className="flex w-full justify-between gap-2">
                    <input name="firstname" className="bg-white border-2 w-full rounded-xl p-3" placeholder="Prenom du Contact" value={ info.firstname}/>
                    <input name="lastname" className="bg-white border-2 w-full rounded-xl p-3" placeholder="Nom Du Contact" value={ info.lastname}/>
                </div>
                <div className="flex w-full justify-between gap-2">
                    <input name="contactphone" className="bg-white border-2 w-full rounded-xl p-3" placeholder="Numero de Telephone" value={info.contactphone}/>
                    <input name="email" className="bg-white border-2 w-full rounded-xl p-3" placeholder="Email de Contact" value={info.email}/>
                </div>
                <div className="flex w-full justify-between gap-2">
                    <input name="adress" className="bg-white border-2 w-full rounded-xl p-3" placeholder="Adresse" value={info.adress}/>
                    <input name="username" className="bg-white border-2 w-full rounded-xl p-3" placeholder="Nom d'utilisateur" value={info.username}/>
                </div>
                <input name="social" className="bg-white border-2 rounded-xl  p-3" placeholder="Socials"/>
                
                <label htmlFor="" className="flex gap-2 items-center w-6/12">
                    <h1 className="w-8/12">Couleur primaire du Shop</h1>
                    <input className=" border-0 bg-white rounded-xl" type="color" name="primarycolor" value={info.primarycolor} id="" />
                </label>
                <label htmlFor="" className="flex gap-2 items-center w-6/12">
                    <h1 className="w-8/12">Couleur secondaire du Shop</h1>
                    <input className=" border-0 bg-white rounded-xl" type="color" name="secondarycolor" value={info.secondarycolor} id="" />
                </label>

                <label htmlFor="logoshop">
                    <h1>Logo du Shop</h1>
                    <div className="flex gap-3">
                        <input hidden className="bg-white border-2" type="file" name="logo" id="logoshop" onChange={handleImageChange} />
                        <img src={image} id="" alt=""  className="size-20 rounded-full"/>
                    </div>
                </label>
                
                <label htmlFor="coverimg" className="w-full">
                    <h1>Image du Couverture du shop</h1>
                    <input hidden className="bg-white border-2" type="file" name="cover" id="coverimg" onChange={handleCoverChange}/>
                    <img src={cover} className="w-full h-32 object-cover border-2 rounded-xl"/>
                </label>


            </form>
        </>
    )
}

export default Shopinfo;