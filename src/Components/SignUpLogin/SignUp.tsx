import { Button, LoadingOverlay, PasswordInput, Radio, TextInput } from '@mantine/core'
import {  IconAt, IconCheck, IconLock, IconX } from '@tabler/icons-react'
import {  useState } from 'react'

import {  useNavigate } from 'react-router-dom'
import { registerUser } from '../../Services/UserService'
import { signupValidation } from '../../Services/FormValidation'
import { notifications } from '@mantine/notifications'
  const form = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        accountType: "APPLICANT"
    }

const SignUp = () => {


    const [data,setData] = useState<{[key:string]:string}>(form);

    const [formError,setFormError] = useState<{[key:string]:string}>(form);

    const[loading,setLoading]=useState(false);

    const navigate = useNavigate();

    const handleChange=(e:any)=>{
        
        if(typeof(e)=="string"){
          setData({...data,accountType:e});
          return ;
        }
          let name=e.target.name;
          let value=e.target.value;
         setData({...data,[name]:value});
         setFormError({...formError,[name]:signupValidation(name,value)});
         if(name ==="password" && data.confirmPassword!==""){
          let err = "";
          if(data.confirmPassword!==value){
            err = "Password and Confirm Password must be same";
         }
           setFormError({...formError,[name]:signupValidation(name,value) , 
            confirmPassword:err});
           if( name==="confirmPassword"){
          if(data.password!==value){
            setFormError({...formError,[name]:"Password and Confirm Password must be same"});
         }else{
          setFormError({...formError,[name]:""});
         }
    }
  }
}    

    const handleSubmit=()=>{
        let valid=true , newFormError:{[key:string]:string}={};
        for(let key in data){
           if(key==="accountType") continue;
           if(key!=="confirmPassword"){
             newFormError[key]=signupValidation(key,data[key]);
           }else if(data[key]!==data["password"]){
            newFormError[key]="Password do not match";
           }
           if(newFormError[key]){
            valid=false; 
          }
        }

        setFormError(newFormError);
      
       if(valid===true){
         setLoading(true);
        console.log(data);
        registerUser(data).then((res)=>{
          console.log(res);
          setData(form);
            notifications.show({
          title:"Registration Successful",
          message:"Redirecting to login page...",
          color:"teal",
          withCloseButton:true,
          icon:<IconCheck style={{width: "90%", height: "90%"}}/>,
          withBorder:true,
          className:'!border-green-500',
        })
        setTimeout(()=>{
           setLoading(false);
          navigate('/login');
        },4000);
        }).catch((err)=>{
           setLoading(false);
          console.log(err);
            notifications.show({
          title:"Registration Failed",
          message:"some error occurred...",
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
       <> <LoadingOverlay visible={loading} zIndex={1000} className='translate-x-1/2' overlayProps={{radius: 'sm', blur:2}} loaderProps={{color: 'brightSun.4', type:'bars'}}/>
         <div   className="w-1/2 sm-mx:py-20 sm-mx:w-full px-20 bs-mx:px-10 md-mx:px-5 flex flex-col gap-3 justify-center">
        <div className="text-2xl font-semibold">Create Account</div>
        <TextInput value={data.name} error={formError.name} onChange={handleChange}  name="name"  label="Full Name" withAsterisk placeholder="Your name" />
        <TextInput value={data.email} error={formError.email} onChange={handleChange} name="email"  leftSection={<IconAt size={16} />} label="Email" withAsterisk placeholder="Your email" />
        <PasswordInput value={data.password} error={formError.password} onChange={handleChange} name="password"  leftSection={<IconLock size={16} />} label="Password" withAsterisk placeholder="Password" />

        <PasswordInput value={data.confirmPassword} error={formError.confirmPassword} onChange={handleChange} name="confirmPassword"  leftSection={<IconLock size={16} />} label="Confirm Password" withAsterisk placeholder="Confirm password" />
        <Radio.Group 
        value={data.accountType}
        onChange={handleChange}
            name="accountType"
            label="You are?"
            withAsterisk
        >
            <div className="flex gap-6 xs-mx:gap-3">
                <Radio name="accountType" className="py-4 px-6 sm-mx:px-4 sm-mx:py-2 hover:bg-mine-shaft-900 border-mine-shaft-800 border rounded-lg has-[:checked]:!border-bright-sun-400"   value="APPLICANT" label="Applicant" />
                <Radio name="accountType" className="py-4 px-6 sm-mx:px-4 sm-mx:py-2 hover:bg-mine-shaft-900 border-mine-shaft-800 border rounded-lg has-[:checked]:!border-bright-sun-400"  value="EMPLOYER" label="Employer" />
            </div>
        </Radio.Group>
        <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Sign up</Button>
        <div className="text-center sm-mx:text-sm xs-mx:text-xs">Have an account?  <span onClick={()=>{navigate("/login"); setData(form) ; setFormError(form)}}  className="text-bright-sun-400 hover:underline cursor-pointer sm-mx:text-sm xs-mx:text-xs">Login</span> </div>

    </div>
       </>
  )
}

export default SignUp;