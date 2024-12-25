import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthenticationState {
    loginData: any
}

const initialState: AuthenticationState = {
    loginData: {},
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login: (state) => {
            
        },
    },
})

// Action creators are generated for each case reducer function
export const { login } = authenticationSlice.actions

export default authenticationSlice.reducer