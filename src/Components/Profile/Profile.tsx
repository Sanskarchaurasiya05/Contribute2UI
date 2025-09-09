import { ActionIcon, Divider, TagsInput, Textarea } from '@mantine/core'
import {  IconDeviceFloppy,  IconPencil, IconPlus } from '@tabler/icons-react'

import CertiCard from './CertiCard'
import ExpCard from './ExpCard'
import { useEffect, useState } from 'react'
import { ExpInput } from './ExpInput'
import CertiInput from './CertiInput'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../Services/ProfileService'
import { Info } from './Info'
import { setProfile } from '../../Slices/ProfileSlice'



const Profile = () => {
  
    const dispatch=useDispatch();
   const user = useSelector((state:any)=>state.user);
   const profile = useSelector((state:any)=>state.profile);
    const [skills,setSkills]=useState(["react","SpringBoot","java","python","django","fluter"]);
    const [addExp , setAddExp] = useState(false);
    const [addCerti , setAddCerti] = useState(false);
    const[edit,setEdit]=useState([false,false,false,false,false]);
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
     const [about , setAbout] = useState("");
  return (
    <div className='w-4/5 mx-auto'>
             <div className='relative'>
                 <img className="rounded-t-2xl " src="/Profile/banner.jpg" alt="" />
                 <img className="w-48 h-48 rounded-full -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8 " src='/avatar.png' alt="" />
                 </div>
                 <div className='px-3 mt-16'>
                   <Info/>
                       
                       <Divider mx="xs"  my="xl"/>   
 </div>
                       <div className='px-3'>
                        <div className='text-2xl font-semibold mb-3 flex justify-between'>About<ActionIcon onClick={()=>handleEdit(1)} color='brightSun.4' size="lg" variant='subtle'>
                   {edit[1]?<IconDeviceFloppy/>:<IconPencil className='h-4/5 w-4/5' stroke={1.5}/>}
                  </ActionIcon>
                  </div>
                  {
                    edit[1]? <Textarea value={about} placeholder='Enter about Yourself' autosize minRows={3} onChange={(event:any) => setAbout(event.currentTarget.value)}/>
                    : <div className='text-sm text-mine-shaft-300 text-justify'>
                         {profile?.about}
                        </div>
                  }
                       

                       <Divider mx="xs"  my="xl"/>   
 </div>
                       <div className='px-3'>
                        <div className='text-2xl font-semibold mb-3 flex justify-between'>Skills
                                              <ActionIcon onClick={()=>handleEdit(2)} color='brightSun.4' size="lg" variant='subtle'>
                   {edit[2]?<IconDeviceFloppy/>:<IconPencil className='h-4/5 w-4/5' stroke={1.5}/>}
                  </ActionIcon>
                        </div>
                        {
                           edit[2]?<TagsInput value={skills} onChange={setSkills} placeholder="Add Skills" splitChars={[',',' ','|']}/>:
                            <div className='flex flex-wrap gap-2'>
                         {
                         profile?.skills?.map((skill:any,index:number)=> <div  key={index}  className='bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1'>{skill}</div>)
                        }
                        </div>
                        }
                         
                      

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