import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'

export default function Reestablcer() {
    //Paso 1
    const {token} = useParams();
    const [tokenback, setTokenback] = useState(false);
    const [form, setform] = useState({
        password:"",
        confirmpassword:""
    })

    //Paso 2
    const handleChange = (e) => {
        setform(
            {
                ...form,
                [e.target.name]:e.target.value
            }
        )
    }

    //Paso 3
    const handleSubmit = async(e) => { 
        e.preventDefault()
        try {
            const url = `http://localhost:3000/api/nuevo-password/${token}`
            const respuesta = await axios.post(url, form)
            console.log(respuesta)
            toast.success(respuesta.data.msg)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg)
        }
    }

    const verifyToken = async () => {
        try {
            const url = `http://localhost:3000/api/recuperar-password/${token}`
            const respuesta = await axios.get(url)
            console.log(respuesta)
            setTokenback(true)
            toast.success(respuesta.data.msg)
        } catch (error) {
            console.log(error);
            toast.error(error.respuesta.data.msg)
        }
    }

    useEffect(() => {
        verifyToken()
    },[])

  return (
    <div>
        <ToastContainer />
        {
            tokenback &&
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">Contraseña</label>
                <input type="password"
                 name='password'
                 value={form.password || ""}
                 onChange={handleChange} />
                <label htmlFor="">Nueva Contraseña</label>
                <input type="password" 
                name='confirmpassword'
                value={form.confirmpassword}
                onChange={handleChange}/>
                <button>Enviar</button>
            </form>
        }
        
    </div>
  )
}
