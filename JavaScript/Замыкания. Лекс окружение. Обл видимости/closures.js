// ----------------------------------------------- лексическое окружение

const x = 1;

const y = function () {
  const i = "Hi";
  console.log(i);
};

y();

// На данном моменте у нас лексических окружения:
// 1. глобальное { ссылка: -> null, переменные: {x: 1, y: function} }
// 2. локальное (внутри y): {переменные: i: "Hi", ссылка: -> глобальное лекс.окр. }

// 1 глобальное имеет доступ только к своим переменным.
// 2 локальное имеет доступ ко всем переменным. !!!Будет создано только во время вызова ф-ции!!!

// ----------------------------------------------- замыкания

let x1 = 1;

const y1 = function () {
  console.log(x1);
};

x1 = 2;

y1();

// ----------------------------------------------- 1
function makeCounter(count) {
  return function () {
    return count++;
  };
}

let counter = makeCounter(0);
let counter2 = makeCounter(0);

console.log(counter()); // 0
console.log(counter()); // 1

console.log(counter2()); // 0
console.log(counter2()); // 1

// ----------------------------------------------- 1
// 1. createIncrement: function
// inc: function
// log: function

// 2. ссылка 1
// переменные: count
// increment: function
// message
// log: function

function createIncrement() {
  let count = 0;
  console.log("this", this);

  function increment() {
    console.log("this 2", this);

    count++;
  }

  let message = `Count is ${count}`;

  function log() {
    console.log(message);
  }

  return [increment, log];
}

const [inc, log] = createIncrement();

inc();
inc();
inc();

log(); // Что выведется в консоль? - 0
// В лексическом окружении createIncrement count действительно будет равен 3.
// НО
// при вызове log, у нас БЫЛА создана переменная message
// еще тогда, когда count был равен 0.
// чтобы это исправить, достаточно перенести объявление переменной внутрь ф-ции log.
