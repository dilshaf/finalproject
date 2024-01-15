import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { successToast, errorToast } from "../../Toastify/Toast";
const SignIn = () => {

  const navigate = useNavigate();

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formdata, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const handleSubmitData = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(
          "http://localhost:5000/api/admin/login",
          formdata
        );
  
        if (response.data) {
          const { result, token } = response.data;
  
          localStorage.setItem("token", token);
          localStorage.setItem("username", result.username);
          localStorage.setItem("id", result._id);
          successToast("logged in");
          navigate("/home");
        }
      } catch (error) {
        errorToast(error.response.data.message);
      }
    };
  
    const handleInputChange = (e) => {
      setFormData({ ...formdata, [e.target.name]: e.target.value });
    };
  
    useEffect(() => {
      if (formdata.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formdata.email.match(emailRegex)) {
          setEmailError("Invalid email address");
        } else {
          setEmailError("");
        }
      }
      if (formdata.password) {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!formdata.password.match(passwordRegex)) {
          setPasswordError(
            "Invalid password. Password must have at least 8 characters, one uppercase letter, one lowercase letter, and one digit"
          );
        } else {
          setPasswordError("");
        }
      }
    }, [formdata]);
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
      
      


          <div class="input_field"> <span><i aria-hidden="true" class="fa fa-envelope"></i></span>
            <input type="email" name="email" placeholder="Email" required value={formdata.email}
               onChange={handleInputChange} />
          </div>
          {emailError && <div className="text-red-500">{emailError}</div>}
         


          <div class="input_field"> <span><i aria-hidden="true" class="fa fa-lock"></i></span>
            <input type="password" name="password" placeholder="Password" required   value={formdata.password}
               onChange={handleInputChange}/>
          </div>
          {passwordError && <div className="text-red-500">{passwordError}</div>}
        
           
        
            
             

          
          <input class="button" type="submit" value="Login" />
         <Link to="/register"> <input class="button" type="submit" value="Register Now" /></Link>
        </form>
      </div>
    </div>
  </div>
</div>
{/* <p class="credit">Developed by <a href="http://www.designtheway.com" target="_blank">Design the way</a></p> */}
    </div>
  )
}

export default SignIn