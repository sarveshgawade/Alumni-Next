import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BaseLayout from '../../Layouts/BaseLayout';
import { MdChevronRight, MdDeleteOutline } from "react-icons/md";
import axiosInstance from '../../Helpers/axiosInstance';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function JobDescription() {
    const { state } = useLocation();
   
    const linkToJob = state?.link ? state.link : '/job/apply'
    
    const navigate = useNavigate()
    const {isLoggedIn,role} = useSelector(state => state?.auth)
    // console.log(role);

    const [skills, setSkills] = useState([]);

    useEffect(() => {
        setSkills(state.skills[0].split(','));
    }, []);

    const handleDelete = async () => {
        const response = await axiosInstance.delete(`/jobs/${state?._id}`)
        

        if(response?.data?.success){
          toast.success('Job post deleted successfully !')
          navigate('/jobs')
        }
        
    };

    return (
        <BaseLayout>
            <main className='w-full pt-24 md:ml-20 md:mr-20'>
                <section className='w-full flex flex-col pr-32 md:flex-row mb-32'>
                    <div className='w-full md:w-1/3 overflow-hidden rounded-lg mb-4 md:mb-0'>
                        <img
                            src={state?.thumbnail?.secure_url}
                            alt='club thumbnail'
                            className='w-full h-64 object-cover object-center'
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div className='pl-0 md:pl-32'>
                        {/* Company Name and Delete Button */}
                        <div className='flex items-center justify-between'>
                            <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-black to-blue-500 text-transparent bg-clip-text uppercase mb-4'>
                                {state?.companyName}
                            </h1>

                            {/* Delete Job Button */}
                            {
                                isLoggedIn && role === 'ADMIN' && (
                                    <button
                                onClick={handleDelete}
                                className='bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-2 rounded-lg ml-4 transition-all duration-300 ease-in-out flex items-center transform hover:scale-105 hover:shadow-lg hover:from-red-600 hover:to-red-800'
                            >
                                <MdDeleteOutline
                                    className='mr-2 transform transition-transform duration-300 ease-in-out group-hover:scale-125 group-hover:rotate-12' 
                                />
                                Delete Job Post
                            </button>
                                )
                            }



                        </div>

                        <h3 className='text-lg md:text-2xl ml-2'>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
                                {state?.description}
                            </span>
                        </h3>

                        <div className='flex flex-col gap-5 mt-10'>
                            <h3 className='text-lg md:text-2xl text-orange-500 ml-2'>
                                Job Role : <span className='text-black'>{state?.jobRole}</span>
                            </h3>
                            <h3 className='text-lg md:text-2xl text-orange-500 ml-2'>
                                Job Type: <span className='text-black'>{state?.jobType}</span>
                            </h3>
                        </div>

                        <div className='mt-10'>
                            <h3 className='text-lg md:text-2xl text-orange-500 ml-2 mb-4'>Skills:</h3>
                            <div className='flex flex-wrap gap-3 ml-2'>
                                {skills?.map((skill, index) => (
                                    <span
                                        key={index}
                                        className='bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-blue-200 transition-colors duration-300 ease-in-out'
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                      

                            {
                                
                                    role === 'USER' ? (
                                        <Link to={linkToJob}>
                                            <button
                                                className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg mt-4 ml-2
                                                        hover:bg-orange-600 hover:scale-105 transition-transform duration-300 ease-in-out"
                                            >
                                                Apply Now
                                            </button>
                                        </Link>
                                    ) : ''
                                 
                            }


                    </div>
                </section>
            </main>
        </BaseLayout>
    );
}

export default JobDescription;
