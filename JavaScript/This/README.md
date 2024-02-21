this это идентификатор, значение которого устанавливается при вызове функции
Если программист не переопределил правила bind this то -
устанавливается this в зависимости от того каким образом функция была вызвана.

Если функция вызывалась в dot нотации
то есть как member expression, то this будет установлен в base идентификатора.
Говоря не академическим языком при вызове:

```javascript
var obj = {
  name: "myObj",
  method: function () {
    console.log(this);
  },
};
obj.method();
```

то this будет установлен в значение base - то есть в нашем случае obj
Подчеркиваю - установлено в момент вызова функции, а не в момент ее создания.

Другой пример:

```javascript
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
secondObj.methodOfSecondObj();
```

this будет указывать на secondObj.

```javascript
var myFunc = obj.method;
myFunc();
```

this будет указывать на globalThis

Если функция вызывается как CallExpression
то this устанавливается:

1. в случае Legacy Mode и with statement то в withStatement
2. в случае strict mode на globalThis

В случае же ArrowExpression
this будет всегда в том значении, в котором он определен для Lexical Enviroment нашей ArrowExpression.
Или для любой другой родительской Lexical Enviroment.

Говоря не академическим языком:
При вызове стрелочной функции, this не устанавливается.
Доступ к this осуществляется ровно так же, как и к любому другому идентификатору -
по цепочке областей видимости которая и является той самой цепочкой из Lexical Enviroment.

Например:

```javascript
var obj = {
  name: "objName",
  method: function () {
    var arrow = () => console.log(this);
    arrow(); // this будет тем,
  },
};
obj.method(); // внутри arrow this будет равен obj.

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
```

а если arrow вынести из лексического окружения method то есть сделать вот так

```javascript
var arrow = () => console.log(this);
var obj = {
  name: "objName",
  method: function () {
    arrow();
  },
};
```

то this всегда будет указывать на globalObj вне зависимости от того как будет вызываться method.

Стрелочная функция
В стрелочной функции this определяется ровно точно так же как и для любого идентификатора.
То есть по привычной цепочке видимости, которая, фактически задается цепочкой Lexical Enviroment
То есть то, откуда берется this определяется в момент создания функции.

Строго говоря, в JS только есть только один случай, когда this или что-либо другое, определялось
в момент вызова

- это вызов функции в дот нотации (или по заумному: Member Expression ).

```javascript
Пример: obj.myMethod();
```

Потому проще запомнить, что поведение this в случае вызова метода объекта, который определен как функция, является исключением. И устанавливается в момент вызова. Во всех прочих случаях, везде одинаково -
определяется правилами разрешения области видимости, то есть цепочкой лексических окружений.
