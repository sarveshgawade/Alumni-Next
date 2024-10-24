import {combineReducers, configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import authSliceReducer from './Slices/authSlice'
import jobSliceReducer from './Slices/jobSlice'
import eventSliceReducer from './Slices/eventSlice'
import jobApplicationSliceReducer from './Slices/jobApplicationSlice'


const persistConfiguration = {
    key: 'root',
    version: 1,
    storage
}

const reducer = combineReducers({
    // slices
    auth: authSliceReducer,
    jobs: jobSliceReducer,
    events: eventSliceReducer,
    jobApplication: jobApplicationSliceReducer

})

const persistedReducer = persistReducer(persistConfiguration,reducer)

const store = configureStore({
    reducer:persistedReducer,
    devTools: true
})

export default store