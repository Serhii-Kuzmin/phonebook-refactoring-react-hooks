import { useEffect, useState } from 'react';
import { Form } from './Form/Form';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { Container } from './App.styled';

const STORAGE_KEY = 'storage_contacts';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    const startState = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (startState) {
      setContacts([...startState]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const onSubmitForm = data => {
    const newObj = { ...data, id: crypto.randomUUID() };

    if (isNameNew(contacts, newObj) === undefined) {
      setContacts(prevContacts => [...prevContacts, newObj]);
    } else {
      alert(`${newObj.name} is already in contacts`);
    }
  };

  const isNameNew = (contacts, newObj) => {
    return contacts.find(
      ({ name }) => name.toLowerCase() === newObj.name.toLowerCase()
    );
  };

  const onChangeFilter = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const filterByName = () => {
    const lowerFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(lowerFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };
  const visibleContacts = filterByName();

  return (
    <Container>
      <h1>Phonebook</h1>
      <Form onSubmit={onSubmitForm} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChangeFilter={onChangeFilter} />
      <ContactsList
        contacts={visibleContacts}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
};
