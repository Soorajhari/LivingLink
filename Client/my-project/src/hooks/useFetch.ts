import React, { useState, useEffect, MouseEvent } from "react";
import instance from "../Utils/axios";
import { useNavigate } from "react-router-dom";
import { setLoading, setError, ProfileData } from "../Redux/ProfileDetails";
import { useAppDispatch, useAppSelector } from "../Redux/hook";
import { Dispatch } from "redux";


interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: number;
  password: string;
  role: string;
  subrole: string;
  followers:[],
  following:[]
}

interface Data {
  _id: string;
  user: User;
  text: string;
  Url: string;
  __v: number;
}
const useFetch = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState<Data | null>(null);
  // const [error, setError] = useState<string|null>(null);
  const [value, setValue] = useState<string>("");

  const Profile = (id: string) => async (dispatch: Dispatch) => {
    let loadingTimer: ReturnType<typeof setTimeout> | null = null;
    dispatch(setLoading(true));
    try {
      const response = await instance.get(`/profile-user?q=${id}`);
      console.log(response.data);
      return response.data.responseData;
    } catch (error) {
      console.log(error);
      dispatch(setError(true));
    } finally {
        loadingTimer = setTimeout(() => {
            dispatch(setLoading(false));
          }, 3000);
    }
  };

  const handleGet = async (e: MouseEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();

    try {
      const response = await dispatch(Profile(id));
      console.log(response);
      dispatch(
        ProfileData({
          loading: false, 
          user: {
            _id: response._id,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            mobile: response.mobile,
            role: response.role,
            subrole: response.subrole,
            followers:response.followers,
            following:response.following,

          },
         
          posts: response.posts, 
          error: false, 
        })
      );
      

      navigate("/other-profiles");
      if (response.status === "ok") {
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } 
    
  };

  const profileInfo = useAppSelector((state) => state.ProfileData);
  console.log(profileInfo);

  return {
    handleGet,
    data,
  };
};

export default useFetch;
