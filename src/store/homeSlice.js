import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watched: [],
  currency: "USD",
  visible:false
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    add: (state, action) => {
      state.watched.push(action.payload);
    },
    remove: (state, action) => {
      state.watched = state.watched.filter(
        (crypto) => crypto.id !== action.payload
      );
    },
    change: (state, action) => {
      state.currency = action.payload;
    },
    toggle: (state,action) => {
      state.visible = action.payload
    }
  },
});

export const { add, remove, change,toggle } = homeSlice.actions;

export default homeSlice.reducer;
