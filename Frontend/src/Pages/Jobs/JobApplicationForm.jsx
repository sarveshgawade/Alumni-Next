import React, { useState } from 'react';
import BaseLayout from '../../Layouts/BaseLayout';
import axiosInstance from '../../Helpers/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNewJobApplication } from '../../Redux/Slices/jobApplicationSlice';
import { toFormData } from 'axios';

function JobApplicationForm() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        highestQualification: '',
        resume: null,
        courseCompleted: '',
        passoutBatch: '',
        phoneNumber: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, resume: e.target.files[0] });

        // e.preventDefault();
        // const uploadedImage = e.target.files[0];

        // if (uploadedImage) {
        // const fileReader = new FileReader();
        // fileReader.readAsDataURL(uploadedImage);
        // fileReader.addEventListener('load', () => {
        //     formData({
        //     ...eventDetails,
        //     previewImage: fileReader.result,
        //     thumbnail: uploadedImage
        //     });
        // });
        // }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!formData.courseCompleted || !formData.email || !formData.fullName || !formData.highestQualification || !formData.passoutBatch || !formData.phoneNumber || !formData.resume){
                return toast.error('All fields are required !')
        }

        const fd = new FormData() ;

        fd.append('fullName',formData.fullName)
        fd.append('email',formData.email)
        fd.append('highestQualification',formData.highestQualification)
        fd.append('courseCompleted',formData.courseCompleted)
        fd.append('passoutBatch',formData.passoutBatch)
        fd.append('phoneNumber',formData.phoneNumber)
        fd.append('resume',formData.resume)
        
        

        const response = await dispatch(addNewJobApplication(fd))

        if(response?.payload?.success){
            navigate(-1)
        }
        
        
    };

    return (

      <BaseLayout>
       <form noValidate onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-16 mb-10">
            <h2 className="text-2xl font-bold mb-6">Job Application Form</h2>

            {/* Full Name */}
            <div className="mb-4">
                <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                />
            </div>

            {/* Email */}
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                />
            </div>

            {/* Highest Qualification */}
            <div className="mb-4">
                <label htmlFor="highestQualification" className="block text-gray-700">Highest Qualification</label>
                <input
                    type="text"
                    id="highestQualification"
                    name="highestQualification"
                    value={formData.highestQualification}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                />
            </div>

            {/* Avatar (File Upload) */}
            <div className="mb-4">
                <label htmlFor="resume" className="block text-gray-700">resume</label>
                <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>

            {/* Course Completed */}
            <div className="mb-4">
                <label htmlFor="courseCompleted" className="block text-gray-700">Course Completed</label>
                <input
                    type="text"
                    id="courseCompleted"
                    name="courseCompleted"
                    value={formData.courseCompleted}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>

            {/* Passout Batch */}
            <div className="mb-4">
                <label htmlFor="passoutBatch" className="block text-gray-700">Passout Batch</label>
                <input
                    type="number"
                    id="passoutBatch"
                    name="passoutBatch"
                    value={formData.passoutBatch}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mt-4 w-full
                            hover:bg-blue-600 transition duration-300 ease-in-out"
            >
                Submit Application
            </button>
        </form>
      </BaseLayout>
        
    );
}

export default JobApplicationForm;
