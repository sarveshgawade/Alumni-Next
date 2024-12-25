import React, { useState } from "react";
import BaseLayout from "../Layouts/BaseLayout";
import axiosInstance from "../Helpers/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const ApplyToReferral = () => {

  const {state} = useLocation()
  console.log(state);
  
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: "",
    currentCompany: "",
    currentRole: "",
    experience: "",
    salary: "",
    expectedSalary: "",
    noticePeriod: "",
    resumePdf: null,
    email: "",
    phoneNo: "",
    
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    if(!formData.name || !formData.currentCompany || !formData.experience || !formData.salary || !formData.expectedSalary || !formData.noticePeriod || !formData.email || !formData.phoneNo){
      toast.error('All fields are required !')
      return
    }

    const fd = new FormData()
    fd.append('file',formData.resumePdf)
    fd.append('name',formData.name)
    fd.append('currentCompany',formData.currentCompany)
    fd.append('currentRole',formData.currentRole)
    fd.append('experience',formData.experience)
    fd.append('salary',formData.salary)
    fd.append('expectedSalary',formData.expectedSalary)
    fd.append('noticePeriod',formData.noticePeriod)
    fd.append('email',formData.email)
    fd.append('phoneNo',formData.phoneNo)
    fd.append('referredByEmail',state.referredByEmail)

    const response = await axiosInstance.post('/pdf/upload',fd)
    
    if(response?.data?.success){
        toast.success('Applied successfully !')

        setFormData({
          name: "",
          currentCompany: "",
          currentRole: "",
          experience: "",
          salary: "",
          expectedSalary: "",
          noticePeriod: "",
          resumePdf: null,
          email: "",
          phoneNo: "",
          
        });

        navigate(-1)
    }
  };

  return (
    <BaseLayout>
        <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-32 pb-32">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-6 text-center">Job Application Form</h2>
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Current Company", name: "currentCompany", type: "text" },
          { label: "Current Role", name: "currentRole", type: "text" },
          { label: "Experience (years) (eg: 1,2)", name: "experience", type: "number" },
          { label: "Salary (current in LPA) (eg: 1,2)", name: "salary", type: "number" },
          { label: "Expected Salary (LPA) (eg: 1,2)", name: "expectedSalary", type: "number" },
          { label: "Notice Period (days)", name: "noticePeriod", type: "number" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone No.", name: "phoneNo", type: "text" },
          
        ].map((field) => (
          <div className="mb-4" key={field.name}>
            <label className="block text-sm font-medium mb-1" htmlFor={field.name}>
              {field.label}
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id={field.name}
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleInputChange}
            />
          </div>
        ))}

        

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="resumePdf">
            Resume (PDF)
          </label>
          <input
            className="w-full"
            id="resumePdf"
            name="resumePdf"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
    </BaseLayout>
  );
};

export default ApplyToReferral;
