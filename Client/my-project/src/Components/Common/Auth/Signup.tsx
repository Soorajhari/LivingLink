import React, { useEffect, useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import {  signUpData,setError,setLoading } from "../../../Redux/userDetails";
import { useAppDispatch } from "../../../Redux/hook";
import { User } from "../../../Redux/userDetails";
// import instance from "../../../Utils/axios";
// import { signUp } from "../../../Utils/routes";
// import axios from "../../../Utils/axios"
// import axios from "axios";
interface Input{
  // loading: boolean,
  
    firstName: string,
    lastName: string,
    email: string,
    mobile: string,
    password: string,
    confirmPassword: string,
    role: string,
    subrole:string
  
  // error: boolean

}
//  interface Errors{
//   firstName:string,
//   email:string,
//   mobile:string,
//   password:string,
//   confirmPassword:string

//  }

type Errors = Partial<Record<keyof Input, string>>



interface FormValues {
  firstName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}



const Signup:React.FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const initialState = {
    // loading: false,
    // userInfo: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      role: "",
      subrole: ""
    // },
    // error: false
  };

  



  const [userData, setUserData] = useState<Input>(initialState);
  const [error, setError] = useState<Errors>({
 
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const { firstName, lastName, email, mobile, password, confirmPassword } =
    userData;

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      navigate("/describe");
   
    }
    
  }, [isSubmit,error]);

  const handleChangeInput = (e:React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement
    setUserData({ ...userData, [name]: value });
  };
  // console.log(userData);

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();

    setError(validate(userData));
    setIsSubmit(true);
    
    // if (Object.keys(error).length === 0) {
      // dispatch(setLoading(false))
      // dispatch(setError(false))
      dispatch(signUpData(userData));
      
      
    // }
  };


console.log(userData)


  function validate (values:any) {
    const errors :Partial<FormValues>= {}; ;
    const regex = /^[a-zA-Z]{3,16}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;
    const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/;
    if (values.firstName.length<2) {
      errors.firstName = "name is too short";
    }else if(!values.firstName.match(regex)){
      errors.firstName="Invalid form first name can be 3 to 16 characters "
    }

  
    if (!emailRegex.test(values.email)){
      errors.email="Invalid form write a valid email"
    }

  if(!mobileRegex.test(values.mobile)){
    errors.mobile="please enter a valid mobile number"
  }
  if(values.password.length<8){
    errors.password="Weak password. Please choose a stronger password."
  } else if (!passwordRegex.test(values.password)) {
    errors.password = "use a special charcter";
  }
   if(values.password !== values.confirmPassword){
    errors.confirmPassword="password do not match ,please try again"
   }

    return errors;
  };

  console.log(error)

  // console.log(firstName,lastName,email,password,mobile,)
  return (
    <div className="flex  font-[Ubuntu]  justify-center items-center min-h-screen  ">
      <div className="w-[600px] md:w-[950px] md:h-[600px]  h-[850px]  flex flex-row rounded-2xl shadow-xl overflow-hidden md:overflow-auto   ">
        <div className="w-full md:w-3/5 bg-[#ffff] p-4  backdrop-filter backdrop-blur-sm bg-opacity-10">
          <h4 className="text-lg font-semibold ml-3 mt-5 drop-shadow-2xl shadow-black text-[#3981b6]">
            Living<span className="text-[#1AACAC]">Link</span>
          </h4>

          <h5 className=" text-center text-xl font-semibold p-2 mt-3 drop-shadow-2xl shadow-black text-[#3981b6]">
            Welcome to Living<span className="text-[#1AACAC]">Link</span>
          </h5>
          <form
            action=""
            className=""
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="flex flex-col items-center md:flex-row justify-center gap-x-6 ">
              <div>
                <div className="bg-[#ECF8F9] w-60  max-w-xs p-2 flex items-center mt-6  md:mt-10 shadow-lg ">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    type="firstanme"
                    name="firstName"
                    placeholder="First Name"
                    className="bg-[#ECF8F9] outline-none flex-1 " 
                    
                    autoFocus
                    onChange={handleChangeInput}  required
                    value={firstName}
                  />
                </div>
                { error.firstName &&
                  <div className="text-center mt-2 text-xs font-thin md:text-base" style={{ color: "red" }}>
                    {error.firstName}
                  </div>
                }
              </div>

              <div className="bg-[#ECF8F9] w-60 max-w-xs p-2 flex items-center mt-6 md:mt-10  shadow-lg ">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  type="lastname"
                  name="lastName"
                  placeholder="Last Name"
                  className="bg-[#ECF8F9] outline-none flex-1"
                  onChange={handleChangeInput}
                  // required
                  value={lastName}  required
                />
              </div>
            </div>
            <div className="flex flex-col items-center md:flex-row justify-center gap-x-6  ">
              <div>
              <div className="bg-[#ECF8F9] w-60  max-w-xs p-2 flex items-center mt-6 md:mt-10 shadow-lg ">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bg-[#ECF8F9] outline-none flex-1 "
                  onChange={handleChangeInput}
                  // required
                  value={email}  required
                />
              </div>
              
                  <div className="text-center mt-2 text-xs font-thin md:text-base" style={{ color: "red" }}>
                    {error.email}
                  </div>
                
              </div>
            
            <div>
            <div className="bg-[#ECF8F9] w-60 max-w-xs p-2 flex items-center mt-6 md:mt-10 shadow-lg ">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  type="mobile"
                  name="mobile"
                  placeholder="Phone"
                  className="bg-[#ECF8F9] outline-none flex-1"
                  onChange={handleChangeInput}
                  // required
                  value={mobile} required
                />
              </div>
              <div className="text-center mt-2 text-xs font-thin md:text-base" style={{ color: "red" }}>
                    {error.mobile}
                  </div>
            </div>
             
            </div>
            <div className="flex flex-col items-center md:flex-row justify-center gap-x-6  ">
              <div>
              <div className="bg-[#ECF8F9] w-60  max-w-xs p-2 flex items-center  mt-6 md:mt-10 shadow-lg ">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="bg-[#ECF8F9] outline-none flex-1 "
                  onChange={handleChangeInput}
                  // required
                  value={password} required
                />
              </div>
              <div className="text-center mt-2 text-xs font-thin md:text-base" style={{ color: "red" }}>
                    {error.password}
                  </div>
              </div>
          <div>
          <div className="bg-[#ECF8F9] w-60 max-w-xs p-2 flex items-center  mt-6 md:mt-10 shadow-lg ">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="bg-[#ECF8F9] outline-none flex-1"
                  // required
                  onChange={handleChangeInput}
                  value={confirmPassword}
                />
              </div>
              <div className="text-center mt-2 text-sm  font-thin md:text-base" style={{ color: "red" }}>
                    {error.confirmPassword}
                  </div>
          </div>
             
            </div>
            <div className="flex justify-end mt-10 mr-10">
              {/* <Link to='/describe'> */}
              <button className="border bg-[#3981b6] p-3 w-[130px] rounded-full text-base text-white font-semibold hover:bg-white hover:text-[#3981b6] " >
                Continue
              </button>
              {/* </Link> */}
            </div>
          </form>

          <div className="flex  justify-end mr-10 mt-5 gap-2">
            <p className="text-gray-700">Already have an account ?</p>
            <Link to={"/login"}>
            <p className="text-lg text-[#3981b6] font-semibold">
              
              Sign In
            </p></Link>
           
          </div>

          {/* <hr className="text-gray-600 mt-5" />

          <h3 className="text-xl text-center mt-4 text-gray-600">
            Or connect with:
          </h3>

          <div className="flex justify-center mt-4">
            <div className="flex border border-black w-[300px] md:w-[400px] h-[50px] items-center p-2 justify-between">
              <img
                src={require("../../Assets/images/google.png")}
                alt="google-icon"
                className="w-[20px] h-[20px]"
              />
              <h4 className="text-lg font-semibold text-gray-500 mx-auto">
                <a href="#/">Continue with Google</a>
              </h4>
            </div>
          </div> */}
        </div>

        <div className="  w-2/5 bg-gradient-to-t from-[#98E4FF] to-[#6499E9] rounded-tr-2xl rounded-br-2xl hidden md:flex items-center">
          <img
            src={require("../../Assets/images/5138430-removebg-preview.png")}
            alt="img"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
