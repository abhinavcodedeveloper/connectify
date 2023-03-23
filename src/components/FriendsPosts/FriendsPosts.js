import React, { useState, useEffect, useContext } from "react";
import { useNavigate,Link } from "react-router-dom";
import "../Home/Home.css";
import "../../Global/Centercard.css";
import "../../Global/Sidebar.css";
import "../../Global/Profilebox.css";
import { UserContext } from "../../App";

const FriendsPosts = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/friendPosts", {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);

  // like post logic
  const likePost = (Id) => {
    fetch("/likepost", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: Id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        // console.log(newData)
        setData(newData);
      });
  };

  // Disliking the post
  const dislikePost = (Id) => {
    fetch("/dislikepost", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: Id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(data)
        const newData = data.map((item) => {
          if (item._id == result._id) {
            // updated
            return result;
          } else {
            return item;
          }
        });
        // console.log(newData)
        setData(newData);
      });
  };
  const commentPost = (text, postId) => {
    fetch("/comments", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text,
        postId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(data)
        const newData = data.map((item) => {
          if (item._id == result._id) {
            // updated
            return result;
          } else {
            return item;
          }
        });
        // console.log(newData)
        setData(newData);
      });
  };

  // ******deleting the post*********
  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        const newData = data.filter((item) => {
          return item._id != result._id;
        });
        setData(newData);
      });
  };

  return (
    <div className="home">
      {/* sidebar ****************************************** */}
      <div className="sidebardiv">
        <div className="profilebox">
          <img
            src="https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.jpg"
            alt=""
            className="posterimg"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9T8An4X3aOY1Lgo5Ax18mf47hXPPQya5-mApv6J-hdm-aoUALUX5pYyp9Ll-9KWIjTTg&usqp=CAU"
            alt=""
            className="profileimg"
          />
          <h2>Rock</h2>
          <span>5M friends</span>
          <button>My Profile</button>
        </div>
        <div className="sidecontainer">
          <span>
            <i className="fa-solid fa-paper-plane"></i> My Posts
          </span>
          <span>
            <i className="fa-solid fa-chart-line"></i> Activity
          </span>
          <span>
            <i className="fa-solid fa-shop"></i> Marketplace
          </span>
          <span>
            <i className="fa-solid fa-memory"></i> Memories
          </span>
          <span>
            <i className="fa-solid fa-calendar-days"></i> Event
          </span>
          <span>
            <i className="fa-solid fa-circle-play"></i>Live Videos
          </span>
          <span>
            <i className="fa-solid fa-hand-holding-heart"></i>Support
          </span>
          <span>
            <i className="fa-sharp fa-solid fa-gear"></i>Settings
          </span>
        </div>
      </div>
      {/********************************CARDCONTAINER************************************************** */}
      <div className="centrediv">
        {data.map((item) => {
          // console.log(item)
          return (
            <div className="cardcontainer">
              <span className="cardhead">
                <img
                  src="https://cdn.cdnlogo.com/logos/c/18/ChatGPT_800x800.png"
                  alt=""
                />
                <h2><Link to={item.postedby._id !== state._id?`/profile/${item.postedby._id}`:'/profile'}>{item.postedby.name}</Link></h2>
                {item.postedby._id == state._id ? (
                  <i
                    id="Delete"
                    className="small material-icons"
                    onClick={() => deletePost(item._id)}
                  >
                    content_cut
                  </i>
                ) : (
                  <i id="Delete" className="small material-icons">
                    done
                  </i>
                )}
              </span>
              <img src={item.photo} alt="" className="postimg" />
              <div className="like-unlike">
                {item.likes.includes(state._id) ? (
                  <i
                    className="small material-icons"
                    onClick={() => dislikePost(item._id)}
                  >
                    thumb_down
                  </i>
                ) : (
                  <i
                    className="small material-icons"
                    onClick={() => likePost(item._id)}
                  >
                    thumb_up
                  </i>
                )}
              </div>

              <span className="title">{item.likes.length} likes</span>
              <span className="title">{item.title}</span>
              <span className="description">{item.body}</span>
              <span className="commentsbox">
                {/* Commenting on the post *************************************/}
                <h3>Comments</h3>
                {item.comments.map((data) => {
                  return (
                    <h6 key={data._id}>
                      <span>
                        <b>{data.postedby.name} </b>
                        {data.text}
                      </span>
                    </h6>
                  );
                })}
                <form
                  className="commenthere"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // console.log(e.target[0].value)
                    commentPost(e.target[0].value, item._id);
                  }}
                >
                  <input type="text" placeholder="Comment here" />
                  <i className="fa-sharp fa-solid fa-paper-plane"></i>
                </form>
              </span>
            </div>
          );
        })}
      </div>
      <div className="sidefooterdiv">
        <div className="sidecontainer">
          <span>
            <i className="fa-solid fa-paper-plane"></i> My Posts
          </span>
          <span>
            <i className="fa-solid fa-chart-line"></i> Activity
          </span>
          <span>
            <i className="fa-solid fa-shop"></i> Marketplace
          </span>
          <span>
            <i className="fa-solid fa-memory"></i> Memories
          </span>
          <span>
            <i className="fa-solid fa-calendar-days"></i> Event
          </span>
          <span>
            <i className="fa-solid fa-circle-play"></i>Live Videos
          </span>
          <span>
            <i className="fa-solid fa-hand-holding-heart"></i>Support
          </span>
          <span>
            <i className="fa-sharp fa-solid fa-gear"></i>Settings
          </span>
        </div>
      </div>
    </div>
  );
};

export default FriendsPosts;
