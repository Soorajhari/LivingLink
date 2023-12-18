import React from "react";
import { IonIcon } from "@ionic/react";
import {
  settingsOutline,
  bagOutline,
  homeOutline,
  calendarNumberOutline,
  locationOutline,
  walletOutline,
} from "ionicons/icons";
const Requirment = () => {
  return (
    <div>
      <div className="mt-5 border font-[Ubuntu] border-gray-200 shadow-lg p-2 ">
        <p className="text-2xl text-black px-2">
          Home Construction required in 1-3 months
        </p>
        <p className="text-xl text-black px-2">Area:501-1000sqft..</p>
        <div className="mt-2">
          <div className="flex">
            <IonIcon
              className="text-xl mt-1 p-2 text-gray-500"
              icon={locationOutline}
            ></IonIcon>
            <p className="text-lg p-2 text-gray-500 font-semibold">Alappuzha</p>
          </div>
          <div className="flex">
            <IonIcon
              className="text-lg mt-1 p-2 text-gray-500"
              icon={walletOutline}
            ></IonIcon>
            <p className="text-lg p-2 text-gray-500 font-semibold">₹ 45000</p>
          </div>
        </div>
        <div className="border border-gray-200 p-2 ">
          <p className="cursor-pointer p-3  text-xl text-black font-medium">
            View Details
          </p>
        </div>
      </div>

      <div className="mt-5 border border-gray-200 shadow-lg p-2 ">
        <p className="text-2xl text-black px-2">
          Home Construction required in 1-3 months
        </p>
        <p className="text-xl text-black px-2">Area:501-1000sqft..</p>
        <div className="mt-2">
          <div className="flex">
            <IonIcon
              className="text-xl mt-1 p-2 text-gray-500"
              icon={locationOutline}
            ></IonIcon>
            <p className="text-lg p-2 text-gray-500 font-semibold">Alappuzha</p>
          </div>
          <div className="flex">
            <IonIcon
              className="text-lg mt-1 p-2 text-gray-500"
              icon={walletOutline}
            ></IonIcon>
            <p className="text-lg p-2 text-gray-500 font-semibold">₹ 45000</p>
          </div>
        </div>
        <div className="border border-gray-200 p-2 ">
          <p className="cursor-pointer p-3  text-xl text-black font-medium">
            View Details
          </p>
        </div>
      </div>
    </div>
  );
};

export default Requirment;
