import React, { useEffect, useRef, useState } from "react";
import TrashIcon from "../icons/TrashIcon.jsx";
import "./notes.scss";

const checkBoundaries = (newCoords = { x: 0, y: 0 }) => {
  return {
    x: newCoords.x < 0 ? 0 : newCoords.x,
    y: newCoords.y < 0 ? 0 : newCoords.y,
  };
};

const autoGrow = (textareaRef) => {
  const { current } = textareaRef;
  current.style.height = "auto";
  current.style.height = current.scrollHeight + "px";
};

const saveNote = async (note) => {
  const response = await fetch("http://127.0.0.1:4040/save_note", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  if (response.status != 200) {
    alert("Error saving the note.");
  }
};

const NoteContainer = ({ note, moveNoteOnTop }) => {
  const [position, setPositon] = useState(note.position);
  const body = note.body;
  const colors = note.colors;
  const textareaRef = useRef(null);
  const cardRef = useRef(null);
  let mouseStartPos = { x: 0, y: 0 };
  const mouseDown = (e) => {
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };
  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };
  const mouseMove = (e) => {
    let mouseMoveDir = {
      x: e.clientX - mouseStartPos.x,
      y: e.clientY - mouseStartPos.y,
    };
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;
    setPositon(
      checkBoundaries({
        x: cardRef.current.offsetLeft + mouseMoveDir.x,
        y: cardRef.current.offsetTop + mouseMoveDir.y,
      })
    );
  };
  useEffect(() => {
    autoGrow(textareaRef);
  }, []);
  return (
    <div
      className="note"
      ref={cardRef}
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={() => moveNoteOnTop(cardRef.current)}
    >
      <div
        className="note-header"
        style={{ backgroundColor: colors.colorHeader }}
        onMouseDown={mouseDown}
      >
        <TrashIcon />
        <textarea
          className="ta-header"
          style={{ color: colors.colorText }}
          defaultValue={note.title}
        ></textarea>
        <button onClick={() => saveNote(note)} className="btn">
          Save
        </button>
      </div>
      <div className="note-body">
        <textarea
          ref={textareaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => autoGrow(textareaRef)}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteContainer;
