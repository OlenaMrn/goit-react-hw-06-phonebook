import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, getContactsList } from 'redux/contactsSlice';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContactsList);
  console.log(contacts);
  

  return (
    <ul className={css.contacts__list}>
      {contacts.map(contact => (
        <li key={contact.id}>
          <p>{contact.name}</p>
          <p>{contact.number}</p>
          <button
            onClick={() => dispatch(deleteContact(contact.id))}
            className={css.contacts__btn}
            type="button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};
