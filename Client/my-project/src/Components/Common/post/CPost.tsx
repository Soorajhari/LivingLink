import React, { useState, useRef, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../../Utils/axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppSelector } from "../../../Redux/hook";
import { postData } from "../../../Routes/routes";

// import Spin from "../Auth/Spin";

// import './style.css'

import { closeOutline, imagesOutline } from "ionicons/icons";
import Spin from "../Auth/Spin";
import { setLoading } from "../../../Redux/userLogin";
import { loadavg } from "os";
interface postProps {
  post: boolean;
  setPost: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<any>>;
}

const CPost = (props: postProps) => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string | number>("");
  const [file, setFile] = useState<Blob | string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [Loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const userInfo = useAppSelector((state) => state.authLogin.userLogin);
  console.log(userInfo.id);
  console.log(value);
  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  
  console.log(videoPreview);
  const body = {
    text: value,
    file: file,
    id: userInfo.id,

  };

  const fetchData = async () => {
    try {
      const response = await instance.get(postData);
      props.setData(response.data.Data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async (e: React.FormEvent) => {
    try {
      setLoading(true);

      e.preventDefault();
      const response = await instance.post("/post", body);
      setTimeout(() => {
        setLoading(false);
      }, 1500);

      if (response.data.status == "ok") {
        fetchData();
        props.setPost(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isButtonDisabled = !value && !file;
  return (
    <div className="w-full h-ful z-20 absolute left-0 top-0 font-[ubuntu]  ">
      <div className="flex justify-center min-h-screen  items-center shadow-2xl">
        <div className="w-[600px] h-[680px] bg-[#ffff]    flex flex-col fixed  rounded-xl">
          <div className="flex justify-center ">
            <h3 className="mt-5 text-2xl font-semibold text-black ml-auto">
              Create Post
            </h3>
            <IonIcon
              onClick={() => {
                props.setPost(false);
              }}
              className="text-3xl bg-gray-300 rounded-3xl ml-auto mt-5 mr-3 cursor-pointer"
              icon={closeOutline}
            ></IonIcon>
          </div>
          <hr className="border border-gray-200 mt-4" />

          <div className="flex gap-x-5  w-[50px] h-[50px] mt-7">
            <img
              src={require("../../Assets/images/IMG_20221212_195813_456.jpg")}
              className="rounded-full ml-5"
              alt="profile"
            />
            <p className="font-semibold text-xl">SoorajHari </p>
          </div>
          <div className=" ">
            <div className="p-4 flex justify-center">
              <input
                className="border border-gray-100 bg-gray-100 w-[550px]  h-[100px] rounded-md pl-2 mt-2 md:mt-0"
                type="text"
                placeholder="  What do you want to talk about ?"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-center">
              <div className="flex justify-center overflow-y-scroll  border border-gray-100 items-center relative  w-[550px]  h-[300px] bg-gray-100 hover:bg-gray-200 ">
                {imagePreview && (
                  <div className="">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className=" top-0 left-0 absolute object-cover w-[550px]"
                    />
                    <IonIcon
                      onClick={() => {
                        setImagePreview(null);
                        setFile(null);
                      }}
                      className="absolute z-20 right-0 top-0 cursor-pointer text-[40px]"
                      icon={closeOutline}
                    ></IonIcon>
                  </div>
                )}
                {/* <div className="z-10 absolute"> */}

                {/* </div> */}
                {videoPreview && (
                  <div>
                    <video controls>
                      <source
                        src={videoPreview}
                        type="video/mp4"
                        className=" top-0 left-0 absolute object-cover w-[550px]"
                      />
                      Your browser does not support the video tag
                    </video>
                    <IonIcon
                      onClick={() => {
                        setVideoPreview(null);
                        setFile(null);
                      }}
                      className="absolute z-20 right-0 top-0 cursor-pointer text-[40px]"
                      icon={closeOutline}
                    ></IonIcon>
                  </div>
                )}
                <div className="flex flex-col">
                  <input
                    ref={inputRef}
                    className="hidden"
                    type="file"
                    name=""
                    id=""
                    accept=".jpg, .jpeg, .png, .mp4, .avi, .mov, .mkv"
                    onChange={(e) => {
                      const fileList = e.target.files;
                      console.log(fileList);

                      if (fileList && fileList.length > 0) {
                        const selectedFile = fileList[0];
                        const isImage = selectedFile.type.startsWith("image/");
                        const isVideo = selectedFile.type.startsWith("video/");

                        if (isImage) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setImagePreview(reader.result as string);
                            setFile(reader.result as string);
                          };
                          reader.readAsDataURL(selectedFile);
                        } else if (isVideo) {
                          setFile(selectedFile);
                          const reader = new FileReader();

                          reader.onloadend = () => {
                            setVideoPreview(reader.result as string);
                            setFile(reader.result as string);
                          };

                          reader.readAsDataURL(selectedFile);
                        }
                      } else {
                        setFile(null);
                        setImagePreview(null);
                      }
                    }}
                  />
                  <div
                    onClick={handleIconClick}
                    className={`cursor-pointer text-center ${
                      file ? "hidden" : ""
                    }`}
                  >
                    <IonIcon
                      className="text-4xl"
                      icon={imagesOutline}
                    ></IonIcon>
                    <p className="flex justify-center text-xl font-semibold">
                      Add photos/videos{" "}
                    </p>
                    <p> or drag and drop</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-center absolute left-6  bottom-3  ">
              <button
                className={`rounded-2xl text-[23px] p-3 w-[550px] ${
                  isButtonDisabled
                    ? "bg-gray-200 cursor-not-allowed font-extralight text-gray-600"
                    : "bg-[#3981b6] cursor-pointer font-semibold text-black"
                } text-xl `}
                onClick={(e) => {
                  handleClick(e);
                }}
                disabled={isButtonDisabled}
              >
                {Loading ? <Spin /> : "post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPost;
