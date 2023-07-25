import { createSlice, nanoid } from '@reduxjs/toolkit';
import initialState from './initialState';

const contactsSlice = createSlice({
  name: 'contacts',  
  initialState: initialState,

  reducers: {
    addContact: {
      reducer(state, { payload }) {        
        state.contacts.push(payload);
      },
      prepare: (contact) => {
        return {
          payload: {
            id: nanoid(),
            name: contact.name,
            number: contact.number,
          },
        };
      },
    },
    // addContact(state, {payload}) {  
    //    state.contacts.push(payload)
    // },
    deleteContact(state, action) {      
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    filterContact(state, { payload }) {      
      state.filter = payload;      
    },
  },
});

export const { addContact, deleteContact, filterContact } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
