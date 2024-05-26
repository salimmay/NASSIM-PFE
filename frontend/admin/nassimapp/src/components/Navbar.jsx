import "../styles/navbar.css"
import logo from "../assets/logo.png"
import { IoIosPerson,IoIosSettings,IoIosExit } from "react-icons/io";

function Navbar()
{
    return(
        <>
        <nav className="flex items-center p-4 h-20">
            
            <div className="w-20">
                <img src={logo} alt="" className="h-full object-contain p-1"/>
            </div>

            <div className="navlist">
                <div className="navelement">
                    <IoIosPerson size={"1.5rem"} fill={"black"} />
                </div>
                <div className="navelement">
                    <IoIosSettings size={"1.5rem"} fill={"black"} />
                </div>
                <div className="navelement">
                    <IoIosExit size={"1.5rem"} fill={"black"} />
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar