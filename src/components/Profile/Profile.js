import React,{useState,useEffect} from 'react'
import './Profile.css'
import '../../Global/Profilebox.css'
const Profile = () => {
    const [data,setData] = useState([]);
    useEffect(()=>{
        fetch('/allposts',{
        method:"get",
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
        }).then(res=>res.json())
        .then(result=>{
        setData(result.posts)
        })
    },[])
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
            <div className='infos'>
                <span className='infobox'>
                    <span className='infotitle'>Followers</span><span>{20}</span>
                </span>
                <span className='infobox'>
                    <span className='infotitle'>Following</span><span>{20}</span>
                </span>
                <span className='infobox'>
                    <span className='infotitle'>Friends</span><span>{20}</span>
                </span>
            </div>
        </div>
        <div className="userposts">
            <h1>Posts</h1>
            <div className='centrediv'>
                {
                data.map(item=>{
                    // console.log(item)
                    return (
                    <div className=''>
                    {/* <span className='cardhead'>
                        <img src="https://cdn.cdnlogo.com/logos/c/18/ChatGPT_800x800.png" alt="" />
                        <h2>{item.postedby.name}</h2>
                    </span> */}
                    <img src={item.photo} alt="" className='postimg' />
                    {/* <span className='title'>{item.title}</span>
                    <span className='description'>{item.body}</span>
                    <span className='commentsbox'>
                        <h3>Comments</h3>
                        <span><b> Mr. Beast:</b>Great!!!</span>
                        <div className='commenthere'>    
                            <input type="text" placeholder='Comment here'/>
                            <i className="fa-sharp fa-solid fa-paper-plane"></i>
                        </div>
                    </span> */}
                </div>
                    )
                })
                }
            </div>
        </div>
            {/* iss wale div m followers following wagera aaenge to wo daal dena */}
            {/* and thori css thik krde iske...fir niche ek aur div jisme user ki posts aayengi */}
            {/* ye krde
            plus js css m krna plsss */}
            
    </div>
  )
}

export default Profile