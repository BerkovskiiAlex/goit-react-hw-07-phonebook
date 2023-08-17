import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const contactsInstance = axios.create({
  baseURL: 'https://64de2222825d19d9bfb22657.mockapi.io',
});

export const fetchContactsThunk = createAsyncThunk(
  'fetchContacts',
  async (_, thunkAPI) => {
    try {
      const res = await contactsInstance.get('/contacts');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  'addContact',
  async (body, thunkAPI) => {
    try {
      const { data } = await contactsInstance.post('/contacts', body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'contact/delete',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await contactsInstance.delete(`/contacts/${id}`);
      return data.id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
