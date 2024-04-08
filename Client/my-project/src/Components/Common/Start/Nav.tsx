import React, { useState, useEffect } from "react";
import instance from "../../../Utils/axios";
import useFetch from "../../../hooks/useFetch";

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

interface UserData {
  firstName: string;
  lastName: string;
  role: string;
  subrole: string;
  _id: string;
}

const Home = () => {

 const {handleGet}=useFetch()
  const [click, setClick] = useState<boolean>(false);
  const [post, setPost] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userDetailsString = localStorage.getItem("userDetails");
  let userData: any;
  
  if (userDetailsString !== null) {
    userData = JSON.parse(userDetailsString);
    console.log(userData)
  } else {
   
    console.error("User details not found in local storage.");
  }
  

  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleInputFocus = () => {
    setClick(true);
  };

  const [data, setData] = useState<UserData[]>([]);
  const [error, setError] = useState(null);
  const [value, setValue] = useState<string>();
  console.log(data);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/fetch-user?q=${value}`);
        console.log(response.data);
        setData(response.data.searchData);
      } catch (error){
        console.log(error);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      if (value?.trim()) {
        fetchData();
      } else {
        setData([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [value]);

  return (
    <>
      <nav className="bg-[#ffff] p-3 shadow-xl sticky top-0 z-10 font-[Ubuntu]">
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
            <div className="flex  flex-1 flex-col" >
            <input
              type="search"
              onFocus={handleInputFocus}
              className="rounded p-1.5 outline-none bg-white flex-1 border border-black"
              placeholder="Search Design and Products...."
              onChange={(e) => handleInputChange(e)}
            />
            <div className="absolute mt-1 right-3">
              <IonIcon
                icon={searchOutline}
                className="text-white text-3xl bg-black w-7 h-7 rounded flex items-center"
              ></IonIcon>
            </div>
            </div>
            {click && (
              <div className="absolute  top-10 z-20 left-0 w-[800px] shadow-lg">
                <div className="bg-[#ffff]  relative h-[500px] ">
                  <div></div>
                  <div className="">
                    {data && data.length > 0 ? (
                      <div className="flex flex-col cursor-pointer">
                        {data.map((item) => (
                          <div key={item._id} className="flex gap-x-4 p-3   hover:bg-gray-300"
                           onClick={(e)=>handleGet(e,item._id)}
                           >
                            <IonIcon
                              className="text-3xl mt-2"
                              icon={searchOutline}
                            ></IonIcon>
                            <div className="mt-2 flex gap-x-3 text-[22px] font-medium">
                              <h4>
                                {item?.firstName}
                                {item?.lastName}
                              </h4>
                              <p className="text-sm font-light mt-1 text-gray-500">
                                {item?.role},{item?.subrole}
                              </p>
                              <div className="w-[35px] h-[35px]">
                                <img
                                  className="rounded-full"
                                  src={require("../../Assets/images/IMG_20221212_195813_456.jpg")}
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="font-bold flex  items-center justify-center text-4xl">
                        No data available
                      </div>
                    )}
                  </div>
                  <div className="absolute right-0 top-0">
                    <IonIcon
                      onClick={() => setClick(false)}
                      className="text-4xl cursor-pointer"
                      icon={closeOutline}
                    ></IonIcon>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex  items-center gap-x-3">
            <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
              <IonIcon
                className="md:text-3xl text-2xl text-orange-500 cursor-pointer"
                icon={addCircleOutline}
                onClick={() => {
                  setPost(true);
                }}
              ></IonIcon>
            </div>

            <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
              { userData? (
                <Link to="/profile">
                  <span className="font-semibold text-lg lg:text-xl cursor-pointer">
                    {userData.firstName}
                  </span>
                </Link>
              ) : (
                <Link to={"/login"}>
                  <span className="font-semibold text-lg lg:text-xl cursor-pointer">
                    Login
                  </span>
                </Link>
              )}
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
            placeholder="Search Design and Products..."
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
