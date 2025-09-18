import { Button, LoadingOverlay, PasswordInput, TextInput } from '@mantine/core'
import { IconAt, IconCheck, IconLock, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { loginValidation } from '../../Services/FormValidation'
import { notifications } from '@mantine/notifications'
import { useDisclosure } from '@mantine/hooks'
import ResetPassword from './ResetPassword'
import { useDispatch } from 'react-redux'

import { setjwt } from '../../Slices/JwtSlice'
import { loginUser } from '../../Services/AuthService'
import {jwtDecode} from 'jwt-decode'
import { setUser } from '../../Slices/UserSlice'




export const Login = () => {

  const[loading, setLoading] = useState(false);
  const dispatch=useDispatch();
 const form={
  email: "",
  password: "",
 }
  const [data , setData] = useState<{[key:string]:string}>(form);
  const [formError,setFormError] = useState<{[key:string]:string}>(form);
   const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const handleChange=(e:any)=>{
    setFormError({...formError,[e.target.name]:""})
    setData({...data,[e.target.name]:e.target.value});
}
const handleSubmit=()=>{
  setLoading(true);
  let valid=true , newFormError:{[key:string]:string}={};
        for(let key in data){
             newFormError[key]=loginValidation(key,data[key]);
           if(newFormError[key])  valid=false; 
          }

        setFormError(newFormError);
           if(valid===true){
        // console.log(data);
        loginUser(data).then((res)=>{
          // console.log(res);
          setData(form);
            notifications.show({
          title:"Login Successful",
          message:"Redirecting to HomePage page...",
          color:"teal",
          withCloseButton:true,
          icon:<IconCheck style={{width: "90%", height: "90%"}}/>,
          withBorder:true,
          className:'!border-green-500',
        })
         dispatch(setjwt(res.jwt)); 
         const decoded = jwtDecode(res.jwt);
          console.log(decoded);
        setTimeout(()=>{
          setLoading(false);
           dispatch(setUser({...decoded , email:decoded.sub}));
          navigate('/');
        },4000);
        }).catch((err)=>{
          console.log(err);
            notifications.show({
          title:"Login Failed",
          message:err.response.data.errorMessage,
          color:"red",
          withCloseButton:true,
          icon:<IconX style={{width: "90%", height: "90%"}}/>,
          withBorder:true,
          className:'!border-green-500',
        })
        });
      }
    }
    
  return( 
         <>
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{radius: 'sm', blur:2}} loaderProps={{color: 'brightSun.4', type:'bars'}}/>
            <div   className="w-1/2 sm-mx:py-20 sm-mx:w-full px-20 bs-mx:px-10 md-mx:px-5 flex flex-col gap-3 justify-center">
         <div className="text-2xl font-semibold">Login</div>
         <TextInput value={data.email} error={formError.email} onChange={handleChange} name="email"  leftSection={<IconAt size={16} />} label="Email" withAsterisk placeholder="Your email" />
         <PasswordInput value={data.password} error={formError.password} onChange={handleChange} name="password"  leftSection={<IconLock size={16} />} label="Password" withAsterisk placeholder="Password" />
         <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Sign in</Button>
         <div  className="text-center sm-mx:text-sm xs-mx:text-xs"> don't have an account?  <span onClick={()=>{navigate("/signup"); setData(form) ; setFormError(form)}}  className="text-bright-sun-400 hover:underline cursor-pointer sm-mx:text-sm xs-mx:text-xs">Sign Up</span> </div>
           <div onClick={open} className='text-bright-sun-400 hover:underline cursor-pointer text-cneter'>Forget Password</div>
     </div>
     <ResetPassword opened={opened} close={close}/>
   
         </>
   )
}
