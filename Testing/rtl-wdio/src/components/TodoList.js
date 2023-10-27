import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectTodos } from "../store/selector";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useSelector(selectTodos);
  return (
    <ul data-testid="ulTodoListTest">
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

export default TodoList;
