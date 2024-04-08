import { createSlice,PayloadAction } from "@reduxjs/toolkit";

export interface User {
  loading: boolean;
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
    confirmPassword: string;
    role: string;
    subrole: string;
  };
  error: boolean;
}

const initialState: User = {
  loading: false,
  userInfo: {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    role: "",
    subrole: ""
  },
  error: false
};

// type  UserState ={
//   userInfo:User|null
// }
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action:PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action:PayloadAction<boolean>) => {
      state.error = action.payload 
    },
    signUpData: (state, action) => {
      // const updatedUserInfo = {
      //   ...state.userInfo,
      //   ...action.payload.userInfo,
      // };
    
      state.userInfo = action.payload
    }
  }
});

export const { setLoading, setError, signUpData } = authSlice.actions;

export default authSlice.reducer;
