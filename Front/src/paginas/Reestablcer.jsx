import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import logoDog from '../assets/doglost.jpg'

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

        }
    }

    useEffect(() => {
        verifyToken()
    },[])

  return (
    <div>
        <ToastContainer />
        <h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500">Welcome again</h1>
      <small className="text-gray-400 block my-4 text-sm">Please enter your details</small>
      <img className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600" src={logoDog} alt="image description" />
      {tokenback &&
          <form className='w-full' onSubmit={handleSubmit}>
              <div className="mb-1">
                  <label className="mb-2 block text-sm font-semibold">Password</label>
                  <input type="password" placeholder="Enter your password" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                      value={form.password || ""}
                      name='password'
                      onChange={handleChange}
                  />
                  <label className="mb-2 block text-sm font-semibold">Confirm password</label>
                  <input type="password" placeholder="Repeat your password" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                      value={form.confirmpassword || ""}
                      name='confirmpassword'
                      onChange={handleChange}
                  />
              </div>
              <div className="mb-3">
                  <button className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">Send
                  </button>
              </div>
          </form>
      }
        
    </div>
  )
}
