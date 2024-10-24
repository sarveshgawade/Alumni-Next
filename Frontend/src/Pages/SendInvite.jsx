import React, { useState, useEffect } from 'react';
import axiosInstance from '../Helpers/axiosInstance';

const SendInvite = () => {
  const [degree, setDegree] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [specializations, setSpecializations] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const degreeOptions = ['Btech', 'BSC'];
  const specializationOptions = {
    Btech: ['Electronics and Telecommunication', 'Computer Science', 'Mechanical', 'Civil', 'Biotechnology'],
    BSC: ['Information Technology', 'Physics', 'Chemistry', 'Mathematics'],
  };

  useEffect(() => {
    if (degree) {
      setSpecializations(specializationOptions[degree]);
      setSpecialization('');
    }
  }, [degree]);

  const fetchAlumni = async () => {
    if (degree && specialization) {
        
      const response = await axiosInstance.post('/alumni/get-alumni-by-degree',{degree,specialization})
        console.log(response?.data?.filteredAlumni);
        
      setAlumni(response?.data?.filteredAlumni);
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedAlumni(alumni.map(alum => alum.id));
    } else {
      setSelectedAlumni([]);
    }
  };

  const handleSelectAlumni = (id) => {
    if (selectedAlumni.includes(id)) {
      setSelectedAlumni(selectedAlumni.filter(alumId => alumId !== id));
    } else {
      setSelectedAlumni([...selectedAlumni, id]);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 border-2 border-gray-400 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Invite Alumni</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            className="mt-2 p-2 border w-full rounded focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Time</label>
          <input
            type="time"
            className="mt-2 p-2 border w-full rounded focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            className="mt-2 p-2 border w-full rounded focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Degree</label>
          <select
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="mt-2 p-2 border w-full rounded focus:ring focus:ring-blue-300"
          >
            <option value="">Select Degree</option>
            {degreeOptions.map(degree => (
              <option key={degree} value={degree}>{degree}</option>
            ))}
          </select>
        </div>
        {degree && (
          <div className="mb-4">
            <label className="block text-gray-700">Specialization</label>
            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="mt-2 p-2 border w-full rounded focus:ring focus:ring-blue-300"
            >
              <option value="">Select Specialization</option>
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        )}
        <button
          type="button"
          onClick={fetchAlumni}
          className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600 transition duration-300"
        >
          Fetch Alumni
        </button>
      </form>

      {alumni.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Alumni to Invite</h3>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="mr-2"
            />
            <label>Select All</label>
          </div>
          {alumni.map(alum => (
            <div key={alum._id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedAlumni.includes(alum._id)}
                onChange={() => handleSelectAlumni(alum._id)}
                className="mr-2"
              />
              <label>{alum.fullName}</label>
            </div>
          ))}
          <button
            type="button"
            onClick={() => alert(`Inviting ${selectedAlumni.length} alumni`)}
            className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600 transition duration-300"
          >
            Send Invites
          </button>
        </div>
      )}
    </div>
  );
};

export default SendInvite;
