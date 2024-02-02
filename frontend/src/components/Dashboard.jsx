import React from 'react'
import Header from './Header'
import Balance from './Balance'
import Users from './Users'
import { useUser } from '../hooks/userUser'
import { Navigate } from 'react-router-dom'

const Dashboard = () => {
  const user = useUser();
  if(user.loading){
    return ("...loading")
  }
  if(!user.userData){
    return <Navigate to={"/signin"}/>
  }
  console.log("user data",user.userData)
  return (
    <div className=''>
      <Header/>
      <Balance balance={user.userData.account.balance}/>
      <Users/>
    </div>
  )
}


export default Dashboard
