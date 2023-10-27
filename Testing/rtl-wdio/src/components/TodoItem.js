import React from "react";
import { useDispatch } from "react-redux";
import { toggleComplete, removeTodo } from "../store/reducers/todoReducer";

const TodoItem = ({ id, text, completed }) => {
  const dispatch = useDispatch();

  return (
    <li data-testid="liTodoListTest">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleComplete(id))}
      />
      <span>{text}</span>
      <span onClick={() => dispatch(removeTodo(id))} role="button">
        -
      </span>
    </li>
  );
};

export default TodoItem;
