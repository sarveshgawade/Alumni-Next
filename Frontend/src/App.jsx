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


        <Route element={<RequireAuth allowedRoles={["ADMIN","ALUMNI"]}/>} >
            
            <Route path='/job/add-new-job' element={ <AddNewJob/>} />
        </Route>
        
        <Route path='*' element={<NotFound/>} />

        
    </Routes>
  )
}

export default App
