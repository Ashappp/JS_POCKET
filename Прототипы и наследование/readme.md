

В св-ве __proto__ -содержится ссылка на прототип (тот родитель на базе которого создан объект)
 

- Наследоваться от другого объекта
```js
const newObject = Object.create(object)
```
Если нужен легкий объект без свойств
```js
const newObj = Object.create(null)
```

- Проверка на **собственные** совйства.
Вернет буль. проверяет только собственные, не унаследованные св-ва

```js
objectname.hasOwnProperty('prop');
```

### __proto__ и prototype 

- У объекта есть сво-во **__proto__**

- У функции есть св-во **prototype**

- В свойстве **prototype** лежит объект, в котором изначально только одно поле **constructor**, которое ссылается на саму ф-цию конструктор

- При создании объекта через конструктор, в его **__proto__** лежит ссылка на поле **prototype** ф-ции конструктора, котороя создала этот объект 

- Поле **prototype** обычно используется для записи методов, чтобы не создавать эти методы на экземплярах а получать на них ссылку  