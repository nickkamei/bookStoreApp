import React from 'react'
import Home from './home/Home'
import {} from "react-router-dom"
import { Route, Routes } from 'react-router-dom'
import Courses  from './courses/Courses'
import list from "./data/list.json"
import Signup from './components/Signup'
import About from './About/About'
import Contact from './components/Contact'



const App = () => {
  console.log(list)
  return (
    <>
    <div className='dark:bg-slate-900 dark:text-white'>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/course" element={<Courses />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/aboutus" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
    </Routes>
    </div>
    </>
  )
}

export default App
