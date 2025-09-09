
import {  Button, Indicator } from "@mantine/core";
import { IconAnchor, IconBell } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useSelector } from "react-redux";

const Header = () => {
   const location = useLocation();
   const user = useSelector((state:any)=>state.user);
  return (
  location.pathname != "/signup" && location.pathname !== "/login"?  <div className='w-full bg-mine-shaft-950 text-white h-20 flex justify-between px-6 items-center'>
        <div className='flex gap-1 items-center text-bright-sun-400'>
         
          <IconAnchor className="h-8 w-8" stroke={2.5} />
          <div className="text-3xl font-semibold">Contribute2Intern</div>
        </div>
       <NavLinks />

        <div className="flex gap-3 items-center">
         {/* profile */}
         {user ? <ProfileMenu/>:<Link to="/login">
         <Button variant="subtle" color="brightSun.4">Login</Button></Link>}
        {/* <div className="bg-mine-shaft-900 p-1.5 rounded-full">
           <IconSettings stroke={1.5}/>
        </div> */}
         <Indicator color="brightSun.4" offset={6} size={8} processing>
         <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <IconBell stroke={1.5}/>
         </div>
         </Indicator>
          </div>
     </div>:<></>
  )
}

export default Header