import {createSlice} from "@reduxjs/toolkit";
import {NewType} from "../../types/newType";

const initialState = {
    list: [] as NewType[]
}

const serverPort = process.env.REACT_APP_SERVER_PORT
const serverAddress = `//localhost:${serverPort}`

const newsSlice = createSlice({
    name: 'custom-news',
    initialState,
    reducers: {
        setNewsList: (state, action: { payload: NewType[], type: string }) => {
            state.list = action.payload;
        },
        addNew: (state, action: { payload: NewType, type: string }) => {
            state.list = [action.payload, ...state.list]

            fetch(`${serverAddress}/custom-news`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(action.payload),
            }).catch((err) => {
                console.log(err)
            })
        },
    }
})

export const {setNewsList, addNew} = newsSlice.actions
export default newsSlice.reducer
