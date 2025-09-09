
import Companies from "../Components/LandingPage/Companies"
import DreamJob from "../Components/LandingPage/DreamJob"
import JobCategory from "../Components/LandingPage/JobCategory"




import { Suscribe } from "../Components/LandingPage/Suscribe"
import { Testimonials } from "../Components/LandingPage/Testimonials"
import { Working } from "../Components/LandingPage/Working"




const HomePage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
   
      <DreamJob/>
      <Companies/>

      <JobCategory/>
      <Working/>
      <Testimonials/>
      <Suscribe/>
      
    </div>
  )
}

export default HomePage