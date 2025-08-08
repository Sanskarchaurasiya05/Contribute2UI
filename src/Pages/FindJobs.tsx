
import Jobs from '../FindJobs/Jobs'
import SearchBar from '../FindJobs/SearchBar'
import { Divider } from '@mantine/core'



const FindJobs = () => {
  return (
   <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
     <Divider size="sm" mx="md"/>
    <SearchBar/>
     <Divider size="sm" mx="md"/>
    <Jobs/>
   </div>
  )
}

export default FindJobs