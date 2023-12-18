import React from "react";

const Edit = () => {
  return (
    <div className="mt-20">
      <div className=" w-[85%] md:w-[75%] lg:w-[45%] mx-auto font-[Ubuntu]">
        <p className="text-3xl font-medium text-black">Edit Profile</p>
        <hr className="border-gray-200 mt-10" />

        <div className="flex mt-10 gap-x-14">
          <img
            src={require("../../Assets/images/IMG_20221212_195813_456.jpg")}
            className="rounded-full w-[80px] h-[80px]   md:ml-20"
            alt="profile"
          />
          <div className="flex-col mt-2">
            <p className=" text-xl md:text-base font-medium text-black">
              Sooraj Hari
            </p>
            <p className="text-blue-500 text-sm  md:text-lg font-semibold cursor-pointer">
              Change your profile photo
            </p>
          </div>
        </div>
        <div className="mt-10 ml-0 md:ml-16">
          <div className=" block md:flex gap-x-0 md:gap-x-10 ">
            <p className="text-base md:text-xl font-semibold ">First Name</p>

            <input
              className="border border-gray-400 bg-gray-100 w-[280px] rounded-md md:w-[350px] h-[40px]  mt-2 md:mt-0"
              type="text"
            />
          </div>
          <div className="block md:flex gap-x-10 mt-5">
            <p className="text-base md:text-xl font-semibold ">Last Name</p>
            <input
              className="border border-gray-400 bg-gray-100 w-[280px] md:w-[350px] h-[40px] rounded-md  mt-2 md:mt-0"
              type="text"
            />
          </div>
          <div className=" block md:flex gap-x-10 mt-5 ml-0 md:ml-[48px]">
            <p className="ext-base md:text-xl font-semibold  ">Email</p>
            <input
              className="border border-gray-400 bg-gray-100 w-[280px] md:w-[350px] h-[40px] rounded-md  mt-2 md:mt-0"
              type="text"
            />
          </div>
          <div className="block md:flex gap-x-10 mt-5">
            <p className="ext-base md:text-xl font-semibold ml-0 md:ml-[64px] ">
              Job
            </p>
            <input
              className="border border-gray-400 bg-gray-100 w-[280px] md:w-[350px] h-[40px] rounded-md  mt-2 md:mt-0"
              type="text"
            />
          </div>
          <div className=" block md:flex gap-x-10 mt-5">
            <p className="ext-base md:text-xl font-semibold ml-0 md:ml-[67px] ">
              Bio
            </p>
            <input
              className="border border-gray-400 bg-gray-100 w-[280px] md:w-[350px] h-[100px] rounded-md  mt-2 md:mt-0"
              type="text"
            />
          </div>

          <div className="flex ml-40 mt-10">
            <button className="w-[280px] p-2 rounded-3xl bg-[#3981b6] shadow-lg text-white text-xl font-medium">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
