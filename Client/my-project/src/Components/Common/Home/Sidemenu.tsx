// import React from "react";
import React, { useState, useEffect } from 'react'
import Footer from "./Footer";

import { IonIcon } from '@ionic/react';
import {locateOutline,walletOutline,albumsOutline} from 'ionicons/icons';

const Sidemenu = () => {

      const [isDesktop, setDesktop] = useState(window.innerWidth > 768);
    
      const updateScreenSize = () => {
        setDesktop(window.innerWidth > 768);
      };
    
      useEffect(() => {
        window.addEventListener("resize", updateScreenSize);
        return () => window.removeEventListener("resize", updateScreenSize);
      }, []);
    
    
    

  return (
    <div className="font-[Ubuntu]">
      <div className="bg-[#ffff]  w-[380px] ml-9 mt-10 rounded-3xl h-[350px] hidden lg:block shadow-sm">
        <div className="ml-4  ">
          <h4 className="font-semibold text-xl">Requirements</h4>
        </div>
        <div className="bg-[#FAFAFA] shadow-lg m-4 rounded-sm p-3">
          <div className="">
            <h4>WORK TIMELINE:Immediately</h4>
            <h4>SERVICE REQUIRED:kitchen based work</h4>
            <p className="mt-2 text-xs font-semibold text-gray-500">
              Posted by rej pvk.Home owner
            </p>
          </div>

          <div className="flex font-semibold mt-3 gap-x-2">
            <IonIcon icon={locateOutline}></IonIcon>
            <p className="text-sm text-gray-500">Alappuzha Kerala</p>
          </div>
          <div className="flex justify-between mt-2 font-semibold">
            <div className="flex gap-x-2">
              <IonIcon icon={walletOutline}></IonIcon>
              <p className="text-sm text-gray-500">Budget not available</p>
            </div>
            <div className="font-semibold text-gray-500">
              <p>3h</p>
            </div>
          </div>
          <hr />
          <div className="flex justify-center items-center p-2 gap-x-2">
            <IonIcon className="text-blue-500" icon={albumsOutline}></IonIcon>
            <p className="text-md font-semibold">4 intrested</p>
          </div>
        </div>
      </div>
      <div>
    
      </div>
      {isDesktop && <Footer />}
        
    </div>
  );
};

export default Sidemenu;
