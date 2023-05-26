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

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};
