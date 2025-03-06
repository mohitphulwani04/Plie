import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://3.7.81.243/projects/plie-api/public/api/';

// Async function to log in a user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { token, user } = response.data;
    console.log(" token, user ", token, user );
    
      if (!token) {
        return rejectWithValue('Invalid credentials');
      }

      //Save token & user data to AsyncStorage
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));

      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Load token from AsyncStorage
export const loadToken = createAsyncThunk('auth/loadToken', async (_, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const user = await AsyncStorage.getItem('userData');

    if (!token) return rejectWithValue('No token found');

    return { token, user: user ? JSON.parse(user) : null };
  } catch (error) {
    return rejectWithValue('Failed to load token');
  }
});

// Logout function (removes token)
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await AsyncStorage.removeItem('userToken');
  await AsyncStorage.removeItem('userData');
  return null;
});

// Initial state
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loadToken.rejected, (state) => {
        state.loading = false;
        state.token = null;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
