const delay = require("./delay.js");

describe("delay", () => {
  test("Корректное значение", async () => {
    const sum = await delay(() => 5 + 5, 500);
    expect(sum).toBe(10);
  });
});
