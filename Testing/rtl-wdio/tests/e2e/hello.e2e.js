import { expect } from "@wdio/globals";
import HelloPage from "../../test/pageobjects/hello.page.js";

describe("My Hello World Page", () => {
  it("test", async () => {
    await HelloPage.open();
    await HelloPage.toggleTitleWithInput("hello");
    await expect(HelloPage.helloTitle).toBeExisting();
    await HelloPage.toggleBtn.click();
    await expect(HelloPage.helloTitle).not.toBeExisting();
  });
});
