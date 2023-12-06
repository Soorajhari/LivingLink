import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  FaRegEnvelope } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import {  signInData } from "../../../Redux/userLogin";
import axios from "axios";

import instance from "../../../Utils/axios";
import  {Logins}  from "../../../Routes/routes"
import { useAppDispatch } from "../../../Redux/hook";


interface profileType {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

const Login: React.FC = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<any| null>({

    clientId:"",
    credential:"",
    select_by:"",
  });

  const [profile, setProfile] = useState<profileType | null>(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
});



  console.log(user);

  useEffect(() => {
    const fetchDetails = async () => {
      if (user && user.access_token) {
        try {
          if (user && user.access_token) {
            const response = await axios.get(
              `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
              {
                headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  Accept: "application/json",
                },
              }
            );
            setProfile(response.data);
            // sendDetailsToServer()
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchDetails();
  }, [user]);
  console.log(profile);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else if (profile) {
      sendDetailsToServer();
    }
  }, [profile]);

  const sendDetailsToServer = async () => {
    const body = {
      email: profile && profile.email,
      name: profile && profile.name,
      id: profile && profile.id,
    };

    console.log(body);
    if (profile) {
      try {
        const response = await axios.post("http://localhost:4000/login", body, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        const details = {
          email: response.data.email,
          role: response.data.role,
          accesstoken: response.data.accesstoken,
          refreshtoken: response.data.refreshtoken,
          firstName: response.data.firstName,
          id: response.data._id,

        };

        if (response.data.status === "ok") {
          localStorage.setItem("userDetails", JSON.stringify(details));
          dispatch(
            signInData({
              firstName: response.data.firstName,
              email: response.data.email,
              role: response.data.role,
              accesstoken: response.data.accesstoken,
              refreshtoken: response.data.refreshtoken,
              id: response.data._id,
            })
          );

          navigate("/home");
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userDetails");
    if (userInfo) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    try{
      e.preventDefault();
      const body = {
        email,
        password,
      };
  
      const response = await instance.post(Logins, body);
  
      console.log(response.data);
  
     
        const details = {
          email: response.data.email,
          role: response.data.role,
          accesstoken: response.data.accesstoken,
          refreshtoken: response.data.refreshtoken,
          firstName: response.data.firstName,
          id: response.data._id,
        };
  
        if (response.data.status === "ok") {
          localStorage.setItem("userDetails", JSON.stringify(details));
          dispatch(
            signInData({
              firstName: response.data.firstName,
              email: response.data.email,
              role: response.data.role,
              id: response.data._id,
            })
          );
  
          navigate("/home");
        } else {
          setError(response.data.message);
        }
    }catch(error){
      console.log(error)
    }
   
  
  };

  console.log(email, password);

  return (
    <div className=" flex    font-[Ubuntu] min-h-screen justify-center w-full items-center text-center px-20">
      {/* <form > */}
      <div className="bg-white w-[600px] md:w-[700px] lg:w-2/3 max-w-4xl h-[520px] md:h-[480px] rounded-2xl shadow-2xl flex flex-row">
        <div className=" w-full  md:w-3/5  p-5">
          <div className="text-left font-bold text-lg ">
            <h2 className="text-[#3981b6]">
              Living<span className="text-[#1AACAC]">Link</span>
            </h2>
          </div>
          <div className="py-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#3981b6] mb-2">
              Sign in to Account
            </h2>
            <div className="border-2 w-10 border-[#3981b6] inline-block mb-2"></div>
            <div className="flex justify-center my-2">
            

    
            <button  className="p-2 bg-[#ffff] border border-spacing-1 border-black text-black" onClick={() => login()}>Sign in with <span className="text-blue-500 text-lg font-semibold">Google </span>  </button>
            
              {/* <a
                href="/auth/google"
                className="border-2 border-gray-200 rounded-full p-3 mx-1"
              >
                <FaGoogle className="text-sm " />
              </a> */}
            </div>
            <p className="text-red-500 text-sm font-thin my-3"> {error} </p>
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-4 ">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bg-gray-100 outline-none flex-1"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-3  ">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="bg-gray-100 outline-none flex-1"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between w-64 mb-5 text-sm">
                <label className="flex items-center">
                  <input type="checkbox" name="remember" className="mr-1" />
                  Remember me
                </label>
                <a href="#/">Forgot Password</a>
              </div>

              <div>
                <p className="mb-3 md:hidden">
                  Not a member ?
                  <Link to={"/signup"}>
                    <span className="text-red-400 p-2 font-medium">
                      Sign up
                    </span>
                  </Link>
                </p>
              </div>
              <button
                type="submit"
                className="border-2 border-[#3981b6] rounded-full px-12 py-2 inline-block font-semibold hover:bg-[#3981b6] hover:text-white"
                onClick={(e) => handleSubmit(e)}
              >
                {" "}
                SignIn
              </button>
            </div>
          </div>
        </div>

        <div className=" hidden md:block  w-2/5 bg-[#3981b6] text-white rounded-tr-2xl rounded-br-2xl py-36 px-12 ">
          <h2 className="text-3xl font-bold mb-2">Hello, Friend</h2>
          <div className="border-2 w-10 border-white inline-block mb-2"></div>
          <p className="mb-10">
            Fill up personal information and start the journey with us
          </p>
          <Link to={"/signup"}>
            <a
              href="#/"
              className=" border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-[#3981b6]"
            >
              SignUp
            </a>
          </Link>
        </div>

        {/* <div className=" block md:hidden w-full bg-[#3981b6] text-white rounded-tr-2xl rounded-br-2xl py-36 px-12 ">
          <h2 className="text-3xl font-bold mb-2">Hello, Friend</h2>
          <div className="border-2 w-10 border-white inline-block mb-2"></div>
          <p className="mb-10">
            Fill up personal information and start the journey with us
          </p>
          <a
            href="#/"
            className=" border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-[#3981b6]"
          >
            SignUp
          </a>
        </div> */}
      </div>
      {/* </form> */}
    </div>
  );
};

export default Login;
