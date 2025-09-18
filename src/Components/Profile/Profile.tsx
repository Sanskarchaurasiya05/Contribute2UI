import { ActionIcon, Avatar, Divider, FileInput, Overlay } from '@mantine/core'
import {  IconDeviceFloppy,  IconEdit,  IconPencil, IconPlus } from '@tabler/icons-react'

import CertiCard from './CertiCard'
import ExpCard from './ExpCard'
import { useEffect, useState } from 'react'
import { ExpInput } from './ExpInput'
import CertiInput from './CertiInput'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../Services/ProfileService'
import { Info } from './Info'
import { changeProfile, setProfile } from '../../Slices/ProfileSlice'
import { About } from './About'
import Skills from './Skills'
import { useHover } from '@mantine/hooks'
import { successNotification } from '../../Services/NotificationService'



const Profile = () => {
  
    const dispatch=useDispatch();
   const user = useSelector((state:any)=>state.user);
   const profile = useSelector((state:any)=>state.profile);
    const [addExp , setAddExp] = useState(false);
    const [addCerti , setAddCerti] = useState(false);
    const[edit,setEdit]=useState([false,false,false,false,false]);

        const { hovered, ref } = useHover();

    const handleEdit=(index:any)=>{
        const newEdit=[...edit];
        newEdit[index]=!newEdit[index];
        setEdit(newEdit);
    }
    useEffect(()=>{
     getProfile(user.id).then((data:any)=>{
        // console.log(data);
        dispatch(setProfile(data));
          // console.log(profile);
      }).catch((error:any)=>{
        console.log(error);
      })
    })

     const handleFileChange =async (image:any) => {
        let picture:any=await getBase64(image);
        let updatedProfile={ ...profile, picture:picture.split(',')[1]};
        dispatch(changeProfile(updatedProfile));
        successNotification("Success","Profile Picture Updated Successfully");
    };

    const getBase64=(file:any)=>{
      return new Promise((resolve,reject)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload=()=>resolve(reader.result);
        reader.onerror=error=>reject(error);
      })
    }
  return (
    <div className='w-4/5 mx-auto'>
             <div className='relative'>
                 <img className="rounded-t-2xl " src="/Profile/banner.jpg" alt="" />
                  <div  ref={ref} className="absolute cursor-pointer flex items-center justify-center !rounded-full -bottom-1/3  md-mx:-bottom-10 sm-mx:-bottom-16  left-6">
                    
                        <Avatar  className="!w-48  !h-48 md-mx:!w-40 md-mx:!h-40 border-mine-shaft-950 border-8  rounded-full sm-mx:!w-36 sm-mx:!h-36 xs-mx:!h-32 xs-mx:!w-32" src={profile.picture?`data:image/jpg;base64,${profile.picture}`:'/avatar.png'} alt="" />
                        {hovered &&<Overlay ref={ref} className="!rounded-full" color="#000" backgroundOpacity={0.75}  />}
                        {hovered && <IconEdit className="absolute z-[300] !w-16 !h-16" />}
                        {hovered &&<FileInput  onChange={handleFileChange} className="absolute [&_*]:!rounded-full z-[301] [&_*]:!h-full w-full !h-full" variant="unstyled"   accept="image/png,image/jpeg" />}
                        
                </div>
                 </div>
                 <div className='px-3 mt-16'>
                   <Info/>
                       
                       <Divider mx="xs"  my="xl"/>   
 </div>
                       <div className='px-3'>      
                           <About/>
                       <Divider mx="xs"  my="xl"/>   
                      
 </div>
                       <div className='px-3'>
                      <Skills/>
                       <Divider mx="xs"  my="xl"/>
                        </div>
                        <div className='px-3'>
                        <div className='text-2xl font-semibold mb-3 flex justify-between'>Experience <div className='flex gap-2'><ActionIcon onClick={()=>setAddExp(true)} color='brightSun.4' size="lg" variant='subtle'>
                           <IconPlus className='h-4/5 w-4/5'/>
                  </ActionIcon><ActionIcon onClick={()=>handleEdit(3)} color='brightSun.4' size="lg" variant='subtle'>
                   {edit[3]?<IconDeviceFloppy/>:<IconPencil className='h-4/5 w-4/5' stroke={1.5}/>}
                  </ActionIcon></div></div>
                       <div className='flex flex-col gap-8'>
                          {
                        profile?.experiences?.map((exp:any, index:number) => <ExpCard key={index} {...exp} edit={edit[3]} />)
                       }
                           {addExp&&<ExpInput add setEdit={setAddExp}/>}
                       </div>
                       
                        

                       <Divider mx="xs"  my="xl"/>

                       </div>
                        <div className='px-3'>
                        <div className='text-2xl font-semibold mb-3 flex justify-between'>Certification <div className='flex gap-2'><ActionIcon onClick={()=>setAddCerti(true)} color='brightSun.4' size="lg" variant='subtle'>
                           <IconPlus className='h-4/5 w-4/5'/>
                  </ActionIcon><ActionIcon onClick={()=>handleEdit(4)} color='brightSun.4' size="lg" variant='subtle'>
                   {edit[4]?<IconDeviceFloppy/>:<IconPencil className='h-4/5 w-4/5' stroke={1.5}/>}
                  </ActionIcon></div></div>
                       <div className='flex flex-col gap-8'>
                          {
                        profile?.certifications?.map((cert:any, index:number) => <CertiCard key={index} edit={edit[4]} {...cert} />)
                       }
                       {
                        addCerti&&<CertiInput setEdit={setAddCerti}/>
                       }
                       </div>
                        </div>
                      </div>
  )
}

export default Profile