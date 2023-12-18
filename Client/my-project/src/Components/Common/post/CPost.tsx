import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { Link } from "react-router-dom";
import instance from "../../../Utils/axios";

import { closeOutline } from "ionicons/icons";

interface postProps {
  post: boolean;
  setPost: React.Dispatch<React.SetStateAction<boolean>>;
}


const CPost = (props: postProps) => {
  const [value, setValue] = useState<string | number>("");
  const[file,setFile]=useState<Blob|string>("")
  console.log(value)

  const body={
    text:value
  }
  const handleClick= async (e:React.FormEvent)=>{
 try{
  e.preventDefault()
  const formdata=new FormData()
formdata.append("file",file)
const response= await  instance.post("/post",body)
console.log(response)
 }catch(error){
  console.log(error)
 }
  }

  return (
    <div className="w-full h-ful  z-40 absolute left-0 top-0">
      <div className="flex justify-center min-h-screen  items-center shadow-2xl">
        <div className="w-[600px] h-[680px] bg-[#F1EFEF]  flex flex-col  rounded-xl">
          <div className="flex justify-center ">
            <h3 className="mt-5 text-2xl font-semibold text-black ml-auto">
              Create Post
            </h3>
            <IonIcon
              onClick={() => {
                props.setPost(false);
              }}
              className="text-3xl bg-gray-400 rounded-3xl ml-auto mt-5 mr-3 cursor-pointer"
              icon={closeOutline}
            ></IonIcon>
          </div>
          <hr className="border border-gray-600 mt-4" />

          <div className="flex gap-x-5  w-[50px] h-[50px] mt-7">
            <img
              src={require("../../Assets/images/IMG_20221212_195813_456.jpg")}
              className="rounded-full ml-5"
              alt="profile"
            />
            <p className="font-semibold text-xl">SoorajHari </p>
          </div>
          <div className="p-4 flex justify-center">
            <input
              className="border border-gray-400 bg-gray-100 w-[550px]  h-[100px] rounded-md  mt-2 md:mt-0"
              type="text"
              placeholder="  What do you want to talk about ?"
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center">
            <div className="flex justify-center  border border-gray-500 items-center  w-[550px]  h-[300px] bg-[#FFF6F6] ">
              <input className="" type="file" name="" id="" />
            </div>
          </div>

          <div className="mt-5 flex justify-center ">
            <button className=" rounded-2xl p-3 w-[550px]" onClick={(e)=>{handleClick(e)}}>post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPost;
