import "../styles/sidebar.css"
import { Link } from "react-router-dom"
import { MdBusinessCenter,MdMenu,MdQrCode } from "react-icons/md"
import { BiFoodMenu } from "react-icons/bi";
import { RiServiceLine } from "react-icons/ri";
import { BsQrCodeScan } from "react-icons/bs";
import { PiChefHatBold } from "react-icons/pi";

function Sidebar()
{

    return(
        
        <div className="sidebar">
            <h1>La Gestion</h1>
            <Link to="info"><h2 className="element"><MdBusinessCenter size={"1.2rem"}/> Restaurant</h2></Link>
            <Link to="menu"><div className="element"><MdMenu size={"1.2rem"}/> Menu</div></Link>
            <Link to="orders"><div className="element"><MdMenu size={"1.2rem"}/> Gérer les ordres</div></Link>
            <Link to="daymenu"><div className="element"><BiFoodMenu size={"1.2rem"}/> Menu de Jour</div></Link>
            <Link to="subs"><div className="element"><RiServiceLine size={"1.2rem"}/> Abonnement</div></Link>
            <Link to="qrcodes"><div className="element"><MdQrCode size={"1.2rem"}/> Generateur de Qr</div></Link>
{/*             <Link to=""><div className="element"><PiChefHatBold size={"1.2rem"} /> Cusine</div></Link> */}




        </div>
    )
}
export default Sidebar