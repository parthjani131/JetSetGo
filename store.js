import {configureStore} from '@reduxjs/toolkit';
import reducer from './store/slice';

export const store = configureStore({
  reducer: {
    fetchSlice: reducer,
  },
});
