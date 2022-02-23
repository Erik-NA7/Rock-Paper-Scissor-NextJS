import { createSlice } from "@reduxjs/toolkit";
import firebase from "../controller/firebase";

const initialAuthState = {
  isAuthenticated: false,
  username: '',
  fullname: '',
  email: '',
  total_score: 0,
  avatar: ''
}

const updateScore = (username, total_score) => {
  firebase.database().ref("users/" + username).update({ 'total_score': total_score })
  .then(() => {
    authActions.addTotalScore(total_score); 
  })
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
      state.avatar = action.payload.avatar
    },
    logout(state) {
      state.isAuthenticated = false;
      state.username = '';
      state.fullname = '';
      state.email = '';
      state.total_score = 0;
    },
    addTotalScore(state, action) {
      state.total_score = action.payload
    }
  },
})


export const authActions = authSlice.actions

export const updateTotalScore = updateScore

export default authSlice.reducer
