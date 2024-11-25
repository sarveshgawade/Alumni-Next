import React, { useState } from "react";
import BaseLayout from "../Layouts/BaseLayout";
import axiosInstance from "../Helpers/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const JobReferralPage = () => {
  const [option, setOption] = useState(""); // State to track selected option
  const [linkData, setLinkData] = useState(""); // State for the link
  const [jobData, setJobData] = useState({
    // companyName: "",
    role: "",
    experience: "",
    skills: "",
  }); // State for job referral fields
  const navigate = useNavigate() ;

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    
    if(!linkData){
      toast.error("Please provide the link !")
      return
    }
    const response = await axiosInstance.post('/refer/add-job-post',{link: linkData})
    if(response?.data?.success){
      toast.success(response?.data?.message)
      setLinkData("");
      navigate('/referrals')
    }

     
    
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    
    if(!jobData.experience || !jobData.role || !jobData.skills){
        toast.error('All fields are required !')
        return
    }

    const response = await axiosInstance.post('/refer/add-job-post',jobData)
    
    if(response?.data?.success){
      toast.success(response?.data?.message)
      setJobData({
        role: "",
        experience: "",
        skills: "",
      });
      navigate('/referrals') 
    }

    
  };

  const handleJobChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <BaseLayout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 pb-40 pt-40">
      <h1 className="text-2xl font-semibold mb-6">Job Referral Options</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        {/* Option Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Choose an option:</label>
          <div className="space-y-2">
            <button
              className={`w-full py-2 px-4 border rounded ${
                option === "job" ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => setOption("job")}
            >
              Create a Job Referral Post
            </button>
            <button
              className={`w-full py-2 px-4 border rounded ${
                option === "link" ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => setOption("link")}
            >
              Provide a Link
            </button>
          </div>
        </div>

        {/* Conditional Forms */}
        {option === "link" && (
          <form onSubmit={handleLinkSubmit} className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">Link:</label>
            <input
              type="url"
              value={linkData}
              onChange={(e) => setLinkData(e.target.value)}
              placeholder="Enter link"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-medium rounded focus:outline-none hover:bg-blue-600"
              onClick={handleLinkSubmit}
            >
              Submit
            </button>
          </form>
        )}

        {option === "job" && (
          <form onSubmit={handleJobSubmit} className="mt-4 space-y-4">
           
            <div>
              <label className="block text-gray-700 font-medium mb-2">Role:</label>
              <input
                type="text"
                name="role"
                value={jobData.role}
                onChange={handleJobChange}
                placeholder="Enter role"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Experience:</label>
              <input
                type="text"
                name="experience"
                value={jobData.experience}
                onChange={handleJobChange}
                placeholder="Enter experience (e.g., 2-4 years)"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Skills:</label>
              <input
                type="text"
                name="skills"
                value={jobData.skills}
                onChange={handleJobChange}
                placeholder="Enter skills (e.g., JavaScript, React)"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded focus:outline-none hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
    </BaseLayout>
  );
};

export default JobReferralPage;
