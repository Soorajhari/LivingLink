import React from "react";
import { useAppSelector } from "../../../Redux/hook";

const Post = () => {
  const profileInfo = useAppSelector((state) => state.ProfileData);
  console.log(profileInfo);
  return (
    <div>
    <div className="flex font-[Ubuntu] flex-wrap mt-2">
      {profileInfo.posts.map((item) => (
        <img
          key={item._id}
          className="w-[350px] h-[400px] p-2"
          src={item.Url}
          alt=""
        />
      ))}
    </div>
  </div>
  
  );
};

export default Post;
