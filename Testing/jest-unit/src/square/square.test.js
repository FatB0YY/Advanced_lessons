const square = require("./square");

describe("square", () => {
  let mockValue = null;

  // перед каждым тестом
  beforeEach(() => {
    mockValue = Math.random();
    // добавить в бд пользователя
  });

  // один раз перед всеми тестами
  beforeAll(() => {});

  test("Корректное значение", () => {
    expect(square(2)).toBe(4);

    // число которое получили меньше 5
    expect(square(2)).toBeLessThan(5);

    // число которое получили больше 3
    expect(square(2)).toBeGreaterThan(3);

    // не равно undefined
    expect(square(2)).not.toBeUndefined();
  });

  test("Корректное значение 2", () => {
    const spyMathPow = jest.spyOn(Math, "pow");

    square(2);
    // считаем скока раз вызвался Math.pow
    expect(spyMathPow).toBeCalledTimes(1);
  });

  test("Корректное значение 3", () => {
    const spyMathPow = jest.spyOn(Math, "pow");

    square(1);
    // считаем скока раз вызвался Math.pow
    expect(spyMathPow).toBeCalledTimes(0);
  });

  afterEach(() => {
    // убрать из бд пользователя
    // очищение моков
    jest.clearAllMocks();
  });

  afterAll(() => {
    // общие очищающие действия
  });
});
