![pic](http://i.piccy.info/i9/cdb7fd6b252cef4fc4a19d807fd57a29/1552639087/14334/1307368/1_SRL22ADht1NU4LXUeU4YVg.png)

SHORT about MAIN

- REDUX является предсказуемым контейнером состояния для JavaScript приложений
- Все состояние приложения сохранено в **объекте внутри одного хранилища** (store)
- Единственный способ изменить дерево состояния - это вызвать действие (action)
- Redux может быть описан тремя фундаментальными принципами
  - Единственный источник правды
  - Состояние только для чтения
  - Мутации написаны, как чистые функции

### ACTIONS

- описывают тот факт, что что-то совершилось
- это объекты, которые передают данные из вашего приложения в хранилище.
- являются **единственными источниками информации для хранилища**.
- отправляем их в хранилище, используя метод store.dispatch().
- должны иметь поле **type**, которое указывает на тип исполняемого действия
- Action Creators — функции, которые возвращают действия
- Action Creators удобно тестировать и передавать параметры в action

### REDUCERS

- это чистые функции, которые берут предыдущее состояние и действие и **возвращают новое состояние**
- Вот список того, чего **никогда нельзя делать в редюсере**:
  - напрямую изменять то, что пришло в аргументах функции
  - Выполнять сайд-эффекты: обращаться к API или осуществлять переход по роутам
  - Вызывать не чистые функции, например Date.now() или Math.random()
- под капотом используется `Object.assign({}, state, {newValue})` or `{...state, ...newValue}`
- combineReducers() — генерирует **функцию, которая вызывает ваши редюсеры**, передавая им в качестве одного из аргументов **срез глобального состояния**, который выбирается в **соответствии с именем его ключа в глобальном состоянии**, и затем снова **собирает результаты всех вызовов в один объект**.

### STORE

- Хранилище берет на себя следующие задачи:
  - содержит состояние приложения (application state);
  - предоставляет доступ к состоянию с помощью **getState()**;
  - предоставляет возможность обновления состояния с помощью **dispatch(action)**;
  - регистрирует слушателей (listeners) c помощью **subscribe(listener)**.
- изначально при вызвове reducer поле за которое отвечает reducer в store равен undefined, поэтому нужно задать initialstate

### Data Flow

- Жизненный цикл данных в любом Redux-приложении включает в себя 4 шага
  1. Вы вызываете store.dispatch(action)
  2. Хранилище Redux вызывает функцию-редюсер, который вы ему передали
  3. Главный редюсер комбинирует результат работы нескольких редюсеров в единственное дерево состояния приложения
  4. Хранилище Redux полностью обновляется на основании возврата главного редюсера.

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

---

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
import store from "./Redux/Store/store";

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
  switch (action.type) {
    case "PLUS":
      return state + 1;
    case "MINUS":
      return state - 1;
    case "RESET":
      return 0;
    default:
      return state;
  }
};
```

8. в файле index.js в папке reducers, импортим функцию combinedReducers и редюсер counter

9. вызвали функцию combinedReducers, которая принимает аргументом объект, если ключ объекта и имя редюсера совадает, то можем записать сокращенным методом. производим экспорт

```jsx
import { combineReducers } from "redux";

import counter from "./counter";

const rootReducer = combineReducers({
  // сокращенная запись
  counter,
  // если ключ отличается от редюсера по имени
  value: counter
});

export default rootReducer;
```

10. в папке Store создаем файл store.js

11. в файле store.js заимпортим функцию создания stora , подключим возможность redux devtool , создадим stor, сдеалаем экспорт и производим импорт rootReducer из файла index.js папки reducers и передаем его в аргументом при создании стора

Также добавим поддержку middleware

- заимпортив из redux applyMiddleware
- добавить третьим аргументом в создании стора applyMiddleware(thunk)

```jsx
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../Reducers/rootReducer";

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools, applyMiddleware(thunk));

export default store;
```

12. в папке actions создаем файл counterActions.js где будут создаваться действия

13. в файле напишем функции экшены

```jsx
export const plus = () => ({ type: "PLUS" });
export const minus = () => ({ type: "MINUS" });
export const reset = () => ({ type: "RESET" });
```

14. импортируем экшены туда где будем их использовать, в нашем случае в <App />

15. импортурем метод connect, который даст доступ к глобальному state, откуда можно будет взять значения

16. connect() это функция высшего порядка, которая принимает аргументами функции mapStateToProps и mapDispatchToProps

17. mapStateToProps принимает агрументом текущий глобальный state. Возвращает объект. Этот объет будет помещен в текущий пропс компонета. Поля/имя_пропсов объекта указываем сами.

18.mapDispatchToProps принимает агрументом метод dispatch, который запускает action. связывает экшены с редюсерами. Возвращает также объект, который будет помещен в объект пропс компонента. В ключи помещаем экшены, которые импортировали из файла counterActions.js

19. После вызова этих двух функций получаем объект пропс с созданными полями, которые используем в компоненте работая как с обычным пропс.

20. вызовем метод connect(mapStateToProps,mapDispatchToProps)(App);

21. Наглядно ниже.

```jsx
import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import * as actions from "./Redux/Actions/counterActions";

class App extends Component {
  render() {
    // дуструктуризируем props
    const { value, plus, minus, reset } = this.props;

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
const mapStateToProps = state => ({ value: state.counter });

// обращаемся к экшенам и связваем их с редюсером методом dispatch() , поместив эти медоты как поля props
const mapDispatchToProps = dispatch => ({
  plus: () => dispatch(actions.plus()),
  minus: () => dispatch(actions.minus()),
  reset: () => dispatch(actions.reset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
```
