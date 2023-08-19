import { createSlice } from "@reduxjs/toolkit"


const initialState = null


const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationChange (state, action) {
            return action.payload
        },
        notificationDelete (state, action) {
            return null
        },
    }
})

export const { notificationChange, notificationDelete } = notificationSlice.actions

// exercise 6.19
export const setNotification = (message, timer) => {
    return async dispatch => {
        dispatch(notificationChange(message))
        setTimeout(() => {
            dispatch(notificationDelete())
          }, timer*1000)

    }
}

export default notificationSlice.reducer