// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import css from './ContactForm.module.css';
import { selectFilteredContacts } from 'redux/contacts/slice';
import { setContact } from 'redux/operations';

export default function ContactForm() {
  const dispatch = useDispatch();
  const entities = useSelector(selectFilteredContacts);

  const onFormSubmit = e => {
    e.preventDefault();
    const { name, number } = e.target.elements;

    if (entities.some(contact => contact.name === name.value)) {
      alert(`${name.value} is already in contacts`);
      return;
    }

    const contact = {
      name: name.value,
      number: number.value,
    };

    dispatch(setContact(contact));
    e.target.reset();
  };

  return (
    <form className={css.form} onSubmit={onFormSubmit}>
      <label htmlFor="" className={css.form__item}>
        Name
        <input
          type="text"
          name="name"
          className={css.form__input}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label htmlFor="" className={css.form__item}>
        Number
        <input
          type="tel"
          name="number"
          className={css.form__input}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={css.form__btn}>
        Add contact
      </button>
    </form>
  );
}

// ContactForm.propTypes = { addContact: PropTypes.func.isRequired };
