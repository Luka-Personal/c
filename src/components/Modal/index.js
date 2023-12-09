import { useState } from "react";
import "./modal.css";

const Modal = ({ onSetModalIsOn, onSetContacts }) => {
  const [userInput, setUserInput] = useState({ name: "", phoneNumber: "" });
  const createNewContactName = (e) => {
    const { value, name } = e.target;
    setUserInput((userInput) => ({
      id: Date.now(),
      ...userInput,
      [name]: value,
    }));
  };
  const createNewContactNumber = (e) => {
    const { value, name } = e.target;
    setUserInput((userInput) => ({
      id: Date.now(),
      ...userInput,
      [name]: value,
    }));
  };

  const addNewContactToList = () => {
    if (userInput.name.length < 4 || !/^[a-zA-Z]{2,}$/i.test(userInput.name)) {
      let message = "Name must";

      if (userInput.name.length < 4) {
        message += " be at least 4 characters long";
      }

      if (!/^[a-zA-Z]{2,}$/i.test(userInput.name)) {
        if (message.length > 8) {
          message += " and contain only letters.";
        } else {
          message += " contain only letters.";
        }
      }

      alert(message);
      return;
    }
    if (
      userInput.phoneNumber.length < 9 ||
      !/^\d{9,}$/i.test(userInput.phoneNumber)
    ) {
      let message = "Number must";

      if (userInput.phoneNumber.length < 9) {
        message += " be at least 9 digits long";
      }

      if (!/^\d{9,}$/i.test(userInput.phoneNumber)) {
        if (message.length > 10) {
          message += " and only include digits.";
        } else {
          message += " only include digits.";
        }
      }

      alert(message);
      return;
    }

    onSetContacts((previousContacts) => {
      previousContacts.push(userInput);
      localStorage.setItem("contacts", JSON.stringify(previousContacts));
      return previousContacts;
    });

    onSetModalIsOn(false);
  };

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => onSetModalIsOn(false)}>
          &times;
        </span>
        <h2 style={{ textAlign: "center" }}>Add new Contact</h2>
        <div className="userInputWrapper">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onInput={createNewContactName}
          />
        </div>
        <div className="userInputWrapper">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone number"
            onInput={createNewContactNumber}
          />
        </div>
        <div className="userInputWrapper">
          <button onClick={addNewContactToList}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
