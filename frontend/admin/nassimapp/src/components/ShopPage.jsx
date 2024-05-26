
import { MdEdit,MdCameraAlt } from "react-icons/md";
import logo from "../assets/logo.png"
function ShopPage()
{
    return(
        <>
        <div className="page">
            
            <header className="w-full bg-gray-100 p-8 rounded-xl">
                <img src="" alt="" id=""/>
                <label htmlFor="picfile" className=" flex items-center justify-center bg-white rounded-full w-64 h-64 p-5 translate-y-32 shadow">
                    <input hidden type="file" name="" id="picfile"  />
                    <img src={logo} alt="" id="" className="h-4/5 w-4/5 object-contain" />
                </label>
            </header>

            <section>
                <form action="" className="flex w-full gap-10">
                    <div className="input-grp">
                        <p>Nom Du Restaurant</p>
                        <label htmlFor="editname">
                            <p contentEditable="true" name="editname" id="name"> AliBaba Food</p>
                            <MdEdit size={"1.2rem"}/>
                        </label>
                    </div>

                    <div className="flex gap-10 items-center">
                        <p>Adresse</p>
                        <label htmlFor="editname" className="flex gap-2 items-center">
                            <p contentEditable="true" name="editname" id="name"> AliBaba Food</p>
                            <MdEdit size={"1.2rem"}/>
                        </label>

                    </div>
                    <div className="input-grp">
                        <p>Numéro Du Telephone</p>
                        <label htmlFor="editname">
                            <p contentEditable="true" name="editname" id="name"> 29292929</p>
                            <MdEdit size={"1.2rem"}/>
                        </label>

                    </div>
                    <div className="input-grp">
                        <p>Email</p>
                        <label htmlFor="editname">
                            <p contentEditable="true" name="editname" id="name"> AliBaba@food.tn</p>
                            <MdEdit size={"1.2rem"}/>
                        </label>

                    </div>
                    <div className="input-grp">
                        <p>Specialité</p>
                        <label htmlFor="editname">
                            <p contentEditable="true" name="editname" id="name"> AliBaba Food</p>
                            <MdEdit size={"1.2rem"}/>
                        </label>

                    </div>
                </form>
            </section>
        </div>
        </>
    )
}
export default ShopPage;