import React, { useState } from "react";
import SingleTodo from "./singleTodo";
import NewTodo from "./formTodo";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./TodoList.css";

function TodoList() {
  const TodoPile = [
    { key: uuidv4(), listItem: "Walk the dog" },
    { key: uuidv4(), listItem: "Take out the trash" },
    { key: uuidv4(), listItem: "Eat Dinner" },
  ];
  const [Todos, setTodos] = useState(TodoPile);
  const [TodoPos, updateTodoPos] = useState(Todos);

  function addTodos(newItem) {
    updateTodoPos([...TodoPos, { key: uuidv4(), listItem: newItem }]);
  }

  function removeTodo(selectedKey) {
    const newList = TodoPos.filter((item) => item.key !== selectedKey);
    updateTodoPos(TodoPos.filter((item) => item.key != selectedKey));
    console.log(newList);
    console.log(selectedKey);
  }
  function editTodo(selectedKey, newItem) {
    const emptyList = [];
    TodoPos.map((item) => {
      if (item.key != selectedKey) {
        emptyList.push(item);
      }
      if (item.key === selectedKey) {
        emptyList.push({ key: selectedKey, listItem: newItem });
      }
    });
    // const newList = Todos.filter((item) => item.key !== selectedKey);
    updateTodoPos(emptyList);
    // setTodos([...newList, { key: selectedKey, listItem: newItem }]);
  }

  function handleOnDragEnd(result) {
    const items = Array.from(TodoPos);
    const [reorderItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItems);
    console.log(result);

    updateTodoPos(items);
  }
  const render = TodoPos.map((item, index) => (
    <SingleTodo
      index={index}
      task={item.listItem}
      keyValue={item.key}
      removeTodo={removeTodo}
      editTodo={editTodo}
    />
  ));

  return (
    <div>
      <h1 className="todoTitle">TodoList</h1>
      <div className="boardContainer">
        <div className="newTodoBox">
          <h1 className="newTodoTitle">Create a new task here</h1>
          <NewTodo addTodos={addTodos} />
        </div>
        <div className="scrollableBox">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="List">
              {(provided) => (
                <ul
                  className="List"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {render}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default TodoList;
