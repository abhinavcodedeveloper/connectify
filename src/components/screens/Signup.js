import React, { useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
import "../styles/Signup.css";
import M from "materialize-css";

const Signup = () => {
  // we will use hooks to set the password name
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username,SetUsername] = useState("");

//   if we will directly fetch then it will give CORS as react prevents the app to fetch directly
// from the another port 
  const signupdata = ()=>{
    // fetching the data
    // The Fetch API provides a JavaScript interface for accessing 
    // and manipulating parts of the protocol, such as requests and responses. 
    // It also provides a global fetch() method that provides an easy, 
    // logical way to fetch resources asynchronously across the network.
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
            username
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
  return (
    <div>
      <div className="page">
        <div className="signup-container">
          <div className="heading">Signup</div>

          <div>
            <div>
              <input
                type="text"
                name="email"
                id="takingInput"
                placeholder="Mobile Number or Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                name="name"
                id="takingInput"
                placeholder="Full Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                name="username"
                id="takingInput"
                placeholder="Username"
                value={username}
                onChange={(e)=>SetUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="Password"
                name="password"
                id="takingInput"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <div />
            <button onClick={()=>signupdata()}>Sign up</button>
          </div>
        </div>
      </div>
      <div className="Login">
        <div>
          Have an account? <Link to="/signin">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
