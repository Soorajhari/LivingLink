import React from "react";
import { googleLogout } from "@react-oauth/google";

const Logout = () => {
  const handleLogout = async () => {
    localStorage.clear();
    googleLogout();
    window.location.href = "/login";
  };
  return (
<div className="fixed z-50 inset-0 flex items-center justify-center shadow-2xl ">
  <div className="border  border-gray-200 bg-[#efefef]  rounded-2xl w-[300px] h-[150px] flex flex-col justify-between items-center p-4">
    <p
      className="text-xl font-medium cursor-pointer"
      onClick={handleLogout}
    >
      Logout
    </p>
   
    <hr className="border-black w-full" />

    <p
      className="text-xl cursor-pointer font-medium"
      onClick={handleLogout}
    >
      Cancel
    </p>
  </div>
</div>


  );
};

export default Logout;
