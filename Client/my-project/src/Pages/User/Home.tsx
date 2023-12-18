import React, { useEffect, useState } from 'react'
import Home from '../../Components/Common/Start/Nav'
import Main from '../../Components/Common/Home/Main'
import { useAppSelector } from '../../Redux/hook';
import instance from '../../Utils/axios';
// import {User} from '../../Routes/routes'
import axios from 'axios';
import CPost from '../../Components/Common/post/CPost'
import {  signInData } from "../../Redux/userLogin";
import { useAppDispatch } from "../../Redux/hook";

const Homee = () => {
  // const logged = useAppSelector((state) => state.authLogin.userLogin);
const logged = JSON.parse(localStorage.getItem("userDetails") || "{}");
console.log(logged)
const dispatch=useAppDispatch()
useEffect(() => {

  try{
  const fetchData = async () => {
    const id = logged.id;
    console.log(id);   
     const response = await instance.get(`/details/${id}`);
    console.log(response)
    if (response.data.status === "ok") {
   
      dispatch(
        signInData({
          firstName: response.data.firstName,
          email: response.data.email,
          role: response.data.role,
          id: response.data._id,
        })
      )

      }

  };

  fetchData();

}catch(error){
  console.log(error)
}
}, []);


  return (
    <div>
         <Home logged={logged} />
         <div className='flex'>
         {/* <Main/> */}
         </div>
         {/* <CPost/> */}
     
    </div>
  )
}

export default Homee