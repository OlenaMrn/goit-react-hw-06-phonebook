import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: { value: '' },
  reducers: {
    setFilter: (state, action) => {
      state.value = action.payload;
    },
  },
});

//Actions
export const { setFilter } = filterSlice.actions;
//Reducer
export const filterReducer = filterSlice.reducer;
//Selectors
export const getFilter = state => state.filter.value;

