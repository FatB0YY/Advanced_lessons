import { createSelector } from "@reduxjs/toolkit";

export const selectAllTodos = (state) => state.todos.list;
export const selectActiveFilter = (state) => state.filters;
export const selectTheme = (state) => state.theme;

// Good approach
// две вещи - 1. набор селекторов 2. ф-ция преобразования
// в качестве параметров функция принимает результаты действия селекторов [selectAllTodos, selectActiveFilter]
export const selectTodosByFilter = createSelector(
  [selectAllTodos, selectActiveFilter],
  (allTodos, activeFilter) => {
    if (activeFilter === "all") return allTodos;

    if (activeFilter === "completed") {
      return allTodos.filter((todo) => todo.completed);
    }

    return allTodos.filter((todo) => !todo.completed);
  }
);

// Not optimal approach
export const alternativeSelectTodosByFilter = (state) => {
  const allTodos = state.todos.list;
  const activeFilter = state.filters;

  if (activeFilter === "all") return allTodos;

  if (activeFilter === "completed") {
    return allTodos.filter((todo) => todo.completed);
  }

  return allTodos.filter((todo) => !todo.completed);
};
