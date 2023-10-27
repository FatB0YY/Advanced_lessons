import { fetchTodos } from "../../store/async/TodoAsyncThunks";

// мокаем
global.fetch = jest.fn();

describe("todoThunk", () => {
  test("Проверка fetchTodos с resolved ответом", async () => {
    const mockTodos = [
      {
        id: 1,
        title: "Redux",
        completed: false,
        userId: 1,
      },
    ];

    // обычная работа с fetch
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    });

    const dispatch = jest.fn();
    const thunk = fetchTodos();

    await thunk(dispatch, () => ({ name: "r o d i o n" }));

    // это массив, в нем два других вложенных массива. Каждый влож. массив - вызов
    // например type: 'todos/fetchTodos/pending'
    expect(dispatch.mock.calls).toHaveLength(2);

    const [start, end] = dispatch.mock.calls;

    expect(start[0].type).toBe(fetchTodos.pending().type);

    expect(end[0].type).toBe(fetchTodos.fulfilled().type);
    expect(end[0].payload.data).toBe(mockTodos);
  });
  test("Проверка fetchTodos с rejected ответом", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();
    const thunk = fetchTodos();

    await thunk(dispatch, () => ({ name: "r o d i o n" }));

    expect(dispatch.mock.calls).toHaveLength(2);

    const [start, end] = dispatch.mock.calls;

    // {type: payload, meta, error: {message: 'Rejected'}}

    expect(start[0].type).toBe(fetchTodos.pending().type);
    expect(end[0].type).toBe(fetchTodos.rejected().type);
    expect(end[0].payload).toBe("Cant fetch");
    expect(end[0].meta.rejectedWithValue).toBe(true);
  });
});

// function fetchTodos2() {
//   return function (dispatch, getState) {}; // это thunk
// }
