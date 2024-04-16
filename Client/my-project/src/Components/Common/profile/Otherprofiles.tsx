import React, { ChangeEvent, useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../Redux/hook";
import store from "../../../Redux/store";
import {
  settingsOutline,
  bagOutline,
  homeOutline,
  calendarNumberOutline,
  locationOutline,
  walletOutline,
  personRemoveOutline,
} from "ionicons/icons";
import Post from "./Post";
import Requirment from "./Requirment";
import About from "./About";
import Logout from "./Logout";
import Loader from "./loader";
import instance from "../../../Utils/axios";
import Unfollow from "./Unfollow";
import useFetch from "../../../hooks/useFetch";
import { ProfileData } from "../../../Redux/ProfileDetails";
import { error } from "console";
import { useNavigate } from "react-router-dom";

interface UserData {
  id?: string;
}
interface Item {
  _id?: string;
}

interface followData {
  followers: string[]; 
  following: string[];
}

const Otherprofiles = () => {
  const navigate=useNavigate()
  const { handleGet } = useFetch();
  const [content, setContent] = useState("posts");
  const [data, setData] = useState<Item[]>([]);
  const [count, setCount] = useState<followData>();
  const [modal, setModal] = useState(false);
  const [unfollow, setUnfollow] = useState(false);
  const [follow, setFollow] = useState(false);
  const profileInfo = useAppSelector((state) => state.ProfileData);
  console.log(profileInfo);

  const dispatch = useAppDispatch();
  const userDataJSON = localStorage.getItem("userDetails");
  const userData: UserData | null = userDataJSON
    ? JSON.parse(userDataJSON)
    : null;
  console.log(userData?.id);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    userId: string | undefined
  ) => {
    e.preventDefault();
    try {
      const response = await instance.post(`/follow`, {
        userid: userId,
        profileId: userData?.id,
      });
      if (response.data.status == "ok") {
        setFollow(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await instance.get(`/follow-data?q=${profileInfo.user?._id}`);
        console.log(response.data.user);
        if(response.data.user.followers.length>0){
          setFollow(true)
          setCount(response.data.user)
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  },[])



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/user-data`);
        console.log(response.data);
        setData(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  // const id=profileInfo.user?._id
  const handleUnfollow = async (id: string | undefined) => {
    try {
      const response = await instance.post("/unfollow", {
        userId: id,
        profileId: userData?.id,
      });
      console.log(response.data);
      if(response.data.status=="ok"){
        setUnfollow(false)
        setFollow(false)
      }
    } catch (error) {
      console.log(error);
    }
  };


const handleMessage= async(e: React.MouseEvent<HTMLButtonElement>, senderId: string|undefined)=>{
  e.preventDefault()
try{
const response= await instance.post("/chat",{senderId:senderId,userId:userData?.id})
console.log(response.data)
if(response.data.status=="ok"){
navigate("/message")
}

}catch(error){
  console.log(error)
}
  }

  return (
    <div
      className={`${
        modal ? `   blur-[-30px] opacity-75` : `bg-[#ffff]`
      } relative`}
    >
      {profileInfo.loading ? (
        <Loader />
      ) : (
        <div className={`mt-20 font-[Ubuntu]  w-[60%] mx-auto `}>
          <div className="flex space-x-28 ">
            {/* {data.map((item)=> */}
            {/* <div> */}
            <div className="w-[180px] h-[180px] ">
              <img
                src={require("../../Assets/images/IMG_20221212_195813_456.jpg")}
                className="rounded-full"
                alt="profile"
              />
            </div>
            <div>
              <div className="flex  gap-x-10">
                <p className="text-2xl font-base mt-2">
                  {profileInfo?.user?.firstName} {profileInfo.user?.lastName}
                </p>

                {profileInfo.user?._id === userData?.id && (
                  <Link to={"/edit-profile"}>
                    <button className="p-1.5 bg-gray-200 text-lg text-black font-semibold shadow-md w-[120px] rounded-lg">
                      Edit Profile
                    </button>
                  </Link>
                )}
                {follow ? (
                  <button
                    className="p-1.5 hover:scale-125 bg-gray-200 text-lg text-black font-semibold shadow-md w-[120px] rounded-lg"
                    onClick={() => setUnfollow(true)}
                  >
                    following
                  </button>
                ) : (
                  <button
                    className="p-1.5 hover:scale-125 bg-gray-200 text-lg text-black font-semibold shadow-md w-[120px] rounded-lg"
                    onClick={(e) => handleClick(e, profileInfo.user?._id)}
                  >
                    follow
                  </button>
                )}
                {/* <Link to={"/message"}> */}
                  <button className="p-1.5 bg-gray-200 text-lg text-black font-semibold shadow-md w-[120px] rounded-lg" onClick={(e)=>handleMessage(e,profileInfo.user?._id)}>
                    Message  
                  </button>
                {/* </Link> */}
                <IonIcon
                  onClick={() => {
                    setModal(!modal);
                  }}
                  className="text-3xl mt-1"
                  icon={settingsOutline}
                ></IonIcon>
              </div>
              {modal && <Logout />}
              <div className="flex gap-7 mt-5">
                <p className="text-lg text-black font-medium">
                  {profileInfo.posts.length} <span className="font-light">posts</span>
                </p>
                <p className="text-lg text-black font-medium">
                  {count?.followers?.length} <span className="font-light">followers</span>
                </p>
                <p className="text-lg text-black font-medium">
                {count?.following?.length}  <span className="font-light">following</span>
                </p>
              </div>
              <div className="flex mt-3 gap-3">
                <IonIcon className="text-xl mt-1 " icon={bagOutline}></IonIcon>
                <p className="text-lg ">
                  {profileInfo.user?.subrole
                    ? profileInfo.user?.subrole
                    : profileInfo.user?.role}
                </p>
              </div>
              {unfollow && (
                <div className="absolute z-10 bg-red-400">
                  <Unfollow
                    setUnfollow={setUnfollow}
                    handleUnfollow={handleUnfollow}
                  />
                </div>
              )}
              <div className="flex mt-3 gap-4">
                <div className="flex  gap-x-3">
                  <IonIcon
                    className="text-xl mt-1"
                    icon={homeOutline}
                  ></IonIcon>
                  <p className="text-lg">{profileInfo.user?.role}</p>
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
            {/* </div> */}
            {/* )} */}
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
          {content == "about" && <About  />}
        </div>
      )}
    </div>
  );
};

export default Otherprofiles;
