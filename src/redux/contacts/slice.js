import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, setContact, deleteContact } from 'redux/operations';
import { getFilter } from 'redux/filter/slice';

const initialState = { entities: [], isLoading: false, error: null };

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.entities = [...action.payload];
    },
    [fetchContacts.rejected]: handleRejected,

    [setContact.pending]: handlePending,
    [setContact.fulfilled](state, action) {
      state.isLoading = false;
      state.entities.push(action.payload);
    },
    [setContact.rejected]: handleRejected,

    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      const newEntities = state.entities.filter(
        ({ id }) => id !== action.payload.id
      );
      state.entities = newEntities;
    },
    [deleteContact.rejected]: handleRejected,
  },
});

export const contactsReducer = contactsSlice.reducer;

export const selectEntities = state => state.contacts.entities;

export const selectIsLoading = state => state.contacts.isLoading;

export const selectError = state => state.contacts.error;

export const selectFilteredContacts = state => {
  return selectEntities(state).filter(({ name }) =>
    name.toLowerCase().includes(getFilter(state).toLowerCase())
  );
};
