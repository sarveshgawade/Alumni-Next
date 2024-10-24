import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    jobApplication: {}
}

export const addNewJobApplication = createAsyncThunk('/job/apply', async function (data) {
    try {
        const response = axiosInstance.post('/job/apply',data)

        toast.promise(response, {
            error: d => d?.response?.data ,
            success: d => d?.data?.message,
            loading: 'Applying for job ...'
        })

        return ((await response).data);
        
        
    } catch (error) {
        console.log(error);
        
    }
})

const jobApplicationSlice = createSlice({
    name:'jobApplication',
    initialState,
    reducers: {} ,
    extraReducers: (builder)=> {

    }
})

export default jobApplicationSlice.reducer