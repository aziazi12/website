import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Design from './components/Design';
import Results from './components/Results';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/log-in' element={<Login />} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/design' element={<Design/>} />
          <Route path='/results' element={<Results/>} />
        </Routes>
      </>
    </Router>
  );
}

export default App;