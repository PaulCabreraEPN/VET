import axios from "axios";
import { use, useEffect, useState } from "react";
import { Children, createContext } from "react";


const AuthContext = createContext();


const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})


    const perfil = async (token) => { 
        try {
            const urlV = `http://localhost:3000/api/perfil`;
            const urlP = `http://localhost:3000/api/paciente/perfil`;
    
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
    
            let url = urlV;  // Empezamos con urlV
            let respuesta;
    
            console.log("Intentando con urlV...");
    
            // Primero intentamos con urlV
            try {
                respuesta = await axios.get(url, options);
                console.log("Respuesta de urlV:", respuesta.data);
            } catch (error) {
                console.error("Error al obtener datos de urlV:", error);
                respuesta = null;  // No encontramos datos en urlV, intentamos con urlP
            }
    
            // Si no encontramos datos en urlV, intentamos con urlP
            if (!respuesta || !respuesta.data || Object.keys(respuesta.data).length === 0) {
                console.log("No se encontraron datos en urlV. Intentando con urlP...");
    
                url = urlP;
                try {
                    respuesta = await axios.get(url, options);
                    console.log("Respuesta de urlP:", respuesta.data);
                } catch (error) {
                    console.error("Error al obtener datos de urlP:", error);
                    throw new Error("No se pudo obtener datos ni de urlV ni de urlP");
                }
            }
    
            // Guardamos los datos obtenidos
            setAuth(respuesta.data);
    
        } catch (error) {
            // Si algo falla, este bloque de código se ejecuta
            console.error("Error final:", error);
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