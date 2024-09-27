import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import store from './Redux/store.js'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

let persistor = persistStore(store) 

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate persistor={persistor}>
              <App />
            </PersistGate>
            <Toaster/>
        </BrowserRouter>
    </Provider>
)
