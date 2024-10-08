import React from 'react'
import { useNavigate } from 'react-router-dom'

function JobCard({data}) {
    // console.log(data);
    const navigate = useNavigate()
    
  return (
    <div
    onClick={() => navigate(`/jobs/description/`, {state: data})}
    className="text-white w-[22rem] h-[350px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700 ml-14 mt-32 border border-gray-300 transition-transform hover:translate-y-1 hover:shadow-lg"
  >
    <div className="overflow-hidden">
      <img
        alt="company thumbnail"
        src={data?.thumbnail?.secure_url}
        className="h-48 w-full rounded-tl-lg rounded-tr-lg transition-transform group-hover:scale-[1.05] ease-in-out duration-300"
      />

      <div className="p-3 space-y-1 text-white">
        <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">
           {data?.companyName}
        </h2>
        <h2 className="font-semibold">
          Job Type: {data?.jobType}
        </h2>
        <p className="font-semibold"> Role : {data?.jobRole}</p>
      </div>
    </div>
  </div>


  )
}

export default JobCard
