import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import {Link} from 'react-router-dom'

const Footer = () => {

  const year = new Date().getFullYear()
  
  return (
    <div className='w-full bg-black bg-opacity-80  text-gray-300 py-2 px-2'>
      <div className='max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 border-b-2 border-gray-600 py-8 px-4'>
        <div>
          <h6 className='font-bold uppercare pt-2'>ALUMNI-NEXT</h6>
          <ul>
            {/* <li>Connecting Alumni and Students for Career Growth and Knowledge Sharing. Empowering Futures through Mentorship and Opportunities.</li> */}
            <li>Connecting Alumni and Students </li>
            <li>for Career Growth and Knowledge Sharing.</li> 
            <li>Empowering Futures through </li>
            <li> Mentorship and Opportunities.</li>
            {/* <li>and educationalists.</li> */}
          </ul>
        </div>
        <div>
          <h6 className='font-bold uppercare pt-2'>ABOUT</h6>
          {/* <ul>
            <Link
            //    to='/about-us'
               className='transition-colors duration-300 hover:text-orange-500'
               
            >
              <li className='py-1'>About Event-Spectra</li>
            </Link>

            <Link
            //    to='#' 
               className='transition-colors duration-300 hover:text-orange-500'
             
            >
              <li className='py-1'>Founders</li>
            </Link>
            
            <Link
            //    to='#' 
               className='transition-colors duration-300 hover:text-orange-500'
               
            >
              <li className='py-1'>Board Of Directors</li>
            </Link>
            


        
          </ul> */}
        </div>

        <div>
          <h6 className='font-bold uppercare pt-2'>CONTACT</h6>
          <ul>
            <li className='py-1'>Thakur College of Science & Commerce
Thakur Village,Kandivali (E),
Mumbai - 400 101
Tel: 2887 0627, 2846 2565
Fax: 2886 8822</li>
            <li className='py-1'>alumninext081@gmail.com</li>
            <li className='py-1'>+91xxxxxxxxxx</li>
            <li className='py-1'>+91xxxxxxxxxx</li>
          </ul>
        </div>
      </div>

      <div className='flex flex-col max-w-[1400px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500'>
        <p className='py-4'>© {year} Copyright : Alumni Next</p>
        {/* <div className='flex justify-between sm:w-[300px] pt-4 text-2xl'>

          <Link 
            // to='https://facebook.com/official.kitcoek/ ' 
            className='transition-colors duration-300 hover:text-orange-500'
            
          >
              <FaFacebook />
          </Link>


          <Link 
            // to='https://www.instagram.com/kitcoek.official/' 
            className='transition-colors duration-300 hover:text-orange-500'
            
          >
              <FaInstagram />
          </Link>

          <Link 
            // to='https://twitter.com/officialkitcoek'
            className='transition-colors duration-300 hover:text-orange-500'
            
          >
            <FaTwitter />
          </Link>
          
          <Link 
            // to='https://www.youtube.com/channel/UCjC8I3J_s3eRJJiTHTQXasA' 
            className='transition-colors duration-300 hover:text-orange-500'
           
          >
            <FaYoutube />
          </Link>

          <Link 
            // to='https://api.whatsapp.com/send?phone=+917030861199' 
            className='transition-colors duration-300 hover:text-orange-500'
           
          >
            <FaWhatsapp />
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;