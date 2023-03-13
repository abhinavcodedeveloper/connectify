import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../App";


const Navbar = () => {
  const Navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  // console.log(state)
  const renderList = () => {
   
    if (state) {
      //state has the user details then he should see the create post home and profile
      return [
        <li>
          <Link to="/createpost" className="link">
            <span>
              <i className="fa-sharp fa-solid fa-square-plus"></i> Create Post
            </span>
          </Link>
        </li>,

        <li>
          <Link to="/profile" className="link">
            <span>
              <i className="fa-solid fa-user"></i> Profile
            </span>
          </Link>
        </li>,
        <li>
          <button onClick={() => {
            localStorage.clear();
            dispatch({
              type: "CLEAR",
            });
            Navigate("/signin");
          }} id="btn">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            Logout
          </button>
        </li>,
      ];
    } 
    else {
      return [
        <li>
          <Link to="/signin" className="link">
            <span>
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Signin
            </span>
          </Link>
        </li>,
        <li>
          <Link to="/signup" className="link">
            <span>
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Signup
            </span>
          </Link>
        </li>,
      ];
    }
  };
  return (
    <div>
      <div className="Container">
        <Link to={state ? "/" : "/signin"} className="link">
          <div className="left">Connectify</div>
        </Link>
        <ul className="center">
          {renderList()}
        </ul>
        <div className="right">
          <input type="text" placeholder="Search" />
          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
