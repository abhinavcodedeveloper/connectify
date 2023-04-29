import React,{useEffect,createContext,useReducer,useContext,useState  } from "react";
import  ReactDOM  from "react-dom/client";
import Navbar from './Global/Navbar';
import {BrowserRouter,Route,useNavigate,Routes} from 'react-router-dom'
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Profile from './components/Profile/Profile';
import Createpost from "./components/Createpost/CreatePost";

import {initialState,reducer} from './reducers/userReducer'
import Home from "./components/Home/Home";
import UserProfile from "./components/UserProfile/UserProfile";
import FriendsPosts from "./components/FriendsPosts/FriendsPosts";
import Chatpage from "./components/Chatpage/Chatpage";



export const UserContext = createContext()
const Routing = ()=>{
  const Navigate = useNavigate();
  const {state,dispatch} = useContext(UserContext)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    // console.log(typeof(user),user)
    if(user){
      dispatch({
        type:"USER",
        payload:user
      })
    }
    else{
      Navigate('/signin')
    }
  },[])
  return(
    <Routes> 
    {/* it will make sure that only one path will remain active after matching with the frontend */}
    <Route exact path='/' element={<Home/>}/> 
    <Route exact path='/signin' element={<Signin/>}/> 
    <Route exact path='/signup' element={<Signup/>}/> 
    <Route exact path='/profile' element={<Profile/>}/> 
    <Route exact path='/createpost' element={<Createpost/>}/> 
    <Route exact path='/profile/:id' element={<UserProfile/>}/> 
    <Route exact path='/friendPosts' element={<FriendsPosts/>}/> 
    <Route exact path='/messenger' element={<Chatpage/>}/> 
    </Routes>
  )

}
function App() {

  const [state,dispatch] = useReducer(reducer,initialState)
  // chatselect :- a state which defines the selected part of a chat
  const [chatselect,setChatselect] = useState()
  // chats:- a state which defines all the chats available with the user
  const [chats,setChats] = useState([])
  // const [count,setCount] = useState(initial state); here reducer helps us to dispatch or update the value according to our need
  return (
    <UserContext.Provider value={
      {
        state,
        dispatch,
        chatselect,
        setChatselect,
        chats,
        setChats
      }
    }>
  <BrowserRouter>
  <Navbar/>
  <Routing/>
  </BrowserRouter>
  </UserContext.Provider>
  );
}

export default App;
