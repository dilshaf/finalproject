import React from 'react'
import './SignUp.scss'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../Toastify/Toast";
import axios from "axios";

const SignUp = () => {
    const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    image: "",
    privacy: "public",
  });
   const[user,setUser]=useState({})
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fileError, setFileError] = useState("");
 
  const [isToggled, setToggled] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCallbackResponse=(response)=>{
    console.log("encoded jwt id token"+response.credential);
    navigate("/home");

  }
  useEffect(() => {
   
    if (formData.username) {
            if (!formData.username.match(/^[a-zA-Z\s]+$/)) {
              setUsernameError('Invalid username');
            } else {
              setUsernameError('');
            }
          }
      
          if (formData.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formData.email.match(emailRegex)) {
              setEmailError('Invalid email address');
            } else {
              setEmailError('');
            }
          }
          if (formData.password) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            if (!formData.password.match(passwordRegex)) {
              setPasswordError("Invalid password. Password must have at least 8 characters,oneuppercase letter, one lowercase letter, and one digit");
            } else {
              setPasswordError('');
            }
          }
      
          if (formData.file) {
            const allowedFileTypes = ['image/jpeg', 'image/png'];
        
            if (
              formData.file.length === 0 ||
              !allowedFileTypes.includes(formData.file[0].type)
            ) {
              setFileError('Invalid file. Please upload a valid image file.');
              error = true;
              errorMessage = 'Invalid file';
            } else {
              setFileError('');
            }
          }

          
  }, [formData]);
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "641492278554-ncvvu41ondhs1csaitff63u5jtueqsee.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), { theme: "outline", size: "large" });
  }, []);

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("image", formData.image);
    data.append("privacy", isToggled ? "public" : "private");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/register",
        data
      );

      if (response.data) {
        navigate("/otp");
        successToast("Registration Sucessfully");
      }
    } catch (error) {
      errorToast(error.response.data.message);
    }
  };

  const handleClickToggle = () => {
    setToggled(!isToggled);
  };

  

  return (
    <div>
      <div class="form_wrapper">
  <div class="form_container">
    <div class="title_container">
      <h2> Registration Form</h2>
    </div>
    <div class="row clearfix">
      <div class="">
        <form onSubmit={handleSubmitData}>
        <div class="input_field"> <span><i aria-hidden="true" class="fa fa-lock"></i></span>
            <input type="text" name="username" placeholder="username" required   value={formData.username}
               onChange={handleInputChange} />
          </div>
          {usernameError && <div className="text-red-500">{usernameError}</div>}
          <div class="input_field"> <span><i aria-hidden="true" class="fa fa-envelope"></i></span>
            <input type="email" name="email" placeholder="Email" required value={formData.email}
               onChange={handleInputChange} />
          </div>
          {emailError && <div className="text-red-500">{emailError}</div>}
          <div class="input_field"> 
            <input type="file" name="file" placeholder="File Upload" required 

               autoComplete="file"
               accept="image/*"
onChange={handleImageChange} />
          </div>
          {fileError && <div className="text-red-500">{fileError}</div>}
          <div class="input_field"> <span><i aria-hidden="true" class="fa fa-lock"></i></span>
            <input type="password" name="password" placeholder="Password" required   value={formData.password}
               onChange={handleInputChange}/>
          </div>
          {passwordError && <div className="text-red-500">{passwordError}</div>}
        
           
        
            
              <div class="input_field select_option">
                <select   name="privacy"
               onChange={handleClickToggle}
               value={isToggled ? "public" : "private"}>
                  
                  <option value="public">Public</option>
                  <option value="private">private</option>
                </select>
                <div class="select_arrow"></div>
              </div>

          
          <input class="button" type="submit" value="Register" />
        </form>
      </div>
    </div>
<div style={{marginLeft: "4rem"}}>
   <h1 style={{    textAlign:" center",
   
    marginLeft:" -4rem"}}> or</h1>
    <div id="signInDiv"></div>
    </div>
  </div>
</div>
{/* <p class="credit">Developed by <a href="http://www.designtheway.com" target="_blank">Design the way</a></p> */}
    </div>
    
  )
}

export default SignUp