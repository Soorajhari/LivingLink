import React, { useState } from "react";
import {  googleLogout} from "@react-oauth/google";
// import {HomeProps}  from '../../../Pages/User/Home'

import { IonIcon } from "@ionic/react";
import {
  addCircleOutline,
  videocamOutline,
  trendingUpOutline,
  helpCircleOutline,
  searchOutline,
} from "ionicons/icons";
import {
  homeOutline,
  personCircleOutline,
  imageOutline,
  peopleCircleOutline,
  trailSignOutline,
} from "ionicons/icons";
import { notificationsOutline, closeOutline, menu } from "ionicons/icons";

import { Link } from "react-router-dom";
import Main from "../Home/Main";

interface logPrpos {
  logged: string;
}


const Home = (props: logPrpos) => {
  const[post,setPost]=useState<boolean>(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userData = localStorage.getItem("userDetails");
  if (userData) {
    var firstLogin = JSON.parse(userData);
    var firstName =firstLogin && firstLogin.firstName ? firstLogin.firstName : "";
  }

  const handleLogout = async () => {
    localStorage.clear();
    googleLogout();
    window.location.href = "/login";
  };

  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-[#ffff] p-3 shadow-xl sticky top-0 z-10">
        <div className=" flex items-center justify-between  md:w-[85%] md:mx-auto ">
          <div className="  flex justify-between gap-x-5 lg:gap-x-7">
            <div className="text-2xl  md:hidden">
              <IonIcon
                onClick={onToggleMenu}
                className="font-bold"
                icon={isMenuOpen ? closeOutline : menu}
              ></IonIcon>
            </div>
            <div className="flex items-center gap-5 lg:gap-7 ">
              <img
                src={require("../../Assets/images/a-logo-for-house-related-web-application.png")}
                alt="home-logp"
                className="w-[25px] h-[25px] md:w-[35px] md:h-[35px] lg:w-[45px] lg:h-[45px]"
              />
              <p className="text-[#3189b6] text-lg md:text-xl lg:text-2xl font-bold">
                Living<span className="text-[#1AACAC]">Link</span>
              </p>
            </div>
          </div>
          <div className="m-3 relative  md:flex hidden items-center flex-1">
            <input
              type="search"
              className="rounded p-1.5 outline-none bg-white flex-1 border border-black"
              placeholder="Search Design and Products"
            />
            <div className="absolute right-3">
              <IonIcon
                icon={searchOutline}
                className="text-white text-3xl bg-black w-7 h-7 rounded flex items-center"
              ></IonIcon>
            </div>
          </div>
          <div className="flex  items-center gap-x-3">
            <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
              <IonIcon
                className="md:text-3xl text-2xl text-orange-500 cursor-pointer"
                icon={addCircleOutline} onClick={()=>{setPost(true)}}
              ></IonIcon>
            </div>

            <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
              {/* <ion-icon class="md:text-2xl text-xl" name="person"></ion-icon> */}
              {props.logged && firstName ? (
                <Link to="/profile">
                  <span className="font-semibold text-lg lg:text-xl cursor-pointer">
                    {firstName}
                  </span>
                </Link>
              ) : (
                <Link to={"/login"}>
                  <span className="font-semibold text-lg lg:text-xl cursor-pointer">
                    Login
                  </span>
                </Link>
              )}
              {/* {firstLogin &&
                <button
                  className="p-2 font-semibold text-white w-[90px] bg-[#3981b6] rounded-2xl"
                  onClick={handleLogout}
                >
                  Logout
                </button>
} */}
            </div>
            <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
              <IonIcon
                className="md:text-2xl text-xl cursor-pointer"
                icon={notificationsOutline}
              ></IonIcon>
            </div>
          </div>
        </div>
        <div className="m-3 relative flex items-center md:hidden">
          <input
            type="search"
            className="rounded p-1.5 outline-none bg-white flex-1 border border-black"
            placeholder="Search Design and Products"
          />
          <div className="absolute right-3">
            <IonIcon
              icon={searchOutline}
              className="text-white bg-black w-7 h-7 rounded flex items-center"
            ></IonIcon>
          </div>
        </div>
        {/* <hr className="bg-red-900" /> */}
        <div className="hidden md:block mt-7">
          <ul className=" md:flex   items-center justify-between w-[85%] mx-auto font-meduim md:font-semibold text-gray-600">
            <div className="flex items-center gap-x-2 py-3 md:py-0">
              <IonIcon
                icon={homeOutline}
                className="lg:text-2xl md:text-lg  "
                // name="home-outline"
              ></IonIcon>
              <li className="text-xl lg:text-base md:text-xs">Home</li>
            </div>
            <Link to={"/profile"}>
            <div className="flex items-center gap-x-2 py-3 md:py-0">
              <IonIcon
                icon={personCircleOutline}
                className="text-[#3189b6] lg:text-2xl md:text-lg rounded-full "
              ></IonIcon>
              <li className="text-xl lg:text-base  md:text-xs">Profile</li>
            </div>
            </Link>
            <div className="flex items-center gap-x-2 py-3 md:py-0">
              <IonIcon
                icon={imageOutline}
                className="lg:text-2xl md:text-lg "
              ></IonIcon>
              <li className="text-xl lg:text-base  md:text-xs">Designs</li>
            </div>
            <div className="flex items-center gap-x-2 py-3 md:py-0">
              <IonIcon
                icon={videocamOutline}
                className="lg:text-2xl md:text-lg"
              ></IonIcon>
              <li className="text-xl lg:text-base  md:text-xs">Video</li>
            </div>
            <div className="flex items-center gap-x-2 py-3 md:py-0">
              <IonIcon
                icon={peopleCircleOutline}
                className=" lg:text-2xl md:text-lg "
              ></IonIcon>
              <li className="text-xl lg:text-base  md:text-xs">Hire Pros</li>
            </div>

            <div className="flex items-center gap-x-2 py-3 md:py-0">
              <IonIcon
                icon={trendingUpOutline}
                className="lg:text-2xl md:text-lg"
              ></IonIcon>
              <li className="text-xl lg:text-base  md:text-xs">Trending</li>
            </div>

            <div className="flex items-center gap-x-2 py-3 md:py-0">
              <IonIcon
                icon={helpCircleOutline}
                className="lg:text-2xl md:text-lg"
              ></IonIcon>
              <li className="text-xl lg:text-base  md:text-sm">Questions</li>
            </div>
            <div className="flex items-center gap-x-2 py-3 md:py-0">
              <IonIcon
                icon={trailSignOutline}
                className="lg:text-2xl md:text-lg"
              ></IonIcon>
              <li className="text-xl lg:text-base  md:text-sm">Requirment</li>
            </div>
          </ul>
        </div>
      </nav>

      {isMenuOpen && (
        <div className=" md:hidden md:static absolute z-10 top-[6.5%] w-full h-screen md:h-[40px] bg-custom-black md:bg-custom-light text-white md:text-black">
          <ul className=" md:flex   items-center justify-between w-[85%] mx-auto font-meduim md:font-semibold">
            <div className="flex  items-center gap-x-2 py-3 md:py-0">
              <IonIcon className="text-xl" icon={homeOutline}></IonIcon>
              <li className="text-xl md:text-base">Home</li>
              {/* <ion-icon class="" name="chevron-forward-outline"></ion-icon> */}
            </div>
            <div className="flex items-center gap-x-2 py-3 md:py-0">
              <IonIcon
                className="bg-[#3189b6] text-xl rounded-full "
                icon={personCircleOutline}
              ></IonIcon>
              <li className="text-xl md:text-base">Profile</li>
              {/* <ion-icon class="ml-[290px]" name="chevron-forward-outline"></ion-icon> */}
            </div>
            <div className="flex items-center gap-x-2 py-3 md:py-0">
              <IonIcon className="text-xl  " icon={imageOutline}></IonIcon>
              <li className="text-xl md:text-base">Designs</li>
              {/* <ion-icon class="ml-[280px]" name="chevron-forward-outline"></ion-icon> */}
            </div>
            <div className="flex items-center gap-x-2 py-3 md:py-0">
              <IonIcon className="text-xl" icon={videocamOutline}></IonIcon>
              <li className="text-xl md:text-base">Video</li>
            </div>
            <div className="flex items-center gap-x-2 py-3 md:py-0">
              <IonIcon
                className=" text-xl "
                icon={peopleCircleOutline}
              ></IonIcon>
              <li className="text-xl md:text-base">Hire Pros</li>
            </div>

            <div className="flex items-center gap-x-2 py-3 md:py-0">
              <IonIcon className="text-2xl" icon={trendingUpOutline}></IonIcon>
              <li className="text-xl md:text-base">Trending</li>
            </div>

            <div className="flex items-center gap-x-2 py-3 md:py-0">
              <IonIcon className="text-2xl" icon={helpCircleOutline}></IonIcon>
              <li className="text-xl md:text-base">Questions</li>
            </div>
            <div className="flex items-center gap-x-2 py-3 md:py-0">
              <IonIcon className="text-xl" icon={trailSignOutline}></IonIcon>
              <li className="text-xl md:text-base">Requirment</li>
            </div>
          </ul>
        </div>
      )}

<Main post={post} setPost={setPost} />

    </>
  );
};

export default Home;
