// import PropTypes from 'prop-types';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Filter from 'components/Filter/Filter';
import {
  selectFilteredContacts,
  selectError,
  selectIsLoading,
} from 'redux/contacts/slice';
import { useEffect } from 'react';
import { fetchContacts, deleteContact } from 'redux/operations';

const ContactList = () => {
  const entities = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h2>Contacts</h2>
      <Filter />
      {isLoading && <div>LOADING...</div>}
      {error && <div>{error}</div>}
      {entities.length > 0 && (
        <ul className={css.contactList}>
          {entities.map(({ id, name, number }) => (
            <li key={id} className={css.contactList__item}>
              {name}: {number}
              <button
                name="delete"
                className={css.contactList__btn}
                onClick={() => dispatch(deleteContact(id))}
              >
                Delete contact
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ContactList;
