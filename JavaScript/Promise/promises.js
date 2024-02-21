// ф-ция, которая открывает файл. (
// function openFile(path, onSuccess, onError) {}
// что делать если завершится с неудачей?  - Второй колбэк
openFile(
  "file.txt",
  (content) => {
    console.log(content);
  },
  (err) => {
    console.log(err);
  }
);

function openFile(path, cb) {}

// в NodeJS немного по другому
openFile("file.txt", (err, content) => {
  try {
    if (err) {
      throw new Error(err);
    }

    console.log(content);
  } catch (error) {
    console.log(error);
  }
});

/*
    1. В асинхронном коде нельзя использовать простой try-catch для перехвата исключений, 
    которые возникают в колбэках или промисах. Это происходит потому, что асинхронный код
    выполняется после завершения синхронного кода, и стек вызовов уже не будет содержать 
    контекста try-catch, когда возникнет исключение.. 
    Т.е мы не можем обернуть openFile() в try catch.
    Конечно, если мы сами throw new Error, тогда ошибка будет отловлена.
    Потому что cb будет вызван не сейчас, а когда-то потом.
    Однако можно сделать вложенный try catch.
*/

// нормализуем.
function normalize(content) {}

// ф-ция, считающая хеш.
function genHash(content, cb) {}

// отправка данных.
function fetch(url, cb) {}

// сохраняем на файл.
function writeFile(path, data, cb) {}

// 1. Открыть файл
// 2. Нормализовать содержимое файла
// 3. Подсчитать посчитать хеш от содержимого
// 4. Сделать запрос и передать хеш
// 5. Записываем содержимое ответа на ФС

function doWork(path) {
  openFile(path, (err, content) => {
    if (err) {
      console.error(err);
      return;
    }

    try {
      content = normalize(content);
      genHash(content, (err, hash) => {
        if (err) {
          console.error(err);
          return;
        }

        fetch(`/fpp?hash=${hash}`, (err, data) => {
          if (err) {
            console.error(err);
            return;
          }

          writeFile(path, data, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        });
      });
    } catch (error) {
      console.error(error);
      return;
    }
  });
}

function doWork2(path) {
  // { then } // { then }
  // pending
  // fulfilled
  // rejected
  openFile(path)
    // fulfilled
    .then(
      (content) => {
        return genHash(normalize(content));
        // return 1;
      }
      // rejected
      // (err) => {
      //   console.error(err);
      //   return 2;
      // }
    )
    // если reject то data === 2, если fulfilled то data === 1

    // если из then возвращается  значение, которое явл promise,
    // то след. then будет получать распакованное значение promise'а,
    // в случае успеха - hash.
    // -------------------------------
    // если rejected и нет обработчика, то все послед будут находится в состоянии
    .then((hash) => {
      // console.log(data === 1);
      return fetch(`/fpp?hash=${hash}`);
    })
    .then((data) => writeFile(path, data))
    .catch((err) => console.log(err));
}

// и then и catch всегда возвращают новый промис.

// результатом всегда будет promise
async function doWork3(path) {
  // return 1 - resolve(1) грубо говоря.
  try {
    const content = await openFile(path);
    const hash = await genHash(normalize(content));
    const data = await fetch(`/fpp?hash=${hash}`);
    return await writeFile(path, data);
  } catch (error) {
    console.log(error);
  }
  // обработка ошибок делается стандартным способом try catch
}

// как создать функцию, которая возвращает промис
async function get2() {
  return 2;
}

get2().then(console.log);

////////

setTimeout(() => {
  console.log(1);
}, 100);

async function sleep(ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

sleep(2).then(() => {});

////////

function stringify(obj) {
  return new Promise((resolve, reject) => resolve(JSON.stringify(obj)));
}

stringify({ a: 1 }).then((str) => console.log(str));

////////

async function stringify2(obj) {
  return JSON.stringify(obj);
}

const str = await stringify2({ a: 1 });

////////

// авто реджект только синхронный код!!!
new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      // addEventListenerR специально
      window.addEventListenerR("sd", () => {});
    } catch (error) {
      // здесь вручную все делаем
      reject(e);
    }
  }, 100);
});

//////// утечка памяти
// не стоит использовать async cb как параметр конструктора промиса
// а если использовать, то обрабатывать ошибку!!!
new Promise(async (resolve) => {
  window.addEventListenerR("sd", () => {});

  resolve(1);
});

new Promise((resolve, reject) => {
  new Promise((r) => {
    window.addEventListenerR("sd", () => {});

    r(1);
  }).then(resolve, reject);
});

// делаем так:

new Promise(async (resolve, reject) => {
  try {
    window.addEventListenerR("sd", () => {});

    resolve(1);
  } catch (error) {
    reject(error);
  }
});

////////

new Promise((r) => r((1).round()))
  .then((v) => v + 2)
  .then((v) => v * 2)
  .catch((err) => 10) // вернет fulfilled promise
  .then((v) => v + 1);

// разница между catch и вторым параметром then

new Promise((r) => r(1))
  .then(
    (v) => (v + 2).round2(),
    // эта функция не вызовется, потому что она вызывается только если какой-то
    // из родительских промисов находится в состоянии rejected.
    (err) => 1
  )
  .catch((err) => 1) // вот здесь вызовется в обоих случаях, в любом.
  .then((v) => v * 2);

//////// промис никак не обрабатывает ошибку

window.addEventListener("unhandledrejection", (err) => {});

//////// finally

new Promise((r) => r(1)).finally(() => {});

new Promise((r) => r(1)).finally(() => 34345).then((res) => console.log(res)); // 1

new Promise((r, rj) => rj(1))
  .finally(() => 34345)
  .catch((err) => console.log(err)); // не делает fulfilled

//////////////////////////////////////////////////////// статические методы

Promise.resolve(Promise.resolve(Promise.resolve(1))).then((v) => v + 1); // 2

////////

const p = Promise.resolve(1);

Promise.resolve(p) === p;

////////

Promise.reject(Promise.resolve(2)).catch((err) => err.then()); // не происходит раскрытие промиса

//////// all

Promise.all([1, Promise.resolve(2), Promise.reject(3)]).catch((err) =>
  console.log(err)
);

//////// allSettled

Promise.allSettled([1, 2]).then(([a, b]) => {
  if (a.status === "fulfilled") {
    console.log(a.value);
  }

  if (a.status === "rejected") {
    console.log(a.reason);
  }
});

//////// race

Promise.race([sleep(100).then(() => 10), sleep(200).then(() => 20)]).then(
  (res) => {
    console.log(res); // первый промис
  }
);

//

Promise.race([doAction(), sleep(200).then(() => Promise.reject("Timeout!!!"))]);

// any

Promise.any([]);

// AggregateError
Promise.any([Promise.reject(new Error("some error"))]).catch((e) => {
  console.log(e instanceof AggregateError); // true
  console.log(e.message); // All promises rejected...
  console.log(e.name); // "AggregateError"
  console.log(e.error); // [Error: "some error"]...
});

////////////////////////////////////////////////////////
// new Promise((resolve, reject) => {
//   // resolve(1)
//   reject(2)
// }).then(
//   (data) => {
//   return data
// },
// (error) => {
//   return `Error occurred:' ${error}`
// })

// .then((data) => {
//   console.log(data)
//   return data
// },
// (error) => {
//   return `Error occurred2:' ${error}`
// })

// .catch((err) => {
//   console.log('final!!!', err)
// })

// Error occurred:' 2 - на выходе
////////////////////////////////////////////////////////
