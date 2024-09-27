import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import BaseLayout from '../Layouts/BaseLayout'
import { BsPersonCircle } from 'react-icons/bs'
import { getProfile, updateProfile } from '../Redux/Slices/authSlice'
 
function EditProfile() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    fullName: '' ,
    previewImage: '' ,
    avatar: '' ,
    userId: useSelector( state => state?.auth?.data?._id)
  })

  function handleImageUpload(e){
      e.preventDefault()

      const uploadedImage = e.target.files[0]
      
      if(uploadedImage){
        const fileReader = new FileReader()
        fileReader.readAsDataURL(uploadedImage)
        fileReader.addEventListener('load', ()=>{
          setUserData({
            ...userData ,
            previewImage: fileReader.result ,
            avatar: uploadedImage
          })
        })
      }
  }

  function handleInputChange(e){
    const {name, value} = e.target

    setUserData({
      ...userData ,
      [name]: value
    })
  }

  async function  onFormSubmit (e){
      e.preventDefault()

      if(!userData.fullName ){
          toast.error('All fields are mandatory')
          return
      }

      if(userData.fullName.length < 5){
        toast.error('Fullname must be greater than 5 characters')
        return
      }

      const formData = new FormData()
      formData.append('fullName', userData.fullName)
      formData.append('avatar', userData.avatar)

      const response = await dispatch(updateProfile( formData))
      
      if(response?.payload?.success){
        navigate('/user/my-profile')
      }

  }

  return (
    <BaseLayout>
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form noValidate onSubmit={onFormSubmit} className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h1 className='text-center text-2xl font-bold mb-6'>Update Profile</h1>

        <label htmlFor='image_uploads' className='block text-center cursor-pointer mb-4'>
          {userData.previewImage ? (
            <img className='w-24 h-24 rounded-full m-auto' 
            src={userData.previewImage}
             alt='Profile Preview' />
          ) : (
            <BsPersonCircle className='w-24 h-24 rounded-full m-auto' />
          )}
        </label>

        <input
          className='hidden'
          type='file'
          name='image_uploads'
          id='image_uploads'
          accept='.jpg, .jpeg, .png, .svg'
          onChange={handleImageUpload}
        />

        <div className='mb-6'>
          <input
            type='text'
            required
            name='fullName'
            id='fullName'
            placeholder='Enter your full-name...'
            className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
            onChange={handleInputChange}
            value={userData.fullName}
          />
        </div>

        

        <button
          className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all'
          type='submit'
        >
          Update Profile
        </button>

        
      </form>
    </div>
    </BaseLayout>

  )
}

export default EditProfile