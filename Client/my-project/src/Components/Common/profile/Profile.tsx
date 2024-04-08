import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import {Link} from 'react-router-dom'

import {
  settingsOutline,
  bagOutline,
  homeOutline,
  calendarNumberOutline,
  locationOutline,
  walletOutline,
} from "ionicons/icons";
import Post from "./Post";
import Requirment from "./Requirment";
import About from "./About";
import Logout from "./Logout";

const Profile = () => {

  const [content, setContent] = useState("posts");
  const[modal,setModal]=useState(false)
  return (
    <div className={`${modal?`   blur-[-30px] opacity-75`:`bg-[#ffff]`}`}>


    <div className={`mt-20 font-[Ubuntu]  w-[60%] mx-auto `}>
      <div className="flex space-x-28 ">
        <div className="w-[180px] h-[180px]  ">
          <img
            src={require("../../Assets/images/IMG_20221212_195813_456.jpg")}
            className="rounded-full"
            alt="profile"
          />
        </div>
        <div>
          <div className="flex  gap-x-10">
            <p className="text-2xl font-base mt-2">Sooraj Hari</p>
            <Link  to={"/edit-profile"}>
            <button className="p-1.5 bg-gray-200 text-lg text-black font-semibold shadow-md w-[120px] rounded-lg">
              Edit Profile
            </button>
            </Link>
            <IonIcon onClick={()=>{setModal(!modal)}} className="text-3xl mt-1" icon={settingsOutline}></IonIcon>
          </div>
          {modal && <Logout/>}
          <div className="flex gap-7 mt-5">
            <p className="text-lg text-black font-medium">
              51 <span className="font-light">posts</span>
            </p>
            <p className="text-lg text-black font-medium">
              500 <span className="font-light">followers</span>
            </p>
            <p className="text-lg text-black font-medium">
              590 <span className="font-light">following</span>
            </p>
          </div>
          <div className="flex mt-3 gap-3">
            <IonIcon className="text-xl mt-1 " icon={bagOutline}></IonIcon>
            <p className="text-lg ">Civil Engineer</p>
          </div>
          <div className="flex mt-3 gap-4">
            <div className="flex  gap-x-3">
              <IonIcon className="text-xl mt-1" icon={homeOutline}></IonIcon>
              <p className="text-lg">Service Provider</p>
            </div>
            <div className="flex gap-x-3">
              <IonIcon
                className="text-xl mt-1"
                icon={calendarNumberOutline}
              ></IonIcon>
              <p className="text-lg">1 year</p>
            </div>
            <div className="flex  gap-x-3">
              <IonIcon
                className="text-xl mt-1"
                icon={locationOutline}
              ></IonIcon>
              <p className="text-lg">Alappuzha</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="bg-gray-500 mt-16" />
      {content === "requirment" && (
        <hr className="w-[60px] border-black h-[5px] m-auto" />
      )}
      {content === "posts" && (
        <hr className="w-[60px] border-black h-[5px] ml-[400px]" />
      )}
      {content === "about" && (
        <hr className="w-[60px] border-black h-[5px] ml-[680px]" />
      )}

      <div className="flex gap-x-12 justify-center">
        <p
          className="text-xl text-black font-medium cursor-pointer"
          onClick={() => {
            setContent("posts");
          }}
        >
          Posts
        </p>
        <p
          className="text-xl text-black font-medium cursor-pointer"
          onClick={() => {
            setContent("requirment");
          }}
        >
          Requirments
        </p>
        <p
          className="text-xl text-black font-medium cursor-pointer"
          onClick={() => {
            setContent("about");
          }}
        >
          About
        </p>
      </div>

      {content == "posts" && <Post />}
      {content == "requirment" && <Requirment />}
      {content == "about" && <About />}
    </div>
    </div>
  );
};

export default Profile;
