import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'fetchSlice',
  initialState: {
    data: [],
  },
  reducers: {
    fetchDataReducer(state, actions) {
      state.data = actions.payload;
    },
  },
});

export const {fetchDataReducer} = slice.actions;

export default slice.reducer;
