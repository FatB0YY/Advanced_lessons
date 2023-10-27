// описываем сценарий пользователя на страничке

import { $ } from "@wdio/globals";
import Page from "./page.js";

class UserPage extends Page {
  get loadingTitle() {
    return $("#users-loading");
  }

  get usersList() {
    return $("#users-list");
  }

  get userItems() {
    return browser.react$$("User2");
  }

  async loadData() {
    try {
      await this.open();
      await this.loadingTitle.waitForDisplayed({
        timeout: 2000,
      });
      await this.usersList.waitForDisplayed({
        timeout: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async userDelete() {
    try {
      const usersCount = await this.userItems.length;

      if (!usersCount) {
        throw new Error("пользователи не найдены");
      }

      await this.userItems[0].$("#user-delete").click();

      const usersCountAfterDelete = await this.userItems.length;

      if (usersCount - usersCountAfterDelete !== 1) {
        throw new Error("Ошибка удаления");
      }
    } catch (error) {
      console.log(error);
    }
  }

  open() {
    return super.open("/user-test");
  }
}

export default new UserPage();
