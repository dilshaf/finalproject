import React, { useState } from 'react'
import {BsFillShieldLockFill} from 'react-icons/bs'
import OtpInput from 'otp-input-react'
import PhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/style.css'
import auth  from '../auth/config'
import { RecaptchaVerifier } from 'firebase/auth'
import { successToast } from '../../Toastify/Toast'
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import './Otp.css'
const Otp = () => {
    const [otp,setOtp]=useState("")
    const[ph,setPh]=useState("")
    const[showotp,setShowotp]=useState(false)
    const[user,setUser]=useState(null)
    const navigate=useNavigate()

    function onCaptchaVerify() {
      setTimeout(() => {
          if (!window.recaptchaVerifier) {
              window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                  'size': 'invisible',
                  'callback': (response) => {
                      onSignUP();
                  },
                  'expired-callback': () => {
                     
                  }
              }, auth);
          }
      }, 1000); 
  }

function onSignUP() {
  onCaptchaVerify();
  const appVerifier = window.recaptchaVerifier;
  const formatPh = '+' + ph;

  signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setShowotp(true);
          successToast("otp sent");
         
          window.recaptchaVerifier.clear();
      })
      .catch((error) => {
          console.log(error);
      });
}



function onOTPVerify(){
    window.confirmationResult.confirm(otp).then(async(res)=>{
        console.log(res);
        setUser(res.user)
        navigate("/")
    }).catch(err=>{
        console.log(err);
        successToast('incorectotp')
    })
}
  return (
    <div className='bg-purple-700 border-2 border-purple-500 shadow-md p-4 rounded-xl w-full'>
      <div className='flex flex-col items-center gap-4 p-4'>
        <div id='recaptcha-container'></div>
        {/* <h1 className='text-center leading-normal text-white font-medium text-3xl mb-6'>Enter Your Phone Number</h1> */}
        <div className='bg-white text-emerald w-fit p-4 rounded-full'>
          <BsFillShieldLockFill size={30} />
        </div>
        {showotp ? (
          <>
            <OtpInput OTPLength={6} otpType='num' disabled={false} value={otp} onChange={setOtp}></OtpInput>
          
              <button onClick={onOTPVerify} className='bg-emerald-500 text-white px-4 py-2 rounded-md mt-4'>
                Verify otp
              </button>
          
          </>
        ) : (
          <>
            <label className='text-white'>Phone Number</label>
            <PhoneInput country={'in'} value={ph} onChange={setPh} inputStyle={{ width: '100%' }} />
            <button
              type='submit'
              onClick={onSignUP}
              className='bg-white text-emerald px-4 py-2 rounded-md mt-4 hover:bg-emerald-400'
            >
              Send SMS
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Otp