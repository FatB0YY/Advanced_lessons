import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { render } from "@testing-library/react";

export const renderWithStore = (component, initialState) => {
  const mockStore = configureStore();
  const store = mockStore(initialState);

  return render(<Provider store={store}>{component}</Provider>);
};
