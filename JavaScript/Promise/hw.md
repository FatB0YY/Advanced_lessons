# Promise API

Задания по темам интенсива: Promise API

## sleep

```js
// Необходимо написать функцию возвращающую Promise, который зарезолвится через заданное количество миллисекунд

async function sleep(ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

sleep(200).then(() => {
  console.log("Я проснулся!");
});
```

## rejectAfterSleep

```js
// Необходимо написать функцию возвращающую Promise, который зареджектится через заданное количество миллисекунд.
// Вторым аргументов функция принимает объект ошибки.

async function rejectAfterSleep(ms, error) {
  return new Promise((resolve, reject) => setTimeout(reject(error), ms));
}

rejectAfterSleep(200, "boom!").catch((err) => {
  console.log(err);
});
```

## timeout

```js
// Необходимо написать функцию, которая принимает объект Promise и некоторое количество миллисекунд
// и возвращает новый Promise.
// Если переданный Promise не успевает зарезолвится до истечения этого времени,
// то результирующий Promise должен быть отклонён с ошибкой new Error('Timeout').

async function timeout(promise, ms) {
  return Promise.race([
    promise,
    sleep(ms).then(() => Promise.reject("Timeout!!!")),
  ]);
}

timeout(fetch("url"), 500).then(console.log, console.log);
```

## all

> Необходимо написать функцию, которая идентична Promise.all (без внутренней очереди).

```js
async function myAll(iterable) {
  const results = [];

  for (let promise of iterable) {
    try {
      const result = await Promise.resolve(promise);
      results.push(result);
    } catch (error) {
      throw new Error("error: " + error);
    }
  }

  return results;
}
```

## allSettled

> Необходимо написать функцию, которая идентична Promise.allSettled.

```js
async function myAllSettled(iterable) {
  const results = [];

  for (let promise of iterable) {
    try {
      const result = await Promise.resolve(promise);

      results.push({
        value: result,
        reason: null,
        status: "fulfilled",
      });
    } catch (error) {
      results.push({
        value: null,
        reason: new Error(error),
        status: "rejected",
      });
    }
  }

  return results;
}
```

## race

> Необходимо написать функцию, которая идентична Promise.race.

```js
function myRace(iterable) {
  return new Promise((resolve, reject) => {
    for (let promise of iterable) {
      Promise.resolve(promise).then(resolve).catch(reject);
    }
  });
}
```

## once

> Необходимо написать функцию, которая бы добавлял обработчик события на заданный элемент и возвращала Promise.
> Promise должен зарезолвиться при срабатывании события. В качестве значения Promise должен возвращать объект события.

```js
async function once(el, event) {
  return new Promise((resolve) => {
    el.addEventListener(event, resolve, { once: true });
  });
}

once(document.body, "click").then((e) => {
  console.log(e);
});
```

## promisify

```js
// Необходимо написать функцию, которая бы принимала функцию ожидающую callback и возвращала новую функцию.
// Новая функция вместо callback должна возвращать Promise.
// Предполагается, что исходная функция принимает callback последним параметром,
// т. е. если функция принимает другие аргументы,
// то они идут ДО callback. Сам callback первым параметром принимает объект ошибки или null,
// а вторым возвращаемое значение (если нет ошибки).

function promisify(originalFunc) {
  return function (...args) {
    // возвращает функцию-обёртку
    return new Promise((resolve, reject) => {
      function callback(err, result) {
        // наш специальный колбэк для originalFunc
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // добавляем колбэк в конец аргументов f

      originalFunc.call(this, ...args); // вызываем оригинальную функцию
    });
  };
}

function openFile(file, cb) {
  fs.readFile(file, cb);
}

const openFilePromise = promisify(openFile);

openFilePromise("foo.txt").then(console.log, console.error);
```

## allLimit

```js
// Необходимо написать статический метод для Promise, который бы работал как Promise.all,
// но с возможностью задания лимита на выполнения "одновременных" задач.
// В качестве первого параметра, метод должен принимать Iterable объект с функциями, которые возвращают Promise.
// Сам метод также возвращает Promise.

// Одновременно может быть не более 2-х запросов
allLimit(
  [
    fetch.bind(null, "url1"),
    fetch.bind(null, "url2"),
    fetch.bind(null, "url3"),
    fetch.bind(null, "url4"),
  ],
  2
).then(([data1, data2, data3, data4]) => {
  console.log(data1, data2, data3, data4);
});
```

## abortablePromise

```js
// Необходимо написать функцию, которая принимала бы некоторый Promise и экземпляр AbortController и
// возвращала бы новый.
// Этот промис можно отменить с помощью использования переданного AbortController. При отмене промис режектится.

if ("AbortController" in window) {
  function abortablePromise(promise, signal) {
    return new Promise((resolve, reject) => {
      if (signal.aborted) {
        reject(new DOMException("Operation aborted", "AbortError"));
      }

      const abortHandler = () => {
        reject(new DOMException("Operation aborted", "AbortError"));
        signal.removeEventListener("abort", abortHandler);
      };

      signal.addEventListener("abort", abortHandler);

      promise.then(resolve).catch(reject);
    });
  }

  var controller = new AbortController();
  var signal = controller.signal;
  var p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise resolved");
    }, 1000);
  });

  abortablePromise(p, signal)
    .then(console.log)
    .catch((error) => {
      if (error.name === "AbortError") {
        console.log("Fetch request aborted");
      } else {
        console.error("Fetch request failed:", error);
      }
    });

  // Имитация отмены запроса через 1 секунду
  setTimeout(() => {
    controller.abort();
  }, 500);
} else {
  // Используем альтернативное решение или продолжаем без отмены операций
}
```

## nonNullable

```js
// Нужно написать функцию, которая принимает функцию и возвращает новую.
// Новая функция в качестве результата возвращает Promise.
// Если новой функции передать null в качестве аргументов, то промис должен быть зареджекчен.

function nonNullable(originalFunc) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      if (args.some((arg) => arg === null)) {
        reject(new Error("Arguments cannot be null"));
      } else {
        resolve(originalFunc(...args));
      }
    });
  };
}

function sum(a, b) {
  return a + b;
}

function prod(a, b) {
  return a * b;
}

const sum2 = nonNullable(sum);
const prod2 = nonNullable(prod);

prod2(10, null)
  .then((result) => {
    console.log("Result:", result);
    return sum2(result, 5);
  })
  .then((finalResult) => {
    console.log("Final Result:", finalResult);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
```

## fetchWithRetryN

```js
// написать ф-цию, которая fetch, но если запрос отвалился (reject),
// он может быть перезапрошен n раз.

async function fetchWithRetryN(cb, tries) {
  return cb().catch((err) => {
    if (tries <= 0) {
      return Promise.reject(err); // или throw err
    }

    tries--;
    return fetchWithRetryN(cb, tries);
  });
}

fetchWithRetryN(() => fetch("foo.com", 3)).then(console.log, console.error);
```

## fetchWithRetry

```js
// Необходимо написать обертку для fetch, с возможностью "перезапроса" в случае неудачи.
// Функция должна принимать параметр-функцию, которая получает какой по счету перезапрос и возвращать количество мс
// до следующего перезапроса или false. Если функция вернула false, то Promise запроса режектится с исходной ошибкой.

async function fetchWithRetry(url, options) {
  const { retry } = options;
  let i = 0;

  while (true) {
    try {
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      i++;
      const delay = retry(i);
      if (delay === false || i >= 5) {
        throw new Error(error);
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// или

async function fetchWithRetry(url, options) {
  const { retry } = options;
  let i = 0;

  return new Promise((resolve, reject) => {
    const tryFetch = () => {
      fetch(url)
        .then((response) => {
          resolve(response.json());
        })
        .catch((error) => {
          i++;
          const delay = retry(i);
          if (delay === false || i >= 5) {
            reject(error);
          } else {
            setTimeout(tryFetch, delay);
          }
        });
    };

    tryFetch();
  });
}

fetchWithRetry("https://jsonplaceholderr.typicode.com/todos/1", {
  retry: (i) => {
    if (i < 5) {
      return i * 1e3;
    }
    return false;
  },
})
  .then((response) => {
    console.log("Успешный ответ:", response);
  })
  .catch((error) => {
    console.error("Ошибка:", error);
  });
```

## syncPromise

syncPromise: [github.com/V4Fire/Core/blob/master/src/core/prelude/structures/sync-promise/index.ts](https://github.com/V4Fire/Core/blob/master/src/core/prelude/structures/sync-promise/index.ts)

```js
// Необходимо написать функцию, которая по своему интерфейсу идентична конструктору Promise,
// но возвращала бы объект, в котором методы then, catch и finally выполнятся немедленно,
// если промис уже зарезолвлен.
// Семaнтика работы методов в остальном должны быть идентична нативным промисам.

// Порядок в консоли: 1 2
https: syncPromise((resolve) => resolve(1)).then(console.log);
console.log(2);
```
