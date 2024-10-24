import React, { useEffect, useState } from 'react';
import e5 from '../assets/e5.jpeg';  
import e3 from '../assets/e3.jpg';  
import e2 from '../assets/e2.jpeg';  
import e1 from '../assets/e1.jpeg';  
import map from '../assets/navi-mumbai-map.jpg';  
import BaseLayout from '../Layouts/BaseLayout';
import { FaLocationArrow } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";

const Janfest2023 = () => {
  const images = [e1, e2, e3, e5]; // Add your images here
  const [currentIndex, setCurrentIndex] = useState(0); // Track current image index
  const [fadeClass, setFadeClass] = useState('opacity-0'); // Fade class for transition

  useEffect(() => {
    // Set up an interval to change the image every 2 seconds
    const scrollInterval = setInterval(() => {
      setFadeClass('opacity-0'); // Start fade-out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Update to next image
        setFadeClass('opacity-100'); // Start fade-in
      }, 500); // Match fade-out transition time (500ms)
    }, 2500); // 2 seconds plus fade-out/in time

    return () => {
      clearInterval(scrollInterval); // Clean up on component unmount
    };
  }, []);

  return (
    <BaseLayout>
      <div className="w-full max-w-5xl mx-auto p-6">
        {/* Thumbnail Section */}
        <div className="bg-white shadow-lg rounded-lg mt-6 p-6 mb-10">
          <img
            src={e5}
            alt="Janfest Poster"
            className="w-full h-auto rounded-lg"
          />

          <div className="mt-4">
            <h2 className="text-3xl font-semibold">JANFEST 2023</h2>
            <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 mt-2">
              <p>Sat, Jan 28, 2023</p>
              {/* <span className="mx-2">to</span> */}
              {/* <p>Sun, Jan 29, 2023</p> */}
            </div>
            {/* <div className="text-sm text-gray-600">12:00 am IST to 11:59 pm IST</div> */}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          <div className="flex flex-col lg:flex-row">
            {/* Left section - Image Carousel with Fade Transition */}
            <div className="lg:w-2/3 p-4 relative overflow-hidden" style={{ height: '500px' }}> {/* Increased height */}
              <div className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${fadeClass}`}>
                <img
                  src={images[currentIndex]}
                  alt={`Carousel image ${currentIndex + 1}`}
                  className="w-full h-full rounded-lg object-cover" // Update this line for proper image containment
                  style={{ objectFit: 'cover', height: '100%' }} // Ensures the image fits inside the container
                />
              </div>
            </div>

            {/* Right section - Details */}
            <div className="lg:w-1/3 p-4 rounded-r-lg" style={{ height: '500px' }}> {/* Match height of the right section */}
              <div className="flex flex-col space-y-4 h-full justify-between"> {/* Reduced vertical space between elements */}
                {/* Venue Section */}
                <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
                  <div className="flex items-center mb-2">
                    <FaLocationArrow className="mr-2" /> {/* Adds a margin between the icon and text */}
                    <h3 className="text-xl font-semibold">Venue</h3>
                  </div>
                  <p className="text-gray-700">
                    St. Xaviers College,<br />
                    Mahapalika Marg, Dhobi Talao,<br />
                    Chhatrapati Shivaji Terminus Area, Fort,<br />
                    Mumbai, Maharashtra, India
                  </p>
                  <a href="https://maps.app.goo.gl/g4UZQ6JCYaq9n5G46" className="text-blue-500 hover:underline mt-1 block">
                    Get Directions
                  </a>
                  <img src={map} alt="map" className='rounded-lg' />
                </div>

                {/* Invite Friend Section */}
                <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-2 text-black">Connect with us</h3>
                  <p className="text-black flex items-center gap-4">
                    <IoLogoInstagram className='cursor-pointer' size={25} color='purple'/>
                    <FaYoutube className='cursor-pointer' size={25} color='red'/>
                    
                  </p>
                  {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2">
                    Share
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Button */}
        <div className="text-right mt-4">
          <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg" disabled>
            Delete event
          </button>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Janfest2023;
