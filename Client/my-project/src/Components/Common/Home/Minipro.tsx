import React from "react";
import { IonIcon } from '@ionic/react';
import {bagOutline,homeOutline,locateOutline,bookmarkOutline} from 'ionicons/icons';
const Minipro = () => {
  return (
    <>
      <div className="bg-[#ffff] absolute top-0 font-[Ubuntu] md:static  w-full md:w-[280px] lg:w-[300px] m-3 ml-0 md:ml-3  mt-10 rounded-3xl h-[360px] md:h-[450px] shadow-md">
        <div className="relative ">
          <img
            src={require("../../Assets/images/shanghai-aerial-sunset.jpg")}
            alt="background"
            className="h-[120px] w-full rounded-lg"
          />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-[-45px]">
            <img
              src={require("../../Assets/images/IMG_20221212_195813_456.jpg")}
              alt="profile"
              className="rounded-full w-[90px] h-[90px] border-2 border-white"
            />
          </div>
        </div>
        <div className="mt-14 flex justify-center font-semibold text-xl">
          <h5>Sooraj Hari</h5>
        </div>
        <div className="flex md:block justify-center gap-4 md:gap-0">
        <div className="flex gap-x-3 justify-center mt-3">
          <div className="flex gap-2 md:gap-1">
            <IonIcon className="text-base" icon={bagOutline}></IonIcon>
            <h6 className=" text-sm">Civil Engineer</h6>
          </div>

          <div className="flex gap-2 md:gap-1">
            <IonIcon className="text-base" icon={homeOutline}></IonIcon>
            <h6 className=" text-sm">Self-Employed</h6>
          </div>
          
        </div>
        <div className="flex justify-center mt-2 gap-2 md:gap-0">
          <IonIcon  className="text-base" icon={locateOutline}></IonIcon>
          <h6 className=" text-sm">Alappuzha</h6>
        </div>
        </div>
        <hr className="mt-3" />
        <div className="mx-5 flex justify-center md:justify-normal md:block gap-x-5 md:gap-0 font-semibold text-gray-600">
          <div className="flex justify-start gap-x-3 md:justify-between mt-2">
            <p>Followers</p>
            <p>30</p>
          </div>
          <div className="flex justify-start gap-x-3  md:justify-between mt-2">
            <p>Following</p>
            <p>50</p>
          </div>
          <div className="flex justify-start gap-x-3  md:justify-between mt-2">
            <p>Posts</p>
            <p>10</p>
          </div>
        </div>
        <hr className="mt-3" />
        <div className="font-semibold flex justify-center md:justify-normal ml-3 gap-2 md:gap-4 mt-4">
          <IonIcon icon={bookmarkOutline}></IonIcon>
          <p className="text-sm">my items</p>
        </div>
      </div>
    </>
  );
};

export default Minipro;
