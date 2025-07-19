
import { Avatar, Indicator } from "@mantine/core";
import { IconAnchor, IconBell, IconSettings } from "@tabler/icons-react";
import NavLinks from "./NavLinks";

const Header = () => {
  return (
     <div className='w-full bg-mine-shaft-950 text-white h-20 flex justify-between px-6 items-center'>
        <div className='flex gap-1 items-center text-bright-sun-400'>
            {/* image */}
          <IconAnchor className="h-8 w-8" stroke={2.5} />
          <div className="text-3xl font-semibold">Contribute2Intern</div>
        </div>
       <NavLinks />

        <div className="flex gap-3 items-center">
         {/* profile */}
         <div className="flex gap-2 items-center">
          <div>Marshell</div>
          <Avatar src="/avatar.png" alt="it's me"/>
         </div>
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
           <IconSettings stroke={1.5}/>
        </div>
         <Indicator color="brightSun.4" offset={6} size={8} processing>
         <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <IconBell stroke={1.5}/>
         </div>
         </Indicator>
          </div>
     </div>
  )
}

export default Header