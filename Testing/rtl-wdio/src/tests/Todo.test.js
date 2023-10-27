import React from "react";
import { fireEvent } from "@testing-library/react";
import { toggleComplete } from "../store/reducers/todoReducer";
import TodoList from "./TodoList";
import { renderWithStore } from "./helpers/renderWithStore";

describe("TodoList and TodoItem", () => {
  test("renders a list of todos", () => {
    const { getByTestId } = renderWithStore(<TodoList />, {
      todos: [
        { id: 1, text: "Test todo 1", completed: false },
        { id: 2, text: "Test todo 2", completed: true },
      ],
    });

    const ulTodoListTest = getByTestId("ulTodoListTest");
    expect(ulTodoListTest).toBeInTheDocument();

    const todoItems = ulTodoListTest.querySelectorAll(
      '[data-testid="liTodoListTest"]'
    );
    expect(todoItems).toHaveLength(2);
  });

  test("toggles todo completion when the checkbox is clicked", () => {
    const { getByTestId } = renderWithStore(<TodoList />, {
      todos: [
        { id: 1, text: "Test todo 1", completed: false },
        { id: 2, text: "Test todo 2", completed: true },
      ],
    });

    const checkbox = getByTestId("liTodoListTest").querySelector(
      'input[type="checkbox"]'
    );

    fireEvent.click(checkbox);

    expect(store.getActions()).toContainEqual(toggleComplete(1));
  });
});
