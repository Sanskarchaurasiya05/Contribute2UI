import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice"
import profileReducer from "./Slices/ProfileSlice"
import jwtReducer from "./Slices/JwtSlice"
export default configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        jwt:jwtReducer
    }
})



