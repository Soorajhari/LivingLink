import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import instance from "../../../Utils/axios";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Spin from "./Spin";
import "react-toastify/dist/ReactToastify.css";
interface UserData {
  id?: string;
  lastName: string;
  email: string;
  mobile: number;
  role: string;
  firstName: string;
}
interface useData {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: number;
  role?: string;
  _id?: string;
  profileImage?: string | null;
}

const Edit = () => {
  const [click, setClick] = useState<boolean>(false);
  const [user, setUser] = useState<useData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(user?.profileImage);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
    setClick(false);
  };

  const userDataJSON = localStorage.getItem("userDetails");
  const userData: UserData | null = userDataJSON
    ? JSON.parse(userDataJSON)
    : null;
  console.log(userData);

  const body = {
    id: userData?.id,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/user-profile?id=${userData?.id}`);
        console.log(response);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, []);
  console.log(file);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value?.toString() || "",
    }));
  };
  console.log(user);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!user) {
      console.error("User data is missing.");
      return;
    }
  
    const formData = new FormData();
    formData.append("firstName", user.firstName || "");
    formData.append("lastName", user.lastName || "");
    formData.append("id", user._id || "");
    
    if (file) {
      formData.append("file", file);
    }
  
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/upload-profile",
        formData
      );
      setTimeout(() => {
        setLoading(false); 
      }, 1000);

      if (response.data.status === "ok") {
        toast.success("Profile Updated successful!", {
          position: "top-right",
          style: {
            width: "400px", 
          },
        });
      }
      
      
   
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  

  return (
    <div
      className={`mt-20  ${
        click
          ? "z-40 bg-gray-200  bg-opacity-50 backdrop-filter backdrop-blur-sm"
          : ""
      }`}
    >
      <div
        className={`w-[85%] md:w-[75%] lg:w-[45%] mx-auto font-[Ubuntu] relative `}
      >
        <p className="text-3xl font-medium text-black">Edit Profile</p>
        <hr className="border-gray-400 mt-10" />

        <div className="flex mt-10 gap-x-14">
          {file || user?.profileImage ? (
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : user && user.profileImage
                  ? `http://localhost:4000/${user.profileImage.replace(
                      "src\\public\\",
                      ""
                    )}`
                  : "fallback-url"
              }
              className="rounded-full w-[100px] h-[100px] md:ml-20 object-cover"
              alt="profile"
            />
          ) : (
            <img
              src={require("../../Assets/images/150-1503945_transparent-user-png-default-user-image-png-png.png")}
              className="rounded-full w-[100px] h-[100px]   md:ml-20"
              alt="profile"
            />
          )}

          <div className="flex-col mt-2">
            <p className=" text-2xl md:text-base font-medium text-black">
              {user?.firstName} {user?.lastName}
            </p>
            <p
              className="text-blue-500 text-sm  md:text-lg font-semibold cursor-pointer"
              onClick={() => setClick(true)}
            >
              Change your profile photo
            </p>
          </div>
        </div>
        <div className="mt-10 ml-0 md:ml-16">
          <div className=" block md:flex gap-x-0 md:gap-x-10 ">
            <p className="text-base md:text-xl font-semibold ">First Name</p>

            <input
              className="border border-gray-400 bg-gray-100 w-[280px] rounded-md md:w-[350px] h-[40px]  mt-2 md:mt-0 px-2"
              type="text"
              value={user?.firstName}
              name="firstName"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="block md:flex gap-x-10 mt-5">
            <p className="text-base md:text-xl font-semibold ">Last Name</p>
            <input
              className="border border-gray-400 bg-gray-100 w-[280px] md:w-[350px] h-[40px] rounded-md  mt-2 md:mt-0 px-2"
              type="text"
              value={user?.lastName}
              onChange={(e) => handleChange(e)}
              name="lastName"
            />
            <div
              className={`absolute z-50 ${
                click ? "blur-0" : ""
              } flex justify-center`}
            >
              {click && (
                <Modal setClick={setClick} onFileChange={handleFileChange} />
              )}
            </div>
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
          <button
  className={`w-[280px] p-2 rounded-3xl bg-[#3981b6] 
  shadow-lg text-white text-xl font-medium relative`}
  onClick={(e) => handleSubmit(e)}
  disabled={!file || !user}
>
  {loading && <Spin  />}
  {loading ? "Saving..." : "Save"} 
</button>



          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Edit;
