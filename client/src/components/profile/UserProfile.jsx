import React, { useContext, useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';

import FriendsList from './FriendsList';
import axios from 'axios'
import { getUserById } from '../../services/apiService';
import { AuthContext } from '../../context/AuthContext';
import './UserProfile.scss'
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';



export default function Basic() {

 

  const {obj} = useContext(AuthContext)

  const [datas,setDatas]=useState([])


  const { selectedPost } = useContext(AuthContext);

  
  const getPost=async(req,res)=>{
    try {
      let response=await axios.get(`http://localhost:5000/api/posts/get/${localStorage.getItem("id")}`)
      console.log(response,"res");
      setDatas(response.data)
      
    } catch (error) {
      console.log(error.message);
      
    }
  }
  
  const [data,setData] = useState({})

  const fetchData = async () => {
    let response;

    if (selectedPost) {
    
      response = selectedPost;
      console.log(response,'selectedpost');
    } else {
    
      try {
        response = await getUserById();
    
      } catch (error) {
        console.log(error.message);
      }
    }

    setData(response);
    console.log(response, 'responseeeeeeeeeee');
  };

  useEffect(() => {
    fetchData();
    getPost()
  }, [obj.refresh, selectedPost]);


 
  
console.log(data,'postlength');
  
  return (
    <>
    <div className="vh-100"  id='profiles' >
    
      
       


      <div class="frame">
  <div class="center">
    
		<div class="profile">
			<div class="image" >
			
        <Avatar
      alt="Mark Zuckerberg"
      style={{marginLeft:"1rem"}}
      src={`http://localhost:5000/uploads/${data.profilepic || data.image}`}
      className="__picture"
    />
			</div>
			
			<div class="name">{data.username}</div>
			<div class="job">{data.email}</div>

    
			
			<div class="actions">
     
				<Link to={'message'}><button class="btn">Message</button></Link>
     
			</div>
		</div>
		
		<div class="stats">
			<div class="box">
			<p className="value" style={{color:"bisque"}}>{datas?.length}</p>
				<span class="parameter" style={{marginTop:"-1rem"}}>Posts</span>
			</div>
			<div class="box">
				{/* <span class="value">1387</span>
				<span class="parameter" >Likes</span> */}
			</div>
			<div class="box">
      {selectedPost ? <p className="value">{data.friends?.length}</p> : <p className="value" style={{color:"bisque"}}>{data.followers?.length}</p>}
				<span class="parameter" style={{marginTop:"-1rem"}}>Follower</span>
			</div>
		</div>
  </div>
</div>
















      

     

    </div>
    
     <div style={{    marginTop:" 26rem",
    marginLeft: "-1rem"}} className='frnds'>
     <FriendsList followers={data.followers}/>
   </div>
   </>
  );
}