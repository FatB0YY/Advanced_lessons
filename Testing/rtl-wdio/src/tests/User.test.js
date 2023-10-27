import { render, screen, fireEvent } from "@testing-library/react";
import User from "../components/User";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AppRouter from "../router/AppRouter";
import { renderWithRouter } from "./helpers/renderWithRouter";
import axios from "axios";

jest.mock("axios");

describe("USER TEST", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders learn react link", () => {
    render(<User />);

    let response = null;

    beforeAll(() => {
      response = {
        data: [
          {
            id: 1,
            name: "Leanne Graham",
          },
          {
            id: 2,
            name: "Ervin Howell",
          },
          {
            id: 3,
            name: "Clementine Bauch",
          },
        ],
      };
    });

    test("test redirect to details page", async () => {
      axios.get.mockReturnValue(response);

      render(renderWithRouter(<User />, "/users"));
      const users = await screen.findAllByTestId("user-item");
      expect(users.length).toBe(3);
      userEvent.click(users[0]);
      expect(screen.getAllByTestId("user-page")).toBeInTheDocument();
      screen.debug();
    });
  });
});
