- [Массивы](#Массивы)

- [Задачи на приемы работы с циклами](#Задачи_на_приемы_работы_с_циклами)

- [Цикл в цикле](#Цикл_в_цикле)

- [Объекты](#Объекты)

- [Функции](#Функции)

- [Тестовые](#Test_tasks)

---

### Массивы

- НУЖНО ПОЛУЧИТЬ В НОВЫЙ МАССИВ ДАННЫЕ ИЗ ДРУГОГО МАССИВА
  ПО ЗАДАННЫМ УСЛОВИЯМ

```js
const arr1 = [2, 5, 77, 15, 20,19,56,14,"Sam"];
выбрать из массива числа меньше 20 и записать их в новый массив

const arr2 = [];

for(let i=0, max = arr1.length; i<max;i++){

       if(arr1[i]<20){
           arr2.push(arr1[i]);
       }

}
универсальное решение для разных условий
```

- присвоить значения переменных друг другу не объявляя новую переменную

```js
let a = 5;
let b = 10;
нужно A присвоить значение B, а B присвоить значение А
[a , b] = [b , a];
```

- присвоить переменным значения елементов массива

```js
const arr3 = ["Sun", 55, "Moon", 100, "Winter"];

Можно объявить переменные и присвоить им каждой по индексц массива
типа let newItem = arr3[0] и так далее
но можно воспользоваться ДЕСТРУКТУРИЗАЦИЕЙ массива

let [var1, var2, var3,var4] = ["Sun", 55, "Moon", 100, "Winter"];
или так
[var1, var2, var3,var4] = arr3;
```

- перебор елементов массива, которые также являются массивами и записать в новый массив

```js
есть массив который имеет вложенные массивы

const numbers = [ [1, 8, "House"] , ["Wind", 887, "Left"] , [78,55,97]];
нужно записать все эти значения в один массив

 1
const flatArr=[];
for( let i=0, max=numbers.length; i<max; i++){
       for( let j = 0, max = numbers[i].length; j<max; j++){
           flatArr.push(numbers[i][j]);
       }
}
 2.
const flatArr = numbers.flat();

 3.
const newarr = [];
numbers.forEach((elem, idx, arr)=> {
    elem.forEach(elem=> newarr.push(elem))
})
```

- Есть массив, нужно взять из него строку и поработать с ней

```jsx
например изменить ее и поместить обратно

const arrWords = ["Andrey" , "Vasya", "Petya"];
нужно привести имена к нижнему регистру

возьмем первый елемент массива
Это строка

let userNameStr = arrWords[0];

преобразуем ee в массив с помощью метода .SPLIT()

let userNameArr = userNameStr.split('');

получим ["A", "n", "d", "r", "e", "y"]

возьмем первую букву , а это первый елемент массива и сделаем ее нижнего регистра

userNameArr[0] = userNameArr[0].toLowerCase();
получим ["a", "n", "d", "r", "e", "y"]

запишем массив в строку, если указать с пустыми кавычками то разделителя не будет
userNameStr = userNameArr.join("");

вернем изменненный елемент в исходный массив
arrWords[0] = userNameStr;
["andrey", "Vasya", "Petya"]
в итоге мы поработали с елементом и вернули его назад
```

- Получаем входные данные , напр строка, в каком регистре мы получили от пользователя данные мы не знаем необходимо преобразовать в нужный форма - Первая буква заглавная, остальные строчные

```js
получаем даннее

let userInput = "aPPartMent";

преобразовываем к единому регистру
userInput = userInput.toLowerCase();

разбиваем строку побуквенно и записываем в массив
let userArr2 = userInput.split("");

теперь обращаемся к любому символу и работаем с ним
userArr2[0] = userArr2[0].toUpperCase();

возвращаем отредактированные данные обратно
let userData = userArr2.join("");
```

- Провери ть есть ли елемент в массиве

```js
let hasElem = (arr , elem) => arr.includes(elem);
вернет true/false
```

- Отфильтровать исходный массив и вернуть новый отфильтрованный массив

```js

получаем входной массив

const realNumberArray = [4, 5.6, -9.8, 3.14, 42, 6, 8.34, -2];

const squareList = (arr) => {

    запишем в новую переменную этот массив но отфильтруем его
    отфильтруем массив , удалим числа КОТОРЫЕ меньше НУЛЯ и которые НЕ ЦЕЛЫЕ
    затем произведем операции с отфильтрованным массивом с помощью метода .map

       let squaredIntegers = arr.filter( x => x > 0 && Number.isInteger(x) ).map( z => z*z );

вернем значение squaredIntegers в константу squareList
return squaredIntegers;
}

console.log(squareList(realNumberArray));
```

- метод reduce()

```js
Получить сумму чисел массива
Входной массив
const arr88 = [1,2,3,4,5];

присваиваем новый массив в переменную
На первой итерации reduce берет 0 индекс и суммирует его с последующим елементом массива
На второй итерации берет прошлое значение и суммирует его с последующим и так пока не закончатся елементы

let sumArr = arr88.reduce((x,y)=> x+y);
```

- Деструктуризация массива

```js

let customArr = [35, "string", 787, "87a", 9, "usa", 925, 2.5, -8];

Назначит этим переменным соответствующие ключи
let [aa, bb, cc, ww] = customArr;

Если нужно пропустить какието значения то пишем через запятую

let [one, two, , ,three] = customArr;
присвоит переменным 1,2 и 5 елмент массива

также можно передать оставшиеся значения массива в переменнную
let [firstElem, secondElem, ...restElem] = customArr;
в переменную restElem запишется весь остаток массива
```

- Найти наименьшее и набольшее число в массиве

```js
const maxMin = [12, 15, 25, 37, 41];

 1. ES6
let min= Math.min(...maxMin);
let max=Math.max(...maxMin);

 2.
let min=maxMin[0];
let max = maxMin[0];
maxMin.forEach(el=> el < min ? min=el : min);
maxMin.forEach(el=> el > max ? max=el : max);

 3.
for (var i = 0; i < maxMin.length; i++) {
    if(maxMin[i] < maxMin[0]){
    maxMin[0] = maxMin[i];
    }
}
let min2 = maxMin[0];

for (var i = 0; i < maxMin.length; i++) {
    if(maxMin[i] > maxMin[0]){
    maxMin[0] = maxMin[i];
    }
}
let max2 = maxMin[0];
```

- Игра Камень Ножницы Бумага

```js
    1) Створити 3 змінних (камінь ножиці папір).
    2) Записати варіант користувача в змінну.
    3) Создати змінну в яку запишеться варіант компютера.
    4) Зрівняти змінну юзера і компютера:
    4,1) Якщо змінні однакові тоді нічия (Вивести результат)
    4,2) Якщо змінні різні:
    4,2,2) Опрацювати варіанти перемоги юзера (Вивести результат)
    4,2,3) Інакше виграв комп. (Вивести результат)

let userChoice = prompt("камень ? ножницы ? бумага ?");

let computerChoice = Math.random();

if (computerChoice < 0.34) {
  computerChoice = "камень";
} else if(computerChoice <= 0.67) {
  computerChoice = "бумага";
} else {
  computerChoice = "ножницы";
}

if (userChoice===computerChoice) {
  alert("Nichya");
}

if (userChoice==="камень") {
	if (computerChoice==="ножницы") {
		alert("камень wins!") ;
	} else {
		alert("бумага wins!");
	}
}

if (userChoice==="бумага") {
	if (computerChoice==="камень") {
		alert("бумага wins!");
	} else {
		alert("ножницы wins!");
	}
}

if (userChoice==="ножницы") {
	if (computerChoice==="rock") {
	alert("камень wins!");
	} else {
	alert("ножницы wins!");
	}
}
```

- Конвертер валют

```js
(() => {
  let totalSum = prompt("Сколько кеша есть на обмен ?", "");
  if (totalSum === null) return alert("Заходи как будут бабки !");
  if (isNaN(totalSum)) return alert("Только числа чувак:) ");

  let userCurrency = prompt(
    "Какая валюта на руках ? Меняем только 'USD' , 'EUR', 'UAH'",
    ""
  );
  if (userCurrency === null) return alert("Заходи как будут бабки !");
  userCurrency = userCurrency.toLowerCase();
  if (userCurrency != "usd" && userCurrency != "eur" && userCurrency != "uah")
    return alert("Ясно же написано какие валюты доступны !!!");

  let needCurrency = prompt(
    "Шо хотим получить ? Есть только 'USD' , 'EUR', 'UAH' ",
    ""
  );
  if (needCurrency === null) return alert("Заходи как будут бабки !");
  needCurrency = needCurrency.toLowerCase();
  if (needCurrency != "usd" && needCurrency != "eur" && needCurrency != "uah")
    return alert("Давай до свиданья !!!");

  if (userCurrency == "usd" && needCurrency == "eur") {
    alert(` Вы получите ${totalSum / 1.2} ЕВРО`);
  } else if (userCurrency == "usd" && needCurrency == "uah") {
    alert(` Вы получите ${totalSum * 28} ГРИВЕН`);
  } else if (userCurrency == "eur" && needCurrency == "uah") {
    alert(` Вы получите ${totalSum * 32} ГРИВЕН`);
  } else if (userCurrency == "eur" && needCurrency == "usd") {
    alert(` Вы получите ${totalSum * 1.2} ДОЛЛАРОВ`);
  } else if (userCurrency == "uah" && needCurrency == "usd") {
    alert(` Вы получите ${totalSum / 28} ДОЛЛАРОВ`);
  } else if (userCurrency == "uah" && needCurrency == "eur") {
    alert(` Вы получите ${totalSum / 32} ЕВРО`);
  }
})();
```

- Полиндром

```js
получаем от юзера строку
Разбиваем строку посимвольно  и превращаем ее в массив с помощью split('')
потом применяем к нему метод reverse()
собираем все символы в строку с помощью join('')
 1
let userInput = prompt("Дай слово");
let poly = userInput.split('').reverse().join('');
(userInput) === poly ? alert("Это ПОЛИНДРОМ") : alert("Это не он");

 2 the same but shorter
const isPoly = (word) => word === word.split('').reverse().join('');

```

- Создание двумерного массива

```js
let arrayMain = []; основной массив

главный цикл , сколько укажем i столько вложенных массивов и будет

for(let i = 0; i < 3; i++){

	на первой итерации основного цикла создадим пустой вложенный массив
	let arrayInner=[];  вложенный массив

	сколько j - столько елементов будет содержать внутренний массив
	for(let j=o; j< 2; j++){
			arrayInner.push(j);  пушим елементы во вложенный массив
	}

	после выхода из вложенного цикла мы получаем [0, 1, 2]

	запишем созданный внутренний массив в основной массив
	arrayMain.push(arrayMain);

	ПЕРВЫЙ елемент основного цикла готов [ [0, 1, 2] ]
	ПЕРЕХОДИМ НА СЛЕДУЮЩУЮ ИТЕРАЦИЮ

}
```

- Составь команду

```js
1) Пользователь вводит количество команд
2) Пользователь вводит количество людей в команде
3) Программа рандомно наполняет масивы именами
4) Имена не должны повторятся (Один пользователь должен быть только в одной команде. Имя не должно повторятся в других командах.)

let namesArr = ['Albert','Isaac', 'Galileo', 'Marie', 'Johannes', 'Nicolaus', 'Max', 'Katherine', 'Ada', 'Sarah', 'Lise','Hanna'];
let namesArrCopy = namesArr.slice();
let team = [];
let countTeam = prompt("Сколько команд необходимо ?")*1;
let countmember = prompt("Сколько людей в команде ?")*1;

buildTeam(countTeam, countmember);

function buildTeam(countteam, countmember){

	for (let i =0; i< countteam; i++){

		let subTeam=[];

				for (let j=0; j<countmember;j++){
						let randomMember = Math.floor(Math.random()*(namesArrCopy.length-1));
						subTeam.push(namesArrCopy[randomMember]);
			Чтобы не повторялся игрок мы его вырезаем
						namesArrCopy.splice(randomMember,1);
				}

		team.push(subTeam);

	}
}
```

- Покупки

```js
Написать програму которая будет отвечать за список покупок
1) В диалоговое окно вводим количество покупок которое хотим сделать;
2) Сколько покупок столько раз появится окно где юзер пишет фразу "Название товара:цена" Например ("Булочка:5")
3) После ввода всех товаров алертом вывести суму покупок;

let countBuy = prompt("Количесвто покупок которое необходимо сделать");
let totalSum = 0;

do{
if(countBuy === null) break;

      let userChoise = prompt("Название товара : цена");
      let letsArr = userChoise.split(":");
      totalSum += letsArr[1]*1;

      countBuy--;

}while(countBuy)

alert(`Cумма Ваших покупок составила ${totalSum}`);
```

- Получить масив удаленых чисел

```js
1) Данно оригинальний масив let arr = [5,10,15,20,25,30,35,40];
2) Данно масив з остатком let result = [10,20,35];
3) Получить масив удаленых чисел;  [5,15,25,30,40];

let arr = [5,10,15,20,25,30,35,40];
let result = [10,20,35];
let deletedItems =[];

Проходися по оригиналному массиву
for (let elem of arr){
Если результирующий массив НЕ содержит елемента оригинального массива значит этот елемент был удален
	if(!result.includes(elem)) deletedItems.push(elem);
}

 2.
const removed = arrr.filter(el => !result.includes(el) );

```

- разницу значений двух масивов

```js
Написать програму которая находит разницу значений двух масивов
1) [1, 2, 3], [100, 2, 1, 10]  [3, 10, 100]

let oneArr = [1, 2, 3];
let secondArr = [100, 2, 1, 10];
let uniqueNumber = [];

    First way

let result1 = oneArr.filter(elem => secondArr.indexOf(elem) < 0);
let result2 = secondArr.filter(elem => oneArr.indexOf(elem) < 0);
let uniqueArr = [...result1, ...result2];

    Second way

for(let elem of oneArr){
	if(!secondArr.includes(elem)) uniqueNumber.push(elem);
}
for(let elem of secondArr){
	if(!oneArr.includes(elem)) uniqueNumber.push(elem);
}
```

- уникальные елементы масива

```js
Написать код которий виводит уникальные елементы масива.
let arr = [1,2,5,10,12,5,3,2,8,3];

Получить масив уникальных значений [1,10,12,8]

let unique = [];

for(let elem of arr){
 зададим счетик, который установим в 0
let counter = 0;

 сравним каждый елемент со всеми остальными
	for(let innerelem of arr){
     если произойдет совпадение то увеличим на 1, при повторном совпадении эта цифра уже не буде равно 1
			if(elem === innerelem) counter++;
	}
 на выходе из первого прохода смотрим на counter, если там 1 значит елемент совпал 1 раз и он уникален
	if(counter === 1){
	unique.push(elem);
	}
}
```

- удалить из массива значения, которые дают FALSE

```js
Написать код который удалит из масива  null, 0, "", false, undefined NaN

1) let start =  [NaN, 0, 15, false, -22, '',undefined, 47, null];
2) Должны получить на виходе let result = [15, -22, 47];

let start = [NaN, 0, 15, false, -22, '',undefined, 47, null];
let result = [];

for(let elem of start){
	if(!elem) result.push(elem);
}
```

ДРУГИЕ РАЗНЫЕ ЗАДАЧКИ

- Даны два массива: ['a', 'b', 'c'] и [1, 2, 3]. Объедините их вместе.

```js
let a = ["a", "b", "c"];
let b = [1, 2, 3];
const newArr = a.concat(b);
```

- Дан массив ['a', 'b', 'c']. Добавьте ему в конец элементы 1, 2, 3.

```js
a)
let a = ['a', 'b', 'c'];
a.push(1);
a.push(2);
a.push(3);

b)
let a = ['a', 'b', 'c'];
a.splice(3,0,1,2,3);
```

- Даны два массива: [1, 2, 3] и [4, 5, 6]. Объедините их вместе.

```js
let a = [1, 2, 3];
let b = [4, 5, 6];
const newArr = a.concat(b);
```

- Дан массив [1, 2, 3]. Сделайте из него массив [3, 2, 1].

```js
let arrayOne = [1, 2, 3];
arrayOne.reverse();
```

- Дан массив [1, 2, 3]. Добавьте ему в начало элементы 4, 5, 6.

```js
a)
let a = [1, 2, 3];
a.splice(0,0,4,5,6);
b)
let a = [1, 2, 3];
a.unshift(4,5,6);
```

- Дан массив [1, 2, 3]. Добавьте ему в начало элементы 4, 5, 6.

```js
let a = [1, 2, 3];
a.splice(0,0,4,5,6);
b)
let a = [1, 2, 3];
a.unshift(4,5,6);
```

- Дан массив ['js', 'css', 'jq']. Выведите на экран первый элемент.

```js
let a = ["js", "css", "jq"];
alert(a[0]);
```

- Дан массив ['js', 'css', 'jq']. Выведите на экран последний элемент.

```js
a)
let a = ['js', 'css', 'jq'];
alert(a[2]);
b)
let a = ['js', 'css', 'jq'];
console.log(a[a.length-1]);
```

- Дан массив [1, 2, 3, 4, 5]. С помощью метода slice запишите в новый элементы [1, 2, 3].

```js
let a = [1, 2, 3, 4, 5];
let b = a.slice(0, 3);
console.log(b);
```

- Дан массив [1, 2, 3, 4, 5]. С помощью метода splice преобразуйте массив в [1, 4, 5].

```js
let a = [1, 2, 3, 4, 5];
a.splice(1, 2);
console.log(a);
```

11. Дан массив [1, 2, 3, 4, 5]. С помощью метода splice запишите в новый массив элементы [2, 3, 4].

```js
let a = [1, 2, 3, 4, 5];
let deleted = a.splice(1, 3);
console.log(deleted);
```

- Дан массив [1, 2, 3, 4, 5]. С помощью метода splice сделайте из него массив [1, 2, 3, 'a', 'b', 'c', 4, 5]

```js
let a = [1, 2, 3, 4, 5];
a.splice(3, 0, "a", "b", "c");
console.log(a);
```

- Дан массив [1, 2, 3, 4, 5]. С помощью метода splice сделайте из него массив [1, 'a', 'b', 2, 3, 4, 'c', 5, 'e'].

```js
let arr = [1, 2, 3, 4, 5];
arr.splice(1, 0, "a", "b");
arr.splice(6, 0, "c");
arr.splice(8, 0, "e");
console.log(arr);
```

- Дана строка, состоящая из символов, например, 'abcde'. Проверьте, что первым символом этой строки является буква 'a'. Если это так - выведите 'да', в противном случае выведите 'нет'.

```js
let a = "abcde";
if (a[0] === "a") {
  console.log("Yes");
} else {
  console.log("No No");
}
```

- Дана строка с цифрами, например, '12345'. Проверьте, что первым символом этой строки является цифра 1, 2 или 3. Если это так - выведите 'да', в противном случае выведите 'нет'.

```js
let str = "12345";
if (str[0] == 1 || str[0] == 2 || str[0] == 3) {
  alert("ДА");
} else {
  alert("NO!!!");
}
```

- Дана строка из 3-х цифр. Найдите сумму этих цифр. То есть сложите как числа первый символ строки, второй и третий.

```js
let a = "123";
alert(Number(a[0]) + Number(a[1]) + Number(a[2]));
```

- Дана строка из 6-ти цифр. Проверьте, что сумма первых трех цифр равняется сумме вторых трех цифр. Если это так - выведите 'да', в противном случае выведите 'нет'.

```js
let a = "123321";

if (
  Number(a[0]) + Number(a[1]) + Number(a[2]) ===
  Number(a[3]) + Number(a[4]) + Number(a[5])
) {
  alert("Zaebis");
} else {
  alert("Ne zaebis");
}
```

- Дан массив mas. Выведите его в формате индекс элемента — значение (через три дефиса). Каждый элемент с новой строки.

```js
let mas = [15, "hello", "trump", 23, "world", 999, 176];

console.log(mas.indexOf(15) + "---" + mas[0]);
console.log(mas.indexOf("hello") + "---" + mas[1]);
console.log(mas.indexOf("trump") + "---" + mas[2]);
console.log(mas.indexOf(23) + "---" + mas[3]);
console.log(mas.indexOf("world") + "---" + mas[4]);
console.log(mas.indexOf(999) + "---" + mas[5]);
console.log(mas.indexOf(176) + "---" + mas[6]);
```

- Дан массив mas. Выведите его в формате индекс элемента — значение (через дефис). Каждый элемент с новой строки. Выводить нужно те элементы, значение которых больше пяти (5).

```js
но надо лделать циклами

var mas = [2, 3, 4, 5, 6, 4, 77, 32, 4];

if(mas[0] > 5){
	console.log((mas.indexOf(2)) + '-' + mas[0]);
}
if(mas[1] > 5){
	console.log((mas.indexOf(3)) + '-' + mas[1]);
}
if(mas[2] > 5){
	console.log((mas.indexOf(4)) + '-' + mas[2]);
}
if(mas[3] > 5){
	console.log((mas.indexOf(5)) + '-' + mas[3]);
}
if(mas[4] > 5){
	console.log((mas.indexOf(6)) + '-' + mas[4]);
}
if(mas[5] > 5){
	console.log((mas.indexOf(4)) + '-' + mas[5]);
}
if(mas[6] > 5){
	console.log((mas.indexOf(77)) + '-' + mas[6]);
}
if(mas[7] > 5){
	console.log((mas.indexOf(32)) + '-' + mas[7]);
}
if(mas[8] > 5){
	console.log((mas.indexOf(4)) + '-' + mas[8]);
}
```

- Клонирование массива - напишите скрипт, который копирует массив не изменяя оригинал - ['Капуста', 'Репа', 'Редиска', 'Морковка']

```js
let mas = ["Капуста", "Репа", "Редиска", "Морковка"];
console.log(mas.slice());
```

- Преобразование массива в строку - Напишите код, который преобразовывает и объединяет все элементы массива в одно строковое значение. Элементы массива будут разделены запятой.

```js
let mas = ["Капуста", "Репа", "Редиска", "Морковка"];
console.log(mas.join(","));
```

- Получить последние элементы массива - Напишите код, который возвращает фрагмент массива, содержащий последние '5' элементов массива.

```js
let mas = [
  "Капуста",
  "Репа",
  "Редиска",
  "Морковка",
  ",Bananas",
  "apple",
  "mango",
  "cucumber"
];
console.log(mas.slice(length - 5));
```

- Разворачивание массива - напишите скрипт который развернёт массив.

```js
let mas = [
  "Капуста",
  "Репа",
  "Редиска",
  "Морковка",
  ",Bananas",
  "apple",
  "mango",
  "cucumber"
];

console.log(mas.reverse());

2;
const reversed = [];
for (let i = mas.length - 1; i >= 0; i--) {
  reversed.push(mas[i]);
}
```

## Задачи*на*приемы*работы*с_циклами

- С помощью цикла for сформируйте строку '123456789' и запишите ее в переменную str.

```js
let str = "";

for (let i = 1; i < 10; i += 1) {
  str = str + i;
}
console.log(str);
```

- С помощью цикла for сформируйте строку '987654321' и запишите ее в переменную str.

```js
let str = "";
for (let i = 9, min = 0; i > min; i -= 1) {
  str = str + i;
  console.log(str);
}
```

- С помощью цикла for сформируйте строку '-1-2-3-4-5-6-7-8-9-' и запишите ее в переменную str.

```js
let str = "";
for (let i = 1, max = 10; i < 10; i++) {
  str = str + i + "-";
}
console.log("-" + str);
```

- Сумма элементов двух массивов - Напишите код, который создаёт массив элементов представляющих собой сумму соответствующих элементов заданных массивов.

```js
[1, 2, 3, 4, 5];
[4, 5, 6];

let a = [1, 2, 3, 4, 5];
let b = [4, 5, 6];
let c = [];
let max = [];
let min = [];

 1
if (a.length > b.length) {
	max = a;
	min = b
} else {
	max = b;
	min = a;
};

for (let i = 0; i < max.length; i++){
Проверим есть ли елемент в меньшем массиве. Если нет, то он будет равен 0
	if (min[i]===undefined) {
		min[i]=0;
	};
Новый елемент массива будет равен сумме елементов массивов a и b
	c[i] = a[i]+b[i];
};

 2

a.length > b.length ? max=[...a] : min=[...a];
a.length < b.length ? max=[...b] : min=[...b];

max.forEach((el, idx, arr)=> {
    if(min[idx] === undefined) min[idx]=0;
    return c.push(el+min[idx]);
})
c = c.reduce((acc,el)=> acc + el);

 3
let c =  a.reduce((a,e)=>a+e) + b.reduce((a,e)=>a+e);

```

- Дан массив mas. Выведите его в формате индекс элемента — значение (через три дефиса). Каждый элемент с новой строки.

```js
let mas = [15, "hello", "trump", 23, "world", 999, 176];

for (let i = 0; i < mas.length; i += 1) {
  console.log(i + "---" + mas[i]);
}
```

- Дан массив mas. Выведите его в формате индекс элемента — значение (через дефис). Каждый элемент с новой строки. Выводить нужно те элементы, значение которых больше пяти (5).

```js
var mas = [2, 3, 4, 5, 6, 4, 77, 32, 4];

for (let i = 0; i < mas.length; i += 1) {
  if (mas[i] > 5) {
    console.log(i + "-" + mas[i]);
  }
}
```

- создайте массив из чисел, примерно 5-10 чисел. Посчитайте сумму числе в массиве. Распечатайте сперва все исходные данные, потом распечатайте сумму чисел в массиве.

```js
var mas = [2, 3, 4, 5, 6, 4, 77, 32, 4, 6, 19, 30, 8, 44];

let b = 0;

for (let i = 0; i < mas.length; i += 1) {
  b = mas[i] + b;
}
console.log(b);
```

- Создайте массив из чисел, примерно 5-10 чисел. Посчитайте массив, в котором каждый элемент это разница между соседними элементами исходного массива. Например первый элемент результирующего массива это разница между вторым и первым элементом исходного массива, второй элемент результирующего массива это разница третьего и второго элемент исх. массива. Распечатайте сперва исходные данные, потом распечатайте результирующим массив.

```js
let a = [2, 3, 4, 5, 6, 4, 77, 32, 4, 6, 19, 30, 8, 44];
let b = [];

for (let i = 0; i < a.length - 1; i += 1) {
  b[i] = a[i + 1] - a[i];
  console.log(b);
}

2;
a.forEach((elem, idx, arr) => {
  if (arr[idx + 1]) {
    b[idx] = arr[idx + 1] - arr[idx];
  }
});
```

- Удалить повторяющиеся элементы массива - верните массив, в котором удалены повторяющиеся элементы из массива arr (игнорируйте чувствительность к регистру).

```js
let a = [
  "php",
  "php",
  "css",
  "css",
  "script",
  "script",
  "html",
  "html",
  "java"
];
let b = [];

2;
a.forEach((el, idx, arr) => {
  a.forEach((elem, idx, arr) => {
    if (el === arr[idx + 1]) {
      b.push(el);
      a.splice(idx, 1);
    }
  });
});
```

- Массив указанной длины - напишите скрипт который генерирует массив заданной длины 4, заполненный целыми числами, где каждое число больше предыдущего на единицу.

```js
let a = [];

for (let i = 0; i < 4; i++) {
  a[i] = i;
  console.log(a[i]);
}
console.log(a);
```

- Дан массив с числами. Узнайте сколько элементов с начала массива надо сложить, чтобы в сумме получилось больше 10-ти.

```js
let a = [2, 3, 4, 5, 6, 4, 77, 32, 4, 6, 19, 30, 8, 44];
let sum = 0;
let counter = 0;

for (let i = 0; i < a.length; i++) {
  sum += a[i];
  if (sum > 10) {
    console.log(
      "Чтобы в сумме получилось больше 10ти, нужно: " + (i + 1) + " элемента"
    );
    break;
  }
}

2;
a.forEach((elem, idx, arr) => {
  if (sum < 10) {
    sum += elem;
    counter++;
  }
});
```

- Дан массив с числами. Не используя метода reverse переверните его элементы в обратном порядке.

```js

ПИЗДЕЧ Версия!
let a = [2, 3, 4, 5, 6, 4, 77, 666]
let b = 0;

let mass = Math.ceil((a.length-1) / 2);
for(let i = 0; i < mass; i ++){
	b = a[i];
	a[i] = a[a.length-(i+1)];
	a[a.length-(i+1)] = b;
}

Low vr.
const a = [2, 3, 4, 5, 6, 4, 77]

for(let i = 0; i < a.length; i ++){
	a.splice(i,0, a.pop());
}

Dima vr.
var mas = [2, 3, 2, 5, 1, 4, 77, 32, 4];
var mas2 = [];

for (let i = 0; i < mas.length; i++) {
	mas2.unshift( mas[i]);
}

Nadin vr
const a = [2, 3, 4, 5, 6, 4, 77];
const b = [];

for(let i = a.length-1; i >= 0; i --){
	b.push(a[i]);
}
```

### Цикл*в*цикле

- Выведите на экран таблицу умножения (как в школьной тетради).

```js
for(let i = 1; i < 10; i++){
	for(let j = 1; j < 10; j++){
		console.log(`${i} * ${j} =` + (i \* j));
	}
}
```

- Заполните массив следующим образом: в первый элемент запишите 'x', во второй 'xx', в третий 'xxx' и так далее.

```js
const arr = [];

for (let i = 1; i <= 10; i++) {
  arr.push("x".repeat(i));
}
console.log(arr);
```

### Многомерные массивы

- Дан двухмерный массив с числами, например [[1, 2, 3], [4, 5], [6]]. Найдите сумму элементов этого массива. Массив, конечно же, может быть произвольным.

```js
let mass = [[1, 2, 3], [4, 5], [6]];
let accum = 0;

1;
mass.forEach(elem => (accum += elem.reduce((acc, el) => acc + el)));

2;
for (let i = 0; i < mass.length; i++) {
  for (let j = 0; j < mass[i].length; j++) {
    accum = accum + mass[i][j];
    console.log(accum);
  }
}
```

- Дан трехмерный массив с числами, например [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]. Найдите сумму элементов этого массива. Массив, конечно же, может быть произвольным.

```js
let mass = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]];
let accum = 0;

for (let i = 0; i < mass.length; i++) {
  for (let j = 0; j < mass[i].length; j++) {
    for (let k = 0; k < mass[i][j].length; k++) {
      accum = accum + mass[i][j][k];
      console.log(accum);
    }
  }
}
console.log(accum);
```

### На флаги\_

- Дан массив с числами. Проверьте, что в этом массиве есть число 5. Если есть - выведите 'да', а если нет - выведите 'нет'.

```js
const a = [2, 3, 4, 5, 6, 4, 77];

Первый способ
if(a.includes(5)){
	console.log('YES');
}else{
	console.log('NO');
}

Tern
a.includes(5) ? console.log('YES') : console.log('NO');

Второй способ
a.indexOf(5) != -1 ? console.log('YES') : console.log('NO');
```

- Дано число, например 31. Проверьте, что это число не делится ни на одно другое число кроме себя самого и единицы. То есть в нашем случае нужно проверить, что число 31 не делится на все числа от 2 до 30. Если число не делится - выведите 'false', а если делится - выведите 'true'.

```js
let num = 15;
let b = false;

for (let i = 2; i < num; i++) {
  if (num % i == 0) {
    b = true;
    break;
  }
}
console.log(b);
```

- Дан массив с числами. Проверьте, есть ли в нем два одинаковых числа подряд. Если есть - выведите 'да', а если нет - выведите 'нет'.

```js
const a = [2, 3, 4, 5, 5, 6, 4, 77, 2];
let hide = "No";

for (let i = 0; i < a.length; i++) {
  if (a[i] == a[i + 1]) {
    hide = "yes";
    break;
  }
}
console.log(hide);
```

- Дано число n=1000. Делите его на 2 столько раз, пока результат деления не станет меньше 50. Какое число получится? Посчитайте количество итераций, необходимых для этого (итерация - это проход цикла), и запишите его в переменную num

```js
let n = 1000;
let stop = 50;

let i = 0;

do{
	n = n/2;
	i++;
	console.log(n);
}
while(n >= stop);


Второй вариант
let i;
for(i = 0; n >= stop; i++){
	n = n / 2;
console.log(n);
}
console.log(i);
```

- Найти факториал числа, у пользователя запрашивается число, и в результате выдаётся факториал числа,(если ввести к примеру 5 то результат должен быть равен 120, потому что факториал 5 это 5*4*3*2*1)

```js
let num = 5;
let fact = 1;
for (let i = num; i >= 1; i--) {
  fact = fact * i;
}
console.log(fact);
```

- Найти последовательность Хэеса, то есть пользователь вводит число и в результате должно быть выдано сообщение, с самой последовательностью, количеством шагов, которое понадобилось для нахождения этой последовательности, и вершиной последовательности, это максимальное число из этой последовательности.
- Последовательность Хэеса считается так: если ввели число 9, то проверяем его, если оно чётное, делим на 2, если нечетное, умножаем на 3 и прибавляем 1, и так до тех пор пока число не будет равно 1.

```js
9*3+1=28
28/2=14
14/2=7
7*3+1=22
22/2=11
11*3+1=34
34/2=17
17*3+1=52
52/2=26
26/2=13
13*3+1=40
40/2=20
20/2=10
10/2=5
5*3+1=16
16/2=8
8/2=4
4/2=2
2/2=1


let num = Number(prompt('Введите число: '));
let i = 0;

while(num != 1){
	if(num%2 == 0){
		num /= 2;
		console.log(num);
  }else{
		num = num * 3 + 1;
		console.log(num);
	}
	i++;
}
console.log(`Наше число итераций: ${i}`);

/_===== Поиск индекса элемента в массиве ======_/

/_ .indexOf("элемент") _/

console.log(myData.indexOf("Apple")); покажет номер индекса в массиве

Если элемента, индекс которого вы запрашиваете, в массиве нет,
JavaScript вернет значение −1.

/_
Метод indexOf похож на квадратные скобки, только здесь все наоборот:
команда array[2] - вернет ЕЛЕМЕНТ
команда array.indexOf(елемент) - вернет ИНДЕКС ЕЛЕМЕНТА
_/

/_ Превращаем массив в строку _/

    Метод .join() можно соединить все элементы массива в одну большую строку.
    елементы массива myData запишутся в строку через запятую
    если мы не хотим через запяую, то указываем разделитель в скобках

let joinedArray = myData.join(" / ");
запишет елементы через разделитель, который мы указали в скобках

/_ Случайный выбор числа _/

console.log(Math.random()\*10); который при каждом вызове возвращает случайное число от 0 до 1

/_
Важно помнить, что Math.random() всегда возвращает число меньше 1,
то есть никогда не возвращает собственно 1.
Если вам нужно число побольше, просто умножьте полученное из метода
Math.random() значение на подходящий коэффициент.
Например, если нужно случайное число от 0 до 10, умножьте Math.random() на 10:
_/
/_
Округление с помощью Math.floor()
И все же эти случайные значения нельзя использовать как индексы
в массиве, поскольку индексы должны быть целыми числами, а не десятичными
дробями.
Чтобы исправить этот недостаток, нужен метод
Math.floor(), округляющий число до ближайшего снизу целого значения
(по сути, он просто отбрасывает все знаки после запятой).
_/

    создадим массив для случайного выбора имени

let arrayNames = ["sam", "alex", "peter", "yra", "semen", "sergey", "lexa"];
выведем в консоль случайное имя
1- имя массива и [елемент для отображения]
2- [ Math.floor( Math.random() * число елементов массива) ]
console.log( Math.floor( Math.random() _ arrayNames.length ));
console.log( arrayNames[Math.floor( Math.random() _ arrayNames.length )] );

const scientist = [{
first: 'Albert',
last: 'Einstein',
year: 1879,
passed: 1955
},
{
first: 'Isaac',
last: 'Newton',
year: 1643,
passed: 1727
},
{
first: 'Galileo',
last: 'Galilei',
year: 1564,
passed: 1642
},
{
first: 'Marie',
last: 'Curie',
year: 1867,
passed: 1934
},
{
first: 'Johannes',
last: 'Kepler',
year: 1571,
passed: 1630
},
{
first: 'Nicolaus',
last: 'Copernicus',
year: 1473,
passed: 1543
},
{
first: 'Max',
last: 'Planck',
year: 1858,
passed: 1947
},
{
first: 'Katherine',
last: 'Blodgett',
year: 1898,
passed: 1979
},
{
first: 'Ada',
last: 'Lovelace',
year: 1815,
passed: 1852
},
{
first: 'Sarah E.',
last: 'Goode',
year: 1855,
passed: 1905
},
{
first: 'Lise',
last: 'Meitner',
year: 1878,
passed: 1968
},
{
first: 'Hanna',
last: 'Hammarström',
year: 1829,
passed: 1909
}
];

1.  отримати масив вчених що народилися в 19 ст
    let whoBorn = scientist.filter(el => el.year >= 1800 && el.year < 1900);
    console.log(whoBorn);

2.  знайти суму років скільки прожили всі вченні
    let howMany = scientist.map(elem => elem.passed -elem.year).reduce((acc,elem)=> acc+elem,0);
    console.log(howMany);

3.  Відсортувати вчених по алфавіту
    let sortSientist = scientist.sort((a,b) => a.first > b.first ? 1:-1);
    console.log(sortSientist);

4.  Відсортувати вчених по даті народження
    let sortDate = scientist.sort((a,b) => a.year - b.year);
    console.log(sortDate);

5.  Відсортувати вчених по кількості прожитих років
    let sortYearLive = scientist.sort((a,b) => (a.passed -a.year) - (b.passed -b.year));
    console.log(sortYearLive);

6.  Видалити з масива вчених що родилися в 15 або 16 або 17 столітті
    let deleteScientist = scientist.filter(el => el.year < 1400 || el.year < 1500 || el.year > 1600);
    console.log(deleteScientist);

7.  Знайти вченого який народився найпізніше.
    let younger = scientist.sort((a,b) => b.year - a.year);
    console.log(younger[0]);

8.  Знайти рік народження Albert Einstein
    let albert = scientist.find(el => el.first === 'Albert');
    console.log(albert.year);

9.  Знайти вчених прізвище яких починається на літеру С
    let nameC = scientist.filter(elem => elem.last[0] === "C");
    console.log(nameC);

10. Видалити з масива всіх вчених імя яких починається на A
    let nameA = scientist.filter(elem => elem.first[0] !== 'A');
    console.log(nameA);

/_
nonUniqueElements([1, 2, 3, 1, 3]) == [1, 3, 1, 3]
nonUniqueElements([1, 2, 3, 4, 5]) == []
nonUniqueElements([5, 5, 5, 5, 5]) == [5, 5, 5, 5, 5]
nonUniqueElements([10, 9, 10, 10, 9, 8]) == [10, 9, 10, 10, 9]
_/

let arr =[1, 2, 3, 1, 3];
let arr_u = [...arr];

for(let elem of arr){

     let counter = 0;

     for(let innerelem of arr){
         if(elem === innerelem) counter++;
     }

     if(counter === 1) arr_u.splice(arr_u.indexOf(elem), 1);

}
console.log(arr_u);

{
let a = 555;
console.log(arr, typeof goooo);
};

function goooo(){
console.log('111');
}

Найти уникальное елемент массивов
function diffArray(arr1, arr2) {
let newArr = [];

     for(let i=0;i<arr2.length;i++){
         if(arr1.indexOf(arr2[i]) === -1) newArr.push(arr2[i]);

     }
     for(let i=0;i<arr1.length;i++){
         if(arr2.indexOf(arr1[i]) === -1) newArr.push(arr1[i]);

     }
     console.log(newArr);

return newArr;
}
diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);

function destroyer(arr) {
var arg = [];
var newArr = [];
for (var i = 1; i < arguments.length; i++) {
arg.push(arguments[i]);
}
for (var j = 0; j < arr.length; j++) {
if (arg.indexOf(arr[j]) < 0) {
newArr.push(arr[j]);
}
}
return newArr;
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);
```

# ||||||||||||||||||||||||||||||||||||||||||||||||

# Объекты

```js
 1. Напишите программу на JavaScript, чтобы получить список свойств объекта JavaScript.

 Пример объекта :
 var student = {
 name: "David Rayy",
 sclass: "VI",
 rollno: 12};
 Пример вывода : name, sclass, rollno


 const person = {
     name: 'Peter',
     isActive: true,
     gender: 'M'
 }
 let arr = Object.keys(person);
 console.log(arr);

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 2. Напишите программу на JavaScript для удаления свойства rollno из следующего объекта.
 Также напечатайте объект до или после удаления свойства.

 const student = {
 name: "David Rayy",
 sclass: "VI",
 rollno: 12,
 };

 delete student.rollno;


:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 3. Напишите программу JavaScript, чтобы получить длину объекта JavaScript. Перейти к редактору.


 var student = {
 name: "David Rayy",
 sclass: "VI",
 rollno: 12,
 };

 let arr = Object.keys(student).length;

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 4. Напишите программу на JavaScript для отображения статуса чтения
 (т.е. отображения названия книги, имени автора и статуса чтения) следующих книг.

   const library = [
    {
        author: 'Bill',
        title: 'Book Title',
        readStatus:  false,
    },
    {
        author: 'Sam',
        title: 'Book Title 2',
        readStatus:  true,
    },
    {
        author: 'Alex',
        title: 'Title 3',
        readStatus:  true,
    },
 ];

 function showBookInfo(arr){
     for(let elem of arr){
         console.log("-------------------------------");

         for(let key in elem){
             console.log(` ${key}  :  ${elem[key]}`);
         }
         console.log("-------------------------------");
     }
 }
 showBookInfo(library)
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 5. Напишите программу на JavaScript, чтобы получить объем цилиндра с четырьмя десятичными разрядами, используя классы объектов.
 Объем цилиндра : V = πr 2 h,
 где r - радиус, а h - высота цилиндра.

 const volume = {
     pi: 3.14,
     r: 30,
     h: 55,
     getvolume(){
         return (this.pi * this.r)*(2*this.h);
     }
 }
 console.log(volume.getvolume());

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 6. Напишите алгоритм пузырьковой сортировки в JavaScript.
 Примечание. Пузырьковая сортировка - это простой алгоритм сортировки,
 который работает путем многократного пошагового перемещения по списку, который нужно отсортировать.
 Пример данных: [6,4,0, 3, -2,1]
 Ожидаемый результат: [-2, 0 , 1, 3, 4, 6]


function bubbleSort(arr) {

    for (let i = 0, endI = arr.length - 1; i < endI; i++) {

        for (let j = 0, endJ = endI - i; j < endJ; j++) {

            if (arr[j] > arr[j + 1]) {

                let swap = arr[j];

                arr[j] = arr[j + 1];

                arr[j + 1] = swap;

            }
        }
    }

    return arr;
}


console.log(bubbleSort([6,4,0, 3, -2,1]));

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 7. Напишите программу на JavaScript, которая возвращает подмножество строки. Перейти к редактору.
 Пример данных: собака
 Ожидаемый результат: ["d", "do", "dog", "o", "og", "g"]



:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 8. Напишите программу на JavaScript для создания часов.
 Примечание: вывод будет приходить каждую секунду.
 Ожидаемый вывод на консоль:
 "14:37:42"
 "14:37:43"
 "14:37:44"
 "14:37:45"
 "14:37:46"
 "14:37:47"

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 9. Напишите программу на JavaScript для расчета площади и периметра круга. Перейти к редактору
 Примечание. Создайте два метода для расчета площади и периметра. Радиус круга будет предоставлен пользователем.

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 10. Напишите программу JavaScript для сортировки массива объектов JavaScript. Зайдите в редактор
 Sample Object:

 библиотека var = [
    {
        название: «Дорога впереди»,
        автор: «Билл Гейтс»,
        ID библиотеки: 1254
    },
    {
        название: «Уолтер Исааксон»,
        автор: «Стив Джобс»,
        ID библиотеки: 4264
    },
    {
        title: «Сойка-пересмешница: последняя книга Голодных игр»,
        автор: «Сюзанна Коллинз»,
        ID библиотеки: 3245
    }];
 Ожидаемый результат:

 [[Объект Object] {
   автор: "Уолтер Исааксон",
   ID библиотеки: 4264,
   название: "Стив Джобс"
 }, [Объект Object] {
   автор: "Сюзанна Коллинз",
   ID библиотеки: 3245,
   title: «Сойка-пересмешница: последняя книга Голодных игр»
 }, [Объект Object] {
   автор: "Дорога впереди",
   ID библиотеки: 1254,
   название: "Билл Гейтс"
 }]

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 11. Напишите функцию JavaScript для печати всех методов в объекте JavaScript.
 Test Data :
 console.log (all_properties (Array));
 ["length", "name", "arguments", "caller", "prototype", "isArray", "наблюдаем", "unobserve"]

 function all_properties(obj){

     for(let key in obj){
         console.log(key);
          if(typeof obj[key] === "function"){
              console.log(obj[key]);
          }
     }
 }
 console.log(all_properties(Array));

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 12. Напишите функцию JavaScript для разбора URL.
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 13. Напишите функцию JavaScript для извлечения всех имен собственных и унаследованных свойств объекта.
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 14. Напишите функцию JavaScript, чтобы получить все значения свойств объекта.
 function allvalues(obj){
     for(let key in obj){
         console.log(`Ключ ${key} ||=> Значение ${obj[key]} `);
     }
 }
 var student = {
     name: "David Rayy",
     sclass: "VI",
     rollno: 12
 };
 allvalues(student);
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 15. Напишите функцию JavaScript для преобразования объекта в список пар `[key, value]`.

 var student = {
     name: "David Rayy",
     sclass: "VI",
     rollno: 12
 };
 let arr = Object.entries(student);
 console.log(arr);


:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 16. Напишите функцию JavaScript, чтобы получить копию объекта, ключи которого стали значениями, а значения - ключами.

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 17. Напишите функцию JavaScript, чтобы проверить, содержит ли объект данное свойство.

 hasProperty = (obj, prop) => obj.hasOwnProperty(prop);
 console.log(hasProperty(student, 'rollno'));

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 18. Напишите функцию JavaScript, чтобы проверить, является ли данное значение элементом DOM.

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 10 ===========================================
 Деструктуризация ОБЪЕКТА / МАССИВА / ПЕРЕМЕННЫХ

 ОБЪЕКТ
let customObj = {
    name: "Sam",
    age: 37,
    gender:"M"
};

 Первый способ

Объявляем переменные с подобными именами
let {name , age, gender} = customObj;
 такой способ создаст переменные и присвоит им значение ключей объекта

 11. Второй способ

 Если мы хоти чтобы ключи объета приходили в переменные которые мы назовем так как хотим
 то пишем значение объекта, двоеточие и нашу переменнуб, куда прилетит значение ключа

let{name : N , age : A, gender: G} = customObj;

 Если нужно получить ключ свойства, который также ОБЪЕКТ то синтаксис такой
const objInObj = {
    name: {pseudo:"Yra", "right name":"Semen"},
    age:14,
    hobby:{primary:"fun",cost:9999}
}
присвоим переменнным значения ключей вложенного объекта
let {name:{pseudo : Fake}, age : Age, hobby:{cost : howMuch}} = objInObj;

 12 ==============================================
 Метод объекта for in

 Перебирает ключи объекта

let menu = {
    width: 300,
    height: 200,
    title: "Menu"
};
 TASK  Создадим копию объекта
 для этого нужно перебрать его значения,
которые являются ПРИМИТИВНЫМИ и записать в новый объект

 создадим пустой объект
let copyObj = {};
переберем с помощью цикла for in елементы объекта
 этот код будет вызван для каждого свойства объекта menu

for (let key in menu) {
    запишем в объект copyObj копию объекта menu
    copyObj[key]=menu[key];
}


13. TASK Посчитать количество ключей в объекте

let counter = 0;
for (let key in menu) {
counter++;
}

14. TASK
Есть объект salaries с зарплатами.
Напишите код, который выведет сумму всех зарплат.
Если объект пустой, то результат должен быть 0.

let salaries = {
    "Вася": 100,
    "Петя": 300,
    "Даша": 250
};

let total =0;

let totalSalary = (x)=>{
    for (let key in x){
        total += x[key];
    }
    if(total <= 0){
        console.log("Объект пустой");
    }
    return total;
}
```
# Функции

```js
1 Создайте функцию isEmpty(obj), которая возвращает true, 
  если в объекте нет свойств и false – если хоть одно свойство есть.

 
 function isEmptyFirst(x){
     let i=0;
     for(let key in x){
         i++;
     }
     if (i>0){
         console.log("Есть ключи");
         }else {
             console.log("Тут пусто"); 
         }
 }
  2 способ 
 function isEmptySecond(o){
     for(let key in o){
         return false;
     }
     return true;
 }

 -:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:  

  2 Написать функцию, которая принимает аргументы и формирует из него массив
  воспользуемся псевдомассивом, который принимает на себя аргументы и функции и записывает тх в 
  псевдомассив


Объявим переменную, которая будет пустым массивом

 let pseudoArray2=[];

 создадим функцию, которая запишет в пустой массив псевдомассив

 function pseudoArray(){
     pseudoArray2 = Array.from(arguments); 
 }

Теперь при вызове функции и при передаче ей аргументов будет сформирован новый массив
 pseudoArray(88,22,"god");
  pseudoArray2 = [88,22,"god"]

Метод Array.from() может создать массив из строки 

 let str = "I am string";
 let arrFromStr = Array.from(str); 

получаем arrFromStr=["I", " ", "a", "m", " ", "s", "t", "r", "i", "n", "g"]  

 -:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-: 

3 узнаем столетие по году

 function getAge (year){
     let rezult = Math.floor(year / 100)+1;
     return `Сейчас на дворе ${rezult} век`;
 }
 console.log(getAge(2018));
 console.log(getAge(1875));
 console.log(getAge(675)); 

 -:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:  

4 високосный год

 function getAge (year){ 
     return (year % 4 === 0 ) ? 'Год високосный' : 'Год не високосный'; 
     }
     console.log(getAge(2019));
     console.log(getAge(2012));
     console.log(getAge(1998));

 -:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-: 

5. Написати ф-ю convertToRem(px) яка приймає строку і повертає значення в rem 


 function convertToRem(px){
     let rem = px / 16;
     return rem + 'rem';
 }
 console.log(convertToRem(16));  1rem
 console.log(convertToRem(24));  1.5rem
 console.log(convertToRem(0));  0rem
 

 =============================== #3 ===================================


Написати ф-ю convertToPrc(container, block) яка приймає розміри контейнера та розміри блока в форматі строк і повертає значення блока в %. 
Якщо результат дробовий округлювати до двох знаків після коми.

console.log('1000px', '100px'); 10%
console.log('950px', '150px');  15.79%

 function convertToPrc(container, block){ 
  let containerN = Number.parseInt(container);
  let blockN = Number.parseInt(block);
  let size = ((blockN/containerN) * 100).toFixed(2);
  return size + '%';
 }

 console.log(convertToPrc('1000px', '100px'));
 console.log(convertToPrc('950px', '150px'));




 =============================== #4 ===================================

Написати ф-ю pxConvertor(from, to, block, container)  яка приймає параметри:
 from - одиниці з яких конвертувати, 
 to - одиниці в які конвертувати, 
 block - розміри блока для конвертації, 
 container - розмір контейнера.

 Всі параметри це строки. Ф-я повертає результат або % або rem.

   console.log('px', 'rem', 16);  1rem
   console.log('px', 'rem', 24);  1.5rem
   console.log('px','%', 100px', '1000px'); 10%
   console.log('px', '%', '150px', '950px');  15.79%

 function pxConvertor(from, to, block, container=1){

 let pxToRem = (Number.parseInt(block)/16) + 'rem'; 
 let pxToPercent = ((Number.parseInt(block)/Number.parseInt(container))*100).toFixed(2) + '%'; 

   if(to === 'rem'){
       return pxToRem;
   }else if(to === '%'){
       return pxToPercent;
   }else {
       console.log('Некорректные данные');
   }  
 }

 console.log(pxConvertor('px', 'rem', 16));
 console.log(pxConvertor('px', 'rem', 24));
 console.log(pxConvertor('px','%', '100px', '1000px'));
 console.log(pxConvertor('px', '%', '150px', '950px'));



 =============================== #5 ===================================


Написати ф-ю convertFromKmToMetric(km). 
Ця функція приймає відстань в кілометрах і перетворює її в м, дм, см. 
Ф-я повертає обєкт конвертованих даних. 


 function convertFromKm(km){
 return `cm: ${km*100000}, dm: ${km*10000}, m: ${km*1000}`
 }
 
 console.log(convertFromKm(1));  {cm: 100000, dm: 10000, m: 1000,}
 console.log(convertFromKm(1.5));  {cm: 150000, dm: 15000, m: 1500,}
 console.log(convertFromKm(3));  {cm: 300000, dm: 30000, m: 3000,}

 =============================== #6 ===================================

Написати ф-ю convertFromKmToImperial(km). 
Ця функція приймає відстань в кілометрах і перетворює її в фути, дюйми, ярди. 
Ф-я повертає обєкт конвертованих даних. 


 function convertFromKm(km){
 return `feet: ${km*3280.84}, inch: ${km*39370.08}, yards: ${km*1093.613}`;
 }

 console.log(convertFromKm(1));  {feet: 3280,84, inch: 39370,08, yards: 1093,613,}
 console.log(convertFromKm(1.5));  {feet: 4921,26, inch: 59055,12, yards: 1640,42,}

 =============================== #7 ===================================

 Написати ф-ю cipher яка приймає зашифровану строку і повертає розшифровану. 
 Перетворення строки відбувається за алгоритмом ROT13 який заміняє 
 поточну літеру 13 буквою в абетці після неї. 
 Наприклад A => N; K => X; R => E; U => H;
 Перші 13 літер алфавіту зміщуються вправо.
 Другі 13 літер зміщується вліво. Використати методи строки: 

 fromCharCode()  =   букви в юнікод
 charCodeAt()      = юнікод в букви

 

 function cipher(str) {  LBH QVQ VG! 
     var min = 'A'.charCodeAt(0);
     var max = 'Z'.charCodeAt(0);
     var factor = 13;
     var result = "";
     str = str.toUpperCase();
     console.log(min, max);

     for (var i=0; i<str.length; i++) {  
       result += String.fromCharCode( (str.charCodeAt(i) - min + factor) % (max-min+1) + min); 
     }
    
     return result;
   }
  
 console.log(cipher("SERR CVMMN"))   FREE PIZZA;
 console.log(cipher("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT"))   THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG;

 ================================================================

 Написати ф - ю яка знаходить в масиві число яке найблище знаходиться до нуля і повертає його.
 Якщо таких чисел 2(тобто 1 і - 1) тоді повертати додатнє

 function closestToZero (nums) {
   let posNum = []; 

   for (let el of nums){
     posNum.push(Math.abs(el));  Сделали все числа массива положительными и поместили в МАССИВ
   }
  
   let min = Math.min(...posNum);  Найдем минимальное число в массиве

   return !nums.includes(min) ? min * -1 : min;   Если в массиве НЕТ МИНИМАЛЬНОГО числа то делаем его ОТРИЦАТЕЛЬНЫМ
 }
 console.log(closestToZero([-5, -3, 1, 2, 3, 5]))  1
 console.log(closestToZero([-2, 3, 5, 10]))  -2
 console.log(closestToZero([-7, -5, -3, 3, 5, 8])) 3


 Найти МИНИМАЛЬНОЕ ЧИСЛО В МАССИВЕ не используя ...REST

 function minimumNumber (nums) {
         let array = nums;    массив в котором будем искать минимальное значение
         let minNum = array[0];  возьмем первое число, с которым будем сравнивать остальные елементы
       
         for(let item of posNum){  запустим цикл в котором будем проверять числа

           if(item < minNum) {  если текущий елемент меньше первого елемента массива
             minNum = item;    то запишем в minNum это значние 
           }
         } 
         return  minNum;  вернем это значение
       }
 ================================================================

 Медіана – це числове значення, яке ділить відсортований масив чисел на більшу і меншу половини. 
 У відсортованому масиві з непарним числом елементів медіана – це число в середині масиву.
 Для масиву з парним числом елементів медіана – це середнє значення двох чисел, 
 які знаходяться в середині масиву. Вам потрібно нвписати ф-ю яка приймає аргументом масив, 
 знаходить  медіану даного масиву і повертає її.

 function median(data) {
 
    получаем ЧИСЛО которое будет равно половине длины массива
     var middle = Math.floor((data.length - 1) / 2); 

     if (data.length % 2) {  если нет остатка от деления, тоесть четное количество елементов
         return data[middle];  возвращаем число которое стоит посередине 
     } else {  
          тогда берем ДВА елемента которые стоят посередине 
          сумируем их и делим на два
         return (data[middle] + data[middle + 1]) / 2; 
     }
 }

 console.log(median([1, 2, 3, 4, 5]))  3;
 console.log(median([1, 2, 3, 3, 5]));  3
 console.log(median([1, 1, 2,  200, 300]))  2;
 console.log(median([3, 6, 10, 15, 20, 99]));

 =============================================================

 Напишите ф-ю которая принисает число и возвращает его зеркальную копию. 

 function reverseNumber(str){
     return sTr = Number(String(str).split('').reverse().join(''));  
 }

 console.log(reverseNumber(12))  21
 console.log(reverseNumber(567))  765
 console.log(reverseNumber(1004))  4001
 
 -:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:  
 
 Напишите ф-ю которая принемает строку и делает из нее строку в стиле capitalize.

 Первый способ  
 function capitalize(str){
     let sTr= str.toLowerCase().split(' ');
     let modArr = sTr.map(val => val.replace(val.charAt(0), val.charAt(0).toUpperCase())).join(' ');
     return modArr;
  }
 

ВТОРОЙ СПОСОБ ЮЛИ  
 const capitalize = (str) => {   
     let arrWords = str.split(" ");  
     let newWord;
     let newArrWords = []; 
     for (let i = 0; i < arrWords.length; i++) { 
         let arrayOfLetters = arrWords[i].split("");  arrLetters = ["w", "r", "i", "t", "e"]  
         let firstLetter = arrayOfLetters[0].toUpperCase();   firstLetter = W   
         arrayOfLetters.splice(0,1,firstLetter);  arrayOfLetters = ["W", "r", "i", "t", "e"]  
         newWord = arrayOfLetters.join("");  newWord =  Write   
         newArrWords.push(newWord);  newArrWords =   ["Write", "JavaScript", "Function"]
     }; 
     let newStr = newArrWords.join(" ");  newStr =   Write JavaScript Function 
     return newArrWords;
 }

  Третий спосб используя REPLACE
 const capitalize = (str) => {   
     let arrWords = str.split(" ");   
     let newArr = [];  
     for(let elem of arrWords){
         newArr.push(elem.replace(elem[0], elem[0].toUpperCase()));
     } 
     return newArr; 
 }

 console.log(capitalize('write javaScript function')); Write JavaScript Function
 console.log(capitalize('the quick brown fox')); The Quick Brown Fox
 console.log(capitalize('go to the editor')); Go To The Editor

  -:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:  

 Напишите ф-ю которая принемает строку и возвращает количество гласных букв в строке

 function countOfVowels(str){ 

     let arrvow = 'aoeuiy'.split('');  
     let counter=0; 
     let arrStr = str.toLowerCase().split(''); 

     for(let elem of arrvow){ 
         for(let inelem of arrStr){
             if(elem === inelem) counter++; 
         }  
     }
     return counter;
 }
 

 console.log(countOfVowels('The quick brown fox'))  5
 console.log(countOfVowels('Example string'))  4 
 console.log(countOfVowels('Go to the editor'))  6 

-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:  

Напишите ф-ю которая принимает строку и букву и возвращает количество этой буквы в строке

 function countLetter(str, letter){
     let arr = str.split('');
     let counter =0; 

     for(let elem of arr){
         if(elem === letter) counter++;
     }
     return counter;
 }
 
 console.log(countLetter('w3oooooooschool.com', 'o'))  3

-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:  

Напишите ф-ю которая переводит rgb цвет в hex цвет
 Здесь поможет Number() i toString() 
 
  function convertColor(rgb) { 
      let cut = rgb.slice(4,-1).split(',');  
      let hex = cut.map(elem => Number(elem).toString(16)).join('');
      return `#${hex}`; 
   };

 console.log(convertColor('rgb(255,255,255)'));  #ffffff
 console.log(convertColor('rgb(0,0,0)')); #000000
 console.log(convertColor('rgb(66, 134, 244)')); #4286f4

 -:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:  

 Дан непустой массив целых чисел (X). 
 В этой задаче вам нужно вернуть массив, состоящий только из неуникальных элементов данного массива. 
 Для этого необходимо удалить все уникальные элементы (которые присутствуют в данном массиве только один раз).
 Для решения этой задачи не меняйте оригинальный порядок элементов. 
 Пример: [1, 2, 3, 1, 3], где 1 и 3 неуникальные элементы и результат будет [1, 3, 1, 3].

 function nonUniqueElements(arr){
     let unique = arr;

     for(let elem of unique){
         let counter = 0;
    
         for(let innerelem of unique){
             if(elem === innerelem) counter++;
         }
        
         if(counter === 1){
             unique.splice(unique.indexOf(elem),1);
         }
     } 
     return arr;
 }
 console.log(nonUniqueElements([1, 2, 3, 1, 3]));  [1, 3, 1, 3]
 console.log(nonUniqueElements([1, 2, 3, 4, 5]))  []
 console.log(nonUniqueElements([5, 5, 5, 5, 5]))  [5, 5, 5, 5, 5]
 console.log(nonUniqueElements([10, 9, 10, 10, 9, 8]))  [10, 9, 10, 10, 9]
 ```

 # Test_tasks

 ```js
// Check result

const assert = (a, b) => {
  if (a != b) {
    throw new Error(`Assertion failed. Actual: ${a}. Expected: ${b}`);
  }
  console.log(b);
};


// 1. Sum Calculator.  

const sum = (...rest) => rest.reduce((acc, el)=> acc + el);

assert(sum(400, 20), 420);
assert(sum(400, 20, 20, 20), 460);
assert(sum(400, 20, 20, 20, 40), 500);
assert(sum(120, 61), 181);

// -:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-

// 2. Mean value calculator. 

const mean = arr => sum(...arr) / arr.length; 

assert(mean([1, 2, 3, 4, 5]), 3);
assert(mean([49, 65, 12]), 42);

// -:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:

// 3. Write a function `mostPopularWord` that shows most popular word in text;
 
const mostPopularWord = (text) => {
  const counter = text
    .replace(/[,.*]/g, '')
    .split(/\s+/gi)
    .reduce((acc, word) => {
      acc[word] = acc[word] ? acc[word] + 1 : 1;
      return acc;
    }, {});
  return Object.entries(counter).sort((a, b) => b[1] - a[1])[0][0];
};

 
const text1 = 'dog, cat, lizard, cat, dog, dog, cat, cat, cat';
const text2 = 'John and Marry work together for last few years. John as designer and Marry as his manager. On Firday John is going to be promoted.';

assert(mostPopularWord(text1), 'cat');
assert(mostPopularWord(text2), 'John');

// -:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:

 ```