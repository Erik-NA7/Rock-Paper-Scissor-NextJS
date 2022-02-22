import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  username: '',
  fullname: '',
  email: '',
  total_score: 0,
}

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
      state.total_score = action.payload.total_score;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.username = '';
      state.fullname = '';
      state.email = '';
      state.total_score = 0;
    },
    addTotalScore(state, action) {
      state.total_score = state.total_score + action.payload
    }
  }
})


export const authActions = authSlice.actions

export default authSlice.reducer