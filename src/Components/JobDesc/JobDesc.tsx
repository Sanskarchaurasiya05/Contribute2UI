import { ActionIcon, Button, Divider } from '@mantine/core'
import { IconBookmark } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { card, desc, skills } from '../../Data/JobDescData'
import DOMPurify from 'dompurify';
export const JobDesc = () => {
   const data = DOMPurify.sanitize(desc);
  return (
   
    <div className="w-2/3">
            <div className="flex justify-between">
                     <div className="flex gap-2 items-center">
                         <div className="p-3 bg-mine-shaft-800 rounded-lg">
                             <img className="h-14" src={`/Icons/Google.png`} alt="" />
                         </div>
                         <div className="flex flex-col gap-1">
                             <div className="font-semibold ">Software Engineer</div>
                             <div className="text-xs text-mine-shaft-300">Google &bull; 48 Applicants</div>
                         </div>
                     </div>
                    <div className='flex flex-col gap-2 items-center'>
                          <Link to="/apply-job"><Button  color="brightSun.4" size="sm" variant="light" fullWidth>Apply</Button></Link>
                        <IconBookmark className='cursor-pointer text-bright-sun-400 stroke={1.5}'/>
                    </div>
                   
                 </div>
                  <Divider my="xl" />
                <div className="flex justify-between gap-4 sm-mx:flex-wrap">
           {
            card.map((item:any , index:number)=>
             <div key={index} className="flex flex-col text-sm gap-1 items-center ">
                    <ActionIcon className="!h-12 !w-12 xs-mx:!h-8 xs-mx:!w-8" variant="light" color="brightSun.4" radius="xl" >
                        <item.icon className="h-4/5 w-4/5" stroke={1.5} />
                    </ActionIcon>
                    <div className="text-mine-shaft-300 xs-mx:text-sm">{item.name}</div>
                    <div className="text-base font-semibold xs-mx:text-sm">{item.value}</div>
                </div>)
           }
        </div>
           <Divider my="xl" />
           <div>
            <div className="text-xl font-semibold mb-5">Required Skills</div>
            <div className='flex flex-wrap gap-2 '>
              {
                skills.map((item,index)=><ActionIcon key={index} className="!h-fit font-medium !text-sm !w-fit " variant="light" p="xs" color="brightSun.4" radius="xl" aria-label="Settings" >
                      {item}
                    </ActionIcon>)
              }
               
            </div>
            </div>  
              <Divider my="xl" />    
              <div dangerouslySetInnerHTML={{__html:data}} className="[&_h4]:text-xl [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify" >
                 
              </div>
              

    </div>
  )
}
