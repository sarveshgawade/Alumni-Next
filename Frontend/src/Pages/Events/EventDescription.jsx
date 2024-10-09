import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BaseLayout from '../../Layouts/BaseLayout';
import Slider from 'react-slick'; // Using react-slick for the image slider
import 'slick-carousel/slick/slick.css'; // Slider CSS
import 'slick-carousel/slick/slick-theme.css';
import axiosInstance from '../../Helpers/axiosInstance';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function EventDescription() {
  const { state } = useLocation();
  const navigate = useNavigate()
  const {isLoggedIn, role} = useSelector(state => state?.auth)

  // Slider settings for the gallery
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  // Delete event handler with confirmation
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
    <BaseLayout>
      <main className="w-full pt-24 md:px-20">
        <section className="w-full mb-32">
          {/* Event Thumbnail */}
          <div className="relative w-full">
            <img
              src={state?.thumbnail?.secure_url}
              alt="event thumbnail"
              className="w-full h-[70vh] object-cover"
            />
            {/* Event Name Overlay */}
            <div className="absolute top-0 right-0 h-[50%] w-full flex items-end justify-end p-8 bg-gradient-to-t from-black via-transparent to-transparent">
              <h1 className="text-5xl md:text-6xl font-bold text-white uppercase">
                {state?.eventName}
              </h1>
            </div>
          </div>

          {/* Event Information */}
          <div className="mt-8 text-left w-full max-w-full">
            <h2 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-gray-800 to-purple-500 text-transparent bg-clip-text uppercase">
              Hosted by {state?.clubName}
            </h2>

            {/* Event Tagline */}
            <div className="mt-4">
              <h3 className="text-xl md:text-2xl text-gray-700 italic break-words">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
                  "{state?.tagline}"
                </span>
              </h3>
            </div>

            {/* Event Date and Description */}
            <div className="flex flex-col gap-6 mt-8">
              <h3 className="text-lg md:text-2xl text-orange-500">
                Date: <span className="text-black">{state?.date}</span>
              </h3>
              <h3 className="text-lg md:text-2xl text-gray-600 break-words">
                {state?.description}
              </h3>
            </div>

            {/* Event Image Gallery Slider */}
            {state?.images?.length > 0 && (
              <div className="mt-12">
                <h3 className="text-lg md:text-2xl text-orange-500 mb-4">
                  Event Gallery
                </h3>
                <Slider {...sliderSettings}>
                  {state.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image.secure_url}
                        alt={`event image ${index + 1}`}
                        className="w-full h-80 object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            )}

            {/* Delete Button */}
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
        </section>
      </main>
    </BaseLayout>
  );
}

export default EventDescription;
