import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    jobs: []
}

export const getAllJobs = createAsyncThunk('/jobs/get',async function () {
    try {
        const response = axiosInstance.get('/jobs')

        toast.promise(response,{
            loading: 'Loading jobs ...',
            error: 'Error in loading jobs !',
            success: (data) => {
                return data?.data?.message
            }
        })

        return (await response)?.data?.jobList
        
    } catch (error) {
        console.log(error);
        
    }
})

export const addNewJob = createAsyncThunk('/jobs/add', async function (data) {
    try {
        const response = axiosInstance.post('/jobs/add',data)

        toast.promise(response,{
            error: "Error in adding new job !" ,
            loading: 'Adding new job ...',
            success: d => d?.data?.message
        })

        return (await response).data
        
    } catch (error) {
        console.log(error);
        
    }
})

const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {} ,
    extraReducers: (builder)=> {
        builder
        .addCase(getAllJobs.fulfilled,(state,action)=> {
            if(action?.payload){
                state.jobs = [...action?.payload]
            }
            
        })
    }
})

export default jobSlice.reducer