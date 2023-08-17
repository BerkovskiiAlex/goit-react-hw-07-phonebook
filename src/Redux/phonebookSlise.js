import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addContactThunk,
  deleteContactThunk,
  fetchContactsThunk,
} from './operations';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const phonebookSlice = createSlice({
  name: 'contactList',
  initialState,
  reducers: {
    addFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContactsThunk.fulfilled, (state, { payload }) => {
        state.contacts.items = payload;
      })
      .addCase(fetchContactsThunk.rejected, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.error = payload;
      })
      .addCase(addContactThunk.fulfilled, (state, { payload }) => {
        state.contacts.items.push(payload);
      })
      .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
        state.contacts.items = state.contacts.items.filter(
          item => item.id !== payload
        );
      })
      .addMatcher(
        isAnyOf(
          fetchContactsThunk.fulfilled,
          addContactThunk.fulfilled,
          deleteContactThunk.fulfilled
        ),
        (state, action) => {
          state.contacts.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContactsThunk.pending,
          addContactThunk.pending,
          deleteContactThunk.pending
        ),
        (state, action) => {
          state.contacts.isLoading = true;
          state.contacts.error = '';
        }
      );
  },
});

export const { addFilter } = phonebookSlice.actions;
export const phonebookReducer = phonebookSlice.reducer;
