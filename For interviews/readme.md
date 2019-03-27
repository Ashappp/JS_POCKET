##                                    ⭐️⭐️⭐️ IMPROVE YOUR JS SKILLS ⭐️⭐️⭐️

![pic](http://i.piccy.info/i9/9811670f8795e9d015f4efc407aed662/1553719191/56056/1309575/javascript.png)
```jsx

💡 Какое будет выведено значение:
let x = 5; alert( x++ );
// 5 так как применили инкремет в ПОСТФИКСНОЙ форме


💡 Чему равно такое выражение:
[ ] + false - null + true
// Nan

💡 Что выведет этот код:
let y = 1; let x = y = 2; alert(x);
// 2

💡 Чему равна сумма
[ ] + 1 + 2
// 12

💡 Что выведет этот код: 
alert( "1"[0] )
// 1

💡 Чему равно
2 && 1 && null && 0 && undefined
//null

💡 Есть ли разница между выражениями
!( a && b ) и (a && b)

💡 Что выведет этот код:
alert( null || 2 && 3 || 4 )
// 3

💡 Правда ли что a == b
a = [1, 2, 3]; b = [1, 2, 3];
// false, так как массивы не равны друг другу

💡 Что выведет этот код:
alert( +"Infinity" );
// Infinity

💡 Верно ли сравнение:
"ёжик" > "яблоко"
// true

💡 Чему равно 
 0 || "" || 2 || undefined || true || falsе 
// 2

// *** conversion-1 *** //

		const a = 'some' + false;
		const b = [1,2,3] + '1';
		const c = 'any' + 123;

		console.log(a, b, c);


		// *** conversion-2 *** //

		const a = 1 + '123';
		const b = 1 + +'123';
		const c = 2 + +'123ab';

		console.log(a, b, c);



		// *** conversion-3 *** //

		const a = !!'';
		const b = !!-1;
		const c = !![1];
		const d = !![];

		console.log(a, b, c, d);


		// *** conversion-4 *** //


		const a = true + false;
		const b = false + '';
		const c = !![1];
		const d = !![];

		console.log(a, b, c, d);


		// *** conversion-5 *** //

		const a = Boolean(NaN);
		const b = Boolean(null);
		const c = Boolean(undefined);
		const d = Boolean(false);

		console.log(a, b, c, d);

💡 what print console

console.log(typeof 5)
console.log(typeof "hello")
console.log(typeof true)
console.log(typeof undefined)
console.log(typeof {})
console.log(typeof null)
console.log(typeof function(){})

console.log(null == undefined)

console.log(undefined === undefined)
console.log(null === null)

console.log(NaN == undefined)
console.log(NaN == null)

console.log(NaN === NaN)
console.log(NaN == NaN)

💡 What would following code return?
console.log(typeof typeof 1);

💡
var obj = {};
Object.defineProperty(obj, 'a', {writable: true,  configurable: true,  value: 'a'});
Object.defineProperty(obj, 'b', {writable: false, configurable: true,  value: 'b'});
Object.defineProperty(obj, 'c', {writable: false, configurable: false, value: 'c'});

console.log(obj.a);
obj.a = 'b';
console.log(obj.a);
delete obj.a;

console.log(obj.b);
obj.b = 'a';
console.log(obj.b);
delete obj.b;

console.log(obj.c);
obj.b = 'a';
console.log(obj.c);
delete obj.b;

💡 Необходимо, чтобы этот код выводил в лог hey amy, но он выводит hey arnold. Почему?
function greet(person) {
  if (person == { name: 'amy' }) {
    return 'hey amy'
  } else {
    return 'hey arnold'
  }
}
console.log( greet({ name: 'amy' }) )

💡 What is the output out of the following code? Explain your answer.

var a={},
  b={key:'b'},
  c={key:'c'};

a[b]=123;
a[c]=456;

console.log(a[b]);

console.log({}.toString())

💡 What will be the output of this code?

var x = 21;
var girl = function () {
  console.log(x);
  var x = 20;
};
girl ();

💡 Imagine you have this code:
var a = [1, 2, 3];
// a) Will this result in a crash?
a[10] = 99;
// b) What will this output?
console.log(a[6]);

💡 Чему равно foo.length?
var foo = {};
foo.bar = 'hello';
console.log(foo.length)

💡
var RED = 'red';
const red = 'red';

var RED = 'blue';

red = 'blue';

console.log(RED);

💡
var a = {};
var b = a;
console.log(a === b);  // true
var c = {};
var d = {};
conslole.log(c === d);

💡
'use strict'

var zombie = {
  eyeLeft : 0,
  eyeRight: 1,
  // … много ключей …
  eyeLeft : 1
}

num = 5;

function run(fromWhom, fromWhom) {
  return fromWhom
}
console.log( run(1, 2) );
console.log( num );
console.log( zombie );

💡
for (let i = 0; i < 10; i++) {
  let count = 10;
  count += i
}

console.log(count)


💡 UPWORK TEST

1) What is the correct syntax for referring to an external script called “test.js” ?

a. <script name=”test.js”>
b. <script href=”test.js”>
c. <script src=”test.js”>
d. None of these

2) Which Javascript class represents Regular expressions?

a. RegExpObj
b. RegExp
c. RegExpClass
d. StringExp

3) What is the value of “n” and “n2″ after executing the following code?

var str = "Finding foo in Foo and Bar";
var n1 = str.search("Foo");
var n2 = str.search(/Foo/i);

a. n1 = 15, n2 = 15
b. n1 = 15, n2 = 8
c. n1 = 8, n2 = 8

4) Select all statements that will return true. Object is defined: let a = {a:1};

a. delete a.a
b. delete a.b
c. 1 != Boolean(‘-1′)
d. Boolean(1) == Boolean(‘-1′)
e. Boolean(null) != Boolean(‘0′)
f. All of the above

5) Which example is correct of Local Scope Variable?

a. var b = 3;
function myfunc() {
return b * b;
}
b. function myfunc() {
var b = 3;
return b * b;
}
var a = 2;
c. function myfunc() {
console.log(a);
}
d. All of the above

6) What command skips the rest of a case statement?

a. return
b. exit
c. continue
d. break

7) What will be logged to console?

let arr = [1, 2, 3];
for (i = 0; i < arr.length; arr[i++] = 0) ;
console.log(arr);

a) Nothing
b) SyntexError
c) ReferenceError
d) TypeError
e) [1, 2, 3]
[1, 2, 3]
[1, 2, 3]
f) [0, 0, 0]

8) What will be logged to console?

let a = {
[ 'foo_' + (() => 1)() ]: 2
};
console.log(a);

a. TypeError
b. SyntexError
c. { foo_1: 2 }
d. ReferenceError

9) How do you find the number with the highest value of variable a and b?

a. top(a, b)
b. Math.max(a, b)
c. Math.ceil(a, b)
d. Math.highest(a, b)

10) Which of the following is used in JavaScript to insert special characters?

a. &
b. +
c. –
d. %
e. None

11) What’s true about numbers in Javascript? (choose all that apply)

a. There is no such type as integer
b. There are positive and negative infinity numbers
c. (Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2 ) will return false
d. Number.parseInt() can be used to return integer value of the number
e. All of These

12) Select options which create object type variables:

a. let a = ‘ ‘;
b. let a = {};
c. let a = [];
d. let a = new String(‘a’);
e. let a = null;

13. Cookies are a plain text data record with the following variable-length fields?

a. Secure
b. Domain
c. Package
d. Media
e. Navigator

14) What are valid states of the created Promise?

a. pending
b. fulfilled
c. initializing
d. rejected

15) What is the correct way to create a JavaScript array?

a. var cars = [“Saab”, “Volvo”, “BMW”];
b. var cars = “Saab”, “Volvo”, “BMW”
c. var cars = 1 = (“Saab”), 2 = (“Volvo”), 3 = (“BMW”)
d. var cars = (1:”Saab”, 2:”Volvo”, 3:”BMW”);

16) What will be the output of following code snippet?

var result = (function(a) {
return a*a;
}(5.5));
alert(result);

a. 5
b. 25
c. 10
d. 30.25

17 Which is the correct way to create an Object?
a. var fooObj = new Object()
b. var fooObj = {}
c. Both of the above
d. None of these

18) What will be returned if we call f(1);

const b = [1, 2, 3];
const f = (a, ...b) => a + b;

a. 7
b. 1
c. 6
d. Some Error

19) What is the event that fires when the form element textarea loses the focus?

a. Onclick
b. Ondblclick
c. Onfocus
d. Onblur

20) Select the statement that will return false. First line in file is: var a = true; b = false;

a. This code will return an error
b. delete a===b
c. delete a
d. delete b
e. delete c

21) For the following html element, which is the correct method to change the font size to 25px using javascript?

< p id = "foo">Lorem Ipsum</ p >

a. document.getElementById(“foo”).setFontSize = “25px”;
b. document.getElementById(“foo”).style.fontSize = “25px”;
c. document.getElementById(“foo”).fontSize = “25px”;
d. document.getElementById(“foo”).style(“font-size = 25px”);

22) What is the value of b?

let a = [1, 2, 3, 4, 5];
let b = [1, 2, ...a];

a. [1, 2, 3, 4, 5]
d. [1, 2, 1, 2, 3, 4, 5]
b. Some error
c. [1, 2]
d. [3, 4, 5]

23) What will be the value of a?

let a = -1 ? 'foo' ? null : -1 : 1;

a. Foo
b. Null
c. -1
d. 1

24) Which of the following determines the type of a given object?

a. variable
b. typeof
c. string
d. Object

25) What will the following code return: Boolean(6 > 5)

a. NaN
b. false
c. true
d. 1

26) How do you create a Date object in JavaScript?

a. dateObjectName = new Date([parameters])
b. dateObjectName.new Date([parameters])
c. dateObjectName := new Date([parameters])
d. dateObjectName Date([parameters])

27) Arrow function expression has a shorter syntax than a function expression and does not bind its own as follow?

a. arguments, prototype
b. arguments, class
c. arguments, super
d. Prototype, object

28) Which function will return 10 when called like this: f(10);

a. const f = (…f) => f;
b. const f = (…f) => f.reduce(f => f);
c. function f() {
return arguments;
}
d. const f = f => f;

29) Evaluate the following expression: ~-(2 + “2”)

a. undefined
b. SyntaxError
c. 21
d. -22

30) Select the statement that will return truthy value. Array let a = [1,2,3,4] is defined.

a. let a = [1,2,3,4]
b. a.indexOf(-1) === 3
c. a.length
d. a

31) Javascript JSON data manipulation- How can you access first, last name properties in data object using the following snippet?

var data={"users":[
{
"firstName":"Ali",
"lastName":"Rehman",
"birthday": {
"month":"January",
"day":20,
"year":1983
}
}
]}

a. document.write(data.users.firstName)
b. document.getElementById(“placeholder”).innerHTML = data.users.firstName
c. document.getElementById(“placeholder”).innerHTML = data.users[0].firstName +” “+
d. data.users[0].lastName + “–” + data.users[0].birthday.month
e. document.getElementById(“placeholder”).innerHTML = data.users[0].firstName +” “+ data.users[0]

32) How do you locate the first X in a string variable named txt?

a. txt.find(‘X’)
b. txt.locate(‘X’)
c. txt.indexOf(‘X’)
d. txt.countTo(‘X’)

33) What is the output of the below code :

x = 50 / "Apple";
alert(x);

a. undefined
b. NaN
c. Infinity
d. 50

34) Which of the following is not a mouse event?

a. Onmousescroller
b. Onclick
c. Onmouseover
d. Onmousemove

35) How do you Remove property a from this object?

let a = {a:1, b:2};

a. a.a = null
b. a.a = false
c. a.a = ‘undefined’
d. delete a.a
e. remove a.a

36) What options are types of declarations in JavaScript?

a. var : declares a variable
b. let : declares a block scope local variable
c. const : declares a read-only named constant
d. None of the above

37) What will be the value of a?

let a = 'a';
let b = 'b';
a = [a, , b] = [1, 2, 3];

a. TypeError
b. RangeError
c. [1, 2, 3]
d. SyntaxError

38) Which of the following is an incorrect way of instantiating a date?

a. new Date(datestring)
b. new Date()
c. new Date(seconds)
d. new Date(year, month, day, hours, minutes, seconds, milliseconds)

39) What will be logged in console ?

const data = [{a: true, b: false}, {a: false, b: true}];
let result = false;
let sample;
while (sample = data.pop()) {
result = sample.a;
}
console.log(result);

a. ReferenceError
b. TypeError
c. true
d. false

40) What will be output of this code snippet?

var foo = 10;
bar = 3;
(function() {
var foo = 2;
bar= 1;
}())
bar = bar + foo;
alert(bar);

a. 11
b. 3
c. 30
d. 12
```

Scope.️ 💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊

```jsx
1) 💡

var b, t, c;

(() => {
  let b = 2;
  let t = 4;
  var c = 3;
})();

console.log(b, t, c);

2) 💡

var b, t, c;

if (true) {
  let b = 2;
  const t = 4;
  var c = 3;
}

console.log(b, t, c);

3) 💡

var a = 7;

function test() {
  console.log(a);
}

function func() {
  var a = 10;
  test();
  a = 8;
}

func();

4) 💡

var a = 7;

function func() {
  a = 10;

  function test() {
    a = 5;
  }

  test();
}

func();

console.log(a);

5) 💡

var a = 7;
var b = 10;

function func() {
  a = 10;
  var b = 13;

  if (true) {
    const a = 12;
    b = 15;
  }
}

func();

console.log(a, b);

6) 💡

var group = {
  person: "Bob"
};

function func(b) {
  var newGroup = b;

  newGroup.person = "Bill";

  if (b) {
    newGroup.person = "John";
  }

  return newGroup;
}

var newPerson = func(group).person;

console.log(group.person, newPerson);

7) 💡

var a = 7;

function func(b) {
  b = 10;

  if (true) {
    b = 15;
  }

  return b;
}

var b = func(a);

console.log(a, b);
```

Context_This. 💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊

```jsx
💡

var node = document.querySelector('div');

node.addEventListener('click', function() { console.log(this) });

node.addEventListener('click', () => { console.log(this) });

node.click();


💡

var a = {
  b: 1,
  getContext: function () { console.log(this) }
};

var b = {
  b: 2,
  getContext: a.getContext
};

console.log( a.getContext() );
console.log( b.getContext() );



💡

var a = {
  b: 1,
  getContext: function () { console.log(this) }
};

var b = {
  b: 2,
  getContext: a.getContext.bind(this)
};

var c = {
  b: 2,
  getContext: a.getContext.bind(b)
};

console.log( a.getContext() );
console.log( b.getContext() );
console.log( c.getContext() );


💡

var a = {
  b: 1,
  getContext: function () { console.log(this) }
};

var d = { prop: 'here' };

var b = a.getContext.call(d);
var c = a.getContext.apply(d);
var g = a.getContext.bind(d);

console.log( b, c, g );


💡

var a = {
  b: 1,
  getContext: () => { console.log(this) }
};

var b = {
  b: 2,
  getContext: a.getContext
};

console.log( a.getContext() );
console.log( b.getContext() );


💡

var a = {
  b: 1,
  getContext: function() {
    var self = this;

    (() => {
      console.log(self)
    })();
  }
};

var d = { b: 3 };

d.getThis = a.getContext;

d.getThis();
```

Logical_operators  💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊

```jsx
💡

const func = () => 3;

const b = "" || 1 || "there";

const c = 1 && 2 && func();

const d = 1 && "" && func();

console.log(b, c, d);

💡

const user = { name: "Bill" };

const func = user => {
  const currentUser = user || { name: "Bob" };

  const userName = user && user.name;

  console.log(currentUser.name, userName);
};

func();

💡

const b = null || "there";

const c = {} && 0 && 2;

const d = false && 2 && "here";

console.log(b, c, d);
```

Loops.  💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊
 
```jsx
💡

for (var i = 1; i < 4; i++) {
  setTimeout(function() {
    console.log(i);
  }, 0);
}

console.log("loop!");

💡

setTimeout(function() {}, 0);

💡

setTimeout(() => {
  console.log(0);
}, 3000);

console.log("loop!");

setTimeout(() => {
  console.log(1);
}, 1000);

setTimeout(() => {
  console.log(2);
}, 2000);

setTimeout(() => {
  console.log(3);
}, 0);

console.log("finish!");
```

Hoisting.   💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊

```jsx
💡

console.log(a);
console.log(b);
console.log(func());
console.log(func1());

var a = "there";
var b = { h: 2 };

function func() {
  return 2;
}

var func1 = function() {
  return 3;
};

💡

console.log(a);
console.log(b);

let a = "there";
const b = "here";

💡

console.log(a);

a = "there";

var a = "some";

console.log(a);
```

Functions  💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊

```jsx
💡

"use strict";

console.log(func1());
console.log(func2());

function func1() {
  return "declaration";
}

const func2 = () => {
  return "arrow";
};

💡

const func2 = () => {
  return "arrow";
};

console.log(func1());
console.log(func2());

function func1() {
  return "declaration";
}

💡

const createClicker = () => {
  let clickCount = 0;

  return {
    get() {
      return clickCount;
    },
    increase() {
      clickCount += 1;
    }
  };
};

const clicker1 = createClicker();

clicker1.increase();
clicker1.increase();

console.log(clicker1.get());

// *** function-4 *** //

const createClicker = () => {
  let clickCount = 0;

  return {
    get() {
      return clickCount;
    },
    increase() {
      clickCount += 1;
    }
  };
};

const clicker1 = createClicker();
const clicker2 = createClicker();

clicker1.increase();
clicker1.increase();

clicker2.increase();

console.log(clicker1.get(), clicker2.get());

💡

let clickCount = 0;

const createClicker = () => {
  return {
    get() {
      return clickCount;
    },
    increase() {
      clickCount += 1;
    }
  };
};

const clicker1 = createClicker();
const clicker2 = createClicker();

clicker1.increase();
clicker1.increase();

clicker2.increase();

console.log(clicker1.get(), clicker2.get());
```

Equals  💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊

```jsx
💡

const a = false == 0;
const b = '0' == 0;
const c = {} == {};

console.log(a, b, c);

💡

const arr = [];
const arr1 = arr;

const a = false === 0;
const b = '0' === 0;
const c = [] === [];
const d = arr === arr1;

console.log(a, b, c, d);

💡

const func = () => {};
const func1 = () => {};
const func2 = func;

const a = func === func1;
const b = func2 === func;
const c = func2 === () => {};

console.log(a, b, c);
```

Data_Types  💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊

```jsx
💡

var a = {
  g: "here"
};

var b = a;

a = {
  h: "there"
};

console.log(b);

💡

var a = "here";
var b = a;

a = "there";

console.log(b);

💡

var a = Symbol("here");
var b = Symbol("here");

console.log(a === b);

💡 Что будет выведено в консоль?

console.log(Number(5));
console.log(String(5));
console.log(new Number(5));

💡 Код в какой переменной сработает и не упадет?

function functioName(a, b, c) {
  var a = arguments.map(item => item);

  var b = Array.from(arguments).slice(item => item);

  var d = arguments.slice(item => item);

  var c = [...arguments].filter(item => item);
}
```

Timeout_Interval_Promise  💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊💊

```jsx
💡

const interval = setInterval(() => console.log("interval"), 2000);
const timeout = timeout(() => console.log("timeout"), 2000);

//a
stopIntervals();
stopTimeouts();

//b
clearTimeout(timeout);
clearInterval(interval);

//c
interval.stop();
timeout.stop();

//d
deleteTimeout(timeout);
deleteInterval(interval);

💡

//a
Promise.resolve(123)
  .then(() => {})
  .then(() => {});

//b
Promise(123)
  .then(() => {})
  .then(() => {});

//c
new Promise(resolve => resolve(123)).then(() => {}).then(() => {});

//d
fetch("http://some.url/").then(() => {});

💡

try {
  fetch("http://some.url/").then(
    data => {},
    error => console.log("Request error")
  );
} catch (err) {
  console.log("Try catch error");
}

💡

Promise.resolve(123)
  .then(data => {
    console.log(data);
    return 245;
  })
  .then(data => {
    console.log(data);
  })
  .then(data => {
    console.log(data);
  });

💡

const prom1 = Promise.resolve("123");

const prom2 = Promise.resolve("here");

const prom3 = Promise.resolve("some");

Promise.all([prom1, prom2, prom3]).then(data => console.log(data));

💡

const prom1 = Promise.resolve("123");

const prom2 = Promise.reject("error");

const prom3 = Promise.resolve("some");

Promise.all([prom1, prom2, prom3])
  .then(data => console.log(data))
  .catch(error => console.log(error));
```
