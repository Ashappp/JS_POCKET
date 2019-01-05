## Regular Expression
- [Создание](#Создание)
- [Методы паттерна](#Методы_паттерна)  
- [Методы строк](#Методы_строк)
- [Якоря](#Якоря)
- [Флаги](#Флаги)
- [Классы](#Классы)
- [Набор и диапазон](#Набор_и_диапазон)
- [Квантификаторы](#Квантификаторы)

####Полезное
- [Готовые решения для валидации](#Готовые решения для валидации) 
- [Сервисы](#Полезные ресурсы)

------------


Регулярные выражения (Regular Expression) - это особый язык для работы со строками с помощью шаблонов. 
Способ найти определенные паттерны в строке и, если необходимо, выполнить замену подстроки.

### Создание  

Паттерн (шаблон) - основа регулярного выражения по которому будет осуществляться поиск.
RE встроены в JavaScript и создаются используя литерал регулярного выражения **//** или вызовом конструктора  **new RegExp()** 

```javascript
// создаем паттерн с использованием литерала
const regA = /hello/;

// создаем паттерн с использованием конструктора
const regB = new RegExp('hello');
```

------------


### Методы_паттерна
 
#### .test( ) 
поиск точного соответствия подстроки  **возвращает true или false** 

```javascript
const str = 'The quick brown fox jumps over the lazy dog';

const patternA = /quick/;
const patternB = /qwerty/;

console.log(`Результат: ${patternA.test(str)}`); // true
console.log(`Результат: ${patternB.test(str)}`); // false
```
#### .exec( )

поиска точного соответствия подстроки.  **возвращает подстроку или null**

```javascript
const str = 'The quick brown fox jumps over the lazy dog';

const patternA = /quick/;
const patternB = /qwerty/;

console.log(`Результат: ${patternA.exec(str)}`); // quick
console.log(`Результат: ${patternB.exec(str)}`); // null
```

------------


### Методы_строк

#### .search( )  

поиск в строке на основе паттерна. **возвращает индекс первого совпадения**.
 Если совпадения **нет**, то метод **вернет -1**. Всегда **ищет только первое совпадение**.
 
```javascript
const str = `The quick brown fox jumps over the lazy dog`;
const patternA = /quick/;
const patternB = /qwerty/;

console.log (
  `str.search(patternA) : ${str.search(patternA)}`
); // 4

console.log (
  `str.search(patternB) : ${str.search(patternB)}`
); // -1
```

#### .match( )

ищет совпадение и **возвращает первое совпадение**, или, **если** регулярное выражение **содержит флаг g, то вернет  массив всех совпадений.**

```javascript
const str = `The quick brown fox jumps over the quick lazy dog`;
const pattern = /quick/g;

console.log (
  `str.match(pattern) : ${str.match(pattern)}`
); // ["quick", "quick"]
```

#### .replace( )

**возвращает новую строку в которой произошла замена паттерна на строку-заменитель**. Первый параметр значение которое нужно заменить , второе - на что заменить  

```javascript
const str = `The quick brown fox jumps over the lazy dog`;
const pattern = /brown/;

console.log ( `${str.replace(pattern, 'red')}`);
// The quick red fox jumps over the lazy dog

console.log('14-21-57'.replace( /-/g, ":" )); // 14:21:57
```

#### .split( )

разбивает строку на массив строк путём разделения строки заданной подстрокой. 
Имеет необязательный параметр **separator** который указывает символы, используемые в качестве разделителя внутри строки.
С помощью необязательного параметра **limit** можно задать максимальное число элементов, которое вернет метод split - т.е. limit "обрежет" лишние найденные элементы массива.
 
```javascript
const str = `1758-1982-7841-2275`;
const pattern = /-/g;

console.log (`${str.split(pattern)}`); 
// [1758, 1982, 7841, 2275]

console.log (`${str.split(pattern, 3)}`); 
// [1758, 1982]
```

------------


### Якоря

Знак каретки **^** и доллара **$** называются якорями и имеют особый смысл. 
Якоря это не символы подстроки, а спецсимволы проверки.

#### Каретку ^

используют чтобы указать, что строка **должна начинаться** на указанный паттерн.

```javascript
const strA = 'quick brown fox';
const strB = 'the quick brown fox';

const pattern = /^quick/;

console.log(`Результат: ${pattern.test(strA)}`); // true
console.log(`Результат: ${pattern.test(strB)}`); // false
```

#### Знак доллара $ 

используют чтобы указать, что строка **должна заканчиваться** на указанный паттерн.
```javascript
const strA = 'brown fox quick';
const strB = 'the quick brown fox';

const pattern = /quick$/;

console.log(`Результат: ${pattern.test(strA)}`); // true
console.log(`Результат: ${pattern.test(strB)}`); // false
```

#### Оба якоря

используют одновременно, если требуется, чтобы шаблон охватывал подстроку **с начала и до конца.**

```javascript 
const strA = 'brown fox quick';
const strB = 'quick';

const pattern = /^quick$/; // стока должна начинаться и заканчиваться только так

console.log(`Результат: ${pattern.test(strA)}`); // false
console.log(`Результат: ${pattern.test(strB)}`); // true
```

------------
### Флаги

Флаги - специальные **символы** размещаемые **сразу за литералом**. 

### i
поиск с **игнорированием** регистра. не различает между А и а.
```javascript
/ строка для поиска
const str = 'The quICK The quiCk The quIcK';

// флаг i игнорирует регистр
const pattern = /quick/i;

const result = str.match(pattern);

console.log(`result: ${result}`); // 'quICK'
console.log(`Используется флаг i?: ${pattern.ignoreCase}`); // true
```

###  g

поиск **всех** совпадений, а не только первого
```javascript
// строка для поиска
const str = 'The quick The quick The quick';

// флаг g не прекращает поиск после первого совпадения
const pattern = /quick/g;

const result = str.match(pattern);

console.log(`result: ${result}`); // ['quick', 'quick', 'quick']
console.log (`Используется флаг g?: ${pattern.global}`); // true 
```

###m 

поиск в **многострочном** режиме

------------ 
### Классы

Вместо конкретной подстроки можно использовать символы, описывающие любую букву, пробел или цифру. Такие сочетания символов, под которое подходит любой символ из определённого набора, называются классами.

Для выделения классов используют **обратный слэш** перед определенным знаком. 
Например класс цифр обозначают буквой d и обратным слэшем \d, таким образом патерн /\d/ ищет ровно одну цифру.

 **\d** Цифра от 0 до 9
**\D** НЕ цифра, любой символ кроме 0 ... 9
**\s**  Любой пробельный символ (перевод строки, tab)
**\S**  Любой НЕ пробельный символ
**\w**  Буквы только латинского алфавита, нижнее подчеркивание _ и цифры
 **\W** НЕ буквы латинского алфавита, НЕ нижнее подчеркивание _ и НЕ цифры
**\b**  Слово, символ \w (или символы), окруженные пробельными символами \s
**\B**  НЕ слово

------------


### Набор_и_диапазон  

Если необходимо найти диапазон чисел или букв используется конструкция
**[a-z]** - подходят все буквы от a до z в нижнем регистре
**[0-5]** - цифры в диапазоне от 0 до 5
В одних скобках можно указывать целую коллекцию для поиска [a-zA-z0-9]
Также можно включать в поиск и символы [_ -]

```javascript
const str = "У нас новая ёлка, мне очень нравится елка."
const pattern = /[её]лка/ig; // ищем подстроку у которой певая буква или е или ё

const result = str.match(pattern);
console.log(`result: ${result}`); // [ёлка, елка]
```

------------


### Квантификаторы

**Указатель количества**. 
Квантифкатор должен **стоять сразу за символом или дипапазоном символов**.
С помощью **фигурных скобок** можно задать количество символов, которые необходимо найти.

##### 4 цифры подряд:
```javascript 
const pattern = /\d{4}/;
```
##### 2-х до 5-ти цифр.
```javascript 
const pattern = /\d{2, 5}/
```
##### от 16 и больше
```javascript 
const pattern = /\d{16, }/;
```
#####  Сивол + это краткая запись для "один или более".
 ```javascript 
// запись
const patternA = /\d+/;
// аналогична
```javascript 
const patternB = /\d{1,}/;
```
##### Сивол ? это краткая запись для "ноль или один".
 ```javascript 
// запись
const patternA = /\d?/;

// аналогична
const patternB = /\d{0,1}/;
```
##### Сивол * это краткая запись для "ноль или более"
 ```javascript  
// запись
const patternA = /\d*/;

// аналогична
const patternB = /\d{0,};
```

------------
### Готовые решения для валидации
[8 Regular Expressions You Should Know](https://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149)

#### Username

```javascript
/^[a-z0-9_-]{3,16}$/
```
#### Password
```javascript
/^[a-z0-9_-]{6,18}$/
```
####  Hex Value
```javascript
/^#?([a-f0-9]{6}|[a-f0-9]{3})$/
```
#### Slug
```javascript
/^[a-z0-9-]+$/
```
#### Email
```javascript
/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
```
#### URL
```javascript
/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
```

------------

### Полезные ресурсы

[8 Regular Expressions You Should Know](https://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149)

[Справочник html5pattern](http://html5pattern.com/)

[Сервис для проверки REGEX101](https://regex101.com/)

[Cервис для проверки REGEXR](https://regexr.com/)
