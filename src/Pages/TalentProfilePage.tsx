import { Button, Divider } from '@mantine/core'
import { Link } from 'react-router-dom'
import { IconArrowLeft } from '@tabler/icons-react'
import Profile from '../Components/TalentProfile/Profile'
import { profile } from '../Data/TalentData'
import RecommendTalent from '../Components/TalentProfile/RecommendTalent'

const TalentProfilePage = () => {
  return (
     <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Divider size="xs" mx="md"/>
           <Link className='my-4 inline-block p-4' to="/find-talent">
           <Button leftSection={<IconArrowLeft size={20}/> } color="brightSun.4" variant="light" fullWidth>Back</Button>
          </Link>
          <div className='flex gap-5'>
                 <Profile {...profile}/>
                 <RecommendTalent/>
          </div>
    </div>
  )
}

export default TalentProfilePage