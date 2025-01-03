import React, { useState } from 'react';
import BaseLayout from '../Layouts/BaseLayout';
import axiosInstance from '../Helpers/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import qr from '../assets/qr.png'

export default function DonationForm() {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    employer: '',
    passoutYear: '',
    department: '',
    purpose: '',
    donationAmount: '',
    screenShot:'',
    previewImage: ''
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleImageUpload(e){
    e.preventDefault()

    const uploadedImage = e.target.files[0]
    
    if(uploadedImage){
      const fileReader = new FileReader()
      fileReader.readAsDataURL(uploadedImage)
      fileReader.addEventListener('load', ()=>{
        setFormData({
          ...formData ,
          previewImage: fileReader.result ,
          screenShot: uploadedImage
        })
      })
    }
}


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!formData.fullName || 
       !formData.email || 
       !formData.phoneNumber ||
       !formData.employer ||
       !formData.passoutYear ||
       !formData.department ||
       !formData.purpose ||
       !formData.screenShot ||
       !formData.donationAmount
    ){
      toast.error('All fields are required !')
      return
    }
    
    const form = new FormData()

    form.append('fullName',formData.fullName)
    form.append('email',formData.email)
    form.append('phoneNumber',formData.phoneNumber)
    form.append('employer',formData.employer)
    form.append('passoutYear',formData.passoutYear)
    form.append('department',formData.department)
    form.append('purpose',formData.purpose)
    form.append('screenShot',formData.screenShot)
    form.append('donationAmount',formData.donationAmount)

    const response = await axiosInstance.post('/alumni/donate',formData)

    if(response?.data?.success){
      toast.success(response?.data?.message)

      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        employer: '',
        passoutYear: '',
        department: '',
        purpose: '',
        donationAmount: '',
        screenShot:'',
        previewImage: ''
      })
      
      navigate('/')
    }else{
      toast.error('Error in submitting donation data !')
    }
    

  };

  return (
   <BaseLayout>
     <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-24 pb-14">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Donation Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>

        <div className="flex flex-col items-center mb-6">
            <img src={qr} alt="QR Code" className="w-40 h-40 mb-3" />
            <p className="text-lg text-gray-700">Scan this QR and pay</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Your 10-digit Mobile Number:</label>
            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your 10-digit phone number"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Employer:</label>
            <input
              type="text"
              name="employer"
              value={formData.employer}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Employer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Passout Year from College:</label>
            <input
              type="number"
              name="passoutYear"
              value={formData.passoutYear}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Passout Year"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Department:</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Department"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Purpose behind donation:</label>
            <input
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Purpose (e.g., Labs, Research, Needy Students)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount you want to donate (₹):</label>
            <input
              type="number"
              name="donationAmount"
              value={formData.donationAmount}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Amount You Want To Donate"
              required
            />
          </div>

          {/* screenshot */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Attach the screenshot of payment:</label>
            <input
              type="file"
              name="screenShot"
              // value={formData.donationAmount}
              onChange={handleImageUpload}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              // placeholder="Amount You Want To Donate"
              required
              accept='.jpg, .jpeg, .png, .svg'
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Donate
          </button>
        </form>
      </div>
    </div>
   
   </BaseLayout>
  );
}
