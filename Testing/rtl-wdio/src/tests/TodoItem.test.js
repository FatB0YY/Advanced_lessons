import TodoItem from "../components/TodoItem";
import * as reduxHooks from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import * as actions from "../store/reducers/todoReducer";

jest.mock("react-redux");

describe("TodoItem", () => {
  test("создание TodoItem", () => {
    const component = render(
      <TodoItem id={123} text="Redux" completed={false} />
    );

    jest.spyOn(reduxHooks, "useDispatch").mockReturnValue(jest.fn());

    expect(component).toMatchSnapshot();
  });

  test("диспатч экшены toggleComplete", () => {
    const dispatch = jest.fn();

    jest.spyOn(reduxHooks, "useDispatch").mockReturnValue(dispatch);
    const mockedToggleComplete = jest.spyOn(actions, "toggleComplete");

    render(<TodoItem id={123} text="Redux" completed={false} />);

    fireEvent.click(screen.getByRole("checkbox"));

    // expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(mockedToggleComplete).toHaveBeenCalledWith(123);
  });
});
