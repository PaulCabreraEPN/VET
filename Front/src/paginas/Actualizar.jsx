import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Formulario } from '../componets/Formulario'
import axios from 'axios'

const Actualizar = () => {
    const [paciente, setpaciente] = useState({})
    const{id} = useParams()

    const consultarPaciente = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `http://localhost:3000/api/paciente/${id}`
            const options = {
                headers:{
                    'Content-type':'application/json',
                    Authorization : `Bearer ${token}`
                }
            }      

            const respuesta = await axios.get(url, options);
            console.log(respuesta);
            setpaciente(respuesta.data.paciente)
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        consultarPaciente()
    },[])

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Agregar...</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar un nuevo .....</p>
            
            {
                Object.keys(paciente).length != 0 && (<Formulario paciente={paciente}/>)
            }
            
            
            
        </div>
    )
}

export default Actualizar