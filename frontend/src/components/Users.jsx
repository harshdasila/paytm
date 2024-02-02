import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from './Button';
import { useNavigate } from "react-router-dom";

const Users = () => {
    const [users,setUsers] = useState([]);
    const [searchInput,setSearchInput] = useState('');

    useEffect(()=>{
        
        const timer = setTimeout(()=>{
            // console.log("searched")
            axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${searchInput}`)
            .then(response=>{
                setUsers(response.data.user)
            })
        },200)
        return () => { //clearing the timeout 
            clearTimeout(timer);
          };

    },[searchInput])

    function handleInputChange(e){
        setSearchInput(e.target.value)
    }

    return (
        <div className='p-2'>
            <div className='text-xl'>
                USERS
            </div>
            
            <div className='mt-3'>
                <input className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' type='text' onChange={handleInputChange}/>
            </div>
            <div className='mt-3 '>{users.map(user => <User user={user} />)}
        </div>
        </div>
    )
}

function User({user}) {
    // console.log(user)
    const navigate = useNavigate();
    
    return <div className="flex justify-between hover:bg-gray-200">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful mt-3">
            <Button onClick={(e) => {
                // console.log(user)
                navigate("/send?id=" + user.id + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}

export default Users
