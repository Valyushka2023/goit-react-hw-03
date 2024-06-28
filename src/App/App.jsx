import { useState, useEffect } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

useEffect(() => {
  if (contacts.length !== initialContacts.length) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
}, [contacts]);
  
 
const addContact = (newContact) => {
  setContacts([newContact, ...contacts]);
  localStorage.setItem('contacts', JSON.stringify([newContact, ...contacts]));
};

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleSearch = (newSearchText) => {
    setSearchText(newSearchText.toLowerCase());
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <SearchBox filterText={searchText} setFilterText={handleSearch} />
      <ContactList
        contacts={contacts}
        filterText={searchText}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export default App;