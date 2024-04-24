import { createSlice } from '@reduxjs/toolkit'

const clockStatusSlice = createSlice({
    name: 'clockedIn',
    initialState: { clockedIn: false },
    reducers: {
        setClockedIn: (state) => {
            state.clockedIn = true;
          },
          setClockedOut: (state) => {
            state.clockedIn = false;
          },
    }
})

export const {setClockedIn, setClockedOut} = clockStatusSlice.actions

export default clockStatusSlice.reducer;