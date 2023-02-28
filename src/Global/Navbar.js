import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {
  return (
    <div>
    <nav>
    <div className="nav-wrapper" id='Nav'>
     
      <Link to="/" className="brand-logo left large">Connectify</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/signin">Signin</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/createpost">Createpost</Link></li>
      </ul>
    </div>
  </nav>   
</div>
  )
}

export default Navbar