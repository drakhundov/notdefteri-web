import React from "react";
import notes from "../assets/data.js";
import NoteContainer from "../components/NoteContainer.jsx";

const moveNoteOnTop = (selectedNote) => {
  selectedNote.style.zIndex = 1;
  Array.from(document.getElementsByClassName("note")).forEach((note) => {
    if (note !== selectedNote) {
      note.style.zIndex = 0;
    }
  });
};

const NotesPage = () => {
  return (
    <div>
      {notes.map((note) => (
        <NoteContainer
          note={note}
          key={note.$id}
          moveNoteOnTop={moveNoteOnTop}
        />
      ))}
    </div>
  );
};

export default NotesPage;
