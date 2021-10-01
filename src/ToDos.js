import React, { useState } from "react";

/**
 * Basic To Do app stored in local state
 * To do has unique id, text and is done
 * AC:
 * 1) Add 
 * 2) Check as done
 * 3) Delete
 */
const ToDos = () => {
  const [toDos, setToDos] = useState([
    /*
    { id: 1, text: "Get some milk", isChecked: false },
    { id: 2, text: "Clean windows", isChecked: false },
    { id: 3, text: "Do homework", isChecked: true },
    */
  ]);
  const [idCounter, setIdCounter] = useState(0);

  const handleAddToDo = (text) => {
    setIdCounter(idCounter + 1);
    const updatedToDos = [
      ...toDos,
      { id: idCounter, text: text, isChecked: false },
    ];
    setToDos(updatedToDos);
  };

  const handleDeleteToDo = (id) => {
    const updatedToDos = toDos.flatMap((toDo) => (toDo.id === id ? [] : toDo));
    setToDos(updatedToDos);
  };

  const handleUpdateIsChecked = (id, isChecked) => {
    const updatedToDos = toDos.map((toDo) =>
      toDo.id === id ? { ...toDo, isChecked: isChecked } : toDo
    );
    setToDos(updatedToDos);
  };

  return (
    <div>
      <ToDoForm onAddToDo={handleAddToDo} />
      <ToDoList
        toDos={toDos}
        onUpdateIsChecked={handleUpdateIsChecked}
        onDeleteToDo={handleDeleteToDo}
      />
    </div>
  );
};

const ToDoList = ({ toDos, onUpdateIsChecked, onDeleteToDo }) => {
  return toDos.length > 0 ? (
    toDos.map((toDo) => (
      <ToDoItem
        key={toDo.id}
        toDo={toDo}
        onUpdateIsChecked={onUpdateIsChecked}
        onDeleteToDo={onDeleteToDo}
      />
    ))
  ) : (
    <p>No to dos yet...</p>
  );
};

const ToDoItem = ({ toDo, onUpdateIsChecked, onDeleteToDo }) => {
  const handleChecked = (event) => {
    onUpdateIsChecked(toDo.id, event.target.checked);
  };

  return (
    <div>
      <label htmlFor="text">{toDo.text}</label>
      <input
        id="text"
        type="checkbox"
        checked={toDo.isChecked}
        onChange={handleChecked}
      />
      <button onClick={() => onDeleteToDo(toDo.id)}>X</button>
    </div>
  );
};

const ToDoForm = ({ onAddToDo }) => {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddToDo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <input type="submit" value="Add" />
    </form>
  );
};

export default ToDos;
