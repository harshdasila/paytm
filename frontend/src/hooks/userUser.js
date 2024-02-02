import axios from 'axios'
import {useEffect, useState} from 'react'
export const useUser = () => {

    const [userData,setUserData] = useState(null);
    const [loading,setLoading] = useState(true);

    async function getUserData(){
        try{
            const res = await axios.get("http://localhost:3000/api/v1/user/me",{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token") 
            }
            })
            setUserData(res.data);
        }
        catch(e){
            console.log(e,"error");
        }
        setLoading(false);
    }
    useEffect(()=>{
        getUserData();
    },[])

    return {
        loading,
        userData
    }
}