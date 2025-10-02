import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "../Components/Header/Header"
import { Divider } from "@mantine/core"
import ScrollToTop from "../Components/LandingPage/ScrollToTop"
import FindJobs from "./FindJobs"
import FindTalentPage from "./FindTalentPage"
import JobDescPage from "./JobDescPage"
import PostedJobPage from "./PostedJobPage"
import ApplyJobPage from "./ApplyJobPage"
import { PostJobPage } from "./PostJobPage"
import SignUpPage from "./SignUpPage"
import TalentProfilePage from "./TalentProfilePage"
import HomePage from "./HomePage"
import { Footer } from "../Components/Footer/Footer"

import { ProfilePage } from "./ProfilePage"
import ProtectedRoute from "../Services/ProtectedRoute"
import PublicRoute from "../Services/PublicRoute"

const AppRoutes=()=>{
    // const user = useSelector((state:any)=>state.user);
    return  <BrowserRouter>
       <Header/>
         <Divider size="xs" mx="md"/>
          <ScrollToTop />
     <Routes>
      
      <Route path='/find-jobs' element={<FindJobs/>}/>
      <Route path='/find-talent' element={<FindTalentPage/>}/>
      <Route path='/jobs/:id' element={<JobDescPage/>}/>
       <Route path='/posted-job' element={<PostedJobPage/>}/>
      <Route path='/apply-job' element={<ApplyJobPage/>} />
      <Route path='/post-job' element={<ProtectedRoute allowedRoles={['EMPLOYER']}><PostJobPage/></ProtectedRoute>}/>
            <Route path='/signup' element={<PublicRoute><SignUpPage/></PublicRoute>}/>
             <Route path='/login' element={<PublicRoute><SignUpPage/></PublicRoute>}/>
     <Route path='/talent-profile' element={<TalentProfilePage/>}/>
       <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='*' element={<HomePage/>} /> 
     </Routes>
     <Footer/>
    </BrowserRouter>
}

export default AppRoutes;