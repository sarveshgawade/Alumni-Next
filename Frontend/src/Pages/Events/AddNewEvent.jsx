import React, { useState } from 'react';
import BaseLayout from '../../Layouts/BaseLayout';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addNewJob } from '../../Redux/Slices/jobSlice';
import axiosInstance from '../../Helpers/axiosInstance';
import { addNewEvent } from '../../Redux/Slices/eventSlice';

function AddNewEvent() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    description: '',
    thumbnail: '',
    clubName: '',
    tagline: '',
    previewImage: '',
    date: ''
    // skills: [] 
  });


  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (indexToRemove) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };


  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener('load', () => {
        setEventDetails({
          ...eventDetails,
          previewImage: fileReader.result,
          thumbnail: uploadedImage
        });
      });
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value
    });
  }

  // function addSkill() {
  //   if (skillInput && !eventDetails.skills.includes(skillInput)) {
  //     setEventDetails({
  //       ...eventDetails,
  //       skills: [...eventDetails.skills, skillInput] 
  //     });
  //     setSkillInput(''); 
  //   } else {
  //     toast.error('Skill already added or input is empty');
  //   }
  // }

  // function removeSkill(skill) {
  //   setEventDetails({
  //     ...eventDetails,
  //     skills: eventDetails.skills.filter(s => s !== skill) 
  //   });
  // }

  async function handleFormSubmit(e) {
    e.preventDefault();

    // console.log(eventDetails);
    // console.log(selectedImages);
    

    if (!eventDetails.eventName || !eventDetails.description || !eventDetails.tagline || !eventDetails.clubName || !eventDetails.date || !eventDetails.thumbnail) {
      toast.error('All fields are required');
      return;
    }


    const formData = new FormData();

    formData.append('eventName', eventDetails.eventName);
    formData.append('description', eventDetails.description);
    formData.append('tagline', eventDetails.tagline);
    formData.append('clubName', eventDetails.clubName);
    formData.append('thumbnail', eventDetails.thumbnail);
    formData.append('date', eventDetails.date);
    selectedImages.forEach((image) => {
      formData.append('images', image); // Append each file individually
    });

    // console.log(formData.get('skills'));
    

    const repsonse = await dispatch(addNewEvent(formData))
    // console.log(repsonse);
    
    
    if(repsonse?.payload?.success){
      // toast.success(repsonse?.payload?.message)
      navigate('/events')
    }

    // setEventDetails({
    //   eventName: '',
    //   description: '',
    //   thumbnail: '',
    //   clubName: '',
    //   tagline: '',
    //   date:'',
    //   previewImage: '',
    //   // skills: [] 
    // });
    
    
  }

  return (
    <BaseLayout>
      <div className='flex justify-center items-center h-[100vh] pt-64 mb-48'>
        <form
        noValidate
          onSubmit={handleFormSubmit}
          className='flex flex-col justify-center g-5 rounded-lg p-4 w-[700px] my-10 shadow-[0_0_10px_black] relative'
        >
          <Link
            className='absolute top-8 text-2xl link text-accent cursor-pointer'
            onClick={() => navigate(-1)}
          >
            <AiOutlineArrowLeft />
          </Link>

          <h1 className='text-center text-2xl font-bold mb-8'>Add New Event</h1>

          <main className='grid grid-cols-2 gap-x-10'>
            <div className='gap-y-6'>
              <div>
                <label htmlFor='image_uploads' className='cursor-pointer'>
                  {eventDetails.previewImage ? (
                    <img
                      className='w-full h-44 m-auto border'
                      src={eventDetails.previewImage}
                      alt='job thumbnail'
                    />
                  ) : (
                    <div className='w-full h-44 m-auto flex items-center justify-center border'>
                      <h1 className=' text-lg text-gray-400'>Upload your thumbnail</h1>
                    </div>
                  )}
                </label>
                <input
                  type='file'
                  className='hidden'
                  accept='.jpg, .jpeg, .png'
                  id='image_uploads'
                  name='image_uploads'
                  onChange={handleImageUpload}
                />
              </div>
              <div className='flex flex-col gap-2 mt-4'>
                <label htmlFor='eventName' className='text-lg font-semibold'>Event Name</label>
                <input
                  type='text'
                  required
                  name='eventName'
                  id='eventName'
                  placeholder='Enter Event Name'
                  className='bg-transparent px-2 py-1 border'
                  value={eventDetails.eventName}
                  onChange={handleUserInput}
                />
              </div>

              <div className='flex flex-col gap-2 mt-4'>
                <label htmlFor='eventName' className='text-lg font-semibold'>Club Name</label>
                <input
                  type='text'
                  required
                  name='clubName'
                  id='clubName'
                  placeholder='Enter club Name'
                  className='bg-transparent px-2 py-1 border'
                  value={eventDetails.clubName}
                  onChange={handleUserInput}
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor='tagline' className='text-lg font-semibold'>Tagline</label>
                <input
                  type='text'
                  required
                  name='tagline'
                  id='tagline'
                  placeholder='Enter tagline'
                  className='bg-transparent px-2 py-1 border'
                  value={eventDetails.tagline}
                  onChange={handleUserInput}
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor='date' className='text-lg font-semibold'>Select Date</label>
                <input
                  type='date'
                  required
                  name='date'
                  id='date'
                  placeholder='Enter date'
                  className='bg-transparent px-2 py-1 border'
                  value={eventDetails.date}
                  onChange={handleUserInput}
                />
              </div>

             
            </div>

            <div className='flex flex-col gap-1'>
             

             

              <div className='flex flex-col gap-2 mt-2'>
                <label htmlFor='description' className='text-lg font-semibold'>Description</label>
                <textarea
                  required
                  name='description'
                  id='description'
                  placeholder='Enter description'
                  className='bg-transparent px-2 py-1 border resize-none'
                  value={eventDetails.description}
                  onChange={handleUserInput}
                  rows='6'
                />
              </div>

        {/* Multiple Images Upload */}
        <div className="mb-4">
  <label className="block text-gray-700 font-bold mb-2" htmlFor="images">
    Upload Images
  </label>
  <input
    type="file"
    id="images"
    name='images'
    multiple
    accept="image/*"
    onChange={handleImageChange}
    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

{/* Limit the height and enable scroll for images container */}
{selectedImages.length > 0 && (
  <div className="mt-4 max-h-72 overflow-y-auto">
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
      {selectedImages.map((image, index) => (
        <div key={index} className="relative group">
          <img
            src={URL.createObjectURL(image)}
            alt={`Selected ${index + 1}`}
            className="w-full h-32 object-cover rounded-md"
          />
          <button
            type="button"
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => removeImage(index)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  </div>
)}



            </div>
          </main>

          <button
            type='submit'
            className='w-full bg-yellow-600 hover:bg-yellow-300 transition-all ease-in-out duration-300 mt-4 py-2 rounded-sm font-semibold text-lg cursor-pointer'
          >
            Add New Event
          </button>
        </form>
      </div>
    </BaseLayout>
  );
}

export default AddNewEvent;

