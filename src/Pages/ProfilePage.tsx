import { Divider } from '@mantine/core'

import Profile from '../Components/Profile/Profile'


export const ProfilePage = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] overflow-hidden">
           <Divider mx="md" mb="xl"/>
           <Profile />
    </div>
  )
}
