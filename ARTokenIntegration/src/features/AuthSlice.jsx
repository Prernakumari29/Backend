import { createSlice } from "@reduxjs/toolkit";
import { currentuser } from "./AuthAction";

const initialState = {
    user : null ,
    loading : true,
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state , action) =>{
            state.user = action.payload
            state.loading = false
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(currentuser.pending, (state)=>{
          state.loading = true;
        })
        .addCase(currentuser.fulfilled , (state, action) =>{
            state.user = action.payload;
            state.loading = false;
        })
        .addCase(currentuser.rejected , (state)=>{
            state.user = null;
            state.loading = false;

        })

    }
    })

    export const {setUser } = authSlice.actions

    export default authSlice.reducer