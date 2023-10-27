const mapArrToString = require("./mapArrToString");

describe("mapArrToString", () => {
  test("Корректное значение", () => {
    // сравнить именно содержимое объекта
    expect(mapArrToString([1, 2, 3])).toEqual(["1", "2", "3"]);
  });

  test("Мешанина", () => {
    // сравнить именно содержимое объекта
    expect(mapArrToString([1, 2, 3, null, undefined, "rfrf"])).toEqual([
      "1",
      "2",
      "3",
    ]);
  });

  test("Пустой массив", () => {
    // сравнить именно содержимое объекта
    expect(mapArrToString([])).toEqual([]);
  });

  test("Отрицание", () => {
    // сравнить именно содержимое объекта
    expect(mapArrToString([1, 2, 3])).not.toEqual([1, 2, 3, 4]);
  });
});
