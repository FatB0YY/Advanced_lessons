import TodoList from "../components/TodoList";
import { render } from "@testing-library/react";
// import { useSelector } from "react-redux";
import * as reduxHooks from "react-redux";

jest.mock("react-redux");

describe("TodoList", () => {
  test("Создание компонента TodoList с пустым todos", () => {
    // useSelector.mockReturnValue([]);
    jest.spyOn(reduxHooks, "useSelector").mockReturnValue([]);

    const component = render(<TodoList />);

    expect(component).toMatchSnapshot();
  });

  const todos = [
    { id: 1234, text: "Redux", completed: false },
    { id: 12345, text: "Redux 2", completed: true },
  ];

  test("Создание компонента TodoList какими то айтамами", () => {
    // useSelector.mockReturnValue(todos);
    jest.spyOn(reduxHooks, "useSelector").mockReturnValue(todos);

    const component = render(<TodoList />);

    expect(component).toMatchSnapshot();
  });
});
