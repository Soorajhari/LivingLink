import React, { useState } from "react";
import { sendOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";


interface CommentType{
    setComment: React.Dispatch<React.SetStateAction<string|number>>;
    comment:string|number
}
const Comment = ({setComment,comment}:CommentType) => {
    console.log(comment)
  return (
    <div className="bg-[#ffff] min-h-[100px] w-[100%]">
      <div className="flex gap-x-5">
        <textarea
          className=" shadow-lg mt-4 w-[80%]  rounded-full p-2 outline-none ml-[5rem]"
          placeholder="Add a Comment" 
           value={comment} 
           onChange={(e) => setComment(e.target.value)}
        >

        </textarea>
     

        <IonIcon className="w-[30px] h-[40px] mt-6 " icon={sendOutline}></IonIcon>
      </div>
      <div className="flex  justify-between mt-8 ">
        <div className="p-2">
          <img
            src={require("../../Assets/images/IMG_20221212_195813_456.jpg")}
            className="w-[50px] h-[50px] rounded-full"
            alt="img"
          />
        </div>
        <div className="bg-gray-300 w-[85%] mr-3 p-2 mb-4 rounded-xl shadow-md">
          <h4 className="font-semibold text-lg">Sooraj Hari</h4>
          <h5 className="font-light text-sm">Service Provideer</h5>
          <p className="mt-3">hi guys hello how are you</p>
        </div>
      </div>
     
    </div>
  );
};

export default Comment;
