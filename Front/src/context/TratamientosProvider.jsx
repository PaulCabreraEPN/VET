import { createContext, useState} from "react"
import axios from "axios"

const TratamientosContext = createContext()

const TratamientosProvider = ({ children }) => {
    const [tratamientos, setTratamientos] = useState([])

    const [modal, setModal] = useState(false)
    
    const handleModal = () => {
        setModal(!modal);
    };
   
    const registrarTratamientos = async(datos) => {
        const token = localStorage.getItem('token')
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/registro`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta= await axios.post(url,datos,options)
            setTratamientos([respuesta.data.tratamiento,...tratamientos])
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarTratamientos = async(id) => {
        const token = localStorage.getItem('token')
        try {

            const confirmar = confirm('¿Estas seguro de eliminar?')
            if(confirmar){
                const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/${id}`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            
            await axios.delete(url,options)

            const tratamientosUpd = tratamientos.filter(rt => rt._id !== id)
            setTratamientos(tratamientosUpd)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const cambiarTratamientos = async(id) => {
        const token = localStorage.getItem('token')
        try {

            const confirmar = confirm('¿Estas seguro de cambiar el estado?')
            if(confirmar){
                const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/estado/${id}`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            
            await axios.post(url,{},options)

            const tratamientosUpd = tratamientos.filter(rt => rt._id !== id)
            setTratamientos(tratamientosUpd)
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <TratamientosContext.Provider value={
            {
                modal,
                setModal,
                handleModal,
                tratamientos,
                setTratamientos,
                registrarTratamientos,
                tratamientos,
                setTratamientos, 
                eliminarTratamientos,
                cambiarTratamientos 
            }
        }>
            {children}
        </TratamientosContext.Provider>
    )
}



export {
    TratamientosProvider
}
export default TratamientosContext