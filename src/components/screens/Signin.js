import React, { useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
import '../styles/Signin.css'
import M from "materialize-css";

const Signin = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");

  const signindata = ()=>{
    // fetching the data
    // The Fetch API provides a JavaScript interface for accessing 
    // and manipulating parts of the protocol, such as requests and responses. 
    // It also provides a global fetch() method that provides an easy, 
    // logical way to fetch resources asynchronously across the network.
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && email){
        M.toast({html:"invalid email",classes:"#e53935 red darken-1"})
        return;
    }
    fetch('/signin',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,
            password
        })
    }).then(res=>res.json())
    .then(data=>{
        if(data.error){
            M.toast({html:data.error,classes:"#e53935 red darken-1"})
        }
        else{
            localStorage.setItem("jwt",data.token)
            localStorage.setItem("user",JSON.stringify(data.user))
            M.toast({html:"Yayyy! your are into the world of Connectify",classes:"#00c853 green accent-4"})
            Navigate('/')
        }
    }).catch(err=>{
      console.log(err)
    })

    
  }
  return (
    <div>
            <h1 className="mainhead">CONNECT</h1>
            <div className="randomChats">
              <img className="r1" src="https://i.pinimg.com/564x/a5/7f/19/a57f19c9612dda2d34310dfedf3abfa2.jpg"></img>
              <img className="r2" src="https://i.pinimg.com/474x/88/63/d3/8863d34b0bc2af844634a89aba07001c.jpg"></img>
              <img className="r3" src="https://i.pinimg.com/474x/2a/a4/58/2aa4586a1b24c016f9fe964f821a4939.jpg"></img>
              <img className="r4" src="https://i.pinimg.com/474x/88/63/d3/8863d34b0bc2af844634a89aba07001c.jpg"></img>
            </div>
          <div className="loginform">
      <div className="heading">
       Connectify
      </div>
      <div className="logincontent">
        
          <input
            type="text"
            name="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          /><br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          /><br />
          <button onClick={()=>signindata()} id="btn">Log in</button>
    
        <div className="flexgrow">
          <div className="flexgrow-1"></div>
          <div className="or">OR</div>
          <div className="flexgrow-1"></div>
        </div>
        <div className="facebook">
          <a href="#" id="fb">Log in with Facebook</a>
          <p id="forgotpass">Forgot password?</p>
        </div>
      </div>
      <div className="signupform">
    <p>Don't have an account? </p>
    <Link to="/signup" >Sign up</Link>
</div>
    </div>
   
    </div>
  )
}

export default Signin