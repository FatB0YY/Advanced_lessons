import { selectTodos } from "../../store/selector";

describe("redux selectors", () => {
  test("Проверяем с пустым знач", () => {
    expect(selectTodos({})).toBe(0);
  });

  test("Проверяем правильную работу селекторов", () => {
    const todos = [{ id: 123, text: "Redux", completed: false }];
    const result = selectTodos({ todos: todos });
    expect(result).toEqual(todos);
  });
});
