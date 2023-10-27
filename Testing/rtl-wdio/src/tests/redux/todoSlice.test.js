import todoReducer, {
  addTodo,
  removeTodo,
  toggleComplete,
} from "../../store/reducers/todoReducer.js";

describe("todoSlice reducers", () => {
  test("Проверяем, что возвращается дефолтный стейт", () => {
    const result = todoReducer(undefined, { type: "" });

    expect(result).toEqual({
      todos: [],
      status: null,
      error: null,
    });
  });

  test("Проверяем правильную работу addTodo", () => {
    const action = { type: addTodo.type, payload: "Redux" };

    const result = todoReducer([], action);

    expect(result[0].text).toBe("Redux");
    expect(result[0].completed).toBe(false);
  });

  test("Проверяем правильную работу toggleComplete", () => {
    const todos = [{ id: 1234, text: "Redux", completed: false }];
    const action = { type: toggleComplete.type, payload: 1234 };

    const result = todoReducer(todos, action);

    expect(result[0].completed).toBe(true);
  });

  test("Проверяем правильную работу removeTodo", () => {
    const todos = [{ id: 1234, text: "Redux", completed: false }];
    const action = { type: removeTodo.type, payload: 1234 };

    const result = todoReducer(todos, action);

    expect(result).toEqual([]);
  });
});
