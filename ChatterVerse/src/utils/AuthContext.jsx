import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { account } from '../appwriteConfig'
import {useNavigate} from 'react-router'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    

    useEffect(() => {
        setLoading(false)
    }, [])

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault()
        
        try {
            console.log("cred",credentials);
            
            const response = await account.createEmailPasswordSession(credentials.email, credentials.password)

            console.log("Logged In:", response);

            const accountDetail =await account.get()
            setUser(accountDetail)

            navigate('/')
            
        } catch (error) {
            console.log("error while login:", error);
            
        }
    }

    const contextData = {
        user,
        handleUserLogin
    }

    return <AuthContext.Provider value={contextData}>
        {loading ? <p>Loading .....</p> : children}
    </AuthContext.Provider>
}   

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext