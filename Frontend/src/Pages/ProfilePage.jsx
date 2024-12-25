import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../Redux/Slices/authSlice';
import BaseLayout from '../Layouts/BaseLayout';
import { Link } from 'react-router-dom';
import axiosInstance from '../Helpers/axiosInstance';
import axios from 'axios';
import JobProfileCard from '../Components/JobProfileCard';

function ProfilePage() {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({});
  const { role, isLoggedIn } = useSelector((state) => state?.auth);
  const [jobProfileCard,setJobProfileCard] = useState([])

  async function getUserProfile() {
    const response = await dispatch(getProfile());
    
    setUserDetails(response?.payload);
    
    if(response?.payload?.email){
      getReferrals(response?.payload?.email)
    }
    
  }

  async function getReferrals(email) {
    // console.log(email);
    
     const res = await axiosInstance.post('/pdf/get-profiles',{referredByEmail:email})
     if(res.data.success){
        setJobProfileCard(res.data.documents)
        // console.log(jobProfileCard);
        
     }
     
  }

  useEffect(() => {
    getUserProfile();
    
  }, []);



  return (
   

    <BaseLayout>
    <div className=" bg-gray-50 border border-gray-400 shadow-lg rounded-lg p-6 max-w-7xl mx-auto mt-52 mb-40">
  {/* Header section with image and user details */}
  <div className="flex justify-between items-center mb-8">
    <div className="flex items-center">
      <img
        src={userDetails?.avatar?.secure_url}
        alt={userDetails?.fullName}
        className="rounded-full w-16 h-16 object-cover"
      />
      <div className="ml-4">
        <h3 className="text-xl font-bold">{userDetails?.fullName}</h3>
        <div className="flex gap-8">
          <p className="text-gray-600">{userDetails?.email}</p>
          {userDetails?.phoneNumber && (
            <p className="text-gray-600">+91-{userDetails?.phoneNumber}</p>
          )}
        </div>
      </div>
    </div>
    <div className="flex space-x-4">
      <Link to="/user/edit-profile">
        <button className="border border-gray-300 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 transition">
          Edit Profile
        </button>
      </Link>
      <Link to="/user/change-password">
        <button className="border border-gray-300 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 transition">
          Change Password
        </button>
      </Link>
    </div>
  </div>

  {/* Divider */}
  <hr className="my-6" />

  {/* Stats Section */}
  {isLoggedIn && role === "ALUMNI" && (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <div>
        <p className="text-gray-500">Passout Year</p>
        <h4 className="text-2xl font-bold">{userDetails?.passoutBatch}</h4>
      </div>
      <div>
        <p className="text-gray-500">Course</p>
        <h4 className="text-2xl font-bold">{userDetails?.courseCompleted}</h4>
      </div>
      <div>
        <p className="text-gray-500">Current Company Working In</p>
        <h4 className="text-2xl font-bold">{userDetails?.currentCompanyWorkingIn}</h4>
      </div>
      <div>
        <p className="text-gray-500">Current Company Working Role</p>
        <h4 className="text-2xl font-bold">{userDetails?.currentCompanyWorkinInRole}</h4>
      </div>
    </div>
  )}
</div>

{/* Job Profile Cards Section */}
<div className="max-w-7xl mx-auto mt-10 mb-40">
  <h2 className="text-2xl font-bold text-center mb-6">Job Referrals</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {jobProfileCard.map((el) => (
      <JobProfileCard key={el._id} data={el} />
    ))}
  </div>
</div>

    </BaseLayout>
  );
}

export default ProfilePage;
