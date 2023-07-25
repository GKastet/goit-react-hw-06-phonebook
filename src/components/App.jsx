import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, filterContact } from 'redux/contactsSlice';
import Container from './Container/Container';


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
    dispatch(addContact(contactData))
  };

  const handleOnChangeFilter = evt => {
    dispatch(filterContact(evt.currentTarget.value))    
  };

  const filteredContact = contacts.filter(contact =>        
    contact.name.toLowerCase().includes(filtered.toLowerCase())
  );

  return (
    <>
      <Container
        formAddContact={formAddContact}
        value={filtered}
        handleOnChangeFilter={handleOnChangeFilter}
        filteredContact={filteredContact}
        contactsArr={contacts}
        onRemoveContact={contactId => {          
          dispatch(deleteContact(contactId))          
        }}
      />
    </>
  );
}
