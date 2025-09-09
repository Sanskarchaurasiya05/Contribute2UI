import { Button, Modal, PasswordInput, PinInput, TextInput } from "@mantine/core"
import { IconAt, IconLock } from "@tabler/icons-react";
import {  useState } from "react";
import { changePass, sendOtp, verifyOtp } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { useInterval } from "@mantine/hooks";




const ResetPassword = (props: any) => {
  const[email,setEmail]=useState("");
  const[otpSent,setOtpSent]=useState(false);
 const [otpSending, setOtpSending] = useState(false);
  const[verified , setverified] = useState(false);
  const[password,setPassword]=useState("");
   const [passErr,setPassErr]=useState("");
   const [resendLoader,setResendLoader] = useState(false);
     const[seconds , setSeconds] = useState(60);

     const interval = useInterval(()=>{
        if(seconds===0){
            setResendLoader(false);
            setSeconds(60);
            interval.stop();
        }else
        setSeconds((s)=>s-1)
     },1000);

  const handleSendOtp=()=>{
    setOtpSending(true);
     sendOtp(email).then((res)=>{
    console.log(res);
    successNotification("OTP Sent Successfully" , "Enter OTP to reset")
    setOtpSent(true);
    setOtpSending(false);
     setResendLoader(true);
     interval.start();
   }).catch((err)=>{
    console.log(err);
     errorNotification("OTP sending failed","err.response.data.errorMessage");
   })
  }

  const handleVerifyOTP=(otp:String)=>{
      verifyOtp(email,otp).then(()=>{
       successNotification("OTP Verified","Enter new Password.");
         setverified(true);
      }).catch((err)=>{
        console.log(err);
        errorNotification("OTP Verification Failed",err.response.data.errorMessage);
      })
  }

  const resendOtp=()=>{
   if(resendLoader) return;
     handleSendOtp(); 
  }

  const changeEmail=()=>{
    setOtpSent(false);
    setResendLoader(false);
    setSeconds(60);
    setverified(false);
    interval.stop();
  }

  const handleResetPassword=()=>{
       changePass(email,password).then(()=>{
        console.log();
        successNotification("Password changed", "Login with new password");
        props.close();
       }).catch((err)=>{
        console.log(err);
        errorNotification("Psaaword Reset Failed",err.response.data.errorMessage);
       })
  }


    return <Modal opened={props.opened} onClose={props.close} overlayProps={{ backgroundOpacity: 0.55, blur: 3, }} title="Reset Password" centered>
        <div className="flex flex-col gap-6">
            <TextInput  value={email} size="md" name="email" onChange={(e) => setEmail(e.target.value)}
             leftSection={<IconAt size={16} />} label="Email" withAsterisk placeholder="Your email"
              rightSection={<Button loading={otpSending && !otpSent} onClick={handleSendOtp}  className="mr-1" size="xs" autoContrast disabled={email===""|| otpSent} >Send OTP</Button>} rightSectionWidth="xl" />
            {otpSent && <PinInput onComplete={handleVerifyOTP} className="mx-auto" gap="lg" size="md" length={6} type="number" />}
            {otpSent && !verified && <div className="flex gap-2">
                <Button loading={otpSending} onClick={resendOtp} fullWidth color="brightSun.4" variant="light">{resendLoader ? seconds : "Resend"}</Button>
                <Button fullWidth onClick={changeEmail} autoContrast variant="filled">Change Email</Button>
            </div>}
            {verified &&<PasswordInput value={password} error={passErr} name="password" onChange={(e)=>{setPassword(e.target.value);setPassErr(signupValidation("password", e.target.value))}} leftSection={<IconLock size={16} />} label="Password" withAsterisk placeholder="Password" />}
            {verified && <Button onClick={handleResetPassword} autoContrast variant="filled">Reset Password</Button>}
        </div>
    </Modal>
}
export default ResetPassword;