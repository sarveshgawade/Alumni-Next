import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    events: []
}

export const addNewEvent = createAsyncThunk('/events/add', async (data) => {
    try {
        const response =  axiosInstance.post('/event/add',data)

        toast.promise(response,{
            loading: 'Adding event ...',
            error: 'Error in adding event !',
            success: data => data?.data?.message
        })

        return (await response)?.data

    } catch (error) {
        console.log(error);
        
    }
})

export const getAllEvents = createAsyncThunk('/events/get',async ()=> {
    try {
        const response = axiosInstance.get('/event')

        // console.log((await response).data);
        

        toast.promise(response,{
            loading: 'Loading events ...' ,
            error: 'Error in loading events !',
            success: data => data?.data?.message
        })

        return (await response)?.data
    } catch (error) {
        console.log(error);
        
    }
})

const eventSlice = createSlice({
    initialState,
    name: 'Events',
    reducers: {},
    extraReducers: (builder)=> {
        builder
        .addCase(getAllEvents.fulfilled, (state,action) => {
            if(action?.payload){
                state.events = action?.payload?.events
            }
            
        })
    }
})

export default eventSlice.reducer