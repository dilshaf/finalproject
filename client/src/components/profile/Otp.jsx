import React, { useState } from 'react'
import {BsFillShieldLockFill} from 'react-icons/bs'
import OtpInput from 'otp-input-react'
import PhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/style.css'
import auth  from '../auth/config'
import { RecaptchaVerifier } from 'firebase/auth'
import { successToast } from '../../Toastify/Toast'
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { Link } from 'react-router-dom'
const Otp = () => {
    const [otp,setOtp]=useState("")
    const[ph,setPh]=useState("")
    const[showotp,setShowotp]=useState(false)

    // function onCaptchaVerify(){
    //     if(!window.recaptchaVerifier){
    //         window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    //             'size': 'invisible',
    //             'callback': (response) => {
    //            onSignUP()
    //             },
    //             'expired-callback': () => {
                 
    //             }
    //           },auth);
             
    //     }
    // }


    function onCaptchaVerify() {
      setTimeout(() => {
          if (!window.recaptchaVerifier) {
              window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                  'size': 'invisible',
                  'callback': (response) => {
                      onSignUP();
                  },
                  'expired-callback': () => {
                      // Handle expired callback
                  }
              }, auth);
          }
      }, 1000); // Add a delay if needed
  }
  
  
  
//     function onSignUP(){
//         onCaptchaVerify()
//         const appVerifier=window.recaptchaVerifier
//         const formatPh='+' + ph
//         signInWithPhoneNumber(auth,formatPh, appVerifier)
//     .then((confirmationResult) => {
     
//       window.confirmationResult = confirmationResult;
//         setShowotp(true)
//         successToast("otp sss")
//     }).catch((error) => {
//      console.log(error);
//     })
// }
function onSignUP() {
  onCaptchaVerify();
  const appVerifier = window.recaptchaVerifier;
  const formatPh = '+' + ph;

  signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setShowotp(true);
          successToast("otp sent");
          
          // Clear recaptchaVerifier after successful verification
          window.recaptchaVerifier.clear();
      })
      .catch((error) => {
          console.log(error);
      });
}



function onOTPVerify(){
    window.confirmationResult.confirm(otp).then(async(res)=>{
        console.log(res);
    }).catch(err=>{
        console.log(err);
    })
}
  return (
    <div>
        <div className='bg-emerald-500 flex items justify-center h-screen'>
            <div className='w-80 flex flex-col gap-4 rounded-lg p-4'>
            <div id='recaptcha-container'></div>
                <h1 className='text-center leading-normal text-white font-medium text-3xl mb-6'>enter otp</h1>
                <div className='bg-white text-emerald w-fit mx-auto p-4 rounded-full'>
                    <BsFillShieldLockFill size={30}/>
                </div>
               
               {showotp?(
               <>

                    <OtpInput OTPLength={6} otpType="num" disabled={false} value={otp} onChange={setOtp}></OtpInput>
                    <Link to="/"><button onClick={onOTPVerify}>verify</button></Link>
                    </>
               ):(
                <>
            <label className=''>phone number</label>
            <PhoneInput country={"in"} value={ph} onChange={setPh}/>
         
                <button type='submit' onClick={onSignUP}>send sms</button>
                </>
              ) }
            </div>
        </div>

    </div>
  )
}

export default Otp