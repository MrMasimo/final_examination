import {configureStore} from '@reduxjs/toolkit'
import newsSlice from "./newsSlice";
import {useDispatch} from "react-redux";
import {setupListeners} from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        news: newsSlice,
    }
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>
