import React,{useContext} from 'react'
import './Profilebox.css'
import {UserContext} from '../App'
const Profilebox = () => {
  const {state,dispatch} = useContext(UserContext)
  return (
    <div>
        <div className="profilebox">
            <img src="https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.jpg" alt="" className='posterimg' />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9T8An4X3aOY1Lgo5Ax18mf47hXPPQya5-mApv6J-hdm-aoUALUX5pYyp9Ll-9KWIjTTg&usqp=CAU" alt="" className='profileimg'/>
            <h2>{state?state.name:"USERNAME"}</h2>
            <span>5M friends</span>
            <button>My Profile</button>
        </div>
    </div>
  )
}

export default Profilebox