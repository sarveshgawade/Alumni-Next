import React, { useEffect, useState } from 'react';
import BaseLayout from '../Layouts/BaseLayout';
import img1 from '../assets/alumni1.jpg';
import img2 from '../assets/alumni2.jpg';
import img3 from '../assets/alumni3.jpg';
import img4 from '../assets/alumni4.png';
import img5 from '../assets/alumni5.png';
import img6 from '../assets/alumni6.jpg';
import img7 from '../assets/alumni7.png';
import img8 from '../assets/alumni8.jpg';
import banner from '../assets/banner.png';

function HomePage() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Hide text when scrolling down
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

  // Images array for gallery
  const images = [img1, img2, img3, img4, img5, img6, img7,img8];

  return (
    <BaseLayout>
      {/* Main Banner Section with Full Height Background */}
      <main
        className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white flex items-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div
          className={`pl-8 md:pl-12 lg:pl-24 transition-all duration-500 ease-in-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h1 className="text-9xl font-bold tracking-wider md:text-6xl lg:text-7xl max-w-full text-left">
            ALUMNI NEXT
          </h1>
          <h3 className="text-xl md:text-2xl lg:text-3xl mt-4 font-light tracking-wide text-left">
            Empowering Futures through Mentorship and Opportunities.
          </h3>
        </div>
      </main>

      {/* Image Gallery Section */}
      <section className="py-12 bg-gray-200 relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 px-4 md:px-12 lg:px-24">
  <h1 className="col-span-full text-center text-5xl md:text-6xl font-bold mb-8 relative z-10" data-aos="fade-up">
    <span className="relative inline-block">
      MEET OUR PROUD ALUMNI'S
      <span className="absolute inset-0 bg-black bg-opacity-50 transform -skew-y-2"></span>
    </span>
  </h1>

  {/* Add a wrapper for the images with a transparent background */}
  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg z-0"></div>

  {images.map((image, index) => (
    <div
      key={index}
      className="relative group overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 z-10" // Ensure images stay above the background
      data-aos="fade-up" // Add this for AOS animations
    >
      <img
        src={image}
        alt={`Alumni ${index + 1}`}
        className="w-full h-64 object-cover transition duration-500"
      />
    </div>
  ))}
</section>

    </BaseLayout>
  );
}

export default HomePage;
