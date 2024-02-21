// Ошибки

// Рисунок 1 – Пример ошибки несоблюдения синтаксических контрактов.
// function error(){
//     console.log('error')

// Рисунок 2 – Пример ошибки Out of memory.
const obj = {};
for (let i = 0; i < 1e10; i++) {
  obj[i] = "a-z".repeat(i);
}
console.log(ovj[1000]);

// Исключения

// Рисунок 3 – Пример исключения.
Number(10.1).meth();

// Рисунок 4 – Обработка исключений.
try {
  Number(10.1).bla();
} catch (error) {
  console.log(error);
}

// Рисунок 5 – Пример второй. Ничего не будет выведено.
function foo1() {
  function foo2() {
    Number(10.1).meth();
  }

  fooError();
  console.log(1);
}

foo1();
console.log(2);

// Обработка. Код выведется 1 и 2
try {
  fooError();
} catch (error) {}
console.log(1);

// Еще раз вызываем fooError. Там исключение никто не перехватил, снова будет исключение.
try {
  fooError();
} catch (error) {
  fooError();
}
console.log(1);

// Пример string -> string
function fread(path) {
  if (fexist(path)) {
    throw new Error("no file");
  }

  return "";
}

function foo() {
  function bar() {
    throw 1;
  }

  bar();
  bar();

  return 1;
}

try {
  const a = fread("text.txt");
} catch (val) {
  const a = val; // new Error('no file')
}

// 3. Подклассы Error (см word)
/////////////////////// 4.	Создание своих типов ошибок
/**
 *
 * @param {*} val
 * @param {*} arr
 * @returns
 *
 * @throws IndexOfError
 */
function indexOf(val, arr) {
  const pos = arr.indexOf(val);

  if (pos === -1) {
    throw new IndexOfError(val);
  }

  return pos;
}

// проблемы и неудобства:
// 1. большая конструкция
try {
  // 2. отлов только одного исключения
  indexOf(1, [1, 2, 3, 4]);
  indexOf(1, [1, 2, 3, 4]);
  indexOf(1, [1, 2, 3, 4]);
  indexOf(1, [1, 2, 3, 4]);
  // 3. зачем нам вообще обрабатывать не исключение (не найден эл в массиве например)
  // 4. мы не знаем, бросит он исключение или нет. Огромный минус.
} catch (error) {
  console.log(error);
  // допустимый паттерн
  throw error;
}
// 4. не можем передать инструкцию в функцию
// foo(try {
// } catch (error) {
// })

class IndexOfError extends Error {
  constructor(elem) {
    super(`The requested element (${elem}) is not found within array`);
    this.elem = elem;
  }
}

// 5. бывает такое, что необходимо освободить ресурсы. При чем в обоих случаях.
const connection = db.connect();

try {
  connection.query("SELECT * FROM bla").asArray();
} catch (error) {
  console.error(error);
} finally {
  try {
    connection.close();
  } catch {}

  // но если connection выкинет исключение, то connection2 не выполнится!!
  try {
    connection2.close();
  } catch {}
}

function foo3() {
  try {
    return 1;
  } catch (error) {
    console.log(2);
  } finally {
    return 2;
  }
}
console.log(foo3()); // 2

function foo4() {
  try {
    throw 1;
  } finally {
    return 2;
  }
}
console.log(foo4()); // 2

// 6.	Асинхронность и обработка ошибок
try {
  setTimeout(() => {
    throw 1; // когда то потом, поток не будет заблокирован, за пределы не выйдет. Uncaught!
  }, 0);
  console.log(3);
} catch (error) {
  console.log("oopps");
}

// исправляем:
try {
  setTimeout(() => {
    try {
      throw 1; // когда то потом, поток не будет заблокирован, за пределы не выйдет. Uncaught!
    } catch (error) {}
  }, 0);
  console.log(3);
} catch (error) {
  console.log("oopps");
}

// 7.	Альтернативы try catch
function indexOf(el, arr) {
  const pos = arr.indexOf(el);

  return {
    then(cb) {
      if (pos !== -1) {
        cb(pos);
      }

      return this;
    },
    else(cb) {
      if (pos === -1) {
        cb(pos);
      }

      return this;
    },
  };
}

// возвращаем контейнерный тип
indexOf(1, [1, 2, 3, 4, 5])
  .then((pos) => {
    console.log("Элемент найден", pos);
  })
  .else(() => {
    console.log("Элемент не найден");
  });

// 8.	Обработка непойманных async исключений, через события
setTimeout(() => {
  throw 1;
}, 0);

console.log(2);

// в node js
process.on("uncaughtException", (err) => {
  console.log(111, err);
});

// в браузере
window.addEventListener("error", (err) => {
  console.log(111, err);
});

// второй вид
Promise.reject(1); // Uncaught 1 обработка unhandledrejection

// другое
fopen("text.txt", (err, data) => {
  if (err !== null) {
    // ...
  } else {
    // ...
  }
  // ну или второй колбек как в промисах then
});

// ... EventEmitter.js
