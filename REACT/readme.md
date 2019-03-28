- Create React App – это лучший инструмент для создания нового одностраничного приложения.

```javascript
npm install -g create-react-app   // поставит глобально 
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

#### ReactDOM.render - превращает виртуальные React елементы в обычные браузерные DOM елементы и рендерит их на странице.

```javascript
ReactDOM.render(elem, parent)  - ВСТАВКА елемента на страницу. первый аргумент это елемент который мы вставляем, вторым аргументом указываем родителя, т.е. КУДА вставляем елемент
```

React обновляет только то, что необходимо. React DOM сравнивает элемент и его потомков из последнего вызова render() с элементом из предыдущего вызова render(), и применяет обновление DOM только если это необходимо, чтобы привести DOM в желаемое состояние.

#### JSX создает легковесный объект который по свойствам и методам гораздо меньше чем обычный объект JS.

#### VirtualDom - так называется эта технология, благодаря этому React работает так быстро.

#### В JSX если код состоит из нескольких строк то его нужно поместить в круглые скобки ( ). Создадим дерево елементов.

```jsx
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

- Создаются с помощью **функций**, которые возвращают/return react-елемент.

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
};
```

- Для того чтобы использовать компонет нужно вставить его в React елемент в виде самозакрывающегося тега **<Компонент />**

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

- позволяет использовать javascript выражения
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
const TodoListItem = props => {
  // объявили
  return (
    <span>{props.label}</span> // используем с ключом label
  );
};

// далее используем в том месте где необходимо
const List = () => {
  return (
    <ul>
      <li>
        <TodoListItem label="Drink Pepsi" />
      </li>
      <li>
        <TodoListItem label="Build React App" />
      </li>
    </ul>
  );
};

// также можно использовать деструктуризацию объекта props и использовать нужные ключи
const TodoListItem = ({ label }) => {
  // деструктуризировали
  return (
    <span>{props.label}</span> // используем с ключом label
  );
};
```

Также можно задать стили CSS, использовав объект с опсанием нужных стилей css

```jsx
export const TodoListItem = ({ label, important = false }) => {
  // пропишем стили для important
  const colorStyle = {
    // если important true то прсвоится tomato, и наоборот
    color: important ? "tomato" : "black"
  };

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
    { label: "Drink Coffee", important: false },
    { label: "Build React App", important: true },
    { label: "Eat fright potatoes", important: false }
  ];

  return (
    <div>
      <Header />
      <Search />
      // запишем в поле todos объекта props весь массив, который будем
      использовать // ужу в компоненте List
      <List todos={todoData} />
    </div>
  );
};

// В компоненте List
// передадим в параметрах массив созданный в Apps
const List = ({ todos }) => {
  // создадим переменную в которую поместим разметку с динамически родставляемыми данными используя цикл map. который проходит по каждому елементу и выдирает нужные поля

  const elements = todos.map(elem => {
    return (
      <li>
        <TodoListItem label={elem.label} important={elem.important} />
      </li>
    );
  });
  //   на этом етапе мы уже имеем созданную разметку , которую возвратим в значение компонента
  return <ul>{elements} //отобразим созданную разметку</ul>;
};
```

Если поля объекта props совпадают с именами полей елементов массива, который мы используем, то можно
использовать ...spread operator

```jsx
const elements = todos.map(elem => {
  return (
    <li>
      // распылим елемент масива
      <TodoListItem {...elem} />
    </li>
  );
});
```

### Коллекции и ключи

Когда React рендерит код он определяет какие елементы были изменены, для того чтобы повторно их не перерисовывать а обновить только то что изменилось.
Для этого елементу добавляется поле id которое имеет уникальное значение.

```jsx
// добавим в массив новое поле id
const todoData = [
  { label: "Drink Coffee", important: false, id: 233 },
  { label: "Build React App", important: true, id: 43 },
  { label: "Eat fright potatoes", important: false, id: 789 }
];

//затем при генерировании новой разметки с данными добавим новому елементу уникальный ключ id

const List = ({ todos }) => {
  const elements = todos.map(elem => {
    // детсруктуризируем елемент массива, записав в отдельную переменную id а в другую переменную с помощью оператора ...rest поместим объект, который затем распилим
    const { id, ...restElem } = elem;

    return (
      <li key={id}>
        <TodoListItem {...restElem} />
      </li>
    );
  });

  return <ul>{elements}</ul>;
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
6. хорошая практика деструктуризировать props в теле render(){
   const {one, two, three } = this.props; }

```jsx
export default class TodoListItem extends Component {
  render() {
    // деструктуризируем props
    const { label, important = false } = this.props;

    const style = {
      color: important ? "steelblue" : "black",
      fontWeight: important ? "bold" : "normal"
    };

    return (
      <span className="todo-list-item">
        <span className="todo-list-item-label" style={style}>
          {label}
        </span>
        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
        >
          <i className="fa fa-exclamation" />
        </button>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
        >
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}
```

### Обработка событий

Реакт создает обертку событий с таким же объектом event, для доступа к нему в асинхронном коде его нужно сохранить в переменную

```jsx
const target = event.target;
```

Если нужно обработать какоето событие, например 'click', то

1. на елементе прописываем атрибут onСlick
2. В качестве значения передаем функцию обработчик/Handler , в которой описываем дейтсвие при клике
3. Вверху класса напишем эту функцию, чтобы сохранялся контекст функция должна быть СТРЕЛОЧНОЙ

```jsx
export default class TodoListItem extends Component {
  // функция Handler/обрабочик . должна быть стрелочной
  onLabelClick = () => {
    document.body.style.backgroundColor = "red";
  };

  render() {
    const { label, important = false } = this.props;

    const style = {
      color: important ? "steelblue" : "black",
      fontWeight: important ? "bold" : "normal"
    };

    return (
      <span className="todo-list-item">
        // елемент на который повесили слушателя
        <span
          className="todo-list-item-label"
          style={style}
          onClick={this.onLabelClick}
        >
          {label}
        </span>
        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
        >
          <i className="fa fa-exclamation" />
        </button>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
        >
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}
```

### колбеки

- inline callbacks считаются **антипаттерном**

- хорошим паттерном является КАСТОМНЫЕ МЕТОДЫ КЛАССА
  прописываем в классе методы, которые потом используем как обработчики.

```jsx
// в теле конструктора пишем функцию
handleIncrement (){
  .....code
}
// вызов в теге/компоненте
<button onClick={this.handleIncrement}>
```

### Привязка контекста

Если используем методы класса как обработчики событий нужно привязать контекст

1. Инлайн привязка.
   Плохо так, как каждый раз когда будет происходить рендер компонента , то bind будет вызываться заново, что понижает производительность

```jsx
// в теле конструктора пишем функцию
handleIncrement (){
  .....code
}
// инлайн ПРИВЯЗКА
<button onClick={this.handleIncrement.bind(this)}>
```

2. Привязка в constructor(){}.
   хорошо тем, что конструктор выполняется только один раз, следовательно и привязка будет выполнятся один раз

```jsx
class Class extends Component {
  constructor(props) {
    super(props);

    // привязываем контекст ТУТ
    this.handleIncrement = this.handleIncrement.bind(this);
  }
}
```

3. Публичные поля класса. ES7. ЧЕРЕЗ СТРЕЛКУ
   При объявлении публичных полей класса, они записываются НЕ в свойство prototype, а ОБЪЕКТ ЭКЗЕМПЛЯРА (создается копия)

```jsx
class Class extends Component{

// привязываем контекст чЕРЕЗ СТРЕЛКУ
  handleIncrement = (evt) => {
    ...code;
  }

}
```

### Состояние

- Обычное поле класса. Объект.

- Используем для данных, которые будут динамически меняться.

- Когда state меняется ТО ПЕРЕРИСОВЫВАЕТСЯ компонент

Внутреннее остояние компонента в React хранится в специальном поле state, его можно инициализировать несколькими способами.

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

### STATE зависит от props

В этом случае нужно пробрасывать props через конструктор , предварительно передав через свойство в компонент

```jsx
// спускаем props вниз
<TodoListItem  value={55}/>

// в самом компоненте используем спустившийся props
export default class TodoListItem extends Component {

// 1 СПОСОБ через constructor
constructor(props){
    super(props);
// инициалтзируем STATE, в нашем случае передаем только одно поле done, значение которого мы будем менять при клике на елементы
    this.state = {
        done: this.props.value, // спустилось 55
    }
}

// 2 СПОСОБ минуя constructor. Babel преобразует в код выше
this.state = {
        done: this.props.value, // спустилось 55
    }

......... остальной код
}
```

### Изменение состояния

- STATE после установки , напямую изменять нельзя, поэтому используем метод
  **setState( {в теле пишем то, что хотим изменить в STATE} )**

```jsx
this.setState({
  ключ: новое значение, // перезапишет старое значение новым
})

```

На примере toggle

```jsx
class Toggle extends Component(){

  state = {
    on : false,                   // изначально скрываем
  }

// методы которые меняет state

  show = () =>{
    this.setState({ on: true })   // показываем
  }

  hide = () => {
    this.setState({ on: false })  // скрываем
  }

  render(){
    const { on } = this.state;
  }
  return (
    <div>
      <button onClick={this.show}>Show</button>
      <button onClick={this.hide}>Hide</button>
      <h1> Toggle content below </h1>
      {on && this.props.children} // рендер по условию. Если on будет true то отрендарятся елементы children
    </div>
  )
}

```

Другой пример

- Чтобы получить значение поля state используем деструктуризацию и поместим значение в переменную

- создадим переменную которая будет хранить css класс , при определенном state будем добавлять туда дополнительный класс

- выведем переменную в нужном елементе в атрибуте classNames = { переменная }

- зададим условие, ЕСЛИ состояние поля done объекта state изменится с false на true то к переменной добавим некий класс done, в стилях которого прописан перечеркнутый текст

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

Метод setState перетирает старое значение поля state на новое, поэтому при вызове метода setstate передаем только те свойства , которые нужно изменить

```jsx
state = {
  done: false,
  important: false
};

//  МЕНЯЕМ ТОЛЬКО ТО, ЧТО НЕОБХОДИМО
onLabelClick = () => {
  // изменяем значение поля done объекта STATE на true
  this.setState({ done: true });
};
// изменяем значение поля important объекта STATE на true
onMarkImportant = () => {
  this.setState({ important: true });
};
```

#### Обновление текущего состояния State

Для того что обновлять текущее состояние state, типа toggle, нужно

- в методе setstate передать state как аргумент функции и там сделать возврат с отрицанием !
- или деструктуризировать нужное поле и вызвать его отрицание !

```jsx
state = {
  done: false,
  important: false
};

onMarkImportant = () => {
  this.setState(state => {
    // передаем в аргументе объект state
    return {
      important: !state.important // флипаем поле important
    };
  });
};

onLabelClick = () => {
  this.setState(({ done }) => {
    // также можно деструктуризировать нужное поле
    return {
      done: !done // и тут его флипнуть
    };
  });
};
```

### Неизменность State

- setState НЕ должен изменять текущий state

- методы, которые изменяют (МУТИРУЮТ) массив использовать НЕЛЬЗЯ

- УДАЛИТЬ ЕЛЕМЕНТ НЕ МУТИРУЯ newArr = [...oldArr.slice(0,idx), ...oldArr.slice(idx+1)]

- ДОБАВИТЬ ЕЛЕМЕНТ В КОНЕЦ НЕ МУТИРУЯ newArr = [...oldArr, newItem]

- ДОБАВИТЬ ЕЛЕМЕНТ В НАЧАЛО НЕ МУТИРУЯ newArr = [newItem , ...oldArr ]

### Асинхронность state

State изменяется асинхронно, поэтому он ставится в очередь.
Если обратиться сразу к this.state то скорее всего мы получим старое не обновленное состояние.

this.setstate - асинхронная операция
this.state - синхронная операция

```jsx
this.setState({ ключ: значение }); // попадает снимок текущего state, на момент вызова. Не гарантирует изменение state СРАЗУ, скорость изменения state зависит от ОЧЕРЕДИ асинхронных операций
```

Поэтому чтобы гарантированно получать актуальное значение this.state, нужно передавать в setstate не объект а функцию , которая принимает ДВА аргумента

1. - prevState - состояние НА МОМЕНТ ОБНОВЛЕНИЯ
2. - props - если не используется, то можем не передавать
     Данная функция возвращает объект с актуальным измененным state

```jsx
this.setstate((prevState, props) => ({
  value: prevState.value + props.value // обновленный state + новое значение
}));
```

- ИСПОЛЬЗУЕМ данный способ ЕСЛИ НУЖНО ПРЕДЫДУЩЕЕ СОСТОЯНИЕ state
- props передаем если они используются для обновления state

### Поднятие STATE. state hoisting

Если нужно из дочерних компонентов ихменить состояние родителя, а как известно props могут передаваться только вниз по цепочке ТО используется метод всплытия state.

1. В родителе есть state и метод, который ЕГО ИЗМЕНЯЕТ
2. ЭТОТ метод пробрасывается в качестве props для компонента , который ниже
3. В нижнем компоненте ВЫЗЫВАЕМ этот метод
4. Когда этот метод вызывается ТО происходит изменение состояния РОДИТЕЛЬСКОГО компонента и перерендер

```jsx
// Button получает функцию onClick (имя пропа) которая вызывается при событии onClick;

const Button = ({ onClick, label }) => (
  <button onClick={onClick}>{label}</button>
);

class App extends Component {
  state = {
    message: "before click"
  };

  // Метод который будем передавать в Button для вызова при клике
  updateMessage = evt => {
    this.state({ message: "after click" });
  };

  render() {
    const { message } = this.state;

    return (
      <div>
        <h1>{message}</h1>
        <Button
          label="Change message"
          onClick={this.updateMessage} // пробросили в Button метод класса
        />
      </div>
    );
  }
}
```

### Контролируемый компонент

Форма и ее инпуты. Чтобы компонент был контролируемым, нужно чтобы его значение бралось из State.

1. Вешаем на инпут событие onChange ={this.методКоторыйИзмСтейт} и при изменении поля input срабатывает событие и обработчик меняет значение в поле state

2. Значение input должно браться из state, поэтому для input прописываем атрибут value={this.state.inputValue} в который помещаем значение поля state

Получается закольцовка,

- ЗНАЧЕНИЕ state берется из input
- ЗНАЧЕНИЕ для input берется из state

### Жизненный цикл компонента

Существует несколько стадий жизненного цикла компонента, каждый из которых вызывает
для компонента методы наследуемые от React.Component.

● Методы с префиксов **did** вызываются сразу после того, как что-то случилось
● Методы с префиксом **will** вызываются сразу перед тем, как что-то случится.

## Mounting ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●

Следующие методы вызываются когда React создает экземпляр компонента и добавляет его в DOM.

#### constructor()

Взывается в момент создания экземпляра компонента, до того как компонент будет помещен в DOM.
● Инициализирует начальное состояние компонента
● Привязывает контекст в методах
● В большинстве случаев явное указание конструтора излишне

#### static getDerivedStateFromProps(nextProps, prevState)

- ● Вызывается перед render(), при mount и перед всеми последующими вызовами render, тоесть после обновления state или props.

- ● Можно использовать для того чтобы установить state в зависимости от props при каждомих изменении.

- ● Должен вернуть объект, которым будет обновлено состояние, или null если ничего обновлять не нужно.

#### render()

- ● Позволяет декларативно описать интерфейс

- ● Возвращает результат JSX-выражений

#### componentDidMount()

- ● Вызывается когда компонент был отрендерен в DOM

- ● Делаем AJAX-запросы, вешаем кастомные слушатели событий и делаем операции с DOM (инициализация сторонних библиотек)

- ● Вызов setState() в этом методе, или после, вызове ре-рендер


## Updating ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●

Обновление может быть вызвано измением state самого компонента или передаваемых ему props.
При обновлении необходимо перерендерить компонент, что ведет к вызову следующих методов.

#### shouldComponentUpdate(nextProps, nextState)

НУЖНО ПРОВЕРЯТЬ СТОИТ ЛИ ВЫЗЫВАТЬ ПЕРЕРЕНДЕР КОМПОНЕТА
для этого нужно сравнить состяние поля state ТЕКУЩЕГО и БУДУЩЕГО
если значения ОДИНАКОВЫЕ ТО вызывать перерендер нет смысла.

```jsx
shouldComponentUpdate(nextProps, nextState){
// вернет true если значения полей разные и вызовет перерендер
return this.state.value !== nextState.value;
}
```

- ● Если вернет false то не произойдет render() и componentDidUpdate

- ● Не вызывается при инициализации компонента

- ● Вызывается перед ре-рендером уже существующего компонента

- ● Необходим исключительно для оптимизации процесса рендеринга

- ● По умолчанию render происходит каждый раз при новых props или state

- ● Позволяет сравнить текущие и предыдущие state и props, вернув true или false указывая React есть ли необходимость обновлять компонент

- ● React не на 100% "слушается" возвращаемого значения и может произвести ре-рендер компонента даже если будет возвращено false

- ● Нельзя вызывать setState()

- ● Возможно стоит заменить на React.PureComponent, который будет делать поверхностное сравнение props.

#### getSnapshotBeforeUpdate(prevProps, prevState)

- ● Вызывается **перед тем как все изменения готовы к отображению в DOM**

- ● Можно использовать для получения DOM-значений перед обновлением, к примеру текущую позицию скрола

- ● Все что вернет этот метод будет передано как **третий параметр в componentDidUpdate()**

#### componentDidUpdate(prevProps, prevState, snapshot)

- ● Вызывается сразу после обновления компонента

- ● Не вызывается при первоначальном рендере компонента

- ● Можно вызывать setState()

- ● Можно делать AJAX-запросы, сравнивая this.props и prevProps, если они не изменились то и запрос делать нет смысла

- ● Можно передавать сторонним библиотекам новые данные

- ● Если в компоненте есть getSnapshotBeforeUpdate(), то значение возвращаемое им будет передано третим аргументом snapshot, в противном случае его значением будет undefined

## Unmounting ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●

В какой-то момент компоненты будут удалены из DOM.

#### componentWillUnmount()

- ● Вызывается перед удалением компонента из DOM

- ● Отлично подходим для уборки за собой: слушатели, таймеры, AJAX-запросы. В противном случае будут утечки памяти

- ● Вызывать setState() нет смысла, компонент никогда не перерендерится

## Отлов ошибок ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●

#### componentDidCatch(error, info) {}

Этот метод позволяет родительским компонентам отлавливать ошибки в детях, отображая запасной интерфейс, в
результате, при ошибке, интерфейс не падает.

- ● Используется для контроля ошибок

- ● Ловит ошибки только в детях, но не в самом родителе

- ● error - результат toString() объекта ошибки

- ● info - объект описывающий stack trace

```jsx
class ErrorBoundary extends React.Component {

  state = { 
    hasError: false 
    };

  componentDidCatch(error, info) {
    // Если метод был вызван значит есть ошибка!
    // Устанавливаем состояние
    this.setState({ hasError: true });
    // Также можно отправить отчет об ошибке вашему аналитическому сервису
    // logErrorToMyService(error, info);
  }

  render() {
    // Если есть ошибка...
    if (this.state.hasError) {
      // Рендерим fallback UI
      return <h1>Something went wrong, please try again later :(</h1>;
    }
    // Если все ок, рендерим детей
    return this.props.children;
  }
}
```

### Работа с API  ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●

Запросы к ресурсам будем делать в **componentDidMount()**

- ● Когда вызывается componentDidMount(), компонент уже был отрендерен один раз

- ● Хранить будем в STATE (локальном состоянии компонента)

- ● Как только данные придут, обновим состояние

- ● После обновления состояния будет вызван render()

```jsx
const API = "https://hn.algolia.com/api/v1/search?query=";
const DEFAULT_QUERY = "react";

class App extends Component {
  state = {
    hits: []
  };

  // получаем данные и записываем в state
  componentDidMount() {
    axios.get(API + DEFAULT_QUERY).then(response =>
      this.setState({
        hits: response.data.hits
      })
    );
  }

  
  render() {
    // деструктуризируем массив с заметками в переменную hits
    const { hits } = this.state;

    return (
      <div>
        // рендер по условию. Если массив не пустой то рендерим статьи
        {hits.length > 0 && (
          <ul>
            {hits.map(({ objectID, url, title }) => (
              <li key={objectID}>
                <a href={url}> {title} </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
```

### Индикатор загрузки ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●

Пока ждем ответа на HTTP-запрос, будем показывать идтикатор загрузки.
Как только пришел ответ, прячем индикатор.
Для этого на старте запроса ставим isLoading в true, а в ответе наоборот в false.

```jsx
state = {
  hits: [],
  isLoading: false
};
```

В render() делаем рендер по условию поставив тернарный оператор или оператор if
Если загружается, показываем лоадер, в противном случае показываем список с результатами

```jsx
render() {
 const { hits, isLoading } = this.state;
  return (
    <div>
// Если state.isLoading значение true то рендерим лоадер, если нет , то ренлерим список
      {isLoading ? ( <p>Loading...</p> ) : (
        <ul>
          {hits.map(({ objectID, url, title }) => (
          <li key={objectID}> <a href={url}> {title} </a></li>
          ))}
        </ul>
      )}
    </div>
  );
  }
}

```
### Обработка ошибки ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●

HTTP-запрос не всегда успешный, поэтому пользователю обязательно нужно дать понять что что-то пошло не так. 
Добавляем поле хранения ошибки, если что будем показывать пользователю грустный смайлик и просить о пощаде.
При использовании обещаний, для обработки ошибок используется блок catch(), если он выполнится значит все плохо.

```jsx

 state = {
  hits: [],
  isLoading: false,
//  добавим поле error, в которое будем записать  сообщение ошибки из ПРОМИСА
  error: null,
 };

```
```jsx

render() {

// получим в переменные значения полей стейта 
 const { hits, isLoading, error } = this.state;

// ЕСЛИ error true то ЕСТЬ оштбка и мы рендерим текст ошибки 
  if (error) return <p>{error.message}</p>;

  if (isLoading) return <p>Loading...</p>;

// ЕСЛИ нет ни ошибки ни загрузки ТО рендерим список 
  return (
     <ul>
        {hits.map(({ objectID, url, title }) => (
        <li key={objectID}> <a href={url}> {title} </a></li>
        ))}
      </ul>
    );
  }
}

```

### Стилизация ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●


#### Метод 1: Инлайновые стили 

- Если мы пользуемся данным способом, то обязательно нужно 
  - атрибут class писать className, это атрибут JavaScript, атрибуты пишутся горбатым регистром и не разделяются тире
  - значение атрбута style должно быть заключено в **{{ ... }} скобки**
  - значение свойст **в кавычках left:'38px'**  
  - свойства разделяются **запятой**. Это так, потому что то, что мы передаем это по-факту объект. 

Первые фигурные скобки вставляют JavaScript в JSX. 
Внутренние фигурные скобки создают объект литерал. 
Стили передаются как объект литералы к элементу.

```jsx
const Spinner = () => {
  return ( 
      <div className="lds-blocks" style={{width:'100%' , height:'100%'}}>
        <div style={{ left:'38px', top:'38px',animationDelay:'0s' }}/>
        <div style={{ left:'80px',top:'38px', animationDelay:'0.125s' }}/> 
      </div> 
  );
};
```

Инлайновые стили. Объект стилей

Мы сделаем это также, как и при создании простого JavaScript объекта. 
Этот объект затем передастся атрибуту стиля элемента, который мы бы хотели стилизовать.
Так что вместо добавления стилей напрямую инлайново, как мы делали в предидущем примере, мы просто передадим объект переменные

```jsx 
const Header = {
  padding: "10px 20px",
  textAlign: "center",
  color: "white",
  fontSize: "22px"
}

const ErrorMessage = {
  color: "white",
  fontSize: "13px"
}

class ToDoApp extends React.Component {
  // ...
  render() {
    return ( 
// Передадим стили как объекты
        <h2 style={Header}>ToDo</h2>  
        <p style = {ErrorMessage}></p> 
    )
  }
}
```
Также можно создать отдельный файл style.js и записать туда все объекты стилей и затем сделать его експорт **import {styles} from "./styles";** куда нужно , после чего обращаться к ним как **style={styles.TodoComponent}**

```jsx
  <div style={styles.TodoComponent} />
  <h2 style={styles.ErrorMessage} /> 
```
####Метод 2: Styled Components

[Github](https://github.com/styled-components/styled-components) 


#### Метод 3: CSS modules

1. Для каждого компонента создаем файл css и именуем его Имя_компонента.module.css обязательно после имени компонента указать через точку слово module
2. Далее в компоненте производим импорт этого модуля и в стилях  
```jsx
import style from './App.module.css'
```
3. После этого обращаемся к этому css классу как к свойству объекта 
 <ul className={style.houselist}>
 


### React HOOCKS


Хуки — нововведение в React 16.8, которое позволяет использовать состояние и другие возможности React без написания классов.

Хук состояния можно использовать в компоненте более одного раза.

Хуки не работают внутри классов — они дают вам возможность использовать React без классов. 

📌 Хук состояния  useState(initialState)

Единственный аргумент useState — это начальное состояние state
 
Что возвращается из useState? 
Вызов useState вернёт пару значений: текущее состояние и функцию, обновляющую состояние. 
Поэтому мы пишем const [count, setCount] = useState(0). 
Это похоже на this.state.count и this.setState в классах, с той лишь разницей, что сейчас мы принимаем их сразу в паре.

```jsx
// Деструктуризируем 
// в переменную users начальное состояние state, подобно this.state
// в переменной setUsers будет фуекция которая меняет state
const [users, setUsers] = useState(userData);
```
на примере ниже мы помещаем в начальный стейт массив пользователей, затем используя хук добавляем нового 

```jsx
// нужно произвести импорт хука из 'react'
import React, { useState } from "react"; 

const App = () => {

  // есть массив Юзеров
  const userData = [
    {
      id: 1,
      name: "Homer",
      username: "floppydiskette"
    },
    {
      id: 2,
      name: "Bender",
      username: "king"
    },
    {
      id: 3,
      name: "Filip",
      username: "benisphere"
    }
  ];

const [users, setUsers] = useState(userData);

// используем setUsers для добавления нового елемента в массив 
const addUser = user => { 
  setUsers([...users, user]);
}

const deleteUser = e => {
  const {id} = e.target;
  setUsers(users.filter(el=> el.id !== Number(id)));
}

// Далее используем функции в качестве обработчиков событий и меняем стейт
 
```
Пример добавления данных с полей форм 
```jsx

 const initialState ={
    name: '',
    username: '',
  }

  const [user, setUser] = useState(initialState);

  const inputChange = (e) => {
    const {name, value} = e.target;
    setUser ({...user, [name]:value});
  }

  const formSubmit = e => { 
    e.preventDefault(); 
    user.name && user.username && add(user) ; 
    setUser(initialState);
  }
```

📌 Хук эффекта  useEffect

Хук эффекта даёт вам возможность выполнять побочные эффекты в функциональном компоненте:

Побочными эффектами в React-компонентах могут быть: загрузка данных, оформление подписки и изменение DOM вручную. 
Неважно, называете ли вы эти операции «побочными эффектам» (или просто «эффектами») или нет, скорее всего вам доводилось ранее использовать их в своих компонентах.

 Используя этот хук, вы говорите React сделать что-то после рендера. 
 React запомнит функцию (то есть «эффект»), которую вы передали и вызовет её после того, как внесёт все изменения в DOM. 
 В этом эффекте мы устанавливаем заголовок документа, но мы также можем выполнить запрос данных или вызвать какой-нибудь императивный API.

Почему же мы вызываем useEffect непосредственно внутри компонента? 
Это даёт нам доступ к переменной состояния count (или любым другим пропсам) прямиком из эффекта. 
Нам не нужен специальный API для доступа к этой переменной — она уже находится у нас в области видимости функции. 

Хуки используют JavaScript-замыкания, и таким образом, им не нужен специальный для React API, поскольку сам JavaScript уже имеет готовое решение для этой задачи.

Выполняется ли useEffect после каждого рендера? 
Разумеется! По умолчанию он будет выполняться после каждого рендера и обновления. 
React гарантирует, что он запустит эффект только после того, как DOM уже обновился.

```jsx
import React, { useState, useEffect } from 'react';

function Example() {

  const [count, setCount] = useState(0);

  // Аналогично componentDidMount и componentDidUpdate:
  useEffect(() => {
    // Обновляем заголовок документа с помощью API браузера
    document.title = `Вы нажали ${count} раз`;
  });

  return (
    <div>
      <p>Вы нажали {count} раз</p>
      <button onClick={() => setCount(count + 1)}>
        Нажми на меня
      </button>
    </div>
  );
}
```

Кастомные HOOCKS

```jsx
import {useEffect, useState} from 'react';


const useFetch =(url)=>{

  const [data, setData]= useState([]);

  useEffect( ()=> {
    fetch(url)
      .then(resp => resp.json())
      .then(data=> setData(data))
  } , []);

  return data;
}


export default  useFetch;
```