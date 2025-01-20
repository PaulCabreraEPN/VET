import { Navigate } from "react-router-dom"

export const PrivateRoute = ({children}) => {
    const autentificado = localStorage.getItem('token')
    return (autentificado) ? children : <Navigate to= '/login/'></Navigate>
}