import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import { useUser } from '../hooks/userUser';
const Signin = () => {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        email: "",
        password: ""
    })

    const user = useUser();
    if(user.loading){
      return ("loading..")
    }
    if(user.userData){
      return <Navigate to={"/dashboard"}/>
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        console.log(formData);
        const res = await fetch("http://localhost:3000/api/v1/user/signin",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json"
          }
        })
        const data = await res.json();
        localStorage.setItem("token",data.token)
        navigate('/dashboard')
    }

    function handleChange(e){
        const {email,password} = e.target;
        setFormData({...formData,[e.target.name]: e.target.value})
    }

  return (
    <div className='flex h-screen items-center justify-center'>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md' onSubmit={handleFormSubmit}>
         <div className='mb-4'>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='email' name='email' value={formData.email} onChange={handleChange}/>
        </div>
        <div className='mb-4'>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='password' name="password" value={formData.password} onChange={handleChange}/>
        </div>
        
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-lg hover:scale-105' type='submit'>SignIn</button>
        <div className='m-2 flex justify-center'>Don't have an account? <button> <Link to="/signup">Signup</Link> </button> </div>
      </form>
    </div>
  )
}

export default Signin
