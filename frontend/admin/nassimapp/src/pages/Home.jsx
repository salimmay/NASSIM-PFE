import { useState } from "react";
import scan from "../assets/scan.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthAdmin from "../hooks/useAuth";
import {MdEmail, MdLock} from "react-icons/md"

import { useContext } from "react";
import {SnackBarContext }  from "../hooks/useSnackBar";


import img1 from "../assets/1.png"
import img2 from "../assets/2.png"
import img3 from "../assets/3.png"
import phone from "../assets/phone.png"
import google from "../assets/google.png"
import apple from "../assets/apple.png"

import people from "../assets/people.png"
import phone2 from "../assets/phone2.png"

import bz1 from "../assets/bz1.png"
import bz2 from "../assets/bz2.png"
import bz3 from "../assets/bz3.png"

import handshake from "../assets/handshake.png"

function Home()
{
    const [formData,setFormData] = useState({});
    const navigator = useNavigate();
    const auth = useAuthAdmin();

    const {ShowMessage} = useContext(SnackBarContext)

    async function Login(e)
    {
        e.preventDefault();
        const response = await axios.post("/api/auth/login",formData);
        if(response.status == 200)
        {
            const data = response.data;
            auth.setAdminToken(data);
            navigator("/manage");
        }
        else
        ShowMessage("error login ","green",3)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });

        console.log(formData)
      };
    return(
        <>
            <div className=" bg-amber-400 flex flex-col">

                <nav className="w-full flex content-center bg-amber-400 p-2 h-20">
                    <img src={logo} alt="" className="w-2/12 object-contain" />
                    <div className="flex flex-row w-full p-2  gap-2 items-center">
                        <div className="w-10/12">

                        </div>

                        <a href="/signup" className="bg-red-600 rounded-3xl p-4 text-white capitalize w-4/12">créer un nouveau compte</a>
                        
                        <select className="bg-red-600 p-4 rounded-3xl text-white" id="">
                            <option value="">Fr</option>
                        </select>
                        
                    </div>
                </nav>

                <header className="h-full w-full p-10 gap-10">
                    

                    <div className="flex w-full">
                        <form  action="" className=" flex flex-col gap-5 w-full" onSubmit={Login} onChange={handleChange}>
                            <h2 className="text-3xl font-extrabold">CREEZ UN MENU DIGITAL</h2>
                            <h3 className="text-2xl bold">CREEZ UN MENU DIGITAL ET OBTENIR UN QR CODE</h3>
                            <div className="flex items-center rounded w-6/12 bg-white p-2">
                                <MdEmail size="1.5rem"/>
                                <input type="email" placeholder="Adresse Electronique" className="bg-white border-0 p-2" name="email" required />
                            </div>
                            <div className="flex items-center rounded w-6/12 bg-white p-2">
                                <MdLock size="1.5rem"/>
                                <input type="password" placeholder="Mot De Passe" className="p-2 bg-white" name="password" required minLength={8} />
                            </div>

                            <label htmlFor=""> Mot de Passe Oublie?</label>
                            <div className="w-6/12 flex flex-col content-center ">
                                <button className="bg-red-600 text-white p-4 rounded-3xl align-middle">Se Connecter</button>
                            </div>
                        </form>
                        
                        <div className="w-full">
                            <img src={scan} alt="" />
                        </div>

                    </div>
                </header>

                
            </div>  
            <div className="flex flex-col gap-4 h-32 p-4 bg-white">
                <h1 className="text-2xl text-center font-bold">Tunisie : Meilleurs restaurants et plus</h1>
                <h1 className="text-2xl text-center ">
                Scanne, découvre, dévore ! L'appli qui te donne le menu en un clin d'œil
                </h1>
            </div>

            <div className="h-3/6 w-full bg-white pt-6 mt-48">
                <div className="flex justify-around gap-3">
                    <img className="w-3/12 h-3/6 object-contain" src={img1} alt="" />
                    <img className="w-2/12 h-3/6 object-contain"  src={img2} alt="" />
                    <img className="w-2/12  h-3/6 object-contain"  src={img3} alt="" />
                </div>
            </div>

            <div className="flex p-6 mt-48 justify-around items-center w-full gap-6">

                <div className="flex flex-col w-6/12 gap-6">
                    <h1 className="font-bold text-4xl">Télécharger l'application</h1>
                    <p className="font-bold text-xl">Commandez ce qui vous fait plaisir et suivez la commande en temps réel avec l'application cuisineIQ</p>
                    
                    <div className="flex w-full">
                        <img className="w-3/12 object-contain" src={google} alt="" />
                        <img className="w-3/12 object-contain" src={apple} alt="" />
                    </div>

                </div>

                <div className="h-full w-3/12">
                    <img className="w-full " src={phone} alt="" />
                </div>
                

            </div>
            <div className="flex flex-col w-full items-center bg-amber-400 p-20">
                <div className="flex flex-col items-center gap-5">
                    <img className="w-6/12 self-center" src={people} alt="" />
                    <div className="text-center font-bold text-3xl">À propos de nous</div>
                </div>

                <div className="w-10/12 flex items-center">

                    <div className="flex flex-col  items-center justify-start w-full gap-3">
                        <h1 className="font-bold text-2xl self-start">Bienvenue dans la cuisine iq !</h1>
                        <p className="text-xl">nous nous engageons à améliorer l'expérience culinaire grâce à une technologie innovante. Nos menus compatibles avec le code QR offrent des descriptions détaillées des plats et des prix transparents, permettant aux convives de faire des choix éclairés.</p>
                    </div>  

                    <div className="w-full">
                        <img className="w-full" src={phone2} alt="" />
                    </div>

                </div>
            </div>

            <div className="flex w-full h-4/6 flex-col items-center gap-20 bg-amber-400 p-20">
                <h1 className="text-center font-bold text-3xl text-orange-700">Ce que nous offrons</h1>

                <div className="flex w-11/12 gap-5">
                    <div className="flex flex-col items-center gap-10 w-4/12">
                        <img src={bz1} className="shadow-xl rounded-full" alt="" />
                        <div className="w-7/12 flex flex-col items-start">
                            <h1 className="font-bold text-2xl">Opportunités de partenariat :</h1>
                            <p className="text-xl"> rejoignez-nous pour présenter votre menu et toucher des convives férus de technologie.</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-10 w-4/12">
                        <img src={bz2} className="shadow-xl rounded-full"  alt="" />
                        <div className="w-7/12 flex flex-col items-start">
                            <h1 className="font-bold text-2xl">Transparence :</h1>
                            <p className="text-xl font-">Nous accordons la priorité aux informations précises et à jour sur les menus.</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-10 w-4/12">
                        <img src={bz3} className="shadow-xl rounded-full"  alt="" />
                        <div className="w-7/12 flex flex-col items-start">
                            <h1 className="font-bold text-2xl">Menus interactifs :</h1>
                            <p className="text-xl"> accédez aux descriptions détaillées des plats et aux prix avec un simple scan de code QR.</p>
                        </div>
                    </div>


                </div>
            </div>


            <div className="w-full flex items-center flex-col p-20 bg-amber-400">
                <img src={handshake} alt="" />
                <div className="font-bold text-3xl">contactez-nous</div>
            </div>


            <div className="flex w-full bg-amber-400 p-6 justify-around items-center">
                <div className="w-4/12 text-2xl font-bold">Vous avez des questions ou des commentaires ? Nous serions ravis d'avoir de vos nouvelles ! Utilisez les informations ci-dessous pour nous contacter :</div>
                
                <form action="" className="flex gap-3 w-3/12">
                    <div className="border-2 rounded-full bg-white overflow-hidden w-full">

                        <input className="bg-white p-3 h-full w-full" type="text" placeholder="Nom"/>
                    </div>

                    <div className="border-2 rounded-full bg-white overflow-hidden w-full">

                    <input className="bg-white m-3" type="text" placeholder="Email"/>
                    </div>

                    <div className="border-2 rounded-full bg-white overflow-hidden w-full">

                    <input className="bg-white m-3" type="text" placeholder="Sujet"/>
                    </div>

                    <div className="border-2 rounded-2xl bg-white overflow-hidden w-full">
                        <textarea className="m-3 bg-white" name="" id="" cols="30" rows="10" placeholder="Message..."></textarea>
                    </div>

                    <button className="bg-gray-700 p-3 text-white rounded-full w-6/12">Envoyer</button>
                </form>
            </div>


            <footer className="bg-black text-white h-100 flex flex-col p-10">
                <div>
                    <img className="w-1/12 object-contain" src={logo} alt="" />
                </div>

                <div className="flex jutsify-around text-xl">

                    <div className="flex flex-col w-3/12"> 
                        <h1 className="font-bold  text-white">Coordonnées</h1>
                        <div className="flex flex-col  text-white">
                            <div className="text-white">10 Rue souhaib eroumi, manouba, tunis</div>
                            <div className="text-white">Tél : +216 20 611 213</div>
                            <div className="text-white">Email : cuisinIQ@gmail.com</div>
                        </div>
                    </div>

                    
                    <div className="flex flex-col w-3/12">
                        <h1 className="text-white font-bold">Liens utiles :</h1>
                        <div className="flex flex-col  text-white">
                            <div className="text-white">Accueil</div>
                            <div className="text-white">Menus</div>
                            <div className="text-white">À propos </div>
                            <div className="text-white">Contact</div>
                        </div>
                    </div>

                    <div className="flex flex-col w-3/12">
                        <h1 className="text-white font-bold">Nous suivre:</h1>
                        <div className="flex flex-col  text-white">
                            <div className="text-white">Facebook</div>
                            <div className="text-white">Instagram</div>
                            <div className="text-white">Twitter </div>
                        </div>
                    </div>

                    <div className="w-3/12">
                        <div className="flex">
                            <img className="size-40 object-contain" src={google} alt="" />
                            <img className="size-40 object-contain" src={apple} alt="" />
                        </div>
                    </div>
                </div>

            </footer>
        </>
    )
}

export default Home