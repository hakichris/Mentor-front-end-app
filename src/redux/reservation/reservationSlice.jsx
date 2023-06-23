import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/api/v1/reservations';
const initialState = {
  reserves: [],
  status: 'idle',
};

export const fetchreservation = createAsyncThunk('reserves/fetchreserves', async () => {
  const res = await axios.get(url);
  const response = res.data;
  const reserves = Object.keys(response).map((key) => ({
    reservations_id: key,
    ...response[key][0],
  }));
  return reserves;
});

export const addreserve = createAsyncThunk('reserves/addreserve', async (reserve) => {
    await axios.post(url, reserve);
    return reserve;
  });

  export const removereservation = createAsyncThunk('books/removebook', async (id) => {
    await axios.delete(`${url}/${id}`);
    return id;
  });

export const reserveSlice = createSlice({
  name: 'reserveform',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(fetchreservation.fulfilled, (state, action) => {
      const newState = { ...state };
      newState.reservations = action.payload;
      return newState;
    });
    builder.addCase(addreserve.fulfilled, (state, action) => {
        state.reserves.push(action.payload);
      });
      builder.addCase(removereservation.fulfilled, (state, action) => {
        const newState = { ...state };
        newState.reservations = state.reservations.filter((reservation) => reservation.id !== action.payload);
        return newState;
      });
  },
});

export default reserveSlice.reducer;
