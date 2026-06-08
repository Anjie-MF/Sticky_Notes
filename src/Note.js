import React from "react";

const Note = (props) => {
  const updateTitle = (e) => {
    const updatedValue = e.target.value;
    const editMeId = props.note.id;
    props.onType(editMeId, "title", updatedValue);
  };

  const updateDescription = (e) => {
    const updatedValue = e.target.value;
    const editMeId = props.note.id;
    props.onType(editMeId, "description", updatedValue);
  };

  const clickDelete = () => {
    props.removeNote(props.note.id);
  };

  return (
    <li className="note">
      <input
        type="text"
        aria-label="Title"
        value={props.note.title}
        onChange={updateTitle}
        placeholder="Today To-Do"
        className="note__title"
      />
      <textarea
        aria-label="Description"
        value={props.note.description}
        onChange={updateDescription}
        placeholder="Drink water!"
        className="note__description"
      />
      <span onClick={clickDelete} className="note__delete" >
        X
      </span>
    </li>
  );
};

export default Note;
