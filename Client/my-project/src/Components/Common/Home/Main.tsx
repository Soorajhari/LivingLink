import React, { useState, useEffect } from "react";
import Minipro from "./Minipro";
import Sidemenu from "./Sidemenu";
import Footer from "./Footer";
import Location from "../Auth/Location";
import { IonIcon } from "@ionic/react";
import {
  shareSocialOutline,
  heartOutline,
  ellipsisHorizontal,
} from "ionicons/icons";
import CPost from "../post/CPost";
import instance from "../../../Utils/axios";
import { postData } from "../../../Routes/routes";

interface MainProps {
  post: boolean;
  setPost: React.Dispatch<React.SetStateAction<boolean>>;
}

const Main = (props: MainProps) => {
  const [isDesktop, setDesktop] = useState(window.innerWidth < 768);
  const [isData, setData] = useState<any[]>([]);

  const updateScreenSize = () => {
    setDesktop(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await instance.get(postData);
      console.log(response.data.Data);
      setData(response.data.Data);
    };
    fetchData();
  }, []);

  return (
    <>
      {props.post && <CPost {...props} />}
      <div
        className={` ${
          props.post ? "blur-sm" : "bg-custom-gray "
        }  font-[Ubuntu]`}
      >
        <Location />
        <main className=" h-full flex justify-center w-full relative">
          <Minipro />
        
          <div className=" w-full md:w-[65%] space-y-9  lg:w-[42%]  h-full  shadow-lg mt-80 md:mt-10 rounded-2xl mr:0 md:mr-4 ">
              {isData.map((item) => (
                  <div
                  className={` ${
                    props.post ? "overflow-hidden" : ""
                  }     bg-[#ffff]  `}
                >
                <div className=" ">
            <div className="flex gap-x-1   p-4 ">
              <div className="flex ">
                <img
                  className="rounded-full w-[65px]  h-[65px] shrink-0"
                  src={require("../../Assets/images/IMG_20221212_195813_456.jpg")}
                  alt="profile"
                />
              </div>

              <div className="mt-3 ">
                <h5 className="text-xl font-semibold px-4">{item.user.firstName}</h5>
                <div className="flex gap-2 px-4">
                  <p className="text-gray-500 font-semibold">{item.user.subrole ? item.user.subrole:item.user.role}</p>
                  <p>Alappuzha</p>
                </div>
              </div>
              <div className="text-right px-2 grow">
                <IonIcon
                  className="w-[30px] h-[40px] "
                  icon={ellipsisHorizontal}
                ></IonIcon>
              </div>
            </div>

           
              <>
                <div className="" key={item._id}>
                  {item?.Url.includes(".mp4") ? (
                    <video
                      className="w-full h-[500px] md:h-[550px] lg:h-[600px] mt-5 object-contain"
                      controls
                    >
                      <source src={item?.Url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      className="w-full h-[500px] md:h-[550px] lg:h-[600px] mt-5 object-contain"
                      src={item?.Url}
                      alt="home"
                    />
                  )}
                </div>

                <div className=" ">
                  <div className=" w-[93%] mx-auto flex  items-center py-4 gap-x-10">
                    <div className="flex gap-1">
                      <IonIcon
                        className="w-[30px] h-[30px]"
                        icon={heartOutline}
                      ></IonIcon>
                      <p className="text-xl">220</p>
                    </div>
                    <div className="flex gap-9">
                      <IonIcon
                        className="w-[30px] h-[30px] "
                        icon={shareSocialOutline}
                      ></IonIcon>
                    </div>

                    <div className="grow flex justify-end md:gap-x-6 gap-x-4">
                      <div className="border-2 border-black rounded-full md:px-5 px-3 py-0.5">
                        <button className=" text-black bg-white md:text-base text-xs font-meduim">
                          See Similar
                        </button>
                      </div>
                      <div className="border-2 border-white bg-black md:px-7 px-4 md:py-0.5  rounded-full">
                        <button className="text-white bg-black">save</button>
                      </div>
                    </div>
                  </div>
                  {/* } */}

                  <p className="p-3">{item?.text}</p>
                </div>
              </>
              </div>
      
          </div>
         
             ))}
             </div>
          <Sidemenu />
        </main>
        {isDesktop && <Footer />}
      </div>
    </>
  );
};

export default Main;
