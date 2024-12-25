import React from "react";
import BaseLayout from "../Layouts/BaseLayout";
import { FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function JobProfileCard({data}) {
  // console.log(data);
  
  const navigate = useNavigate()

  function loadPDF(data,contentType){
    // console.log(data);
    // console.log(contentType);
    
    navigate('/download-resume',{state:{contentType,data}})

  }
  
  return (
    
      <div className="flex justify-center items-center gap-10 flex-wrap">
        {/* Wrapper for Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Single Card */}
          <div className="w-80 bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            {/* Details Section */}
            <div className="p-4 border-b text-left">
              <h3 className="text-lg font-bold mb-2 text-center">
               {data?.name}
              </h3>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Experience:</span> {data?.experience} years
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Notice Period:</span> {data?.noticePeriod} Days
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Expected Salary:</span> {data?.expectedSalary} LPA
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Current Company:</span> {data?.currentCompany}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Role:</span> {data?.currentRole}
              </p>
            </div>

            {/* Profile Section */}
            <div className="flex justify-between items-center p-4 cursor-pointer">
              
              {/* Download Icon */}
              <a
                onClick={()=> loadPDF(data?.data,data?.contentType)}
                className="flex items-center text-blue-500 hover:text-blue-700 transition duration-200"
                title="Download PDF"
              >
                <FaDownload className="mr-1" />
                <span className="text-sm font-semibold">Download Resume</span>
              </a>


            </div>
          </div>
        </div>
      </div>
    
  );
}

export default JobProfileCard;
