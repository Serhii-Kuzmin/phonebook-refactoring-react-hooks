import { Component } from 'react';
import { Form } from './Form/Form';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { Container } from './App.styled';

const STORAGE_KEY = 'storage_contacts';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount = () => {
    const startState = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (startState) {
      this.setState({ contacts: [...startState] });
    }
  };

  componentDidUpdate = (_, prevState) => {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.contacts));
    }
  };

  onSubmitForm = data => {
    const newObj = { ...data, id: crypto.randomUUID() };
    this.setState(({ contacts }) => {
      if (this.isNameNew(contacts, newObj) === undefined) {
        return { contacts: [...contacts, newObj] };
      } else {
        alert(`${newObj.name} is already in contacts`);
        return { contacts: [...contacts] };
      }
    });
  };

  isNameNew = (contacts, newObj) => {
    return contacts.find(
      ({ name }) => name.toLowerCase() === newObj.name.toLowerCase()
    );
  };

  onChangeFilter = event => {
    const { value } = event.currentTarget;
    this.setState({ filter: value });
  };

  filterByName = () => {
    const { contacts, filter } = this.state;
    const lowerFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(lowerFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.filterByName();

    return (
      <Container>
        <h1>Phonebook</h1>
        <Form onSubmit={this.onSubmitForm} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChangeFilter={this.onChangeFilter} />
        <ContactsList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}
