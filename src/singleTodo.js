import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import "./singleTodo.css";
import editImg from "./imgs/edit-button.png";
import deleteImg from "./imgs/deleteImg.png";
import checkedImg from "./imgs/checked.png";

function SingleTodo(props) {
  const [isClicked, setisClicked] = useState(false);
  const [taskValue, settaskValue] = useState(props.task);
  const [isFinished, setIsFinished] = useState(false);

  function handleOnClick(e) {
    e.preventDefault();
    props.removeTodo(props.keyValue);
  }

  function handleEditClick(e) {
    e.preventDefault();
    setisClicked(!isClicked);
  }

  function handleOnChange(e) {
    settaskValue(e.target.value);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    props.editTodo(props.keyValue, taskValue);
    setisClicked(!isClicked);
  }
  function handleOnFinished(e) {
    e.preventDefault();
    setIsFinished(!isFinished);
  }

  let renderTask;

  if (isClicked === false) {
    renderTask = (
      <Draggable
        key={props.keyValue}
        draggableId={props.keyValue}
        index={props.index}
      >
        {(provided) => (
          <li
            className="singleTodoBox"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="textArea">
              <div className={isFinished ? "finished" : ""}>{props.task}</div>
              <div className="buttons">
                <button onClick={handleOnClick}>
                  <img className="deleteImg" src={deleteImg}></img>
                </button>
                <button onClick={handleEditClick}>
                  <img className="editImg" src={editImg}></img>
                </button>
                <button onClick={handleOnFinished}>
                  <img className="finishedIcon" src={checkedImg}></img>
                </button>
              </div>
            </div>
          </li>
        )}
      </Draggable>
    );
  } else {
    renderTask = (
      <form className="singleTodoBox" onSubmit={handleOnSubmit}>
        <div className="textArea">
          <input
            type="text"
            onChange={handleOnChange}
            defaultValue={props.task}
          ></input>
          <button>Submit</button>
        </div>
      </form>
    );
  }
  return renderTask;
}

export default SingleTodo;
