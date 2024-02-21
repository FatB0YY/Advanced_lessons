// 1. написать ф-цию, которая fetch, но если запрос отвалился (reject),
// он может быть перезапрошен n раз.

async function fetchWithRetry(cb, tries) {
  return cb().catch((err) => {
    if (tries <= 0) {
      return Promise.reject(err); // или throw err
    }

    tries--;
    return fetchWithRetry(cb, tries);
  });
}

fetchWithRetry(() => fetch("foo.com", 3)).then(console.log, console.error);

// 2. есть обработчик, должен выполниться только один раз.
// проблемы в данном коде:
// - в браузере есть глобальный супер объект EventTarget, а в NodeJS нет его, там другое.
// императивный код, а можно написать декларативный
// не универсальный
// const el1 = document.querySelector("div");
// el1.addEventListener(
//   "click",
//   (e) => {
//     console.log(3);
//   },
//   { once: true }
// );

async function on(el, event) {
  return new Promise((resolve) => {
    el.addEventListener(event, resolve, { once: true });
  });
}

on(el1, "click").then(() => {
  console.log("Произошел клик!");
});

// выполнить код, после того, как произошел другой код. task: открытие файла, таймер и все такое
function logAfter(task) {
  task.then(() => console.log("log"));
}

logAfter(on(el1, "click"));
logAfter(openFile("file.txt"));

// 3. есть массив индексов
// универсальное API для таких вот штук, не только асинк код
[1, 2, 3, 4].indexOf(45).then(
  () => {},
  () => {}
);

// then всегда выполняется "потом", в случае с indexOf это не то, что мы ожидаем.
// в идеале такой интерфейс, но мог бы работать как промис.
