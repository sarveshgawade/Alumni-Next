import { Link, useLocation, useNavigate } from 'react-router-dom';
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import axiosInstance from '../../Helpers/axiosInstance';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import e5 from '../../assets/e5.jpeg';  
import e3 from '../../assets/e3.jpg';  
import e2 from '../../assets/e2.jpeg';  
import e1 from '../../assets/e1.jpeg';  
import map from '../../assets/navi-mumbai-map.jpg';  
import BaseLayout from '../../Layouts/BaseLayout';
import { FaLocationArrow } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";


function EventDescription() {

  const { state } = useLocation();
  // console.log(state);
  

  const images = state?.images.map(el => el.secure_url); 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [fadeClass, setFadeClass] = useState('opacity-0'); 

  useEffect(() => {
   
    const scrollInterval = setInterval(() => {
      setFadeClass('opacity-0'); 
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); 
        setFadeClass('opacity-100'); 
      }, 500); 
    }, 2500); 

    return () => {
      clearInterval(scrollInterval); 
    };
  }, []);


  
    // date
  const dateObj = new Date(state?.date);

  const dayName = dateObj.toLocaleString('default', { weekday: 'long' }); 
  const year = dateObj.getFullYear();
  const monthName = dateObj.toLocaleString('default', { month: 'long' }); 
  const day = dateObj.getDate();

  
  
  const navigate = useNavigate()
  const {isLoggedIn, role} = useSelector(state => state?.auth)


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

 
  const   handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this event?");
    
    if (isConfirmed) {
      const response = await axiosInstance.delete(`/event/${state._id}`)
      
      if(response?.data?.success){
        toast.success(response?.data?.message)
        navigate('/events')
      }
      
    } 
  };

  return (
    // <BaseLayout>
    //   <main className="w-full pt-24 md:px-20">
    //     <section className="w-full mb-32">
    //       {/* Event Thumbnail */}
    //       <div className="relative w-full">
    //         <img
    //           src={state?.thumbnail?.secure_url}
    //           alt="event thumbnail"
    //           className="w-full h-[70vh] object-cover"
    //         />
    //         {/* Event Name Overlay */}
    //         <div className="absolute top-0 right-0 h-[50%] w-full flex items-end justify-end p-8 bg-gradient-to-t from-black via-transparent to-transparent">
    //           <h1 className="text-5xl md:text-6xl font-bold text-white uppercase">
    //             {state?.eventName}
    //           </h1>
    //         </div>
    //       </div>

    //       {/* Event Information */}
    //       <div className="mt-8 text-left w-full max-w-full">
    //         <h2 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-gray-800 to-purple-500 text-transparent bg-clip-text uppercase">
    //           Hosted by {state?.clubName}
    //         </h2>

    //         {/* Event Tagline */}
    //         <div className="mt-4">
    //           <h3 className="text-xl md:text-2xl text-gray-700 italic break-words">
    //             <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
    //               "{state?.tagline}"
    //             </span>
    //           </h3>
    //         </div>

    //         {/* Event Date and Description */}
    //         <div className="flex flex-col gap-6 mt-8">
    //           <h3 className="text-lg md:text-2xl text-orange-500">
    //             Date: <span className="text-black">{state?.date}</span>
    //           </h3>
    //           <h3 className="text-lg md:text-2xl text-gray-600 break-words">
    //             {state?.description}
    //           </h3>
    //         </div>

    //         {/* Event Image Gallery Slider */}
    //         {state?.images?.length > 0 && (
    //           <div className="mt-12">
    //             <h3 className="text-lg md:text-2xl text-orange-500 mb-4">
    //               Event Gallery
    //             </h3>
    //             <Slider {...sliderSettings}>
    //               {state.images.map((image, index) => (
    //                 <div key={index}>
    //                   <img
    //                     src={image.secure_url}
    //                     alt={`event image ${index + 1}`}
    //                     className="w-full h-80 object-cover rounded-lg shadow-lg"
    //                   />
    //                 </div>
    //               ))}
    //             </Slider>
    //           </div>
    //         )}

    //         {/* Delete Button */}
    //             {
    //             isLoggedIn && role === 'ADMIN' && (
    //                 <div className="mt-8 flex justify-end">
    //                     <button
    //                         onClick={handleDelete}
    //                         className="px-6 py-2 bg-red-600 text-white rounded-lg transition-transform duration-300 hover:bg-red-700 hover:scale-105 shadow-lg"
    //                     >
    //                         Delete Event
    //                     </button>
    //                 </div>
    //             )
    //         }
    //       </div>
    //     </section>
    //   </main>
    // </BaseLayout>

    <BaseLayout>
      <div className="w-full max-w-5xl mx-auto p-6">
        {/* Thumbnail Section */}
        <div className="bg-white shadow-lg rounded-lg mt-6 p-6 mb-10">
          <img
            src={state?.thumbnail?.secure_url}
            alt="Janfest Poster"
            className="w-full h-auto rounded-lg"
          />

          <div className="mt-4">
            <h2 className="text-3xl font-semibold">{state?.eventName}</h2>
            <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 mt-2">
              <p>{dayName}, {monthName} {day}, {year}</p>
           
            </div>
           
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          <div className="flex flex-col lg:flex-row">
           
            <div className="lg:w-2/3 p-4 relative overflow-hidden" style={{ height: '500px' }}> 
              <div className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${fadeClass}`}>
                <img
                  src={images[currentIndex]}
                  alt={`Carousel image ${currentIndex + 1}`}
                  className="w-full h-full rounded-lg object-cover" 
                  style={{ objectFit: 'cover', height: '100%' }} 
                />
              </div>
            </div>

            
            <div className="lg:w-1/3 p-4 rounded-r-lg" style={{ height: '500px' }}> 
              <div className="flex flex-col space-y-4 h-full justify-between"> 
                <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
                  <div className="flex items-center mb-2">
                    <FaLocationArrow className="mr-2" /> 
                    <h3 className="text-xl font-semibold">Venue</h3>
                  </div>
                  <p className="text-gray-700">
                  Thakur College of Science & Commerce <br />
                  6V4F+FPF, Thakur Rd, <br />
                   Thakur Village, Kandivali East, <br />
                   Mumbai, Maharashtra <br />
                  400101
                  </p>
                  <a href="https://maps.app.goo.gl/g4UZQ6JCYaq9n5G46" className="text-blue-500 hover:underline mt-1 block">
                    Get Directions
                  </a>
                  <img src={map} alt="map" className='rounded-lg' />
                </div>

             
                <div className="bg-gray-200 p-2 mb-4 rounded-lg shadow-lg overflow-hidden">
                  <h3 className=" font-semibold pb-2 text-black">Connect with us</h3>
                  <p className="text-black flex items-center gap-4">
                    <Link to="https://www.youtube.com/@ThakurCollegeofScienceCommerce"><FaYoutube className='cursor-pointer' size={20} color='red'/></Link>
                    <Link to="http://instagram.com/taarangan"><IoLogoInstagram className='cursor-pointer' size={20} color='purple'/></Link>
                    
                  </p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        
        {
                isLoggedIn && role === 'ADMIN' && (
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleDelete}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg transition-transform duration-300 hover:bg-red-700 hover:scale-105 shadow-lg"
                        >
                            Delete Event
                        </button>
                    </div>
                )
            }

      </div>
    </BaseLayout>
  );
}

export default EventDescription;

