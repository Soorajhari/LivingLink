import {configureStore} from '@reduxjs/toolkit'
import authReducer from "./userDetails"
import Logindetails from "./userLogin"

const store= configureStore({
    reducer:{
        authSlice:authReducer,
        authLogin:Logindetails
    }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store