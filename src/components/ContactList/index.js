import { useState } from "react";
import Contact from "../Contact";
import "./contactList.css";

const ContactList = ({ contacts, onSetContacts }) => {
  const [checkedIds, setCheckedIds] = useState([]);

  const checkAll = (e) => {
    const { checked } = e.target;
    if (checked) {
      const checkedIdsArray = contacts.map((contact) => contact.id);
      setCheckedIds(checkedIdsArray);
    } else setCheckedIds([]);
  };
  const handleEditContact = (contactId, editedName, editedPhoneNumber) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === contactId
        ? { ...contact, name: editedName, phoneNumber: editedPhoneNumber }
        : contact
    );
    for (let item of updatedContacts) {
      if (item.name.length < 4 || !/^[a-zA-Z]{2,}$/i.test(item.name)) {
        let message = "Name must";

        if (item.name.length < 4) {
          message += " be at least 4 characters long";
        }

        if (!/^[a-zA-Z]{2,}$/i.test(item.name)) {
          if (message.length > 8) {
            message += " and contain only letters.";
          } else {
            message += " contain only letters.";
          }
        }

        alert(message);
        return;
      }

      if (item.phoneNumber.length < 9 || !/^\d{9,}$/i.test(item.phoneNumber)) {
        let message = "Number must";

        if (item.phoneNumber.length < 9) {
          message += " be at least 9 digits long";
        }

        if (!/^\d{9,}$/i.test(item.phoneNumber)) {
          if (message.length > 10) {
            message += " and only include digits.";
          } else {
            message += " only include digits.";
          }
        }

        alert(message);
        return;
      }

      localStorage.setItem(
        "contacts",
        JSON.stringify([
          {
            id: item.id,
            name: item.name,
            phoneNumber: item.phoneNumber,
          },
        ])
      );
    }
    onSetContacts(updatedContacts);
  };

  const toggleContactFromList = (e, contactId) => {
    const { checked } = e.target;
    if (!checked) {
      setCheckedIds((ids) => {
        const newIdsArray = ids.filter((id) => contactId !== id);
        return newIdsArray;
      });
    } else {
      setCheckedIds((ids) => {
        const withNewId = [...ids, contactId];
        return withNewId;
      });
    }
  };
  const handleRemoveContact = (contactId) => {
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    onSetContacts(updatedContacts);
    setCheckedIds([]); // Clear checkedIds after removing the contact
  };
  const handleDeleteChecked = () => {
    if (checkedIds.length === contacts.length) {
      onSetContacts([]);
      localStorage.clear();
    } else {
      onSetContacts((contacts) => {
        const filteredList = contacts.filter(
          (contact) => !checkedIds.includes(contact.id)
        );
        localStorage.setItem("contacts", JSON.stringify(filteredList));
        return filteredList;
      });
    }
    setCheckedIds([]);
  };

  return (
    <table>
      <caption>Contacts</caption>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              onChange={checkAll}
              checked={
                checkedIds.length && checkedIds.length === contacts.length
              }
            />
          </th>
          <th>
            <i
              className="fa fa-trash-o delete-all"
              onClick={handleDeleteChecked}
            />
          </th>
          <th></th>
          <th>Name</th>
          <th>Phone number</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact, i) => (
          <Contact
            onToggleContactFromList={toggleContactFromList}
            onRemoveContact={handleRemoveContact}
            checkedIds={checkedIds}
            contactData={contact}
            onEditContact={handleEditContact}
            key={`contact-${i}`}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ContactList;
