// 9.	Обработка ошибок через события

// EventEmitter - это механизм, который позволяет реализовывать шаблон
// проектирования "Observer" (наблюдатель) в JavaScript.

// Подход с событиями для обработки ошибок, для асинх. кода,
// сложной сущности типа компоненты, какие-то модули - подходит отлично.

// Не нужно в голове держать только "Контейнерные типы" - они отлично решают проблему
// обработки исключений в рамках какой-то сущности уровня ф-ции/метода итд.

class EventEmitter {
  // юзаем Map, потому что там есть удобные методы.
  #handlers = new Map();

  // принимает event, на который слушается и cb.
  // on - регистрирует некоторый обработчик в какой-то структуре данных.
  on(event, cb) {
    // проверяем, что такое событие не регистрировалось.
    if (!this.#handlers.has(event)) {
      // создаем для него очередь, она будет сделана Set'ом.
      this.#handlers.set(event, new Set());
    }

    // добавляем в Set наш обработчик.
    this.#handlers.get(event).add(cb);

    // Обычно ф-ция "on" возвращает то, что может быть использовано для либо удаления
    // нашего события, либо ссылку на сам себя, чтобы выстраивать цепочки (on on...).
    // Возвращаем ссылку на сам экземпляр объекта.
    return this;
  }

  off(event, cb) {
    // если не задано событие,
    if (event == null) {
      // то удаляем все обработчики события.
      this.#handlers.clear();
    }
    // действительно обработчик такого события есть,
    else if (this.#handlers.has(event)) {
      if (cb != null) {
        this.#handlers.get(event).delete(cb);
      } else {
        // чистим все в рамках события.
        this.#handlers.get(event).clear();
      }
    }

    return this;
  }

  emit(event, data) {
    // проверяем, что такое событие не регистрировалось.
    if (!this.#handlers.has(event)) {
      // то ничего не делаем.
      return this;
    }

    for (const cb of this.#handlers.get(event)) {
      try {
        cb(data);
      } catch (error) {
        // ...
        console.log("Error:", error);
      }
    }
  }
}

// использование:
const ee = new EventEmitter();

ee.on("click", (e) => {
  console.log("Clicked:", e);
});

ee.on("click", (e) => {
  console.log("Clicked:", e);
});

ee.emit("click", { x: 10, y: 15 });
ee.emit("click", { x: 12, y: 134 });

// Clicked: { x: 10, y: 15 }
// Clicked: { x: 10, y: 15 }
// Clicked: { x: 12, y: 134 }
// Clicked: { x: 12, y: 134 }

// пример использования с компонентом.
// например есть класс компонента Button.
class Button {
  // у каждого компонента есть свой eventEmitter.
  eventEmitter = new EventEmitter();

  onError(error) {
    console.log("Error:", error);
  }

  doSmth() {
    // ...
    // хардкодим исключение
    this.eventEmitter.emit("error", "oops");
  }

  // не нужно писать try catch, можно использовать декоратор
  @handleError()
  doSmthThrow() {
    // ...
    throw 1;
  }

  // базовый метод, который вызывается при создании компонента.
  created() {
    this.eventEmitter.on("error", this.onError.bind(this));
  }
}

const b = new Button();
b.created();

b.eventEmitter.on("error", () => {
  console.log("bla");
});

b.doSmth();
