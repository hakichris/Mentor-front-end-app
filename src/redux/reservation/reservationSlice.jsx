import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const access_token = "iqZBRbTqzOgziND-fDOWcUStBjFr7TbvJgIeIm15M_U"
const url = 'http://localhost:3000/api/v1/reservations';
const initialState = {
  reserves: [],
  status: 'idle',
};

export const fetchreservation = createAsyncThunk('reserves/fetchreserves', async () => {
 const res = await axios.get(url , { headers: {"Authorization" : `Bearer ${access_token}`} 
})
const reserves = res.data;
console.log("fetching my reservation:", res.data)
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
  name: 'reserve',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(fetchreservation.fulfilled, (state, action) => {
      const newState = { ...state };
      newState.reserves = action.payload;
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
