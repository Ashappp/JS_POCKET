![pic](http://i.piccy.info/i9/cdb7fd6b252cef4fc4a19d807fd57a29/1552639087/14334/1307368/1_SRL22ADht1NU4LXUeU4YVg.png) 

Установка 

git clone https://github.com/cyberspacedk/react_redux_starter_build.git


1- ставим пакеты
2- создаем структуру проекта
3- создаем редюсеры
4- создаем стор
5- создаем экшены
6- вызываем connect
 

Тип поля стейта определяет reducer при инициализации (state = , action)
Значение поля стейта формирует action, которое возвращает reducer
Новое поле ключ:значение записываем в rootReducer /Reducers/index.js


__________________________________________________
1. Установить неcколько пакетов 
```jsx
npm i react-redux redux redux-thunk
```

2. в структуре проекта создать папку scr/redux/

3. в папке redux создаем папки store, actions, reducers

4. импортируем компонент provider, передаем ему пропсом store и оборачиваем <App>
```jsx
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from './Redux/Store/store'

import App from "./App.jsx";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

```
 
6. в папке reducers создаем файл index.js и для начала один редюсер counter.js 

7. в файле counter.js создадим reducer counter
```jsx
const counter = (state = 0, action) => {
    switch(action.type){
        case 'PLUS': return state + 1;
        case 'MINUS': return state - 1;
        case 'RESET': return 0;
        default : return state;
    }
}
```

8. в файле index.js в папке reducers, импортим функцию combinedReducers и редюсер counter

9. вызвали функцию combinedReducers, которая принимает аргументом объект, если ключ объекта и имя редюсера совадает, то можем записать сокращенным методом. производим экспорт

```jsx
import {combineReducers } from 'redux';

import counter from './counter';


const rootReducer = combineReducers ({
    // сокращенная запись
    counter,
    // если ключ отличается от редюсера по имени
    value: counter,
})

export default rootReducer; 
```
   
10. в папке Store создаем файл store.js

11. в файле store.js заимпортим функцию создания stora , подключим возможность redux devtool , создадим stor, сдеалаем экспорт и  производим импорт rootReducer из файла index.js папки reducers и передаем его в аргументом при создании стора

Также добавим поддержку middleware 
- заимпортив из redux applyMiddleware
- добавить третьим аргументом в создании стора applyMiddleware(thunk)


```jsx
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Reducers/rootReducer';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__  && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools, applyMiddleware(thunk));

export default store;
```
 
12. в папке actions создаем файл counterActions.js где будут создаваться действия 

13. в файле напишем функции экшены
```jsx
export const plus = ()=> ({ type: 'PLUS'})
export const minus = ()=> ({ type: 'MINUS'})
export const reset = ()=> ({ type: 'RESET'})

``` 

14. импортируем экшены туда где будем их использовать, в нашем случае в <App />

15. импортурем метод connect, который даст доступ к глобальному state, откуда можно будет взять значения 

16. connect() это функция высшего порядка, которая принимает аргументами функции mapStateToProps и mapDispatchToProps

17. mapStateToProps принимает агрументом текущий глобальный state. Возвращает объект. Этот объет будет помещен в текущий пропс компонета. Поля/имя_пропсов объекта указываем сами.

18.mapDispatchToProps принимает агрументом метод dispatch, который запускает action. связывает экшены с редюсерами. Возвращает также объект, который будет помещен в объект пропс компонента. В ключи помещаем экшены, которые импортировали из файла  counterActions.js

19. После вызова этих двух функций получаем объект пропс с созданными полями, которые используем в компоненте работая как с обычным пропс.

20. вызовем метод connect(mapStateToProps,mapDispatchToProps)(App);

21. Наглядно ниже. 

```jsx
import React, { Component } from 'react'; 
import './App.css';
import {connect} from 'react-redux';
import * as actions from './Redux/Actions/counterActions';

class App extends Component {
  render() {
// дуструктуризируем props
    const{value, plus,minus,reset}=this.props; 
    
    return (
      <div className="counter">   
        <p>{value}</p>
        <button onClick={plus}>+ 1</button>
        <button onClick={reset}>reset</button>
        <button onClick={minus}>- 1</button> 
      </div>
     
    );
  }
}
 
// обращаемся к state и берем то что нужно  
const mapStateToProps = (state) => ({value: state.counter,});

// обращаемся к экшенам и связваем их с редюсером методом dispatch() , поместив эти медоты как поля props
const mapDispatchToProps = (dispatch)=> ({
  plus :() => dispatch( actions.plus()),
  minus :() => dispatch( actions.minus()),
  reset :() => dispatch( actions.reset()) 
})
  

export default connect(mapStateToProps,mapDispatchToProps)(App);

```

 

### Основные принципы Redux

- ● Библиотека для управления состоянием приложения

- ● Описывает интерфейс как функцию от состояния

- ● Предсказуемость результата - существует всегда один источник правды, store, хранящий в себе состояние приложения и методы для работы с ним.

- ● Поддреживаемость - Redux имеет набор правил и лучших практик о том, как должен быть структурирован код, что делает его более единообразным и понятным.

- ● Инструменты разработчика - все происходящее можно отслеживать в режиме реального времени.

- ● Простота тестирования - первое правило написания тестируемого кода - писать небольшие функции, которые выполняют только одну вещь и независимы. Redux - это в основном функции: маленькие, чистые и изолированные.

- ● Независим от React, но отлично работает с React :)

### Поток данных

Поток данных в Redux всегда однонаправленный, и очень простой.

- ● UI (интерфейс) инициализирует отправку действий (actions)

- ● Хранилище (store) вызывает все объявленные редьюсеры (reducers), передавая им текущее состояние (state) и действие (action)

- ● Хранилище (store) сохраняет обновленное дерево состояния (state) возвращенное из редьюсеров (reducers)

- ● При обновлении состояния (state) вызываются все подписчики для обновления интерфейса



## Actions CONTROLLER

Действия (actions) - это события, они доставляют данные из приложения в хранилище. 

Они доставляют данные, ТО что нужно изменить. 

- ● Обычные JS-объекты.

- ● Несут в себе информацию для хранилища (store).

- ● Должны иметь свойство type, которое указывает тип выполняемого действия.

- ● Помимо поля type, структура действия может быть произвольной.

- ● Содержат минимально необходимый набор информации.

- ● Типы определяются как строковые константы.

```jsx
const action = {
 type: 'ADD_NOTE',  // обязательное поле
 payload: {         // ЧТО нужно поменять 
 text: 'Redux is awesome!',
 },
};
```

Действия (actions) создаются функциями (action creators), которые могут быть асинхронными и иметь побочные эффекты. 

В базовом варианте они просто возвращают объект-дейтсвие.

```jsx
const addNote = text => ({
 type: 'ADD_NOTE',
 payload: {
 id: Date.now(),
 text,
 },
}); 
```

### Reducers   MODEL

Берут ПРЕДЫДУЩЕЕ состояние и ДАННЫЕ из action и МЕРДЖИТ их.

Редьюсеры (reducer) - это чистые функции , которые принимают предыдущее состояние приложения (state) и действие (action), а затем возвращают новое следующее состояние.

Они определяют, как изменяется состояние (state) приложения в ответ на действия (actions), отправленные в хранилище. 

Помните, что действия описывают только то, что произошло, а не как изменяется состояние приложения.

```jsx
(previousState, action) => newState;
```

Вещи, которые нельзя делать внутри редьюсера:

- ● Мутировать аргументы

- ● Выполнять побочные эффекты, такие как API-запросы и т. п.

- ● Вызывать нечистые функции, например Date.now()

Как выполнять побочные эффекты мы рассмотрим далее, пока что просто помните - редьюсер должен быть чистым.
Получая те же аргументы, он должен вычислить следующее состояние и вернуть его. 
Без сюрпризов. Никаких побочных эффектов. Никаких мутаций. Просто расчет.

Вот редьюсер, который принимает текущее состояние и действие как аргументы, а затем возвращает следующее состояние:

```jsx
const initialState = [];

function notesReducer(state = initialState, action) {
    
 switch (action.type) {
    case 'ADD_NOTE':
    return [...state, action.payload];
    default:
    return state;
 }
}
```

Обратите внимание:

- ● Мы создаем копию state, а не мутируем его.

- ● Мы возвращаем предыдущее состояние по умолчанию. Важно вернуть предыдущее состояние для любого неизвестного действия.


#### Оптимизация

При каждом изменении объект состояния (state) создается заново. 

Логично предположить что это очень трудозатратно с точки зрения производительности.

На самом деле если состояние (state) изменяет только некоторые значения, **Redux создает новый объект, но значения которые не изменились, ссылаются на старый объект состояния, а созданы будут только новые значения.**


## Store

Хранилище (store) - это объект, который содержит состояние приложения (state) и методы для доступа к нему, oтправки действий и регистрации слушателей.

- ● Обычный JavaScript-объект

- ● Хранит состояние state всего приложения как один объект

- ● Позволяет получить доступ к состоянию через getState()

- ● Напрямую state доступен только для чтения

- ● Позволяет обновлять состояние посредством dispatch(action)

- ● **Единственный способ изменить состояние (state) - отправить действие (action)**, объект, описывающий, что произошло

- ● Изменения производятся с использованием чистых функций (reducers), которые реагируют на действия (actions)

- ● Регистрирует слушателей используя subscribe(listener).Так как все состояние приложения хранится как один объект, стоит подумать о форме состояния прежде чем писать какой-либо код. Продумайте минимальное редставление состояния приложения в виде объекта.

```jsx
const state = {
 notes: [],
 filter: '',
 auth: {},
};
```
 
### createStore

Для того чтобы создать хранилище, используется функция createStore. Она получает набор аргументов и возвращает созданное хранилище.

createStore(reducer, [preloadedState], [enhancer])

- ● reducer - функция которая возвращает следующее дерево состояния, учитывая текущее дерево состояния и действие для обработки.

- ● preloadedState - начальное состояние, к примеру сериализаванное состояние последнего пользовательского сеанса. Это должен быть объект той же формы, что и состояние.

- ● enhancer - расширяет возможности хранилища при помощи сторонних дополнений, к примеру программных прослоек (middleware).

```jsx
import { createStore } from 'redux';
// Используем редьюсер-болванку 

const reducer = (state = {}, action) => state;

const store = createStore(reducer)
```
При создании/инициализации store вызываются reducers в которых изначальное значение state - undefind 
Чтобы не было undefind, необходимо задать для reducer ничальное значение , например 0
 
#### Методы для работы со стором

- store.getState() 
 позволяет получить текущее состояние store

- store.dispatch(action) 
 для того чтобы отправить action при наступлении каких то событий. ПРИНИМАЕТ аргуметом тот ACTION который мы хотим ВЫСТРЕЛИТЬ. 
 Далее этот ВЫСТРЕЛ ЛОВИТ редюсер, проходится по ВАРИАНТАМ (type) которые в нем есть и сравнивает с ВЫСТРЕЛОМ (type), если находит такой то НАПРАВЛЯЕТ ЗНАЧЕНИЕ (payload) ВЫСТРЕЛА в СТОР для ИЗМЕНЕНИЯ. 

- store.subscribe(func) 
 func -это функция подписчик, подписывается на изменение стора. агрумент, это хендлер функция, которая что-то делает при изменении стора. 


#### |-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-| 


# REACT & REDUX

Для того чтобы использовать React и Redux вместе  необходимо  

```jsx
npm i react-redux redux
```

В структуре проекта, рядом с папкой components, создаем папку redux, в которой создадим файл store.js где бут создаваться store и все связанное с ним. 

В папке redux создадим папку actions, reducer, index

В папке actions cоздаем файл types.js actions.js

В папке reducers создадим файл reducers и index.js, где заимпортим существующие редюсеры. 

Наш стейт это объект с многими полями, и редюсеров соответвенно будет столько же. Для того чтобы связать редюсер с полем объекта стейта  нужно сделать импорт функции { combneReducers } from 'redux'

**В файле index.js папки reducer**

Данная функция принимает объект, который описывает state

```jsx
import { combneReducers } from 'redux';
import myReducer from './reducers';

// создадим переменную rootReducer в которую поместим объект state c ссответствующими редюсерами

const rootReducer = combineReducers ( {
    value : myReducer  // myReducer отвечает за поле value в объекте state
})

export default rootReducer;
```
Теперь, когда будет вызываться myReducer ему будет пробрасываться  не весь объект state а только определенное поле, в данном случае поле value


**В файле store.js папки redux**

После всех этих чудес, в файле где мы будем создавать стор,нужно произвести импорт стейта rooReducer, который мы создали ранее

```jsx
import {createStore} from 'redux';
import rootReducer from './reducer';

// создадим store из стейта
const store = createStore (rootReducer);

export default store; 

```

## Provider

Компонент Provider, оборачивает все дерево компонентов приложения, и используя контекст, предоставляет store и его методы.

В основном файле index.js
```jsx
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import store from './store.js';

// Оборачиваем компонент App передавая ему и всем вложенным компонентам  него store
<Provider store={store}>
    <App /> 
</Provider>;

```

#### connect()

Это HOC который дает возможность получить **в качестве пропов** 
1. нужные значения из стейта  п
2. ACTION - для связки например с кликами или другими действиями, которые должны вызывать ACTION

Если какой-либо компонент хочет получить доступ к store, он должен быть обернут в функцию connect(), которая свяжет компонент и store.

Предоставляет доступ к state и disaptch().

connect это HOC, он не изменяет переданный ему компонент, а возвращает новый компонент связанный с store.

```jsx
connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(Component)
```

**mapStateToProps(state, [ownProps])** 
функция соединяющая часть состояния (state) с пропами компонента. 

Таким образом, связанный компонент будет иметь доступ к необходимой ему части состояния (state).

- ● Получает state как параметр и позволяет выбрать из всего state только те части которые необходимы нашему компоненту.

- ● Возвращает объект, свойства которого БУДУТ props компонента.

- ● Вызывается каждый раз , когда хранилище обновляется.

- ● Если нет необходимости подписываться на обновления, передаем null или undefined.

- ● Если функция объявлена как принимающая два параметра, первым будет передана ссылка на state, а вторым ссылка на пропы самого компонента. В этом случае mapStateToProps будет вызываться каждый раз когда изменятся пропы компонента.

```jsx
const mapStateToProps = (state) => ({
 notes: state.notes,
 currentFilter: state.filter,
});

// Вернет объект {notes: знач.из.стейтп, currentFilter: знач.из.стейтп}
// notes и currentFilter БУДУТ ПРОПАМИ КОМПОНЕНТА
```

**mapDispatchToProps(dispatch, [ownProps])** 

Функция которая позвояет получить в качестве ПРОПА существующий ACTION 

Таким образом, связанный компонент сможет отправлять действия посредством вызова методов указанных в возвращаемом объекте.

- ● Получает ссылку на dispatch как параметр и позволяет объявить методы для отправки действий actions.

- ● Возвращает объект, свойства которого дополнят props компонента.

- ● Если функция объявлена как принимающая два параметра, первым будет передана ссылка на dispatch, а вторым ссылка на пропы самого компонента.  В этом случае **mapDispatchToProps** будет вызываться каждый раз когда изменятся пропы компонента.

В том файле , где требуется получить доступ к стору, нужно произвести импорт этой функции из 'react-redux'

```jsx
import { connect } from 'react-redux';  // импортим HOC connect
import { action_1, action_2 } from './actions'; // импорт ЭКШЕНОВ

const Item = (props) => {
    <div>
        Some code needed access to store
    </div>
}

// будет проп value со значением которое прийдет из стейта из поля за которое отвечает myReducer

 
// Механизм работы mapStateToProps
1. connect получит mapStateToProps
2. внутри себя он вызовет store.getState()
3. и результат работы store.getState() он пробросит в аргумент state mapStateToProps, поэтому мы и получаем актуальное значение на момент вызова
4. каждый раз когда стейт будет изменяться , будет вызываться mapStateToProps

Буквально mapStateToProps производит MAP стейта в PROPS КОМПОНЕТА
const mapStateToProps = (state) => ({
    value : state.myReducer
})

// Meанизм работы mapDispatchToProps
1. connect получит mapStateToProps
2. внутри себя он получит ссылку на store.dispatch()
3. возвращает объект, где мы указываем пропы, значениями которых будут ACTION
const mapDispatchToProps = (dispatch) => ({
// cоздадим 2 пропа propsAction_1 и propsAction_2
// значниями будут аction которые мы заимпортили  
    propsAction_1 : (val) => dispatch( action_1(val) ),
    propsAction_2 : (val) => dispatch( action_2(val) )

})

export default connect(mapStateToProps,mapDispatchToProps)(Item);
Если какаято из функций не нужна, то 

```

















Почитать

[when do i know im ready for redux](https://medium.com/dailyjs/when-do-i-know-im-ready-for-redux-f34da253c85f)

[Why Redux need reducers to be "pure functions"](https://medium.freecodecamp.org/why-redux-needs-reducers-to-be-pure-functions-d438c58ae468)
