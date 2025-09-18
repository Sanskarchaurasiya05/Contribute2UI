import { ActionIcon, Textarea } from '@mantine/core';
import { IconCheck, IconPencil, IconX } from '@tabler/icons-react';
import  { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../../Slices/ProfileSlice';
import { successNotification } from '../../Services/NotificationService';

export const About = () => {
    const dispatch=useDispatch();
    const [edit , setEdit] = useState(false);
       const profile=useSelector((state:any)=>state.profile);
       const [about,setAbout] =useState("");
    const handleClick = ()=>{
        if(!edit){
          setEdit(true);
          setAbout(profile.about);
        }else{
            setEdit(false);
        }
       
    }

    const handleSave=()=>{
      setEdit(false);
             let updatedProfile={...profile , about:about};
             console.log(updatedProfile)
             dispatch(changeProfile(updatedProfile));
                           successNotification("Success" , "profile updated sucessfully");
    }

  return (
    <>
            <div className='text-2xl font-semibold mb-3 flex justify-between'>About
           <div>
             {edit && <ActionIcon onClick={handleSave} color='green.8' size="lg" variant='subtle'>
                   <IconCheck className='h-4/5 w-4/5' stroke={1.5}/>
                      </ActionIcon>}
               <ActionIcon onClick={handleClick} color={edit?"red.8":"brightSun.4"} size="lg" variant='subtle'>
                       {edit?<IconX/>:<IconPencil className='h-4/5 w-4/5' stroke={1.5}/>}
                      </ActionIcon>
           </div>
                      </div>
                      {
                        edit? <Textarea  value={about} placeholder='Enter about Yourself' autosize minRows={3} onChange={(event:any) => setAbout(event.currentTarget.value)}/>
                        : <div className='text-sm text-mine-shaft-300 text-justify'>
                             {profile.about}
                            </div>
                      }
    </>
  )
}
