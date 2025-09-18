import { ActionIcon } from '@mantine/core'
import { IconBriefcase, IconCheck, IconMapPin, IconPencil, IconX } from '@tabler/icons-react'
import  { useState } from 'react'
import SelectInput from './SelectInput';
import fields from '../../Data/Profile';
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../../Slices/ProfileSlice';
import { successNotification } from '../../Services/NotificationService';

export const Info = () => {
    const select=fields;
    const user = useSelector((state:any)=>state.user);
    const profile=useSelector((state:any)=>state.profile);
    const [edit,setEdit]=useState(false);
      const dispatch=useDispatch();
    const handleClick =()=>{
        if(!edit){
             setEdit(true);
             form.setValues({jobTitle:profile.jobTitle,company:profile.company,location:profile.location})
        }else{
             setEdit(false);

        }
       
    }

    const handleSave=()=>{
       setEdit(false);
            //  console.log(form.getValues());
              let updatedProfile={...profile , ...form.getValues()};
              // console.log(updatedProfile);
              dispatch(changeProfile(updatedProfile));
              successNotification("Success" , "profile updated sucessfully");
    }

   const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            jobTitle: '',
            company: '',
            location: '',
        }
    });
  return (
    <>
     <div className='text-3xl font-semibold flex justify-between'>{user.name} 
                     <div>
                           {edit && <ActionIcon onClick={handleSave} color='green.8' size="lg" variant='subtle'>
                      <IconCheck className='h-4/5 w-4/5' stroke={1.5}/>
                      </ActionIcon>}
                       <ActionIcon onClick={handleClick} color={edit?"red.8":"brightSun.4"} size="lg" variant='subtle'>
                       {edit?<IconX className='w-4/5 h-4/5' stroke={1.5}/>:<IconPencil className='h-4/5 w-4/5' stroke={1.5}/>}
                      </ActionIcon>
                     </div>
                    </div>
                    {
                        edit ? <>
                        <div className="flex gap-10 [&>*]:w-1/2">
                            <SelectInput form={form} name="jobTitle" {...select[0]}/>
                            <SelectInput form={form} name="company" {...select[1]}/>
                      </div>
                       <SelectInput form={form} name="location" {...select[2]}/>
                        </>:<> <div className='text-xl flex gap-1 items-center'><IconBriefcase className="h-5 w-5" stroke={1.5}/>{profile.jobTitle} &bull; {profile.company}</div>
                       <div className="text-lg flex gap-1 items-center text-mine-shaft-400">
                                      <IconMapPin className="h-5 w-5" stroke={1.5} />{profile.location}
                                  </div></>
                    }
    </>
  )
}
