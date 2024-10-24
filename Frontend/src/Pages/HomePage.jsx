import React, { useEffect, useState, useRef } from 'react';
import BaseLayout from '../Layouts/BaseLayout';
import img1 from '../assets/alumni1.jpg';
import img2 from '../assets/alumni2.jpg';
import img3 from '../assets/alumni3.jpg';
import img4 from '../assets/alumni4.png';
import img5 from '../assets/alumni5.png';
import img6 from '../assets/alumni6.jpg';
import img7 from '../assets/alumni7.png';
import img8 from '../assets/alumni8.jpg';
import banner from '../assets/4.jpg';
import headerImage from '../assets/tcscheader.jpg'; // Add your header image
import { IoSchoolOutline } from "react-icons/io5"; // Import the icon here

function HomePage() {
  const [isVisible, setIsVisible] = useState(true);
  const scrollRef = useRef(null); // Ref for scrollable image container
  const images = [img1, img2, img3, img4, img5, img6, img7, img8]; // Images array for gallery

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollIndex = 0;

    const intervalId = setInterval(() => {
      if (scrollContainer) {
        scrollIndex = (scrollIndex + 1) % images.length; // Cycle through images
        const scrollAmount = scrollContainer.clientWidth; // Scroll by the width of one image
        scrollContainer.scrollTo({
          left: scrollIndex * scrollAmount,
          behavior: 'smooth',
        });
      }
    }, 2000); // 2-second interval

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [images]);

  return (
    <BaseLayout>
      {/* Full Width Header Image */}
      <div className="w-full mt-4">
        <img
          src={headerImage}
          alt="Header"
          className="w-full h-64 object-contain pl-6" // Adjust height as needed
        />
      </div>

      {/* Main Banner Section with Full Height Background */}
      <main
        className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div
          className={`flex items-center flex-col transition-all duration-700 ease-in-out text-center ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          <h1 className="text-6xl font-bold tracking-wider max-w-full text-center">
            ALUMNI NEXT
          </h1>
          {/* IoSchoolOutline Icon */}
          <IoSchoolOutline className="text-5xl mt-4 transition-transform duration-300 ease-in-out hover:scale-110" />
        </div>
      </main>
    </BaseLayout>
  );
}

export default HomePage;
