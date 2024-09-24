import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoginPage from '../LoginPage'

 const AuthLayot = ({children,authentication=true}) => {
    const navigate=useNavigate();
    const authStatus=useSelector((state)=>state.auth.status)

    useEffect(()=>{
        if(!authentication && authStatus!==authentication){
            return
        }
    },[authStatus,authentication,navigate])

    if(authentication && authStatus!==authentication){
        return <LoginPage/>
    }

    return children;
}

export default AuthLayot;
