import { useState } from "react";
import scan from "../assets/scan.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthAdmin from "../hooks/useAuth";
import {MdEmail, MdLock} from "react-icons/md"

function Home()
{
    const [formData,setFormData] = useState({});
    const navigator = useNavigate();
    const auth = useAuthAdmin();

    async function Login(e)
    {
        e.preventDefault();
        const response = await axios.post("http://localhost:8080/auth/login",formData);
        if(response.status == 200)
        {
            const data = response.data;
            auth.setAdminToken(data);
            navigator("/manage");
        }
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

                        <button className="bg-red-600 rounded-3xl p-4 text-white capitalize w-4/12">créer un nouveau compte</button>
                        
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

                <div className="flex flex-col gap-4 h-32 p-4 bg-white">
                    <h1 className="text-2xl text-center font-bold">Tunisie : Meilleurs restaurants et plus</h1>
                    <h1 className="text-2xl text-center ">
                    Scanne, découvre, dévore ! L'appli qui te donne le menu en un clin d'œil
                    </h1>
                </div>

            </div>
        </>
    )
}

export default Home