import React, { useState } from "react";
import "./formTodo.css";
function NewTodo({ addTodos }) {
  const [newItem, setNewItem] = useState("");
  function handleOnChange(e) {
    setNewItem(e.target.value);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    addTodos(newItem);
    setNewItem("");
  }
  return (
    <div className="newTodo">
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          id="newItem"
          onChange={handleOnChange}
          value={newItem}
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default NewTodo;
