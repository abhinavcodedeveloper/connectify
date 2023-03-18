import React, { useState, useEffect, useContext } from "react";
import "../Profile/Profile.css";
import "../../Global/Profilebox.css";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
const UserProfile = () => {
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { id } = useParams();
  const [ isFollow, setIsFollow ] = useState(state?!state.following.includes(id):true);
  useEffect(() => {
    fetch(`/user/${id}`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
      });
  }, []);

  const Follow = () => {
    fetch(`/follow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followid: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        dispatch({
          type: "UPDATE",
          payload: {
            followers: result.followers,
            following: result.following,
          },
        });
        localStorage.setItem("user", JSON.stringify(result));
        setProfile((prev) => {
          return {
            ...prev,
            user: {
              ...prev.user,
              followers: [...prev.user.followers, result._id],
            },
          };
        });
        setIsFollow(false);
      });
  };

  const Unfollow = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowid: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        dispatch({
          type: "UPDATE",
          payload: { following: result.following, followers: result.followers },
        });
        localStorage.setItem("user", JSON.stringify(result));

        setProfile((prev) => {
          const newF = prev.user.followers.filter((item) => item != result._id);
          return {
            ...prev, // to regain the prev state of the profile
            user: {
              ...prev.user,
              followers: newF,
            },
          };
        });
        setIsFollow(true);
      });
  };
  return (
    <>
      {profile ? (
        <div className="userkidetail">
          {console.log(profile)}
          <div className="profile">
            <h1>Profile</h1>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9T8An4X3aOY1Lgo5Ax18mf47hXPPQya5-mApv6J-hdm-aoUALUX5pYyp9Ll-9KWIjTTg&usqp=CAU"
              alt=""
            />
            <div className="details">
              <div className="detaildiv">
                <b>Name: </b>
                <span>{profile.user.name}</span>
              </div>
              <div className="detaildiv">
                <b>UserName: </b>
                <span>Rock</span>
              </div>
              <div className="detaildiv">
                <b>Email: </b>
                <span>{profile.user.email}</span>
              </div>
            </div>
            <div className="infos">
              <span className="infobox">
                <span className="infotitle">Followers</span>
                <span>{profile.user.followers.length}</span>
              </span>
              <span className="infobox">
                <span className="infotitle">Following</span>
                <span>{profile.user.following.length}</span>
              </span>
              <span className="infobox">
                <span className="infotitle">Posts</span>
                <span>{profile.posts.length}</span>
              </span>
            </div>
          </div>
          <div>
            {isFollow ? (
              <button
                style={{
                  margin: "10px",
                }}
                className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={() => Follow()}
              >
                Follow
              </button>
            ) : (
              <button
                style={{
                  margin: "10px",
                }}
                className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={() => Unfollow()}
              >
                UNFollow
              </button>
            )}
          </div>
          <div className="userposts">
            <h1>Posts</h1>
            <div className="centrediv">
              {profile.posts.map((item) => {
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
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATYAAACjCAMAAAA3vsLfAAAAwFBMVEX////hW2T3smr6+vrgVmDgU133sWf3r2LgUVvhWWLfTlngVV/3r2PfTFf3rFvlgIbjcXj3wInfSFPnhYv1z8z62Lj3t3X3u3/61LD++PX62Lz3tG77///76unkfIPhYWr65N/xubzrmJPplZrtq6zpi4rrpKjja3Pwv8L53NT1y8f78fH87eP21tT74c74y6L63sr3vYb3wprywLvojpL64cr4wZLrnaDwsa799u3sq6/2tXzld3r53trngYD0ztDN+iqcAAAD6ElEQVR4nO3bCU/qWByH4ZZup6zFQstWAZVlZFWvemXw3u//raanpYoIzJ1kQml4HxOFtib//HI22oOiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQql7/xtGvrq5u0y4kQ4I7tSQKtq2qammVdjFZ0RvkDZlYRB+kXU42aEOjoH7KD9MuKBOC0aal2boh8vmSq6VdURbUCnrcN/O6uxrP/uo1064oC8ZxU9OFez8J39Y9z/P91jTtss7cWMjUbLGeRW+nZTNnmqZl+i266mGzqK3Zhf7mfd3KxUzLn6da2TmbqDI1Xa0lB2RrS4IrLtIs7ZxV5MLD7gafRxpt07LMODuryuywzzgvUzN628ea0/my6hWj4Io+A9x3k67sovn772e0VjvOrXr6qs7enQhTE/s/EzQfo8nBapy4pvMXNTZbPXQ6nlTLrOB21OTIJp4Onm/I3MyHE1aUCa4uZ9EjF1Tl+FZm+fZF1EeNuyNXNKPm9niyis6eXFe8yz5qzHaOa9tLjkVRzgrK14MXTMbwJGx7t4/uxPNWDhe+Fr00IePpu66jr5WO1ulErUkLf8sf+SI58Og/mMW60onfXXybCwPo3HadH6NbZen7U02LO6K2iU1J/tSrVdNcKO8/1jWNvipbVcct2E5l+OyZpjlJxrQ4NiUJUGn4YWyPgTsaXd8r3/rwxZGhVHS7W3lqyEG/1dkkshtbywtjexlfO861qxCbDOVV2KPKbOGZR2KbhrFZi58VZ1QhtnjomqxH7k+lUfXaXhjbVljJK/my/lD2324rjuq+MrZtkgmCcPTyXl6qi83E+SW2eO6czrVO5dqxu6vOxae2pWXl2rnivtuR2sevUcFWBY/qtzXLck7o7TuVrN8CucUhX9t3yeX6O/y8bvrHrhgL+eQ5OHbJ5WnIz53l5yNX/JJ3StY8Vvgi6qW59uG7kYG8B3z0TslFiu7imt7B1jSQex0EfXSXZ0a5HWhv7yX5JLVy2pKyYFqMnibn6nsb3CjaKTjbd+rCzeMdDJa3/N7iBkaYWoGNgvu04qfJcseM/9J62zozFCqrj4Pmuc3WD7nbKPeZ26uItlf2j/zrRZs+WB97Zqz65uBkEKUmblIt7axpS+9jx0wrPnTvyHFNNX6x0j2iuXzxLMsqWu0opnc3H22zNBxS+xfN+XOrEU4JzffhWsQ7egVt7U8Ew5trR02+pWALvhLzJ4IrQ9ft5Jsdhj1Ou6BseDU+v9ahl24madeTEcNNbLYuSoNe2tVkRlAShiHyJWPwxFTwH0xWq1X/N3sBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOD/9A9pPjfgtsGPNwAAAABJRU5ErkJggg=="></img>
      )}
    </>
  );
};

export default UserProfile;
