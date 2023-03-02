import React from 'react'
import './Profile.css'
import '../../Global/Profilebox.css'
const Profile = () => {
  return (
    <div className='userkidetail'>
        <div className="profile">
            <h1>Profile</h1>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9T8An4X3aOY1Lgo5Ax18mf47hXPPQya5-mApv6J-hdm-aoUALUX5pYyp9Ll-9KWIjTTg&usqp=CAU" alt="" />
            <div className="details">
                <div className='detaildiv'>    
                    <b>Name: </b><span>Dwayne Johnson</span>
                </div>
                <div className='detaildiv'>    
                    <b>UserName: </b><span>Rock</span>
                </div>
                <div className='detaildiv'>    
                    <b>Email: </b><span>rock9911@gmail.com</span>
                </div>
            </div>
        </div>
        <div className="profile">
            {/* iss wale div m followers following wagera aaenge to wo daal dena */}
            {/* and thori css thik krde iske...fir niche ek aur div jisme user ki posts aayengi */}
            {/* ye krde
            plus js css m krna plsss */}
            <h1>Profile</h1>
            <div className="details">
                <div className='detaildiv'>    
                    <b>Name: </b><span>Dwayne Johnson</span>
                </div>
                <div className='detaildiv'>    
                    <b>UserName: </b><span>Rock</span>
                </div>
                <div className='detaildiv'>    
                    <b>Email: </b><span>rock9911@gmail.com</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile