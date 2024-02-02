import React from 'react'
import { useUser } from '../hooks/userUser'
import {Navigate} from 'react-router-dom'

const Index = () => {

    const user = useUser();

    if(user.loading){
        return ("loading..")
    }
    if(!user.userData){
        return (
            <Navigate to={"/signin"}/>
        )
    }
    return (<Navigate to={"/dashboard"}/>)
}

export default Index
