import { useContext, useState } from "react"
import AuthContext from "../../context/AuthProvider"
import axios from "axios"
import {ToastContainer, toast} from 'react-toastify'


const FormularioPerfil = () => {
    //Paso 1 Creo un UseState
    const {auth} = useContext(AuthContext)
    console.log(auth)

    const [form, setform] = useState({
        id: auth._id,
        nombre: "" || auth.nombre,
        apellido: "" || auth.apellido,
        direccion: "" || auth.direccion,
        telefono: "" || auth.telefono,
        email: "" || auth.email 
    }) 

    // Paso 2 Lógica para guardar en el State
    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    // Paso 3 Lógica para guardar en el State
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const url = `http://localhost:3000/api/veterinario/${auth._id}`   
            const options = {
                headers:{
                    'Content-type':'application/json',
                    Authorization : `Bearer ${token}`
                }
            }      
            const respuesta = await axios.put(url,form,options)
            console.log(respuesta);
            toast.success("Actualización exitoso")
           

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg)
        }
    }

    return (
      
        <form onSubmit={handleSubmit}>
            <ToastContainer />

            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder={auth.nombre}
                    name='nombre'
                    value={form.nombre}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='apellido'
                    className='text-gray-700 uppercase font-bold text-sm'>Apellido: </label>
                <input
                    id='apellido'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder={auth.apellido}
                    name='apellido'
                    value={form.apellido}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='direccion'
                    className='text-gray-700 uppercase font-bold text-sm'>Dirección: </label>
                <input
                    id='direccion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder={auth.direccion}
                    name='direccion'
                    value={form.direccion}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='telefono'
                    className='text-gray-700 uppercase font-bold text-sm'>Teléfono: </label>
                <input
                    id='ditelefonoreccion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder={auth.telefono}
                    name='telefono'
                    value={form.telefono}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='email'
                    className='text-gray-700 uppercase font-bold text-sm'>Email: </label>
                <input
                    id='email'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder={auth.email}
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className='bg-gray-800 w-full p-3 
        text-slate-300 uppercase font-bold rounded-lg 
        hover:bg-gray-600 cursor-pointer transition-all'
                value='Actualizar' />

        </form>
    )
}

export default FormularioPerfil