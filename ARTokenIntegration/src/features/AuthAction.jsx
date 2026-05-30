import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/AxiosInstance";

export let currentuser = createAsyncThunk("auth/me" , async (_ , thunkapi)=>{
    try {
        const res = await api.get("/me")
        return res.data.data
    } catch (error) {
        return thunkapi.rejectWithValue(error)
    }

} )