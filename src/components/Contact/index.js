import React, { useState } from "react";

const Contact = ({
  contactData,
  checkedIds,
  onToggleContactFromList,
  onRemoveContact,
  onEditContact,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(contactData.name);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(
    contactData.phoneNumber
  );

  const handleEdit = () => {
    onEditContact(contactData.id, editedName, editedPhoneNumber);
    setIsEditing(false);
  };

  const handleRemoveContact = () => {
    onRemoveContact(contactData.id);
    localStorage.clear(contactData.id);
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          onChange={(e) => onToggleContactFromList(e, contactData.id)}
          checked={checkedIds.includes(contactData.id)}
        />
      </td>
      <td>
        <i className="fa fa-trash-o" onClick={handleRemoveContact} />
      </td>
      <td>
        {isEditing ? (
          <button onClick={handleEdit}>Save</button>
        ) : (
          <i className="fa fa-pencil" onClick={() => setIsEditing(true)} />
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          contactData.name
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            value={editedPhoneNumber}
            onChange={(e) => setEditedPhoneNumber(e.target.value)}
          />
        ) : (
          contactData.phoneNumber
        )}
      </td>
    </tr>
  );
};

export default Contact;
