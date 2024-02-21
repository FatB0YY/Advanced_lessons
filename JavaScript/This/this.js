// this в рамках браузера

function helloFunc() {
  console.log("Hello", this);
}

window.helloFunc(); // window

const person = {
  name: "Rodion",
  age: 21,
  sayHello: helloFunc,
  sayHelloWindow: helloFunc.bind(window),
  logInfoName: function () {
    console.log(`Name is ${this.name}`);
  },
  logInfoAge: () => {
    console.log(`Age is ${this?.age}`);
  },
  logInfoJob: (job) => {
    console.log(`Job is ${job}`);
  },
};

person.sayHello(); // person
person.sayHelloWindow(); // window
person.logInfoName(); // Name is Rodion
person.logInfoAge(); // undefined

const lena = {
  name: "Elena",
  age: 23,
};

person.logInfoName.call(lena); // Name is Elena

// call bind apply
person.logInfoJob.bind(lena, "frontend")();
person.logInfoJob.call(lena, "frontend");
person.logInfoJob.apply(lena, ["frontend"]);

// ---------------------------------------------------------------

// this это идентификатор, который устанавливается в момент вызова функции.
// Кроме bind существует две штатные ситуации установки this - при вызове функции выражением dot expression
// например myObj.method(). В этом случае в момент вызова функции this будет установлен в base для dot expression.
// То есть внутри method this будет указывать на myObj

// Второй способ использование width statement. Который запрещен в strict mode. Иными словами про него можно забыть.

// Во всех прочих случаях this всегда будет указывать на globalObject

// поведение this в случае вызова метода объекта, который определен как функция, является исключением. И устанавливается в момент вызова. Во всех прочих случаях, везде одинаково -
// определяется правилами разрешения области видимости, то есть цепочкой лексических окружений.

const obj = {
  a: 10,

  print() {
    console.log(this); // obj
  },
};

obj.print = function () {
  setTimeout(function () {
    console.log(this); // window
  }, 1000);
};
obj.print = function () {
  setTimeout(() => {
    console.log(this); // obj
  }, 1000);
};

// ---------------------------------------------------------------

// В случае использования не JS API, this может быть установлен как угодно.
// А точнее так, как это задумал разработчик API. То есть в случае eventListener this указывает на объект кнопки
// не потому что метод вызывается в каком то там контексте. А потому что DOM API в своей спецификации написал,
// что при подобном вызове this всегда будет указывать на объект инициатор.

("use strict");

function log() {
  console.dir(this); // burton

  setTimeout(function () {
    console.log(this); // window // после bind  window
  }, 100);

  setTimeout(() => {
    console.log(this); // button // после bind { x: 1, y: 2 }
  }, 200);
}

const btn = document.querySelector("button");

log(); // undefined

btn.addEventListener("click", log);

log = log.bind({ x: 1, y: 2 });

log();

// ---------------------------------------------------------------

var obj = {
  name: "myObj",
  method: function () {
    console.log(this);
  },
};
var secondObj = {
  name: "secondObj",
  methodOfSecondObj: obj.method,
};
secondObj.methodOfSecondObj(); // secondObj

var myFunc = obj.method;
myFunc(); // globalThis - window

// ---------------------------------------------------------------

var obj = {
  name: "objName",
  method: function () {
    var arrow = () => console.log(this);
    arrow(); // this будет тем,
  },
};
obj.method(); // внутри arrow this будет равен obj.

// ---------------------------------------------------------------

var secondObj = {
  name: "secondObj",
  methodOfSecondObj: obj.method,
};
secondObj.methodOfSecondObj();
secondObj;
var arrow = () => console.log(this);
var obj = {
  name: "objName",
  method: function () {
    arrow();
  },
};
secondObj.methodOfSecondObj(); // this внутри arrow будет уже указывать на secondObj

// ---------------------------------------------------------------
var arrow = () => console.log(this);
var obj = {
  name: "objName",
  method: function () {
    arrow();
  },
};

// globalObj вне зависимости от того как будет вызываться method.

// ---------------------------------------------------------------

function f() {
  console.log(this.toString()); // 123
}
f.call(123);

// ---------------------------------------------------------------

function makeUser() {
  return {
    name: "John",
    ref: this,
  };
}

let user = makeUser();

alert(user.ref.name); // Каким будет результат? - ошибка

// ---------------------------------------------------------------

exports.default = {
  title: "Phone",
};
console.log(this); // в Nodejs объект exports текущего модуля
