
import Companies from "../LandingPage/Companies"
import DreamJob from "../LandingPage/DreamJob"
import JobCategory from "../LandingPage/JobCategory"
import { Suscribe } from "../LandingPage/Suscribe"
import { Testimonials } from "../LandingPage/Testimonials"
import { Working } from "../LandingPage/Working"



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