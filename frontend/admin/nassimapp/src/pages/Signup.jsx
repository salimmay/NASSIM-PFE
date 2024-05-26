import axios from "axios";
//import ReactSession from "react-client-session"
import logo from "../assets/logo.png"
import group from "../assets/Group.png";

import { useEffect, useState } from 'react';
import '../styles/signup.css';

import { MdPhone } from "react-icons/md";
import { MdPerson,MdMail,MdLock } from "react-icons/md";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { useNavigate,redirect,Navigate} from "react-router-dom";
function Signup()
{
    const navigator = useNavigate();

    const[formData,setFormData] = useState({username:String,password:String});
    const[token,setToken] = useState("");

    useEffect(()=>{
        setToken(localStorage.getItem("token"));
        if(token != null && token != "")
        {
            console.log("LOGGED IN")
        }
    },[token]);

async function Login(e)
{
        e.preventDefault();
        try{
            const request = {
                
            }
            const response = await axios.post("http://localhost:8080/admin/login");
            const data = response.data;
            
            if(localStorage.getItem("token") == null)
            {
                localStorage.setItem("token",data.token);
                setToken(data.token)
                console.log(data.token)
            }

        }catch
        {
            console.log("ERROR")
        }
    }

    async function Signup(e)
    {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8080/auth/signup",formData);
            const data = response.data;
            if(response.status == 200)
            {
                console.log(data.msg)
                await navigator("/")
            }
            if(response.status == 400)
            {
                console.log(data.msg)
            }
        }catch
        {
            
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
                    <nav className="w-full flex content-center bg-amber-400 p-2 h-20">
                    <img src={logo} alt="" className="w-2/12 object-contain" />
                    <div className="flex flex-row w-full p-2  gap-2 items-center">
                        <div className="w-10/12">
                            
                        </div>

                        <button className="bg-red-600 rounded-3xl p-4 text-white capitalize w-4/12">Se Connecter</button>
                        
                        <select className="bg-red-600 p-4 rounded-3xl text-white" id="">
                            <option value="">Fr</option>
                        </select>
                        
                    </div>
                </nav>
            <section className='w-full bg-amber-400 h-screen'  >
                
                <div className="w-5/12">
                    <img src={group} alt="" className="z-10 translate-x-20 h-full object-contain" />
                </div>

                <form action="" className="bg-white p-20 w-6/12 m-5 rounded-2xl " onChange={handleChange} onSubmit={Signup}>
                    <h1 className="font-bold text-2xl w-full text-center">Créer un nouveau compte</h1>
                    <h1 className="w-full text-center text-xl">S'inscrire</h1>

                    <div className="flex border-2 items-center w-full p-1 rounded-xl">
                        <MdPerson size={"1.5rem"} />
                        <input type="text" className="border-0 p-2 bg-white" required minLength={8} placeholder="Nom D'utilisateur" name="username"/>
                    </div>


                    <div className="flex border-2 items-center w-full p-1 rounded-xl">
                        <MdPhone className="" size={"1.5rem"}/>
                        <input type="number" required minLength={8} className="border-0 p-2 bg-white" placeholder="Numereau de Telephone" name="phone"/>
                    </div>
        
                    <div className="flex border-2 items-center w-full p-1 rounded-xl">
                        <MdMail className="" size={"1.5rem"}/>
                        <input type="email" className="border-0 p-2 bg-white" placeholder="Adresse Electronique" required  name="email"/>
                    </div>

                    <div className="flex border-2 items-center w-full p-1 rounded-xl">
                        <MdLock className="" size={"1.5rem"}/>
                        <input type="text" className="border-0 p-2 bg-white" placeholder="Mot de Passe" required minLength={8} name="password"/>
                    </div>

                    <div className="flex border-2 items-center w-full p-1 rounded-xl">
                        <MdLock className="" size={"1.5rem"}/>
                        <input type="text" className="border-0 p-2 bg-white" placeholder="Confirme Mot de Passe" required minLength={8} name="cpassword"/>
                    </div>

                    <div className="flex items-center flex-col w-full gap-5">

                        <h1>Se Connectez Avec</h1>
                        <div className="w-64 flex gap-10 items-center">
                            <button className="border-2 p-4  rounded-xl text-white border-0 flex items-center">
                                <FaGoogle size={"1.5rem"} />
                            </button>
                            <button className="border-2 p-4  rounded-xl text-white border-0 flex items-center">
                                <FaFacebook size={"1.5rem"} />
                            </button>
                            <button className="border-2 p-4  rounded-xl text-white border-0 flex items-center">
                                <FaApple size={"1.5rem"} />
                            </button>

                        </div>

                        <button className="bg-red-600 p-4 text-white rounded-xl w-64">S'inscrire</button>

                    </div>
                    
                </form>

            </section>
        </>
    )
}

export default Signup