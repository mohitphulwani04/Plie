import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { loadToken } from './authSlice';

const API_URL = 'http://3.7.81.243/projects/plie-api/public/api';

export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async (_, { getState, rejectWithValue }) => {
      const state = getState();
    //   const token = state.auth.token;
        console.log("loadToken",loadToken);
        
      if (!loadToken) return rejectWithValue('No token found');
  
      try {
        const response = await axios.post(
          `${API_URL}/events-listing`,
          {},
          { headers: { Authorization: `Bearer ${loadToken}` } }
        );
        return response?.data?.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch events');
      }
    }
  );

const eventSlice = createSlice({
  name: 'events',
  initialState: { events: [], loading: false, error: null },
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default eventSlice.reducer;
