
- Create React App – это лучший инструмент для создания нового одностраничного приложения. 
 
```javascript
npm install -g create-react-app
create-react-app папка_с_проектом
cd папка_с_проектом
npm start
```

Create React App не привязан к программной логике или хранилищам информации, он просто создает фронтенд, с которым вы можете работать с любого сервера. В процессе сборки он использует такие расширения, как Webpack, Babel и ESLint, однако, вы можете конфигурировать их.


Нужно установить нужные пакеты
```javascript  
npm install --save react react-dom
```

В основном файле js нужно произвести импорт 

```javascript  
import React from "react";
import ReactDOM from "react-dom";
```


#### ReactDOM.render - превращает виртуальные React елемент в  обычные браузерные DOM елементы и рендерит их на странице. 

```javascript 
ReactDOM.render(elem, parent)  - ВСТАВКА елемента на страницу. первый аргумент это елемент который мы вставляем, вторым аргументом указываем родителя, т.е. КУДА вставляем елемент 
```
React обновляет только то, что необходимо. React DOM сравнивает элемент и его потомков из последнего вызова render() с элементом из предыдущего вызова render(), и применяет обновление DOM только если это необходимо, чтобы привести DOM в желаемое состояние.


#### JSX создает легковесный объект который по свойствам и методам гораздо меньше чем обычный объект JS.

#### VirtualDom - так называется эта технология, благодаря этому React работает так быстро. 

#### В JSX если код состоит из нескольких строк то его нужно поместить в круглый скобки ( ).  Создадим дерево елементов. 

```javascript  
const element = (
    <div>
        <h1>My title</h1>
        <ul>
            <li>First element</li>
            <li>Second element</li>
            <li>Third element</li>
        </ul>
    </div>
);
```

Библиотека React, которую мы подключили вначале нужна для корректной компиляции транспайлером Babel. Браузер должен получать javascript код. 

### Компоненты

Компоненты позволяют вам разделить UI на независимые, переиспользуемые части и работать с каждой из них отдельно.  
Это независимые блоки, которые могут имень свое собственное поведение

- Создаются с помощью функций, которые возвращают/return  react-елемент. 

- Пишутся с большой буквы, если писать с маленькой то react посчитает это как елемент

```javascript  

 const Todolist = () => {
     return ( 
        <ul>
            <li>First element</li>
            <li>Second element</li>
            <li>Third element</li>
        </ul> 
);
 }
 ```

- Для того чтобы использовать компонет нужно вставить его в React елемент в виде самозакрывающегося тега  **<Компонент />**
 ```javascript  
const element = (
    <div>
        <h1>My title</h1>
        <Todolist />
    </div>
);
```

- Компоненты могут содержать в себе другие компоненты

```javascript  
const App = () => {
  return (
    <div>
      <Header /> 
      <List />
    </div>
  );
};
```

- React - компоненты могут отличаться поедением, могут создавать и генерировтаь события


#### JSX

```javascript  
const element = <h1>Hello, world!</h1>;
```
 - позволяет использовать  javascript выражения
 - атрибуты называются camalCase
 - class = className, for = htmlFor
 - в свойства можно передавать любое значение
 - null, undefined, false в теле тегов не вызывают ошибок

Этот забавный синтаксис тега не представляет собой ни строку, ни HTML. Он называется JSX и представляет собой расширение языка в JavaScript. JSX может напоминать вам HTML разметку, но он полноценно работает в JavaScript.

JSX производит «элементы» React. 
Пишем любой JavaScript-код в JSX, завернув его в фигурные скобки 
JSX заворачивается в фигурные скобки {JSX}   

Babel превращает JSX в JS. 

Корнем JSX должен быть обернут в родительский html елемент. 
JSX может использовать javascript выражения , вызов функций, для этого нужно обернуть их в фигурные скобки. 

```jsx   
const Todolist = () => {

// создадим массив со списком дел 
const items = ['build react', 33, 'learn javascript'];
// создадим елемент 
const loginBox = <span> Login <span/>;

// далее можем использовать в  { } скобках 

     return ( 
        <ul>
            <li> { items[0] } </li> 
            <li> { items[1] } </li>
            <li> { loginBox } </li>
        </ul> 
);
}

```
### Props

Объект props создается автоматически и передается первым аргуметом в каждую функцию компонента.
Если не передать никаких параметров то объект props будет пустой

```jsx
const TodoListItem = (props)=>{ // объявили 
    return (
        <span>{props.label}</span> // используем с ключом label
    );
};

// далее используем в том месте где необходимо
const List = () => { 
  return (
    <ul>
      <li><TodoListItem label ='Drink Pepsi'/></li>  
      <li><TodoListItem label ='Build React App'/></li>  
    </ul>
  );
};

// также можно использовать деструктуризацию объекта props и использовать нужные ключи 
const TodoListItem = ( {label } )=>{ // деструктуризировали 
    return (
        <span>{props.label}</span> // используем с ключом label
    );
};

```
Также можно задать стили CSS, использовав объект с опсанием нужных стилей css
```jsx  
export const TodoListItem = ({label , important = false})=>{  

// пропишем стили для important
const colorStyle = { 
    // если important true то прсвоится tomato, и наоборот
    color: important ? 'tomato' : 'black', 
}

    return (
        // тут используем свойство объекта со стилями
        <span style={colorStyle}>{label}</span>
    );
};
```

### Массивы и подстановка данных 
Если данные приходят например от сервера и нужно их отрисовывать динамически, то
имеет смысл использовать методы массивов, такие как map, filter, reduce и т.п

```jsx
// В основном компоненте Apps
const App = () => {

// создаем массив с данными 
  const todoData = [
    {label: 'Drink Coffee' , important : false,},
    {label: 'Build React App' , important : true,},
    {label: 'Eat fright potatoes' , important : false,},
  ];

  return (
    <div>
      <Header />
      <Search />
      // запишем в поле todos объекта props весь массив, который будем использовать 
      // ужу в компоненте List
      <List todos={todoData}/>
    </div>
  );
};

// В компоненте List
// передадим в параметрах массив созданный в Apps
const List = ({todos}) => {

// создадим переменную в которую поместим разметку с динамически родставляемыми данными используя цикл map. который проходит по каждому елементу и выдирает нужные поля 

  const elements = todos.map((elem) => {
    return (
      <li>
        <TodoListItem  label={elem.label} important={elem.important}/>
      </li>  
    );
  });
//   на этом етапе мы уже имеем созданную разметку , которую возвратим в значение компонента 
  return (
    <ul>
       {elements} //отобразим созданную разметку
    </ul>
  );
};

```
Если поля объекта props совпадают с именами полей елементов массива, который мы используем, то можно 
использовать ...spread operator 
```jsx
const elements = todos.map((elem) => {
    return (
      <li>
      // распылим елемент масива 
        <TodoListItem  {...elem}/>
      </li>  
    );
  });
```

### Коллекции и ключи 
Когда React рендерит код он определяет какие елементы были изменены, для того чтобы повторно их не перерисовывать а обновить только то что ихменилось.
Для этого елементу добавляется поле id которое имеет уникальное значение. 

```jsx 
// добавим в массив новое поле id
  const todoData = [
    {label: 'Drink Coffee' , important : false, id: 233},
    {label: 'Build React App' , important : true, id: 43},
    {label: 'Eat fright potatoes' , important : false, id: 789},
  ];

//затем при генерировании новой разметки с данными добавим новому елементу уникальный ключ id

const List = ({todos}) => {

  const elements = todos.map((elem) => {
  // детсруктуризируем елемент массива, записав в отдельную переменную id а в другую переменную с помощью оператора ...rest поместим объект, который затем распилим  
  const {id , ...restElem} = elem;    

    return (
      <li key={id}>
        <TodoListItem  {...restElem} />
      </li>  
    );
  });
   
  return (
    <ul>
       {elements}
    </ul>
  );
};
```  
- каждому JSX елементу в массиве нужно уникальное свойство key
- не делаем ключи из индексов массива

### Классы

Если компонент должен иметь состояние можно использовать классы. 
Перепишем компонент TodoListItem из функции в класс

1. ключевое слово class
2. далее extends React.Component, указываем что наследуемся от класса Component
3. в теле класса вызываем метод render(){ где пишем основной код }
4. метод возвращает елемент . как и если бы мы использовали функциональный подход создания компонента
5. если класс принимает какието параметры, то объект props будет доступен с помощью this.props

```jsx
export default class TodoListItem extends Component {

  render() {

    const { label, important = false } = this.props;

    const style = {
      color: important ? "steelblue" : "black",
      fontWeight: important ? "bold" : "normal"
    };

    return (
      <span className="todo-list-item"> 
        <span className="todo-list-item-label" style={style} >
          {label}
        </span> 
        <button type="button" className="btn btn-outline-success btn-sm float-right" >
          <i className="fa fa-exclamation" />
        </button> 
        <button type="button" className="btn btn-outline-danger btn-sm float-right">
          <i className="fa fa-trash-o" />
        </button> 
      </span>
    );
  }
}
```

### Обработка событий

Если нужно обработать какоето событие, например 'click', то 
1. на елементе прописываем атрибут onСlick 
2. В качестве значения передаем функцию обработчик/Handler , в которой описываем дейтсвие при клике 
3. Вверху класса напишем эту функцию, чтобы сохранялся контекс функция должна быть СТРЕЛОЧНОЙ

```jsx 
export default class TodoListItem extends Component {

// функция Handler/обрабочик . должна быть стрелочной
  onLabelClick = () => {
    document.body.style.backgroundColor = 'red'; 
  }

  render() { 
    const { label, important = false } = this.props; 

    const style = {
      color: important ? "steelblue" : "black",
      fontWeight: important ? "bold" : "normal"
    };

    return (
      <span className="todo-list-item"> 
                                                // елемент на который повесили слушателя   
        <span className="todo-list-item-label" style={style} onClick={this.onLabelClick}>
          {label}
        </span> 
        <button type="button" className="btn btn-outline-success btn-sm float-right" >
          <i className="fa fa-exclamation" />
        </button> 
        <button type="button" className="btn btn-outline-danger btn-sm float-right">
          <i className="fa fa-trash-o" />
        </button> 
      </span>
    );
  }
}
```

### Состояние 

Внутреннее остояние компонента в React хранится в специальном поле  state, его можно инициализировать несколькими способами.  

1. конструкторе класса 
```jsx
export default class TodoListItem extends Component {
constructor(){ 
    super();
// инициалтзируем STATE, в нашем случае передаем только одно поле done, значение которого мы будем менять при клике на елементы
    this.state = { 
        done: false,
    }
}
......... остальной код 
}
```
2. вне конструктора. используя новый синтаксис
```jsx
export default class TodoListItem extends Component { 
// используем state вне поля constructor
state = { 
        done: false,
    }
......... остальной код 

}
```
- Чтобы получить значение поля state используем деструктуризацию и поместим значение в переменную

- создадим переменную которая будет хранить css класс , при определенном state будем добавлять туда дополнительный класс

- выведем переменную в нужном елементе в атрибуте classNames = { переменная }

- зададим условие, ЕСЛИ состояние поля done объекта state изменится с false на true то к переменной добавим некий класс done, в стилях которого прописан перечеркнутый текст

- STATE после установки , напямую  изменять нельзя, поэтому используем метод 
**setState( {в теле пишем то, что хотим изменить в STATE} )**

```jsx

export default class TodoListItem extends Component {

// поле состояние state
    state = { 
        done: false,
    }

// при клике
  onLabelClick = () => {
// изменяем значение поля done объекта STATE на true
    this.setState({done:true}) 
  }

  render() {

// получим нужное значение объекта state и поместим его в переменную
    const { done } = this.state;

    const { label, important = false } = this.props; 
    const style = {
      color: important ? "steelblue" : "black",
      fontWeight: important ? "bold" : "normal"
    };
// создадим переменную которая хранит в себе класс или классы, которые мы можем применять к елементам
    let classNames = 'todo-list-item-label';
// если в переменной которая хранит в себе значение поля done будет true , то добавим в переменную класс done
   (done) ? classNames += ' done' : classNames; 

    return (
      <span className="todo-list-item"> 
        <span className={classNames} style={style} onClick={this.onLabelClick}>
          {label}
        </span> 

......... остальной код  
```
Метод setState перетирает старое значение поля state на новое, поэтому при вызове метода setstate передаем только те свойтсва , которые нужно изменить 
```jsx
 state = { 
        done: false,
        important: false,
    }

//  МЕНЯЕМ ТОЛЬКО ТО, ЧТО НЕОБХОДИМО 
 onLabelClick = () => {
  // изменяем значение поля done объекта STATE на true
        this.setState({done:true});
      }
  // изменяем значение поля important объекта STATE на true 
  onMarkImportant =()=>{
    this.setState({important:true});
  }

```
#### Обновление текущего состояния State 

Для того что обновлять текущее состояние state, типа toggle, нужно 
- в методе setstate передать state как аргумент функции и там сделать возврат с отрицанием !
- или деструктуризировать нужное поле и вызвать его отрицание !

```jsx 
 state = { 
        done: false,
        important: false,
    }

onMarkImportant = () => { 

  this.setState( (state) => {   // передаем в аргументе объект state
    return {
      important: !state.important, // флипаем поле important
    }; 
  });
};

onLabelClick = () => {
    this.setState( ({done}) => { // также можно деструктуризировать нужное поле 
      return{
      done: !done, // и тут его флипнуть 
    }
  });
}

```

### Неизменность State

- setState НЕ должен изменять текущий state

- методы, которые изменяют (МУТИРУЮТ) массив использовать НЕЛЬЗЯ

- newArr = [...oldArr.slice(0,idx), ...oldArr.slice(idx+1)] Не мутирует старый массив