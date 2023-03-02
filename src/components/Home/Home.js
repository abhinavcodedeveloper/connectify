import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './Home.css'
import '../../Global/Centercard.css'
import '../../Global/Sidebar.css'
import '../../Global/Profilebox.css'



const Home = () => {
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
    <div className='home'>
      {/* sidebar ****************************************** */}
      <div className='sidebardiv'>
        <div className="profilebox">
            <img src="https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.jpg" alt="" className='posterimg' />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9T8An4X3aOY1Lgo5Ax18mf47hXPPQya5-mApv6J-hdm-aoUALUX5pYyp9Ll-9KWIjTTg&usqp=CAU" alt="" className='profileimg'/>
            <h2>Rock</h2>
            <span>5M friends</span>
            <button>My Profile</button>
        </div>
        <div className="sidecontainer">
            <span><i className="fa-solid fa-paper-plane"></i> My Posts</span>
            <span><i className="fa-solid fa-chart-line"></i> Activity</span>
            <span><i className="fa-solid fa-shop"></i> Marketplace</span>
            <span><i className="fa-solid fa-memory"></i> Memories</span>
            <span><i className="fa-solid fa-calendar-days"></i> Event</span>
            <span><i className="fa-solid fa-circle-play"></i>Live Videos</span>
            <span><i className="fa-solid fa-hand-holding-heart"></i>Support</span>
            <span><i className="fa-sharp fa-solid fa-gear"></i>Settings</span>
        </div>
      </div>
      {/********************************CARDCONTAINER************************************************** */}
      <div className='centrediv'>
        {
          data.map(item=>{
            // console.log(item)
            return (
              <div className='cardcontainer'>
              <span className='cardhead'>
                  <img src="https://cdn.cdnlogo.com/logos/c/18/ChatGPT_800x800.png" alt="" />
                  <h2>{item.postedby.name}</h2>
              </span>
              <img src={item.photo} alt="" className='postimg' />
              <span className='title'>{item.title}</span>
              <span className='description'>{item.body}</span>
              <span className='commentsbox'>
                  <h3>Comments</h3>
                  <span><b> Mr. Beast:</b>Great!!!</span>
                  <div className='commenthere'>    
                      <input type="text" placeholder='Comment here'/>
                      <i className="fa-sharp fa-solid fa-paper-plane"></i>
                  </div>
              </span>
          </div>
            )
          })
        }
     
      </div>
      <div className='sidefooterdiv'>
      <div className="sidecontainer">
            <span><i className="fa-solid fa-paper-plane"></i> My Posts</span>
            <span><i className="fa-solid fa-chart-line"></i> Activity</span>
            <span><i className="fa-solid fa-shop"></i> Marketplace</span>
            <span><i className="fa-solid fa-memory"></i> Memories</span>
            <span><i className="fa-solid fa-calendar-days"></i> Event</span>
            <span><i className="fa-solid fa-circle-play"></i>Live Videos</span>
            <span><i className="fa-solid fa-hand-holding-heart"></i>Support</span>
            <span><i className="fa-sharp fa-solid fa-gear"></i>Settings</span>
        </div>
      </div>
    </div>
  )
}

export default Home