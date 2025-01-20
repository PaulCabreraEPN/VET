import axios from "axios";
import { use, useEffect, useState } from "react";
import { Children, createContext } from "react";

const AuthContext = createContext();


const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})


const perfil = async(token) => { 

    try {
        const url = `http://localhost:3000/api/perfil`
        const options = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        const respuesta = await axios.get(url,options) 
        setAuth(respuesta.data)

    } catch (error) {
        console.log(error);   
    }
}

useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token)
    if (token) {
        perfil(token)
    }
}, [])

    return <AuthContext.Provider value={
        {
            //Contenido del mensaje
            auth,
            setAuth
           
        } 
    }>
        {children}
    </AuthContext.Provider>
}

export {
    AuthProvider
}

export default AuthContext