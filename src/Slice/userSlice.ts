import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  userInfo: any
}

const initialState: UserState = {
  userInfo: undefined,
}

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserInfo } = userSlice.actions

export default userSlice.reducer