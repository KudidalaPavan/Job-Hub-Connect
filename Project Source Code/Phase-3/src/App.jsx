import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';

const App = () => {
  const [isUserLoggedIn,setIsUserLoggedIn]=useState(false)
  return (
    <div>
      <Navbar/>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default App;