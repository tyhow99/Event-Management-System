import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Footer from './components/Footer'
//import { Routes, Route } from "react-router-dom";

function App() {


  return (
    <>
      <Navbar />
      <Login />
      <Footer />
    </>
  )
}

export default App
