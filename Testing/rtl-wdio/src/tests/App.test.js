import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

describe("TEST APP", () => {
  test("renders learn react link", () => {
    render(<App />);
    const helloWorldElem = screen.getByText(/Hello world/i);
    const btn = screen.getByRole("button");
    const input = screen.getByPlaceholderText(/input value/i);

    expect(helloWorldElem).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(input).toBeInTheDocument();

    expect(input).toMatchSnapshot();

    screen.debug();
  });

  test("renders learn react link2", () => {
    render(<App />);
    const helloWorldElem2 = screen.queryByText(/hello2/i);
    expect(helloWorldElem2).toBeNull();
  });

  test("renders learn react link3", async () => {
    render(<App />);
    screen.debug();
    const helloWorldElem3 = await screen.findByText(/data/i);
    expect(helloWorldElem3).toBeInTheDocument();
    // expect(helloWorldElem3).toHaveStyle({ color: "red" });
    screen.debug();
  });

  test("CLICK EVENT", () => {
    render(<App />);
    const btn = screen.getByTestId("toggle-btn");

    expect(screen.queryByTestId("toggle-elem")).toBeNull();

    fireEvent.click(btn);

    expect(screen.queryByTestId("toggle-elem")).toBeInTheDocument();

    fireEvent.click(btn);

    expect(screen.queryByTestId("toggle-elem")).toBeNull();
  });

  test("INPUT EVENT", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/input value/i);

    expect(screen.getByTestId("value-elem")).toContainHTML("");

    // искусственные события
    // fireEvent.input(input, { target: { value: "12345" } });

    userEvent.type(input, "123123");

    expect(screen.getByTestId("value-elem")).toContainHTML("123123");
  });
});
