import { configureStore } from '@reduxjs/toolkit'
import authSlice from './ReduxSlice/authSlice'
import detailSlice from './ReduxSlice/detailSlice';
const store = configureStore(
    {
        reducer: {
            authSlice: authSlice,
            detailSlice: detailSlice
        }
    }
)

export default store;
