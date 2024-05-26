export default function useAuthAdmin()
{
    function getAdminToken()
    {
        const user = JSON.parse(localStorage.getItem('admin'));
        return user;
    }
    function setAdminToken(adminData)
    {
        localStorage.setItem('admin',JSON.stringify(adminData));
    }
    function DestroyToken()
    {
        localStorage.setItem('admin','');
    }

    return({getAdminToken,setAdminToken,DestroyToken});
}

