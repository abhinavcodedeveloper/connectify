import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
import "../styles/Createpost.css";

const Createpost = () => {
  const Navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch('/createpost',{
        method:"post",
        headers:{
            "Content-Type":"application/json",
             "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            title,
            body,
            img: url  
        })
    })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.error) {
            M.toast({ html: data.error, classes: "#e53935 red darken-1" });
          }
          else {
            M.toast({
              html: "Posted Successfully :)",
              classes: "#00c853 green accent-4",
            });
            Navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);
  const postdata = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "connectify");
    data.append("cloud_name", "du1pi2myd");

    fetch("https://api.cloudinary.com/v1_1/du1pi2myd/image/upload", {
      method: "post",
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="createpost">
      <h1>Create Your Post</h1>
      <div className="post">
        <input
          className="title"
          type="text"
          name="title"
          placeholder="TITLE"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="body"
          type="text"
          name="body"
          placeholder="BODY"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <div className="file-field input-field">
          <div className="btn">
            <span>Upload</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          className="btn waves-effect waves-light"
          onClick={() => postdata()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Createpost;
