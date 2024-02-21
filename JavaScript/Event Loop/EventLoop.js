console.log("1");

setTimeout(() => {
  console.log("setTimeout 1");

  Promise.resolve().then(() => {
    console.log("promise setTimeout");
  });

  queueMicrotask(() => {
    console.log("queueMicrotask setTimeout");
  });
}, 0);

setTimeout(() => {
  console.log("setTimeout 2");
}, 0);

queueMicrotask(() => {
  console.log("queueMicrotask 1");
});

Promise.resolve().then(() => {
  console.log("promise 1");
});

queueMicrotask(() => {
  console.log("queueMicrotask 2");
});

Promise.resolve().then(() => {
  console.log("promise 2");
});

console.log("4");

/* 
    1 
    4 
    queueMicrotask 1
    promise 1 
    queueMicrotask 2
    promise 2 
    setTimeout 1 
    promise setTimeout 
    queueMicrotask setTimeout
    setTimeout 2
*/

console.log(
  "2 //////////////////////////////////////////////////////////////////"
);

const test = () => {
  setTimeout(() => {
    console.log("1");
  }, 0);

  console.log("2");

  new Promise((resolve, reject) => {
    console.log("3"); // еще синхронный код!!!

    resolve("4");
  })
    .then((x) => {
      throw x + "error!"; // ошибка все равно уйдет в блок catch
      // console.log(x); // выведется
    })
    .catch(console.log);

  console.log("5");
};

test();
/*
  2
  3
  5
  4 или 4error!
  1
*/

console.log(
  "3 //////////////////////////////////////////////////////////////////"
);

for (let i = 0; i < Infinity; i++) {
  console.log(i); // цикл, promise никогда не будет выполнен
  Promise.resolve().then(() => console.log(i));
}

console.log(
  "4 //////////////////////////////////////////////////////////////////"
);

let i = 0;

let start = Date.now();

// разбили ресурсоёмкую задачу на части – теперь она не блокирует пользовательский интерфейс
function count() {
  // перенесём планирование очередного вызова в начало
  if (i < 1e9 - 1e6) {
    setTimeout(count); // запланировать новый вызов
  }

  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + "ms");
  }
}

count();

console.log(
  "5 //////////////////////////////////////////////////////////////////"
);

let i = 0;

function count() {
  // сделать часть крупной задачи (*)
  do {
    i++;
    progress.innerHTML = i;
  } while (i % 1e3 != 0);

  if (i < 1e7) {
    setTimeout(count);
  }
}

count();

console.log(
  "6 //////////////////////////////////////////////////////////////////"
);

// Микрозадача, внутри которой другая микрозадача 1

console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => setTimeout(() => console.log(4)));

Promise.resolve().then(() => console.log(5));

setTimeout(() => console.log(6));

console.log(7);

/*
  1   
  7

  3
  5

  2
  6
  |
  4
*/

console.log(
  "7 //////////////////////////////////////////////////////////////////"
);

// Два Promise с двумя then

console.log("Step 1: In global scope");

setTimeout(() => console.log("Step 2: In setTimeout"));

new Promise((resolve) => {
  console.log("Step 3: In promise constructor");
  resolve();
})
  .then(() => console.log("Step 4: In then"))
  .then(() => console.log("Step 5: In another then"));

setTimeout(() => console.log("Step 6: In another setTimeout"));

new Promise((resolve) => {
  console.log("Step 7: In promise constructor");
  resolve();
})
  .then(() => console.log("Step 8: In then"))
  .then(() => console.log("Step 9: In another then"));

/*
  Step 1: In global scope

  Step 3: In promise constructor
  Step 7: In promise constructor

  Step 4: In then
  Step 8: In then

  Step 5: In another then
  Step 9: In another then

  Step 2: In setTimeout
  Step 6: In another setTimeout
*/

console.log(
  "8 //////////////////////////////////////////////////////////////////"
);

// Микрозадача, внутри которой другая микрозадача 2

setTimeout(() => console.log("Step 1: In setTimeout"));

new Promise((resolve) => {
  console.log("Step 2: In promise constructor");
  resolve();
}).then(() => {
  console.log("Step 3: In then");
  setTimeout(() => console.log('Step 4: In setTimeout (inside of "then")'));
});

setTimeout(() => console.log("Step 5: In another setTimeout"));

/*
  Step 2: In promise constructor

  Step 3: In then

  Step 1: In setTimeout
  Step 5: In another setTimeout
  |
  Step 4: In setTimeout (inside of "then")
*/

console.log(
  "9 //////////////////////////////////////////////////////////////////"
);

// Макрозадача, внутри которой микрозадача

setTimeout(() => console.log("Step 1: In setTimeout"));
setTimeout(() => {
  new Promise((resolve) => {
    console.log("Step 2: In promise constructor (inside setTimeout)");
    resolve();
  }).then(() => console.log("Step 3: In then (inside setTimeout)"));
});

new Promise((resolve) => {
  console.log("Step 4: In promise constructor");
  resolve();
}).then(() => {
  console.log("Step 5: In then");
});

setTimeout(() => console.log("Step 6: In another setTimeout"));

/*
  Step 4: In promise constructor
  Step 5: In then

  Step 1: In setTimeout
  Step 2: In promise constructor (inside setTimeout)
  Step 3: In then (inside setTimeout)

  Step 6: In another setTimeout
*/

console.log(
  "//////////////////////////////////////////////////////////////////"
);

// Event loop начал свою работу
while (true) {
  if (!isCallStackEmpty) {
    continue;
  }

  for (const task of eventLoop.microtasks) {
    task.execute();
  }
  eventLoop.microtasks = [];

  const task = eventLoop.nextMacrotask();
  if (task) {
    task.execute();
  }

  if (eventLoop.needRender()) {
    eventLoop.render();
  }
}
