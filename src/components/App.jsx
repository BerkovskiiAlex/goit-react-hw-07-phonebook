import React from 'react';
import 'modern-normalize';
import { Input } from './Input/Input';
import { ContactsList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectFilter } from 'Redux/sellectors';
import { addContact, addFilter, deleteContact } from 'Redux/phonebookSlise';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const handleAddContact = (name, number) => {
    const newContact = { id: nanoid(), name, number };

    if (contacts.some(contact => contact.name === name)) {
      toast(`${name} is already in contacts`, { autoClose: 4000 });
    } else {
      // setContacts(prevContacts => [...prevContacts, newContact]);
      dispatch(addContact(newContact));
    }
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleSetFilter = event => {
    const { value } = event.target;
    // setFilter(value);
    dispatch(addFilter(value));
  };

  const handleDeleteContact = id => {
    // setContacts(prev => prev.filter(contact => contact.id !== id));
    dispatch(deleteContact(id));
  };

  const filteredContacts = filterContacts();

  return (
    <section>
      <ToastContainer />
      <Input onSubmit={handleAddContact} />
      <ContactsList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
      <Filter onFilterChange={handleSetFilter} filter={filter} />
    </section>
  );
};

// export const App = () => {
//   const [contacts, setContacts] = useState([]);
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     const dataOfState = JSON.parse(localStorage.getItem('localContacts'));
//     if (dataOfState && dataOfState.length) {
//       setContacts(dataOfState);
//     }
//   }, []);

//   useEffect(() => {
//     if (!contacts.length) {
//       return;
//     }
//     window.localStorage.setItem('localContacts', JSON.stringify(contacts));
//   }, [contacts]);

//   const handleAddContact = (name, number) => {
//     const newContact = { id: nanoid(), name, number };

//     if (contacts.some(contact => contact.name === name)) {
//       toast(`${name} is already in contacts`, { autoClose: 4000 });
//     } else {
//       setContacts(prevContacts => [...prevContacts, newContact]);
//     }
//   };

//   const filterContacts = () => {
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//   };

//   const handleSetFilter = event => {
//     const { value } = event.target;
//     setFilter(value);
//   };

//   const handleDeleteContact = id => {
//     setContacts(prev => prev.filter(contact => contact.id !== id));
//   };

//   const filteredContacts = filterContacts();

//   return (
//     <section>
//       <ToastContainer />
//       <Input onSubmit={handleAddContact} />
//       <ContactsList
//         contacts={filteredContacts}
//         onDeleteContact={handleDeleteContact}
//       />
//       <Filter onFilterChange={handleSetFilter} filter={filter} />
//     </section>
//   );
// };
