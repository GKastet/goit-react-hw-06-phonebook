import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, filterContact } from 'redux/contactsSlice';
import { Section } from './SectionStyled';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import Contacts from './Contacts/Contacts';

export default function App() {
  const contacts = useSelector(state => state.contacts.contacts);
  const filtered = useSelector(state => state.contacts.filter);

  const dispatch = useDispatch();

  const formAddContact = contactData => {
    const finded = contacts.find(contact => contact.name === contactData.name);
    if (finded) {
      alert(`${contactData.name} is already in contacts`);
      return;
    }
    dispatch(addContact(contactData));
  };

  const handleOnChangeFilter = evt => {
    dispatch(filterContact(evt.currentTarget.value));
  };

  const filteredContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filtered.toLowerCase())
  );

  return (
    <>
      <Section>
        <h1>Phonebook</h1>

        <ContactForm formAddContact={formAddContact} contactsArr={contacts} />
        <h2>Contacts</h2>
        <Filter value={filtered} handleOnChangeFilter={handleOnChangeFilter} />
        <Contacts
          filteredContact={filteredContact}
          onRemoveContact={contactId => {
            dispatch(deleteContact(contactId));
          }}
          value={filtered}
          handleOnChangeFilter={handleOnChangeFilter}
        />
      </Section>
    </>
  );
}
