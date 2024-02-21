# !!! Содержание данного MD файла не охватывает полностью все материалы, представленные в .docx документе и двух .js файлах. Этот MD файл предназначен исключительно для ознакомления и не содержит полного объема информации !!!

## Ошибки и Исключения: Примеры и Рекомендации

### Ошибки

#### Рисунок 1 – Пример ошибки несоблюдения синтаксических контрактов

```javascript
function error(){
    console.log('error')
```

#### Рисунок 2 – Пример ошибки Out of memory

```javascript
const obj = {};
for (let i = 0; i < 1e10; i++) {
  obj[i] = "a-z".repeat(i);
}
console.log(obj[1000]);
```

### Исключения

#### Рисунок 3 – Пример исключения

```javascript
Number(10.1).meth();
```

#### Рисунок 4 – Обработка исключений

```javascript
try {
  Number(10.1).bla();
} catch (error) {
  console.log(error);
}
```

#### Рисунок 5 – Пример второй. Ничего не будет выведено

```javascript
function foo1() {
  function foo2() {
    Number(10.1).meth();
  }

  fooError();
  console.log(1);
}

foo1();
console.log(2);
```

### Обработка ошибок

#### Рисунок 6 – Создание своих типов ошибок

```javascript
function indexOf(val, arr) {
  const pos = arr.indexOf(val);

  if (pos === -1) {
    throw new IndexOfError(val);
  }

  return pos;
}

// Обработка
try {
  indexOf(1, [1, 2, 3, 4]);
} catch (error) {
  console.log(error);
  throw error;
}
```

#### Рисунок 7 - Альтернативы try catch. Контейнерный тип

см. syncPromise: [github.com/V4Fire/Core/blob/master/src/core/prelude/structures/sync-promise/index.ts](https://github.com/V4Fire/Core/blob/master/src/core/prelude/structures/sync-promise/index.ts)

```javascript
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

// Пример использования
indexOf(1, [1, 2, 3, 4, 5])
  .then((pos) => {
    console.log("Элемент найден", pos);
  })
  .else(() => {
    console.log("Элемент не найден");
  });
```

#### Рисунок 8 - Асинхронность и обработка ошибок

```javascript
try {
  setTimeout(() => {
    try {
      throw 1;
    } catch (error) {}
  }, 0);
  console.log(3);
} catch (error) {
  console.log("oops");
}
```

### Обработка ошибок через события

#### Рисунок 9 - EventEmitter

```javascript
class EventEmitter {
  #handlers = new Map();

  on(event, cb) {
    if (!this.#handlers.has(event)) {
      this.#handlers.set(event, new Set());
    }
    this.#handlers.get(event).add(cb);
    return this;
  }

  off(event, cb) {
    // Implementation...
  }

  emit(event, data) {
    // Implementation...
  }
}

// Пример использования
const ee = new EventEmitter();

ee.on("click", (e) => {
  console.log("Clicked:", e);
});

ee.emit("click", { x: 10, y: 15 });
```

### Рекомендации по обработке ошибок

- Обработка исключений повышает надежность программы.
- Используйте синтаксис try-catch для отлова ошибок.
- Рассмотрите создание своих типов ошибок для лучшей идентификации проблем.
- Альтернативные методы, такие как контейнерные типы и событийная обработка, могут быть полезны в определенных сценариях.
- Обратите внимание на обработку ошибок в асинхронном коде и используйте событийную модель при необходимости.
