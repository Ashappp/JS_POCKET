- [Массивы](#Массивы)
- [Задачи на приемы работы с циклами](#Задачи_на_приемы_работы_с_циклами)
- [Цикл в цикле](#Цикл_в_цикле)

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

const flatArr=[];

for( let i=0, max=numbers.length; i<max; i++){

       for( let j = 0, max = numbers[i].length; j<max; j++){
           flatArr.push(numbers[i][j]);
       }

}
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

ES6
let min= Math.min(...maxMin);
let max=Math.max(...maxMin);

Второй способ
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

let userInput = prompt("Дай слово");
let poly = userInput.split('').reverse().join('');
(userInput) === poly ? alert("Это ПОЛИНДРОМ") : alert("Это не он");
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
let counter = 0;

	for(let innerelem of arr){
			if(elem === innerelem) counter++;
	}

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
console.log(c)
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

for (let i = 0; i < a.length; i += 1) {
  if (a[i] == a[i + 1]) {
    a.splice(i, 1);
    b.push(a[i]);
  }
}
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

for (let i = 0; i < a.length; i++) {
  sum += a[i];
  if (sum > 10) {
    console.log(
      "Чтобы в сумме получилось больше 10ти, нужно: " + (i + 1) + " элемента"
    );
    break;
  }
}
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
