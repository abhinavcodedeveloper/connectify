import React, { useState,useEffect } from "react";
import {Link,useNavigate} from 'react-router-dom'
import M from 'materialize-css'
import './Signup.css'
import '../other/Connectify.css'
import { upload } from "@testing-library/user-event/dist/upload";
const Signup = () => {
  // we will use hooks to set the password name
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username,SetUsername] = useState("");
  const [image,setImage] = useState("");
  const [url,setUrl] = useState("");

useEffect(() => {
if(url){
  uploadfields()
}
},[url])
  const setpic = ()=>{
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "connectify");
    data.append("cloud_name", "du1pi2myd");

    fetch("https://api.cloudinary.com/v1_1/du1pi2myd/image/upload", {
      method: "post",
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const uploadfields = ()=>{
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      M.toast({html:"invalid email",classes:"#e53935 red darken-1"})
      return;
  }
  fetch('/signup',{
      method:"post",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
          name,
          password,
          email,
          username,
          pic:url
      })
  }).then(res=>res.json())
  .then(data=>{
      if(data.error){
          M.toast({html:data.error,classes:"#e53935 red darken-1"})
      }
      else{
          M.toast({html:data.message,classes:"#00c853 green accent-4"})
          Navigate('/signin')
      }
  })

  }
//   if we will directly fetch then it will give CORS as react prevents the app to fetch directly
// from the another port 
  const signpostdata = ()=>{
    if(image){
      setpic()
    }
    else{
      uploadfields()
    }
    // fetching the data
    // The Fetch API provides a JavaScript interface for accessing 
    // and manipulating parts of the protocol, such as requests and responses. 
    // It also provides a global fetch() method that provides an easy, 
    // logical way to fetch resources asynchronously across the network.
   
    
  }
  return (
    <div>
        <div className="signup">
            <h1>Signup</h1>
            <div className='inputdiv'>
                <input type="text"
                  name="email"
                  id="takingInput"
                  placeholder="Mobile Number or Email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}/>
                <input type="text"
                  name="name"
                  id="takingInput"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}/>
                <input type="text"
                  name="username"
                  id="takingInput"
                  placeholder="Username"
                  value={username}
                  onChange={(e)=>SetUsername(e.target.value)}/>
                <input type="Password"
                  name="password"
                  id="takingInput"
                  placeholder="Password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}/>
                   <div class="file-field input-field">
                   <div class="btn">
                    <span>File</span>
                    <input type="file"
                     onChange={(e) => setImage(e.target.files[0])}
                    />
                   </div>
                  <div class="file-path-wrapper">
                     <input class="file-path validate" type="text"/>
                  </div>
                  </div>
                <button onClick={()=>signpostdata()}>Sign up</button>
            </div>
        </div>
      
    </div>
  )
}

export default Signup