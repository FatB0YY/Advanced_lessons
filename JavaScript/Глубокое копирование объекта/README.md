# Глубокое копирование объекта

### В рамках заявленной задачи в условиях языка JavaScript первое о чем следовало бы сказать, так это о том, что если Вам понадобилось глубокое копирование объекта, то это означает что Вы делаете что-то не так. То есть задача с которой Вы работаете решается иным образом.

#### Бывают исключения, которые касаются системного программирования. Но там, работают со структурами, которые лежат не в Object а в Typed Array где есть соответствующие методы копирования.

#### Начнем с простейших примеров. С простыми примитивными значениями все три способа работает правильно.

```javascript
const simpleUser = {
  name: "John Dor",
  age: 43,
  title: "Dev",
};

const simpleUserCopy1 = { ...simpleUser };
const simpleUserCopy2 = Object.assign({}, simpleUser);
const simpleUserCopy3 = Object.create(simpleUser);
```

#### Однако при более сложном объекте, данный подход может принести нежелательный эффект.

```javascript
const devUser = {
  name: "John",
  skills: ["JavaScript", "React"],
  bith: new Date("1985-04-08"),
};

const devUserCopy = { ...devUser };
// ... другие методы работают также

// решим добавить в СКОПИРОВАННЫЙ объект новый скилл:
devUserCopy.skills.push("Angular");

// проблема в том, что оно добавится и у оригинального devUser. Тк скопировалась ссылка.
console.log(devUser.skills); // ["JavaScript", "React", "Angular"]
console.log(devUser.bith.getDate()); // 8
console.log(devUserCopy.bith.getDate()); // 8
```

#### На практике часто можно встретить копирование через JSON.parse JSON.stringify.

```javascript
const devUserCopy2 = JSON.parse(JSON.stringify(devUser));

// можем мутировать скопированный объект. Нет связи с оригинальным объектом
devUserCopy2.skills.push("Angular");
```

Однако при таком подходе есть свои ограничения:

- Все то, что не может храниться в json, не будет там храниться (например, new Date() - будет просто строка)

```javascript
// ограничения JSON.parse JSON.stringify
const complexObject = {
  set: new Set([1, 2, 3]),
  map: new Map([[1, 2]]),
  regex: /foo/,
  deep: { array: [new Blob()] },
  error: new Error("Boom!"),
};

console.log(JSON.parse(JSON.stringify(complexObject))); // {set: {}, map: {},  ...}
```

#### Глобальная функция StructuredClone()

Базовый уровень 2022 г.
НЕДАВНО ДОСТУПНО
С марта 2022 года эта функция работает на новейших устройствах и версиях браузеров. Эта функция может не работать на старых устройствах или браузерах!!!

Глобальный structuredClone() метод создает глубокий клон заданного значения с использованием алгоритма структурированного клонирования.

Этот метод также позволяет переносить переносимые объекты в исходном значении, а не клонировать их в новый объект. Перенесенные объекты отделяются от исходного объекта и прикрепляются к новому объекту; они больше не доступны в исходном объекте.

```javascript
const devUserCopy3 = structuredClone(devUser);

// ошибка
console.log(structuredClone({ fn: () => {} }));
console.log(structuredClone({ el: document.body })); // и прототипы
```

Однако все эти методы плохи при копировании класса.
