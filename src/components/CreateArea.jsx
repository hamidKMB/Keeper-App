import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [isClicked, setIsClicked] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });

    setIsChanged(true);
  }

  function expand() {
    setIsClicked(true);
  }

  function expandLess() {
    setIsClicked(false);
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    setIsClicked(false);
    setIsChanged(false);
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        {isClicked && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onChange={handleChange}
          onClick={expand}
          value={note.content}
          placeholder="Take a note..."
          rows={isClicked ? "3" : "1"}
        />
        <Zoom in={isClicked}>
          {isChanged ? (
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          ) : (
            <Fab onClick={expandLess}>
              <ExpandLessIcon />
            </Fab>
          )}
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
