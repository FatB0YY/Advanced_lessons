import { expect } from "@wdio/globals";
import UserPage from "../../test/pageobjects/user.page";

describe("User page", () => {
  it("load data", async () => {
    await UserPage.loadData();
  });

  it("delete user", async () => {
    await UserPage.loadData();
    await UserPage.userDelete();
  });
});
