import { createSlice } from "@reduxjs/toolkit";
import { getItem, removeItem, setItem } from "../Services/LocalStorageService";

const jwtSlice=createSlice({
    name:"jwt",
    initialState:localStorage.getItem("token")||"",
    reducers:{
        setjwt:(state,action)=>{
            localStorage.setItem("token",action.payload);
            state=action.payload;
            return state;
        },
        removejwt:(state)=>{
            removeItem("token");
            state="";
            return state;
        }
    }
});

export const {setjwt,removejwt}=jwtSlice.actions;
export default jwtSlice.reducer;