import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { nanoid } from 'nanoid';

const initialState = {
  items: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    addContact: {
      reducer: (state, action) => {
        const isContactExist = state.items.find(
          contact =>
            contact.name.toLowerCase() === action.payload.name.toLowerCase()
        );
        if (isContactExist) {
          alert(`${action.payload.name} is already in contacts`);
          return;
        }

        state.items.push(action.payload);
      },
      prepare: data => {
        return {
          payload: {
            ...data,
            id: nanoid(),
          },
        };
      },
    },
    deleteContact: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(contact => contact.id !== id);
    },
  },
});

const persistConfig = {
  key: 'list',
  storage,
};

const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = persistedContactsReducer;
export const getContactsList = state => state.contacts.items;

export const getFilteredContacts = state => {
  const contacts = getContactsList(state);
  const filter = state.filter.value;

  const normalizedFilterValue = filter.toLowerCase();
  const filteredContacts = contacts.filter(({ name }) => {
    if (name && typeof name === 'string') {
      const normalizedName = name.toLowerCase();
      return normalizedName.includes(normalizedFilterValue);
    }
    return false;
  });

  return filteredContacts;
};
