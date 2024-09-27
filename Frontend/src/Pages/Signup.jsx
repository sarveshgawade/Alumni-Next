// import React, { useState } from 'react';
// import { BsPersonCircle } from 'react-icons/bs';
// import { useDispatch } from 'react-redux';
// import { signUp } from '../Redux/Slices/authSlice';
// import BaseLayout from '../Layouts/BaseLayout';
// import { Link, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// function Signup() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [signupData, setSignupData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     avatar: '',
//     role: '', 
//     courseCompleted: '',
//     passoutBatch: '',
//     currentCompanyWorkingIn: '',
//     currentCompanyWorkinInRole: ''
//   });
//   const [previewImage, setPreviewImage] = useState('');

//   function getImage(e) {
//     e.preventDefault();
//     const uploadedImage = e.target.files[0];
//     if (uploadedImage) {
//       setSignupData({
//         ...signupData,
//         avatar: uploadedImage
//       });

//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(uploadedImage);
//       fileReader.addEventListener('load', function () {
//         setPreviewImage(this.result);
//       });
//     }
//   }

//   function handleUserInput(e) {
//     const { name, value } = e.target;
//     setSignupData({
//       ...signupData,
//       [name]: value
//     });
//   }

//   async function createNewAccount(e) {
//     e.preventDefault();

//     if (!signupData.fullName || !signupData.email || !signupData.password) {
//       toast.error('Please fill all the details !');
//       return;
//     }

//     if (
//       !signupData.email.match(
//         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//       )
//     ) {
//       toast.error('Enter a valid email !');
//       return;
//     }

//     if (signupData.fullName.length < 5) {
//       toast.error('Name should be at least 5 characters long!');
//       return;
//     }

//     if (
//       !signupData.password.match(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
//       )
//     ) {
//       toast.error('Enter a strong password !');
//       return;
//     }

//     if(signupData.role === 'ALUMNI'){
//       if(!signupData.courseCompleted || !signupData.currentCompanyWorkinInRole || !signupData.currentCompanyWorkingIn || !signupData.passoutBatch ){
//         toast.error('All fields are required !')
//         return
//       }
//     }

//     const formData = new FormData();
//     formData.append('fullName', signupData.fullName);
//     formData.append('email', signupData.email);
//     formData.append('password', signupData.password);
//     formData.append('avatar', signupData.avatar);
//     formData.append('role', signupData.role);
//     formData.append('courseCompleted', signupData.courseCompleted);
//     formData.append('passoutBatch', signupData.passoutBatch);
//     formData.append('currentCompanyWorkingIn', signupData.currentCompanyWorkingIn);
//     formData.append('currentCompanyWorkinInRole', signupData.currentCompanyWorkinInRole);

//     const response = await dispatch(signUp(formData));

//     if (response?.payload?.data?.success) {
//       navigate('/user/signin');
//     }

//     setSignupData({
//       fullName: '',
//       email: '',
//       password: '',
//       avatar: '',
//       role: 'Student',
//       courseCompleted: '',
//       passoutBatch: '',
//       currentCompanyWorkingIn: '',
//       currentCompanyWorkinInRole: ''
//     });

//     console.log(signupData);
    
//   }

//   return (
//     <BaseLayout>
//       <div className='flex items-center justify-center min-h-screen bg-gray-100 pt-44 pb-44'>
//         <form
//           noValidate
//           onSubmit={createNewAccount}
//           className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'
//         >
//           <h1 className='text-center text-2xl font-bold mb-6'>Signup</h1>

//           <label htmlFor='image_uploads' className='block text-center cursor-pointer mb-4'>
//             {previewImage ? (
//               <img className='w-24 h-24 rounded-full m-auto' src={previewImage} alt='Profile Preview' />
//             ) : (
//               <BsPersonCircle className='w-24 h-24 rounded-full m-auto' />
//             )}
//           </label>

//           <input
//             className='hidden'
//             type='file'
//             name='image_uploads'
//             id='image_uploads'
//             accept='.jpg, .jpeg, .png, .svg'
//             onChange={getImage}
//           />

//         <div className='mb-6'>
//           <select
//             name='role'
//             value={signupData.role}
//             onChange={handleUserInput}
//             className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
//             required
//           >
//             <option value='' disabled>
//               Register as
//             </option>
//             <option value='USER'>Student</option>
//             <option value='ALUMNI'>Alumni</option>
//           </select>
//         </div>


//           <div className='mb-6'>
//             <input
//               type='text'
//               required
//               name='fullName'
//               id='fullName'
//               placeholder='Enter your full-name...'
//               className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
//               onChange={handleUserInput}
//               value={signupData.fullName}
//             />
//           </div>

//           <div className='mb-4'>
//             <input
//               type='email'
//               required
//               name='email'
//               id='email'
//               placeholder='Enter your Email...'
//               className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
//               onChange={handleUserInput}
//               value={signupData.email}
//             />
//           </div>

//           <div className='mb-6'>
//             <input
//               type='password'
//               required
//               name='password'
//               id='password'
//               placeholder='Enter your password...'
//               className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
//               onChange={handleUserInput}
//               value={signupData.password}
//             />
//           </div>

          

//           {/* Conditionally show fields based on role */}
//           {signupData.role === 'ALUMNI' && (
//             <>
//               <div className='mb-4'>
//                 <input
//                   type='text'
//                   name='courseCompleted'
//                   placeholder='Course Completed'
//                   value={signupData.courseCompleted}
//                   onChange={handleUserInput}
//                   className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
//                 />
//               </div>

//               <div className='mb-4'>
//                 <input
//                   type='number'
//                   name='passoutBatch'
//                   placeholder='Passout Batch'
//                   value={signupData.passoutBatch}
//                   onChange={handleUserInput}
//                   className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
//                 />
//               </div>

//               <div className='mb-4'>
//                 <input
//                   type='text'
//                   name='currentCompanyWorkingIn'
//                   placeholder='Current Company Working In'
//                   value={signupData.currentCompanyWorkingIn}
//                   onChange={handleUserInput}
//                   className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
//                 />
//               </div>

//               <div className='mb-4'>
//                 <input
//                   type='text'
//                   name='currentCompanyWorkinInRole'
//                   placeholder='Current Role'
//                   value={signupData.currentCompanyWorkinInRole}
//                   onChange={handleUserInput}
//                   className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
//                 />
//               </div>
//             </>
//           )}

//           <button
//             className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all'
//             type='submit'
//           >
//             Create Account
//           </button>

//           <p className='mt-4 text-center'>
//             Already have an account?{' '}
//             <Link to='/user/signin' className='text-blue-500 hover:underline'>
//               Signin
//             </Link>
//           </p>
//         </form>
//       </div>
//     </BaseLayout>
//   );
// }

// export default Signup;

import React, { useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { signUp } from '../Redux/Slices/authSlice';
import BaseLayout from '../Layouts/BaseLayout';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import axiosInstance from '../Helpers/axiosInstance';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    avatar: '',
    role: '', 
    courseCompleted: '',
    passoutBatch: '',
    currentCompanyWorkingIn: '',
    currentCompanyWorkinInRole: '',
    phoneNumber: '',
    otp: '',
  });

  const [previewImage, setPreviewImage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(false);

  function getImage(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener('load', function () {
        setPreviewImage(this.result);
      });
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  // Send OTP Function
  async function sendOtp(e) {
    e.preventDefault();
    if (!signupData.phoneNumber.match(/^\d{10}$/)) {
      toast.error('Enter a valid 10-digit phone number!');
      return;
    }

    try {
      const response = await axiosInstance.post('/otp/sendOTP', {
        phoneNumber: `+91${signupData.phoneNumber}`,
      });

      console.log(response?.data);
      

      if (response?.data?.success) {
        toast.success('OTP sent successfully!');
        setOtpSent(true); // Enable OTP input and verification after OTP is sent
      } else {
        toast.error('Failed to send OTP!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error in sending OTP!');
    }
  }

  // Verify OTP Function
  async function verifyOtp(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/otp/verifyOTP', {
        phoneNumber: `+91${signupData.phoneNumber}`,
        otp: signupData.otp,
      });
      

      if (response.data.success) {
        toast.success('OTP verified successfully!');
        setIsPhoneNumberVerified(true)
        // Proceed with signup process
      } else {
        toast.error('Invalid OTP. Please try again!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error in verifying OTP!');
    }
  }

  async function createNewAccount(e) {
    e.preventDefault();

    if (!signupData.fullName || !signupData.email || !signupData.password || !signupData.phoneNumber ) {
      toast.error('Please fill all the details!');
      return;
    }

    if(!isPhoneNumberVerified){
      toast.error("Please verify your phone number")
      return
    }

    if (!signupData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Enter a valid email!');
      return;
    }

    if (signupData.fullName.length < 5) {
      toast.error('Name should be at least 5 characters long!');
      return;
    }

    if (
      !signupData.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
      )
    ) {
      toast.error('Enter a strong password!');
      return;
    }

    if (signupData.role === 'ALUMNI') {
      if (
        !signupData.courseCompleted ||
        !signupData.currentCompanyWorkinInRole ||
        !signupData.currentCompanyWorkingIn ||
        !signupData.passoutBatch
      ) {
        toast.error('All fields are required!');
        return;
      }
    }

    const formData = new FormData();
    formData.append('fullName', signupData.fullName);
    formData.append('email', signupData.email);
    formData.append('password', signupData.password);
    formData.append('avatar', signupData.avatar);
    formData.append('role', signupData.role);
    formData.append('courseCompleted', signupData.courseCompleted);
    formData.append('passoutBatch', signupData.passoutBatch);
    formData.append('currentCompanyWorkingIn', signupData.currentCompanyWorkingIn);
    formData.append('currentCompanyWorkinInRole', signupData.currentCompanyWorkinInRole);
    formData.append('phoneNumber', signupData.phoneNumber);

    const response = await dispatch(signUp(formData));

    if (response?.payload?.data?.success) {
      navigate('/user/signin');
    }

    setSignupData({
      fullName: '',
      email: '',
      password: '',
      avatar: '',
      role: 'Student',
      courseCompleted: '',
      passoutBatch: '',
      currentCompanyWorkingIn: '',
      currentCompanyWorkinInRole: '',
      phoneNumber: '',
      otp: '',
    });
  }

  return (
    <BaseLayout>
      <div className='flex items-center justify-center min-h-screen bg-gray-100 pt-44 pb-44'>
        <form
          noValidate
          onSubmit={createNewAccount}
          className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'
        >
          <h1 className='text-center text-2xl font-bold mb-6'>Signup</h1>

          <label htmlFor='image_uploads' className='block text-center cursor-pointer mb-4'>
            {previewImage ? (
              <img className='w-24 h-24 rounded-full m-auto' src={previewImage} alt='Profile Preview' />
            ) : (
              <BsPersonCircle className='w-24 h-24 rounded-full m-auto' />
            )}
          </label>

          <input
            className='hidden'
            type='file'
            name='image_uploads'
            id='image_uploads'
            accept='.jpg, .jpeg, .png, .svg'
            onChange={getImage}
          />

          {/* Role Selection */}
          <div className='mb-6'>
            <select
              name='role'
              value={signupData.role}
              onChange={handleUserInput}
              className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
              required
            >
              <option value='' disabled>
                Register as
              </option>
              <option value='USER'>Student</option>
              <option value='ALUMNI'>Alumni</option>
            </select>
          </div>

          {/* Phone Number Field */}
          <div className='mb-4'>
            <input
              type='text'
              required
              name='phoneNumber'
              id='phoneNumber'
              placeholder='Enter your phone number...'
              className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
              onChange={handleUserInput}
              value={signupData.phoneNumber}
            />
          </div>

          {/* Send OTP Button */}
          <div className='mb-4'>
            <button
              className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all'
              onClick={sendOtp}
              disabled={otpSent} // Disable once OTP is sent
            >
              {otpSent ? 'OTP Sent' : 'Send OTP'}
            </button>
          </div>

          {/* OTP Input Field (Only shown after OTP is sent) */}
          {otpSent && (
            <>
              <div className='mb-4'>
                <input
                  type='text'
                  name='otp'
                  placeholder='Enter OTP'
                  value={signupData.otp}
                  onChange={handleUserInput}
                  className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
                />
              </div>

              {/* Verify OTP Button */}
              <div className='mb-4'>
                <button
                  className='w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all'
                  onClick={verifyOtp}
                >
                  Verify OTP
                </button>
              </div>
            </>
          )}

          {/* Name, Email, and Password Fields */}
          <div className='mb-6'>
            <input
              type='text'
              required
              name='fullName'
              id='fullName'
              placeholder='Enter your full name...'
              className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
              onChange={handleUserInput}
              value={signupData.fullName}
            />
          </div>

          <div className='mb-4'>
            <input
              type='email'
              required
              name='email'
              id='email'
              placeholder='Enter your Email...'
              className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
              onChange={handleUserInput}
              value={signupData.email}
            />
          </div>

          <div className='mb-6'>
            <input
              type='password'
              required
              name='password'
              id='password'
              placeholder='Enter your password...'
              className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
              onChange={handleUserInput}
              value={signupData.password}
            />
          </div>

          {/* Conditionally show fields based on role */}
          {signupData.role === 'ALUMNI' && (
            <>
              <div className='mb-4'>
                <input
                  type='text'
                  name='courseCompleted'
                  placeholder='Course Completed'
                  value={signupData.courseCompleted}
                  onChange={handleUserInput}
                  className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
                />
              </div>

              <div className='mb-4'>
                <input
                  type='number'
                  name='passoutBatch'
                  placeholder='Passout Batch'
                  value={signupData.passoutBatch}
                  onChange={handleUserInput}
                  className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
                />
              </div>

              <div className='mb-4'>
                <input
                  type='text'
                  name='currentCompanyWorkingIn'
                  placeholder='Current Company Working In'
                  value={signupData.currentCompanyWorkingIn}
                  onChange={handleUserInput}
                  className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
                />
              </div>

              <div className='mb-4'>
                <input
                  type='text'
                  name='currentCompanyWorkinInRole'
                  placeholder='Current Role'
                  value={signupData.currentCompanyWorkinInRole}
                  onChange={handleUserInput}
                  className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
                />
              </div>
            </>
          )}

          <button
            className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all'
            type='submit'
          >
            Create Account
          </button>

          <p className='mt-4 text-center'>
            Already have an account?{' '}
            <Link to='/user/signin' className='text-blue-500 hover:underline'>
              Signin
            </Link>
          </p>
        </form>
      </div>
    </BaseLayout>
  );
}

export default Signup;
