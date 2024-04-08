import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import Home from '../../Components/Common/Start/Nav'
import Main from '../../Components/Common/Home/Main'
import { useSelector } from 'react-redux'


const Homeservice = () => {

  return (
    <div>
         <Home />
         <div className='flex'>
       
         {/* <Main/> */}
     
         </div>
     
    </div>
  )
}

export default Homeservice