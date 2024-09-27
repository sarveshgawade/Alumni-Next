import React, { useState } from 'react'
import BaseLayout from '../Layouts/BaseLayout'
import { useDispatch } from 'react-redux'
import { addNewPassword } from '../Redux/Slices/passwordSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function AddNewPassword() {

    const [passwordData, setPasswordData] = useState({
        websiteName: "" ,
        registeredEmail: "",
        userName: "" ,
        password: ""
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleInputChange(e){
      const {name,value} = e.target

      setPasswordData({
        ...passwordData,
        [name]: value
      })
    }

    async function handleAddPassword(){
        
        const response = await dispatch(addNewPassword(passwordData))

        if(!passwordData.password || !passwordData.registeredEmail || !passwordData.userName || !passwordData.websiteName){
          toast.error('All fields are required !')
          return
        }
        
        
        setPasswordData({
          websiteName: "" ,
          registeredEmail: "",
          userName: "" ,
          password: ""
      })

      if (response?.payload?.success){
            navigate('/my-passwords')
      }
    }

  return (
    <BaseLayout>
       <div className="max-w-lg mx-auto bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-lg shadow-lg mb-24 mt-24">
                <h2 className="text-2xl font-bold mb-4">Add New Password</h2>
                <div className="grid grid-cols-1 gap-4">
                    <input
                        type="text"
                        name="websiteName"
                        value={passwordData.websiteName}
                        onChange={handleInputChange}
                        placeholder="Website Name"
                        className="p-2 rounded-lg focus:outline-none text-gray-900"
                    />
                    <input
                        type="email"
                        name="registeredEmail"
                        value={passwordData.registeredEmail}
                        onChange={handleInputChange}
                        placeholder="Registered Email"
                        className="p-2 rounded-lg focus:outline-none text-gray-900"
                    />
                    <input
                        type="text"
                        name="userName"
                        value={passwordData.userName}
                        onChange={handleInputChange}
                        placeholder="Username"
                        className="p-2 rounded-lg focus:outline-none text-gray-900"
                    />
                    <input
                        type="password"
                        name="password"
                        value={passwordData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        className="p-2 rounded-lg focus:outline-none text-gray-900"
                    />
                </div>
                <button
                    onClick={handleAddPassword}
                    className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg mt-4 transition-colors duration-300"
                >
                    Add Password
                </button>
            </div>
           

      
    </BaseLayout>
  )
}

export default AddNewPassword
