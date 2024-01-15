import React, { useEffect, useState } from "react";
import "./UserSettings.css";
import Header from "../common/Header";
import UserProfile from "../profile/UserProfile";


const UserSettings = ({ element }) => {

  const storedDarkMode = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = useState(storedDarkMode);

  useEffect(() => {
    
    const body = document.body;
    if (darkMode) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }

  
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {

    setDarkMode(!darkMode);
  };

  return (
    <div>
      <div className={`parent ${darkMode ? 'dark-mode' : ''}`}  style={{
          backgroundImage: `url("")`,
          backgroundSize: "cover",
        }}>

        <div className="div1">
          <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        </div>
        <div className="div2" >
          <UserProfile />
          <div
            className="flex" 
          
          >
            {element}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
