import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { setLoading, setError, signUpData } from "../../../Redux/userDetails";
import Spin from "./Spin";
import { useAppSelector, useAppDispatch } from "../../../Redux/hook";
import { Dispatch } from "redux";
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

const Subdescribe = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.authSlice.userInfo);
  console.log(userInfo);
  const { loading, error } = useAppSelector((state) => state.authSlice);

  const handleSelection = (role: string) => {
    setSelected(role);
  };
  console.log(selected);

  const register =
    (data: userDetails, subrole: string) => async (dispatch: Dispatch) => {
      dispatch(setLoading(true));
      try {
        const response = await instance.post(signUp, {
          ...data,
          subrole,
          role: "service provider",
        });
        console.log(response.data);
  
        return response.data;
      } catch (error) {
        console.error(error);
        dispatch(setError(true));
      } finally {
        dispatch(setLoading(false));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    try{
      e.preventDefault();
      if (selected != null) {
        const response = await dispatch(register(userInfo, selected));
        if (response.status === "ok") {
          dispatch(signUpData({
            firstName:response.firstNmae,
            lastName:response.lastNmae,
            email:response.email,
            mobile:response.mobile,
            role:response.role,
            subrole:response.subrole
          }));
          navigate("/otp");
        }
      } else {
      }
    }catch(error){
console.log(error)
    }
  
  };

  const handleClick = (e: React.FormEvent<HTMLDivElement>) => {
    handleSubmit(e);
  };

  return (
    <>
      <div className="bg-custom-gray w-full min-h-screen flex justify-center font-[Ubuntu]">
        <div className="bg-[#ffff] w-[600px] h-[900px] my-auto overflow-auto mt-4 rounded-3xl">
          <h1 className="text-3xl font-semibold mt-7 text-center shadow-3xl">
            What do you call yourself
          </h1>

          <div className="mt-8 p-4">
            <div
              className={`flex items-center ${
                selected === "Civil Engineer" ? "rolesele" : ""
              } gap-x-3 p-3`}
              onClick={() => handleSelection("Civil Engineer")}
            >
              <img
                src={require("../../Assets/images/png/engineers.png")}
                alt="civil"
                className="w-[70px] h-[65px]"
              />              <p className="text-[23px] font-medium">Civil Engineeer</p>
            </div>
            <div
              className={`flex items-center ${
                selected === "3D & CAD" ? "rolesele" : ""
              } gap-x-3 p-3`}
              onClick={() => handleSelection("3D & CAD")}
            >
              <img
                src={require("../../Assets/images/png/house.png")}
                alt="civil"
                className="w-[70px] h-[65px]"
              />
              <p className="text-[23px] font-medium">3D & CAD</p>
            </div>
            <div
              className={`flex items-center ${
                selected === "Contractor" ? "rolesele" : ""
              } gap-x-3 p-3`}
              onClick={() => handleSelection("Contractor")}
            >
              <img
                src={require("../../Assets/images/png/construction-worker.png")}
                alt="civil"
                className="w-[70px] h-[65px]"
              />
              <p className="text-[23px] font-medium">Contractor</p>
            </div>
            <div
              className={`flex items-center ${
                selected === "Carpenter" ? "rolesele" : ""
              } gap-x-3 p-3`}
              onClick={() => handleSelection("Carpenter")}
            >
              <img
                src={require("../../Assets/images/png/carpenter.png")}
                alt="civil"
                className="w-[70px] h-[65px]"
              />
              <p className="text-[23px] font-medium">Carpenter</p>
            </div>
            <div
              className={`flex items-center ${
                selected === "Architect" ? "rolesele" : ""
              } gap-x-3 p-3`}
              onClick={() => handleSelection("Architect")}
            >
              <img
                src={require("../../Assets/images/png/architect.png")}
                alt="civil"
                className="w-[70px] h-[65px]"
              />
              <p className="text-[23px] font-medium">Architect</p>
            </div>
            <div
              className={`flex items-center ${
                selected === "Plumber" ? "rolesele" : ""
              } gap-x-3 p-3`}
              onClick={() => handleSelection("Plumber")}
            >
              <img
                src={require("../../Assets/images/png/water-supply.png")}
                alt="civil"
                className="w-[70px] h-[65px]"
              />
              <p className="text-[23px] font-medium">Plumber</p>
            </div>
            <div
              className={`flex items-center ${
                selected === "Interior Designer" ? "rolesele" : ""
              } gap-x-3 p-3`}
              onClick={() => handleSelection("Interior Designer")}
            >
              <img
                src={require("../../Assets/images/png/technical-drawing.png")}
                alt="civil"
                className="w-[70px] h-[65px]"
              />
              <p className="text-[23px] font-medium">Interior Designer</p>
            </div>
            <div
              className={`flex items-center ${
                selected === "Painting Works" ? "rolesele" : ""
              } gap-x-3 p-3`}
              onClick={() => handleSelection("Painting Works")}
            >
              <img
                src={require("../../Assets/images/png/roller-brush.png")}
                alt="civil"
                className="w-[70px] h-[65px]"
              />
              <p className="text-[23px] font-medium">Painting Works</p>
            </div>
            <div
              className={`flex items-center ${
                selected === "Home Automation" ? "rolesele" : ""
              } gap-x-3 p-3`}
              onClick={() => handleSelection("Home Automation")}
            >
              <img
                src={require("../../Assets/images/png/house (1).png")}
                alt="civil"
                className="w-[70px] h-[65px]"
              />
              <p className="text-[23px] font-medium">Home Automation</p>
            </div>
            <div
              className={`flex items-center ${
                selected === "Flooring" ? "rolesele" : ""
              } gap-x-3 p-3`}
              onClick={() => handleSelection("Flooring")}
            >
              <img
                src={require("../../Assets/images/png/parquet.png")}
                alt="civil"
                className="w-[70px] h-[65px]"
              />
              <p className="text-[23px] font-medium">Flooring</p>
            </div>
            <div
              className={`flex items-center ${
                selected === "Others" ? "rolesele" : ""
              } gap-x-3 p-3`}
              onClick={() => handleSelection("Others")}
            >
              <img
                src={require("../../Assets/images/png/engineer (1).png")}
                alt="civil"
                className="w-[70px] h-[65px]"
              />
              <p className="text-[23px] font-medium">Others</p>
            </div>
            <div
              className={`flex items-center ${
                selected === "Swimming Pool" ? "rolesele" : ""
              } gap-x-3 p-3`}
              onClick={() => handleSelection("Swimming Pool")}
            >
              <img
                src={require("../../Assets/images/png/swimming.png")}
                alt="civil"
                className="w-[70px] h-[65px]"
              />
              <p className="text-[23px] font-medium">Swimming Pool</p>
            </div>
            <div
              className={`flex items-center ${
                selected === "Mason" ? "rolesele" : ""
              } gap-x-3 p-3`}
              onClick={() => handleSelection("Mason")}
            >
              <img
                src={require("../../Assets/images/png/bricklayer (1).png")}
                alt="civil"
                className="w-[70px] h-[65px]"
              />
              <p className="text-[23px] font-medium">Mason</p>
            </div>
          </div>
          <div
            className="my-4 flex justify-center sticky bottom-2"
            onClick={selected ? handleClick : () => {}}
          >
            <button
              className={`p-3  ${
                selected ? "bg-[#3881b6]" : "bg-[#91C8E4]"
              } w-[200px] rounded-3xl text-white text-xl font-semibold`}
            >
              {" "}
              {loading ? <Spin /> : "Save"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subdescribe;
