// Глобальная
console.log("1");
let v = 123;

function exampleFunc() {
  // Функциональная
  console.log("2");
  console.log(v);

  if (true) {
    // Блочная
    console.log("3");
    console.log("4");
    console.log("5");
    console.log(v);
  }
}

// Блочная
for (let i = 0; i < 10; i++) {
  console.log("6");
  console.log("7");
  console.log("8");
}

// ------------------------------------------- проблема 1, 2 и 3:

console.log(id); // undefined

var id = 123;

// ... code

function doNothing() {}

for (var id = 0; id < 10; id++) {
  // id не блочная обл видимости + переобъявление
  doNothing();
}

console.log(id); // что храниться в переменной id? Будет 10.

// --------------------- всплытие hoisting
// a, c, d = undefined

var a = 1;

function x() {
  // b = undefined

  var b = 2;
}

var c = 3;

if (true) {
  var d = 4;
}

// --------------------- всплытие hoisting

let a = "Hello";

if (true) {
  console.log(a); // ошибка

  let a = "world";
}
