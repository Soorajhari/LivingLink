import { createSlice,PayloadAction } from "@reduxjs/toolkit";


export interface Login{
  loading:boolean,
  userLogin:{
    firstName:string,
    email:string,
    role:string,
    id:string,
   
  },
  error:boolean
}


const initialState: Login = {
  loading: false,
  userLogin: {
    firstName:"",
    email: "",
    role: "",
    id:"",
  
  },
  // success: false,

  error: false,
};

const authLogin = createSlice({
  name: "authLogin",
  initialState,
  reducers: {
    setLoading: (state, action:PayloadAction <boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action:PayloadAction <boolean>) => {
      state.error = action.payload;
    },
    signInData: (state, action) => {
      // const LoginInfo={
      //   ...state.userLogin,
      //   ...action.payload.userLogin
        
      // }
      state.userLogin = action.payload
     
    
    },
  },
});

export const { setLoading, setError, signInData } = authLogin.actions;

export default authLogin.reducer;
