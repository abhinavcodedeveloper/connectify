import React from "react";
import  ReactDOM  from "react-dom/client";
import Navbar from './Global/Navbar';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Home from './components/screens/Home';
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import Profile from './components/screens/Profile';
import Createpost from "./components/screens/Createpost";

function App() {
  return (
  <BrowserRouter>
  <Navbar/>
  <Routes>
  <Route exact path='/' element={<Home/>}/> 
  <Route exact path='/signin' element={<Signin/>}/> 
  <Route exact path='/signup' element={<Signup/>}/> 
  <Route exact path='/profile' element={<Profile/>}/> 
  <Route exact path='/createpost' element={<Createpost/>}/> 
  </Routes>
  </BrowserRouter>
  );
}

export default App;
