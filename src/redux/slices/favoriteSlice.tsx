import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteState {
  favoriteIds: string[]; // Store only event IDs
}

const initialState: FavoriteState = { favoriteIds: [] };

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const eventId = action.payload;
      if (state.favoriteIds.includes(eventId)) {
        state.favoriteIds = state.favoriteIds.filter(id => id !== eventId);
      } else {
        state.favoriteIds.push(eventId);
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
