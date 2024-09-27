import React, { useState } from 'react'
import BaseLayout from '../Layouts/BaseLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axiosInstance from '../Helpers/axiosInstance'

function EditPasswordDetails() {

    const location = useLocation()
    const passwordDetails = location.state

    const navigate = useNavigate()

    const [formData,setFormData] = useState({
        websiteName: '' ,
        registeredEmail: '' ,
        userName: '' ,
        password: ''
    })

    function handleChange(e){
        const {name,value} = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    async function handleSubmit(e){
        e.preventDefault()

        if( formData.password === '' && 
            formData.userName === '' && 
            formData.registeredEmail === '' && 
            formData.websiteName === ''){
                toast.error('Atleast one field must be edited !')
                return
        }   

        const filteredObj = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => value !== '')
        );

        const response = axiosInstance.put(`my-passwords/edit/${passwordDetails._id}`,filteredObj) 
        
        const responseDetails = await response
        
        setFormData({
            websiteName: '' ,
            registeredEmail: '' ,
            userName: '' ,
            password: ''
        })

        if(responseDetails?.data?.success){
            toast.success(responseDetails?.data?.message)
            navigate('/my-passwords')
        }
    }

  return (
    <BaseLayout>
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Password Details</h2>
      <form noValidate onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Website Name</label>
          <input
            type="text"
            name="websiteName"
            value={formData.websiteName}
            onChange={handleChange}
            placeholder={passwordDetails.websiteName}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-gray-700">Registered Email</label>
          <input
            type="email"
            name="registeredEmail"
            value={formData.registeredEmail}
            placeholder={passwordDetails.registeredEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-gray-700">User Name</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            placeholder={passwordDetails.userName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder={passwordDetails.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Register
        </button>
      </form>
    </div>
    </BaseLayout>
  )
}

export default EditPasswordDetails
