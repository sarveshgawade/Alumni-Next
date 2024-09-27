import React, { useState } from 'react'
import BaseLayout from '../Layouts/BaseLayout'
import axios from 'axios'
import axiosInstance from '../Helpers/axiosInstance'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function ChangePassword() {

    const navigate = useNavigate()

    const [passwordDetails,setPasswordDetails] = useState({
        oldPassword: '' ,
        newPassword: '' ,
        confirmNewPassword: ''
    })
    
    function handleUserInput(e){
        const {name,value} = e.target

        setPasswordDetails({
            ...passwordDetails ,
            [name]: value
        })
    }

    
    async function changePassword(e){
        e.preventDefault()

        if(!passwordDetails.oldPassword || !passwordDetails.newPassword || !passwordDetails.confirmNewPassword){
            toast.error('All fields are mandatory !')
            return
        }

        if(passwordDetails.oldPassword === passwordDetails.newPassword){
          toast.error('Old and New Password are the same !')
          return
        }

        if(passwordDetails.newPassword !== passwordDetails.confirmNewPassword){
          toast.error('New Passord & Confirm New Password wont match !')
          return
        }

        if(!passwordDetails.newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/)){
          toast.error('Enter a strong password !')
          return
        }

        if(passwordDetails.newPassword !== passwordDetails.confirmNewPassword){
            toast.error('New Password wont match !')
        }


    
        const response = axiosInstance.post('/user/change-password',passwordDetails)

        const responseDetails = await response
        // console.log(responseDetails);

        if(responseDetails?.data?.success){
            toast.success(responseDetails?.data?.message)
            navigate(-1)
        }else{
            toast.error('Error in changing password !')
        }
    
        setPasswordDetails({
            oldPassword: '' ,
            newPassword: '' ,
            confirmNewPassword: ''
        })
        
    }


  return (
    <BaseLayout>
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form noValidate onSubmit={changePassword} className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h1 className='text-center text-2xl font-bold mb-6'>Change Password</h1>

        <div className='mb-4'>
          <input
            type='password'
            required
            name='oldPassword'
            id='oldPassword'
            placeholder='Enter your old password ...'
            className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
            onChange={handleUserInput}
            value={passwordDetails.oldPassword}
          />
        </div>

        <div className='mb-6'>
          <input
            type='password'
            required
            name='newPassword'
            id='newPassword'
            placeholder='Enter your new password...'
            className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
            onChange={handleUserInput}
            value={passwordDetails.newPassword}
          />
        </div>


        <div className='mb-6'>
          <input
            type='password'
            required
            name='confirmNewPassword'
            id='confirmNewPassword'
            placeholder='Confirm your new password...'
            className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
            onChange={handleUserInput}
            value={passwordDetails.confirmNewPassword}
          />
        </div>


        <button
          className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all'
          type='submit'
        >
          Change Password
        </button>

      </form>
    </div>
    </BaseLayout>
  )
}

export default ChangePassword
