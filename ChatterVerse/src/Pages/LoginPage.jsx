import React, { useEffect } from 'react'
import { useActionData, useNavigate } from 'react-router-dom'

const LoginPage = () => { 
    const navigate =useNavigate()
    const {user} = useAuth()
    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[])
  return (
    <div>LoginPage</div>
  )
}

export default LoginPage