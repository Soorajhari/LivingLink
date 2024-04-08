import React from "react";
import { useAppSelector } from "../../../Redux/hook";



const About = () => {

  const profileInfo = useAppSelector((state) => state.ProfileData);
  console.log(profileInfo);
  return (
    <div>
      <div className="mt-8 font-[Ubuntu]">
        <p className="font-bold text-xl">{profileInfo.user?.role}</p>
        <p className="text-lg font-normal">{profileInfo.user?.subrole}</p>
      </div>
      <div className="mt-8">
        <p className="font-bold text-xl">Detail Address</p>
        <p className="text-lg font-normal">Alappuzha Kerala</p>
      </div>
      <div className="mt-8">
        <p className="font-bold text-xl">Email</p>
        <p className="text-lg font-normal">{profileInfo.user?.email}</p>
      </div>

      <div className="mt-8">
        <p className="font-bold text-xl">Mobile Number</p>
        <p className="text-lg font-normal">{profileInfo.user?.mobile}</p>
      </div>
    </div>
  );
};

export default About;
