// описываем сценарий пользователя на страничке

import { $ } from "@wdio/globals";
import Page from "./page.js";

class HelloPage extends Page {
  get toggleBtn() {
    // return browser.react$
    return $("#toggle");
  }

  get searchInput() {
    // return browser.react$
    return $("#search");
  }

  get helloTitle() {
    // return browser.react$
    return $("#hello");
  }

  async toggleTitleWithInput(text) {
    await this.searchInput.setValue(text);
    await this.toggleBtn.click();
  }

  open() {
    return super.open("/hello");
  }
}

export default new HelloPage();
