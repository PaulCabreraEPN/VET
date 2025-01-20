import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Formulario = ({paciente}) => {

    const navigate = useNavigate()

    //Paso 1 Crate useState

    const [form, setform] = useState({
        nombre:paciente?.nombre||"",
        propietario:paciente?.propietario||"",
        email:paciente?.email||"",
        celular:paciente?.celular||"",
        salida: new Date(paciente?.salida).toLocaleDateString('en-CA',{timeZone:'UTC'}) ?? "",
        convencional:paciente?.convencional||"",
        sintomas:paciente?.sintomas||""
    })

    console.warn(form);
    
    // Paso 2 Lógica para guardar en el State

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    
    //Paso 3 Lógica para enviar al backend

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (paciente?._id) {
            try {
                const token = localStorage.getItem('token')
                const url = `http://localhost:3000/api/paciente/actualizar/${paciente._id}`   
                const options = {
                    headers:{
                        method:'PUT',
                        'Content-type':'application/json',
                        Authorization : `Bearer ${token}`
                    }
                }      
                await axios.put(url,form,options)
    
                navigate('/dashboard/listar')

            } catch (error) {
                console.log(error);
                
            }
            
        } else {
            try {
                const token = localStorage.getItem('token')
                const url = `http://localhost:3000/api/paciente/registro`   
                const options = {
                    headers:{
                        'Content-type':'application/json',
                        Authorization : `Bearer ${token}`
                    }
                }      
                await axios.post(url,form,options)
    
                navigate('/dashboard/listar')
            } catch (error) {
                console.log(error);
                
            }
        }
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label
                    htmlFor='nombre:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre de la mascota: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre de la mascota'
                    name='nombre'
                    onChange={handleChange}
                    value={form.nombre}
                />
            </div>
            <div>
                <label
                    htmlFor='propietario:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del propietario: </label>
                <input
                    id='propietario'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre del propietario'
                    name='propietario'
                    onChange={handleChange}
                    value={form.propietario}
                />
            </div>
            <div>
                <label
                    htmlFor='email:'
                    className='text-gray-700 uppercase font-bold text-sm'>Email: </label>
                <input
                    id='email'
                    type="email"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='email del propietario'
                    name='email'
                    onChange={handleChange}
                    value={form.email}
                />
            </div>
            <div>
                <label
                    htmlFor='celular:'
                    className='text-gray-700 uppercase font-bold text-sm'>Celular: </label>
                <input
                    id='celular'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='celular del propietario'
                    name='celular'
                    onChange={handleChange}
                    value={form.celular}
                />
            </div>
            <div>
                <label
                    htmlFor='convencional:'
                    className='text-gray-700 uppercase font-bold text-sm'>Convencional: </label>
                <input
                    id='convencional'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='convencional del propietario'
                    name='convencional'
                    onChange={handleChange}
                    value={form.convencional}

                />
            </div>
            <div>
                <label
                    htmlFor='Salida:'
                    className='text-gray-700 uppercase font-bold text-sm'>Fecha de salida: </label>
                <input
                    id='salida'
                    type="date"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='salida'
                    name='salida'
                    onChange={handleChange}
                    value={form.salida}
                />
            </div>
            <div>
                <label
                    htmlFor='sintomas:'
                    className='text-gray-700 uppercase font-bold text-sm'>Síntomas: </label>
                <textarea
                    id='sintomas'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Ingrese los síntomas de la mascota'
                    name='sintomas'
                    onChange={handleChange}
                    value={form.sintomas}
                />
            </div>

            <input
                type="submit"
                className='bg-gray-600 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'
                value={paciente?._id ? 'Actualizar paciente' : 'Registrar paciente'} />

        </form>
    )
}


