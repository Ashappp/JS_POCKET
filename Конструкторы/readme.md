Конструкторы

Это обычные функциии которые

- пишутся после оператора new
- в своем теле определяют структуру будущего объекта.
- может принимать параметры.
- как правило пишутся с большй буквы
- автоматически возвращают в this ссылку на объект new
- стрелочная ф-ция не может быть конструктором, т.к. у нее нет внуреннего контекста this

#### FLOW

1- оператор `new` создает место в памяти - пустой объект
2- функция которая вызывается после new получает в свой `this` ссылку на этот пустой объект
3- поэтому мы можем наполнять этот пустой объект полями используя `this.name` и т.п
4- ообъявленная переменная получает ссылку на объект с полями

- Объявим ф-цию конструктор и наполним ее

```js
const CreatePlayer(name, age){
    // this = {} 
    this.name = name;
    this.age = age;
    this.getName = function(){
        return this.name;
    }
    this.setName = function(newName){
        return this.name = newName;
    }
}
```

- Вызывает ф-цию конструктор

```js
const player = new CreatePlayer("Bob", 22);
```

- Методы объявленные через this , перейдут экземпляру.

```js
this.getName = function() {
  return this.name;
};
this.setName = function(newName) {
  return (this.name = newName);
};
```

- Чтобы сделать ссылку на метод а не назначать ее экземпляру, нужно записать метод в prototype ф-ции конструктора

```js
// ES5 способ
CreatePlayer.prototype.getName = function() {
  return this.name;
};
CreatePlayer.prototype.setName = function(x) {
  return (this.name = x);
};

// ES6 способ . Просто пишем методы без this после метода constructor
class CreatePlayer {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getName() {
    return this.name;
  }
  setName() {
    return (this.name = x);
  }
  //  если необходим метод, который доступен только констуктору
  static getFullData() {
    return this.name + this.age;
  }
}
```

#### Паттерн

**объект настроек**

Для удобства наполнения ф-ции конструктора делаем деструктуризацию полей объекта

- 1. создадим объект

```js
const userData = {
  name: "Bob",
  age: 33
};
```

- 2. создадим ф-цию кнструктор

```js
const CreatePlayer(name, age){
    this.name = name;
    this.age = age;
    this.getName = function(){
        return this.name;
    }
    this.setName = function(newName){
        return this.name = newName;
    }
}
```

- 3. деструктуризируем его поля в ф-цию конструктор

```js
const player = new CreatePlayer({ name, age });
```
