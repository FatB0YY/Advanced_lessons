import React from "react";
import TodoList from "../components/TodoList";

const MainPage = () => {
  return (
    <div data-testid="main-page">
      main page <TodoList />
    </div>
  );
};

export default MainPage;
