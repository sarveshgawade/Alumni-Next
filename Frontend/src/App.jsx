import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import AcessDenied from './Pages/AccessDenied'
import NotFound from './Pages/NotFound'
import ProfilePage from './Pages/ProfilePage'
import ChangePassword from './Pages/ChangePassword'
import EditProfile from './Pages/EditProfile'
import RequireAuth from './Components/Auth/RequireAuth'
import JobList from './Pages/Jobs/JobList'
import JobDescription from './Pages/Jobs/JobDescription'
import AddNewJob from './Pages/Jobs/AddNewJob'
import DonationForm from './Pages/DonationForm'
import ImageUploader from './Components/ImageUploader'
import AddNewEvent from './Pages/Events/AddNewEvent'
import EventList from './Pages/Events/EventList'
import EventDescription from './Pages/Events/EventDescription'
import SendInvite from './Pages/SendInvite'
import Janfest2023 from './Pages/Janfest2023'
import JobApplicationForm from './Pages/Jobs/JobApplicationForm'

function App() {
 

  return (
    <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/user/signup' element={<Signup/>} />
        <Route path='/user/signin' element={<Signin/>} />
        <Route path='/user/my-profile' element={<ProfilePage/>} />
        <Route path='/user/access-denied' element={<AcessDenied/>} />
        <Route path='/user/change-password' element={<ChangePassword/>} />
        <Route path='/user/edit-profile' element={<EditProfile/>} />
        <Route path='/jobs' element={ <JobList/>} />
        <Route path='/jobs/description' element={ <JobDescription/>} />
        <Route path='/upload-image' element={ <ImageUploader/>} />
        <Route path='/events' element={ <EventList/>} />
        <Route path='/events/description' element={ <EventDescription/>} />
        <Route path='/janfest' element={ <Janfest2023/>} />
        <Route path='/job/apply' element={ <JobApplicationForm/>} />
        


        <Route element={<RequireAuth allowedRoles={["ADMIN","ALUMNI"]}/>} >
            
            <Route path='/job/add-new-job' element={ <AddNewJob/>} />
        </Route>
        

        <Route element={<RequireAuth allowedRoles={["ALUMNI"]}/>} >
            
            <Route path='/alumni/donate' element={ <DonationForm/>} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>} >
            
            <Route path='/event/add' element={ <AddNewEvent/>} />
            <Route path='/send-reunion-invite' element={ <SendInvite/>} />
        </Route>
        
        <Route path='*' element={<NotFound/>} />

        
    </Routes>
  )
}

export default App
