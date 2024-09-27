import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axiosInstance from '../../Helpers/axiosInstance'
import toast from 'react-hot-toast'
import axios from 'axios'

const initialState = {
    isLoggedIn : localStorage.getItem('isLoggedIn') || false ,
    role : localStorage.getItem('role') || '' ,
    data : localStorage.getItem('data') || {}
}

export const signUp = createAsyncThunk('auth/signup', async function (data){
    try {
        // console.log(data.get('avatar'));
        
        const response = axiosInstance.post('/user/register',data)

        toast.promise(response,{
            loading: 'Creating account ...',
            error: 'Error in creating account !'
            ,
            success: (data) => {
                return data?.data?.message
            }
        })

        return await response

    } catch (error) {
        console.log(error);
    }
})

export const signin = createAsyncThunk('/auth/signin',async function (data) {
    try {
        const response = axiosInstance.post('/user/login',data)

        // console.log(data);
        

        toast.promise(response,{
            loading: 'Authenticating ...',
            success: (data)=> {
                return data?.data?.message
            },
            error: (data)=> {
                return data?.response?.data                 
            }
        })

        return (await response).data
    } catch (error) {
        console.log(error);
    }
})

export const signout = createAsyncThunk('/auth/signout', async function () {
    try {
        const response = axiosInstance.get('/user/logout')

        // console.log(`res in slide --> ${(await response).data}`);

        toast.promise(response, {
            loading: 'Logging out ...',
            success: (data)=> {
                return data?.data?.message
            },
            error: (data) => data?.data?.message
        })
        
        return (await response).data
        
    } catch (error) {
        console.log(error);
        
    }
})

export const getProfile = createAsyncThunk('/auth/getProfile', async function () {
    try {
        const response = axiosInstance.get('/user/my-profile')
        // console.log((await response).data.userProfile)

        return (await response).data.userProfile

    } catch (error) {
        console.log(error);
        
    }
})

export const updateProfile = createAsyncThunk('/user/update', async function (data) {
        try {

            // console.log(data);
            
            const response =  axiosInstance.post('/user/update',data)

            toast.promise(response,{
                loading: 'Updating ...',
                error: 'Error while updating',
                success : d => d?.data?.message
            })

            return ((await response).data)
            
        } catch (error) {
            console.log(error);
            
        }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(signin.fulfilled, (state,action)=> {
            localStorage.setItem('data',JSON.stringify(action?.payload))
            localStorage.setItem('role',action?.payload?.existingUser?.role)
            localStorage.setItem('isLoggedIn',true)

            state.isLoggedIn = true
            state.data = action?.payload
            state.role = action?.payload?.existingUser?.role 
        })
        .addCase(signout.fulfilled, (state) => {
            localStorage.clear()

            state.isLoggedIn = false
            state.role = ''
            state.data = {}
        })
        .addCase(getProfile.fulfilled, (state, action) => {
            localStorage.setItem('data', action?.payload)
            localStorage.setItem('isLoggedIn',true)
            localStorage.setItem('role',action?.payload?.role)

            state.isLoggedIn = true
            state.data = action?.payload
            state.role = action?.payload?.role
        })
    }
})

export default authSlice.reducer
