import React from 'react';

import css from './ContactList.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, getFilteredContacts } from 'redux/contactsSlice';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getFilteredContacts);

  return (
    <ul className={css.list}>
      {contacts.map(contact => (
        <li className={css.item} key={contact.id}>
          <p className={css.contact_name}>{contact.name}</p>
          <p className={css.contact_number}>{contact.number}</p>
          <button
            onClick={() => dispatch(deleteContact(contact.id))}
            className={css.button}
            type="button"
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
};
