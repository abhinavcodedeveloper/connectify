import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import "../../Global/Profilebox.css";
import { UserContext } from "../../App";
import {M} from 'materialize-css'
import { Box } from "@chakra-ui/react";
const Profile = () => {
  const [data, setData] = useState(null);
  const [profile, setProfile] = useState(null);
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
    <Box bg='#d3d6db'>
      {data ? (
        <div className="userkidetail">
          <div className="profile">

            {/* {console.log(data)} */}
            <h1>Profile</h1>
            <img
              src={state.pic}
              alt=""
            />
            
            
            <div className="details">
              <div className="detaildiv">
                <b>Name: </b>
                <span>{state?state.name : "loading"}</span>
              </div>
              <div className="detaildiv">
                <b>UserName: </b>
                <span>Rock</span>
              </div>
              <div className="detaildiv">
                <b>Email: </b>
                <span>{state?state.email : "loading"}</span>
              </div>
            </div>
            <div className="infos">
              <span className="infobox">
                <span className="infotitle">Followers</span>
                <span>{state?state.followers.length:"0"}</span>
              </span>
              <span className="infobox">
                <span className="infotitle">Following</span>
                <span>{state?state.following.length:"0"}</span>
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
    </Box>
  );
};

export default Profile;
