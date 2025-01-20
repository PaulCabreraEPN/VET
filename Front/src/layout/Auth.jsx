import {Navigate, Outlet} from 'react-router-dom'

const Auth = () => {
    const autentificado = localStorage.getItem('token')
    return (
        <main className="flex justify-center content-center w-full h-screen ">

        {autentificado? <Navigate to = '/dashboard'/> : <Outlet/>}
        </main>
    )
}

export default Auth