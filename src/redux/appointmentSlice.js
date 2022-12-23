import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    appointment: null,
    loading: false,
    error: false
  }
  export const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        fetchStart: (state) =>{
            state.loading = true
        },
        fetchSuccess: (state, action) =>{
            state.loading = true
            state.appointment = action.payload
        },
        fetchFailure: (state) =>{
            state.loading = false
            state.error = true
        },
        remove:(state)=>{
            state.loading = false
            state.error = false
            state.appointment=null
        }

    },
  })

  export const {fetchStart, fetchFailure, fetchSuccess, remove} = appointmentSlice.actions
  export default appointmentSlice.reducer