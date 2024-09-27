import React, { useEffect, useState } from 'react'
import BaseLayout from '../../Layouts/BaseLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllJobs } from '../../Redux/Slices/jobSlice'
import JobCard from '../../Components/JobCard'

function JobList() {

    const {isLoggedIn,role} = useSelector(state => state?.auth)
    const {jobs} = useSelector(state => state?.jobs)
    const dispatch = useDispatch()
    // console.log(jobs);
    

    async function loadAllJobs() {
         const response = await dispatch(getAllJobs())   
    }

    useEffect(()=> {
        loadAllJobs()
    },[])
    
  return (
    <BaseLayout>
    {
        isLoggedIn ? jobs.length ==0 ? 
        
        <div className="flex justify-center items-center h-96">
          <h1 className="text-3xl text-center opacity-50">
            No Jobs Listed!
          </h1>
        </div>
        : (
            <div className='flex flex-wrap gap-10 mb-10 justify-center items-center'>
            {
              jobs.map( element => <JobCard key={element._id} data={element} />)
            }
            </div>
        ) :(
          <div className="flex justify-center items-center h-96">
          <h1 className="text-3xl text-center opacity-50">
              Please login to see listed jobs!
          </h1>
      </div>
        )
    }
      
    </BaseLayout>
  )
}

export default JobList
