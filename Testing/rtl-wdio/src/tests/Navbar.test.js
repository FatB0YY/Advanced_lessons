import { renderWithRouter } from "./helpers/renderWithRouter";
import Navbar from "../Navbar.js";

describe("NAVBAR TESTS", () => {
  // для каждой ссылки отдельный тест (по хорошему)
  test("test", async () => {
    render(renderWithRouter(<Navbar />));

    const mainLink = screen.getByTestId("main-link");
    const aboutLink = screen.getByTestId("about-link");
    const userLink = screen.getByTestId("user-link");

    userEvent.click(mainLink);
    expect(screen.getByTestId("main-link")).toBeInTheDocument();

    userEvent.click(aboutLink);
    expect(screen.getByTestId("about-link")).toBeInTheDocument();

    userEvent.click(userLink);
    expect(screen.getByTestId("user-link")).toBeInTheDocument();
  });
});
