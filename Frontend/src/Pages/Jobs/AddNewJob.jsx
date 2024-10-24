import React, { useState } from 'react';
import BaseLayout from '../../Layouts/BaseLayout';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addNewJob } from '../../Redux/Slices/jobSlice';

function AddNewJob() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [jobDetails, setJobDetails] = useState({
    companyName: '',
    description: '',
    thumbnail: '',
    jobType: '',
    jobRole: '',
    previewImage: '',
    skills: [] ,
    link: ''
  });

  const [skillInput, setSkillInput] = useState(''); 

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener('load', () => {
        setJobDetails({
          ...jobDetails,
          previewImage: fileReader.result,
          thumbnail: uploadedImage
        });
      });
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setJobDetails({
      ...jobDetails,
      [name]: value
    });
  }

  function addSkill() {
    if (skillInput && !jobDetails.skills.includes(skillInput)) {
      setJobDetails({
        ...jobDetails,
        skills: [...jobDetails.skills, skillInput] 
      });
      setSkillInput(''); 
    } else {
      toast.error('Skill already added or input is empty');
    }
  }

  function removeSkill(skill) {
    setJobDetails({
      ...jobDetails,
      skills: jobDetails.skills.filter(s => s !== skill) 
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!jobDetails.companyName || !jobDetails.description || !jobDetails.jobRole || !jobDetails.jobType) {
      toast.error('All fields are required');
      return;
    }


    const formData = new FormData();

    formData.append('companyName', jobDetails.companyName);
    formData.append('description', jobDetails.description);
    formData.append('jobRole', jobDetails.jobRole);
    formData.append('jobType', jobDetails.jobType);
    formData.append('thumbnail', jobDetails.thumbnail);
    formData.append('skills', [...jobDetails.skills]);
    formData.append('link', jobDetails.link);
    // console.log(formData.get('skills'));
    

    const repsonse = await dispatch(addNewJob(formData))
    
    if(repsonse?.payload?.success){
      toast.success(repsonse?.payload?.message)
      navigate('/jobs')
    }

    setJobDetails({
      companyName: '',
      description: '',
      thumbnail: '',
      jobType: '',
      jobRole: '',
      previewImage: '',
      skills: [] ,
      link:''
    });
    
    
  }

  return (
    <BaseLayout>
      <div className='flex justify-center items-center h-[100vh] mt-10'>
        <form
          onSubmit={handleFormSubmit}
          className='flex flex-col justify-center g-5 rounded-lg p-4 w-[700px] my-10 shadow-[0_0_10px_black] relative'
        >
          <Link
            className='absolute top-8 text-2xl link text-accent cursor-pointer'
            onClick={() => navigate(-1)}
          >
            <AiOutlineArrowLeft />
          </Link>

          <h1 className='text-center text-2xl font-bold mb-8'>Add New Job / Internship</h1>

          <main className='grid grid-cols-2 gap-x-10'>
            <div className='gap-y-6'>
              <div>
                <label htmlFor='image_uploads' className='cursor-pointer'>
                  {jobDetails.previewImage ? (
                    <img
                      className='w-full h-44 m-auto border'
                      src={jobDetails.previewImage}
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
                <label htmlFor='companyName' className='text-lg font-semibold'>Company Name</label>
                <input
                  type='text'
                  required
                  name='companyName'
                  id='companyName'
                  placeholder='Enter Company Name'
                  className='bg-transparent px-2 py-1 border'
                  value={jobDetails.companyName}
                  onChange={handleUserInput}
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor='jobType' className='text-lg font-semibold'>Job Type</label>
                <select
                  required
                  name='jobType'
                  id='jobType'
                  className='bg-transparent px-2 py-1 border'
                  value={jobDetails.jobType}
                  onChange={handleUserInput}
                >
                  <option value=''>Select job type</option>
                  <option value='Full-time'>Full-time</option>
                  <option value='Internship'>Internship</option>
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor='jobRole' className='text-lg font-semibold'>Job Role</label>
                <input
                  type='text'
                  required
                  name='jobRole'
                  id='jobRole'
                  placeholder='Enter jobRole'
                  className='bg-transparent px-2 py-1 border'
                  value={jobDetails.jobRole}
                  onChange={handleUserInput}
                />
              </div>

             
            </div>

            <div className='flex flex-col gap-1'>
             

              <div className='flex flex-col gap-2 mt-4'>
                <label htmlFor='skills' className='text-lg font-semibold'>Skills</label>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    name='skills'
                    id='skills'
                    placeholder='Add a skill'
                    className='bg-transparent px-2 py-1 border w-full'
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                  />
                  <button
                    type='button'
                    onClick={addSkill}
                    className='px-4 py-2 bg-green-500 text-white rounded'
                  >
                    Add
                  </button>
                </div>
                {/* Display the list of added skills */}
                <div className='mt-2 flex flex-wrap gap-2'>
                  {jobDetails.skills.map((skill, index) => (
                    <span key={index} className='px-4 py-1 bg-gray-200 rounded-full text-sm'>
                      {skill}
                      <button
                        type='button'
                        onClick={() => removeSkill(skill)}
                        className='ml-2 text-red-500 hover:text-red-700'
                      >
                        x
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className='flex flex-col gap-2 mt-2'>
                <label htmlFor='description' className='text-lg font-semibold'>Description</label>
                <textarea
                  required
                  name='description'
                  id='description'
                  placeholder='Enter description'
                  className='bg-transparent px-2 py-1 border resize-none'
                  value={jobDetails.description}
                  onChange={handleUserInput}
                  rows='6'
                />
              </div>

              <div className='flex flex-col gap-2 mt-4'>
                <label htmlFor='companyName' className='text-lg font-semibold'>Provide link</label>
                <input
                  type='text'
                  name='link'
                  id='link'
                  placeholder='Enter link'
                  className='bg-transparent px-2 py-1 border'
                  value={jobDetails.link}
                  onChange={handleUserInput}
                />
              </div>
            </div>
          </main>

          <button
            type='submit'
            className='w-full bg-yellow-600 hover:bg-yellow-300 transition-all ease-in-out duration-300 mt-4 py-2 rounded-sm font-semibold text-lg cursor-pointer'
          >
            Add New Job
          </button>
        </form>
      </div>
    </BaseLayout>
  );
}

export default AddNewJob;

