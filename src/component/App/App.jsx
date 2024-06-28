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
  const [contacts, setContacts] = useState(() => {
    // Завантаження контактів з localStorage лише при першому рендері
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      return JSON.parse(storedContacts);
    }
    return initialContacts; // Повернення початкових контактів за замовчуванням
  });
  const [searchText, setSearchText] = useState('');

  // Збереження контактів у localStorage при будь-якій зміні стану `contacts`
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    setContacts([newContact, ...contacts]);
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
      <ContactList contacts={contacts} filterText={searchText} onDeleteContact={deleteContact} />
    </div>
  );
};

export default App;