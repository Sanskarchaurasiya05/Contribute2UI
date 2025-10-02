// import { createSlice } from "@reduxjs/toolkit";

// import { updateProfile } from "../Services/ProfileService";

// const profileSlice=createSlice({
//     name:"profile",
//     initialState:{},
//     reducers:{
//         changeProfile:(state,action)=>{
//             state=updateProfile(action.payload);
//             return action.payload;
//         },
//         setProfile:(state , action)=>{
//             state=action.payload;
//             return state;
//         }
//     }
// });

// export const {changeProfile,setProfile}=profileSlice.actions;
// export default profileSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "../Services/ProfileService";

// You may want a proper type for initialState, e.g. 'ProfileType'
const initialState = {};

// Approach 1: Return new state object from reducers
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // If updateProfile returns a new profile object to use as state:
    changeProfile: (state, action) => updateProfile(action.payload),

    // To set the entire state with the payload object:
    setProfile: (state, action) => action.payload
  }
});

/* 
// -- OR --
// Approach 2: Mutate draft state (useful for partial updates)
// const profileSlice = createSlice({
//   name: "profile",
//   initialState,
//   reducers: {
//     changeProfile: (state, action) => {
//       const updatedProfile = updateProfile(action.payload);
//       Object.assign(state, updatedProfile);
//     },
//     setProfile: (state, action) => {
//       Object.assign(state, action.payload);
//     }
//   }
// });
*/

export const { changeProfile, setProfile } = profileSlice.actions;
export default profileSlice.reducer;
