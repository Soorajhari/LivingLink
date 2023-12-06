import React, {  useState } from "react";
import "./style.css";

import { useNavigate } from "react-router-dom";
import Spin from "./Spin";
import { setLoading, setError, signUpData } from "../../../Redux/userDetails";
import Error from "./Error";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { Dispatch } from "redux";
import { IonIcon } from '@ionic/react';
import {home,construct} from 'ionicons/icons';
import instance from "../../../Utils/axios";

import  {signUp}  from "../../../Routes/routes"
interface userDetails {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  
}

const Describe = () => {
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.authSlice.userInfo);
  console.log(userInfo)
  const { loading, error } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();
  const [selectedRole, setSelectedRole] = useState<string|null>(null);

  const getRole = (role:string) => {
    setSelectedRole(role);
  };
  console.log(selectedRole);

  const { firstName, lastName } = userInfo;
  console.log(firstName, lastName);

  const register = (data:userDetails, role:string) => async (dispatch:Dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await instance.post(signUp, {
        ...data,
        role,
      });
      // console.log(response.data);
   
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSubmit = async (e:React.FormEvent) => {
    try{
      e.preventDefault();
      if (selectedRole === "home Owner") {
        const response = await dispatch(register(userInfo, selectedRole));
        console.log(response);
        if (response.status === "ok") {
          dispatch(signUpData( {
            firstName:response.firstNmae,
            lastName:response.lastNmae,
            email:response.email,
            mobile:response.mobile,
            role:response.role,
         
          }));
          navigate("/otp")
        } else {
          navigate("/describe");
        
        }
      } else{
        navigate("/sub_describe")
      }
    }catch(error:any){
      console.log(error)
    }
   
  };

  const handleClick = (e: React.FormEvent<HTMLDivElement>) => {
    handleSubmit(e);
  };

  return (
    <>
     {error && <Error error={"An error ocuured please try again"} />} 
      <div className="bg-custom-gray w-full min-h-screen flex justify-center  q">
    
        <div className=" w-[600px]  bg-[#fff]  my-auto h-[900px] rounded-2xl shadow-xl ">
        
          <div className="flex justify-center mt-10">
            <h2 className="text-3xl font-semibold">What best describes you</h2>
          </div>
          <div className="flex flex-col  items-center mt-[120px] gap-y-10">
            <div
              className={`p-2 flex flex-col items-center  ${
                selectedRole === "home Owner" ? "selected" : ""
              }`}
              onClick={() => getRole("home Owner")}
            >
              <div className="bg-[#C5DFF8]  rounded-full shadow-md w-[150px] h-[150px] flex justify-center items-center">
                {/* <a href="" className=''> */}
                <IonIcon className="text-6xl" icon={home}></IonIcon>
                {/* </a> */}
              </div>
              <h3 className="text-xl font-normal py-5">i'am a home owner</h3>
            </div>

            <div
              className={`p-2 flex flex-col items-center ${
                selectedRole === "service provider" ? "selected" : ""
              }`}
              onClick={() => getRole("service provider")}
            >
              <div className="bg-[#C5DFF8] rounded-full shadow-md w-[150px] h-[150px] flex justify-center items-center">
                {/* <a href="" className=''> */}
                <IonIcon className="text-6xl" icon={construct}></IonIcon>
                {/* </a> */}
              </div>
              <h3 className="text-xl font-normal py-5 ">
                i'am a service provider
              </h3>
            </div>
          </div>
          <div
            className="flex justify-center mt-6"
            aria-disabled={!selectedRole} onClick={selectedRole ? handleClick : () => {}}
          >
            {selectedRole === "home Owner" ? (
              <button
                className="bg-[#3981b6] p-4  w-[200px] rounded-3xl text-xl font-semibold"
                type="submit"
                
              >
                {loading ? <Spin /> : "Done"}
              </button>
            ) : (
              <button className="bg-[#3981b6] p-3  w-[220px] rounded-3xl text-xl font-semibold text-white ">
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Describe;
