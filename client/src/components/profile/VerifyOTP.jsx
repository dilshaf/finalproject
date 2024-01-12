import React, { useState } from 'react'

const VerifyOTP = ({phoneNumber}) => {
   
        const [otp,setOtp]=useState("")
    
        const handleVerifyOTP=async()=>{
            let response=await axios.post("http://localhost:5000/verify-otp",{phoneNumber,userOTP:otp})
            if(response.data.success){
                successToast("success")
            }else{
                errorToast("error")
            }
        }
    
        return(
        <>
            <h1>verifyotp</h1>
            <label>otp</label>
            <input type='text' onChange={e=>setOtp(e.target.value)}/>
            <button onClick={handleVerifyOTP}>verify otp</button>
            </>
        )
    }

export default VerifyOTP