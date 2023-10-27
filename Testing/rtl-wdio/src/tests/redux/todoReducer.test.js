import todoReducer from "../../store/reducers/todoReducer";
import { fetchTodos } from "../../store/async/TodoAsyncThunks";

const initialState = {
  todos: [],
  status: null,
  error: null,
};

describe("todoSlice extra", () => {
  test("Проверка fetchTodos.pending", () => {
    const state = todoReducer(initialState, fetchTodos.pending());

    expect(state.status).toBe("loading");
    expect(state.error).toBeNull();
  });
  test("Проверка fetchTodos.fulfilled", () => {
    const mockTodos = [
      {
        id: 1,
        title: "Redux",
        completed: false,
        userId: 1,
      },
    ];

    // могли сделать и так
    // const action = {
    //   type: "fetchTodos.fulfilled.type",
    //   payload: todos,
    // };

    const state = todoReducer(initialState, fetchTodos.fulfilled(mockTodos));

    expect(state).toEqual({
      todos: mockTodos,
      status: "resolved",
      error: null,
    });
  });
  test("Проверка fetchTodos.rejected", () => {
    // const state = todoReducer(initialState, fetchTodos.rejected("Cant fetch"));

    const action = {
      type: fetchTodos.rejected.type,
      payload: "Cant fetch",
    };

    const state = todoReducer(initialState, action);

    expect(state).toEqual({
      todos: [],
      status: "rejected",
      error: "Cant fetch",
    });
  });
});
