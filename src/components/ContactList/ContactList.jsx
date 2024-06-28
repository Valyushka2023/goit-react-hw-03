import Contact from '../Contact/Contact';
import css from './ContactList.module.css';

const ContactList = ({ contacts, filterText, onDeleteContact }) => {
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filterText)
  );

  return (
    <div className={css.list}>
      {filteredContacts.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </div>
  );
};

export default ContactList;
