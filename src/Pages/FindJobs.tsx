
import Jobs from '../Components/FindJobs/Jobs'
import SearchBar from '../Components/FindJobs/SearchBar'
import { Divider } from '@mantine/core'



const FindJobs = () => {
  return (
   <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
    <SearchBar/>
     <Divider size="sm" mx="md"/>
    <Jobs/>
   </div>
  )
}

export default FindJobs