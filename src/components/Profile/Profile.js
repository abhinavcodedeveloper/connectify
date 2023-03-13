import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import "../../Global/Profilebox.css";
import { UserContext } from "../../App";
const Profile = () => {
  const [data, setData] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/mypost", {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
      });
  }, []);
  return (
    <>
      {data ? (
        <div className="userkidetail">
          <div className="profile">
            {console.log(data)}
            <h1>Profile</h1>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9T8An4X3aOY1Lgo5Ax18mf47hXPPQya5-mApv6J-hdm-aoUALUX5pYyp9Ll-9KWIjTTg&usqp=CAU"
              alt=""
            />
            <div className="details">
              <div className="detaildiv">
                <b>Name: </b>
                <span>{state ? state.name : "loading"}</span>
              </div>
              <div className="detaildiv">
                <b>UserName: </b>
                <span>Rock</span>
              </div>
              <div className="detaildiv">
                <b>Email: </b>
                <span>{state ? state.email : "loading"}</span>
              </div>
            </div>
            <div className="infos">
              <span className="infobox">
                <span className="infotitle">Followers</span>
                <span>{20}</span>
              </span>
              <span className="infobox">
                <span className="infotitle">Following</span>
                <span>{20}</span>
              </span>
              <span className="infobox">
                <span className="infotitle">Posts</span>
                <span>{data.mypost.length}</span>
              </span>
            </div>
          </div>
          <div className="userposts">
            <h1>Posts</h1>
            <div className="centrediv">
              {data.mypost.map((item) => {
                return (
                  <div className="">
                    <img src={item.photo} alt="" className="postimg" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <h1>LOADING</h1>
      )}
    </>
  );
};

export default Profile;
