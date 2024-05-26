import { useLayoutEffect,useState } from "react";
import "../styles/overlay.css"

function Overlay({children,openMenu,close})
{   
    const [visible,setVisible] = useState(false);
    
    useLayoutEffect(()=>
    {
        setVisible(openMenu);
    } ,[openMenu])
    
    return(
        <>
            {
                visible?(
                    <div className="overlay">
                        <div className="container">
                            
                            <div className="child">
                                {children}
                            </div>
                            <a onClick={()=>close()}>X</a>
                        </div>
                    </div>

                ):
                (
                    <></>
                )
                
            }

    
        </>
    )
    
}
export default Overlay;