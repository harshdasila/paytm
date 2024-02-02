import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/userUser';

const Signup = () => {
  const navigate = useNavigate();
    const [formData,setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

  const user = useUser();
  if(user.loading){
    return ("...loading")
  }
  if(user.userData){
    return <Navigate to={"/dashboard"}/>
  }

    async function handleFormSubmit(e){
        e.preventDefault();

        // setFormData()
        const response = await fetch('http://localhost:3000/api/v1/user/signup',
        {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        const data = await response.json();
       
        localStorage.setItem("token",data.token)
        navigate('/dashboard')

    }

    function handleFormChange(e){
        const {firstName,lastName,email,password} = e.target;
        setFormData({...formData,[e.target.name]: e.target.value})
    }

  return (
    <div className='flex h-screen items-center justify-center'>
      <form onSubmit={handleFormSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md'>
        <div className='mb-4'>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fname" >First Name</label>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='fname' type='text' name='firstName' value={formData.firstName} onChange={handleFormChange}/>
        </div>
        <div className='mb-4'>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lname">Last Name</label>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='lname' type='text' name='lastName' value={formData.lastName} onChange={handleFormChange}/>
        </div>
        <div className='mb-4'>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='email' type='email' name='email' value={formData.email} onChange={handleFormChange}/>
        </div>
        <div className='mb-4'>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='password' type='text' name="password" value={formData.password} onChange={handleFormChange}/>
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-lg hover:scale-105' type='submit'>Signup</button>
        <div className='m-2 flex justify-center'>Already have an account? <button> <Link to="/signin"> Signin</Link> </button> </div>
      </form>
      
    </div>
  );
}

export default Signup;
