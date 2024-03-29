![pic](http://i.piccy.info/i9/1c5a9a36d81f78919aaae11b82e7aa0f/1553811389/62914/1309575/maxresdefault.jpg)

## Middleware 
(программная прослойка) - общая концепция в программном обеспечении, инструмент для расширения функционала, находящийся между двух точек в логической цепочке исполнения кода

В Redux это работает так:

📌 Перед тем как действия попадают в редьюсеры, они могут пройти через цепь прослоек (middleware chain).

📌 Прослойки получают доступ ко всем действиям

📌 Если прослойка рассчитана на работу с каким-то действием, она может его изменять, отменять или выполнять какие-то другие дейтсвия и код, к примеру логирование, асинхронные запросы и т. п. После чего действие отправляется дальше по цепочке прослоек.

📌 Если прослойка не рассчитана на работу с определенным типом действий, она просто пропускает действие через себя без изменений.

📌 После того как действие прошло всю цепочку прослоек, оно попадает в редьюсеры.

⭐️⭐️⭐️ Cоздание и использование Middleware ⭐️⭐️⭐️ 

Так как Redux написан с применением функционального программирования, он ожидает что прослойка будет каррированой функцией.

💡 **Каррированая** функция (curried function) - принимает один параметр и возвращает другую функцию которая в свою очередь тоже принимает один параметр и возвращает другую функцию...и так сколько угодно, до тех пор пока не будут получены все параметры.

```jsx
const add = (a, b) => a + b;
const curriedAdd = a => b => a + b;
const addTen = curriedAdd(10);
addTen(15); // 25
```

В общем виде middleware имеет следующую подпись

```jsx
const middleware = store => next => action => {};
```
Разберем параметры:

📌 store - ссылка на Redux-хранилище

📌 next - функция которую необходимо вызвать когда прослойка закончила обработку действия, для того чтобы отправить действие дальше по цепочке прослоек или в редьюсеры.

📌 action - текущее действие

💡 Для того чтобы использовать прослойку необходимо добавить ее при создании хранилища.

💡 Для этого у Redux есть функция *applyMiddleware*, которая принимает произвольное количество аргументов. 

Результат ее вызова мы передаем как аргумент enhancer в createStore.

#### Типы прослоек  

📌 Общего назначения - обрабатывает все действия

📌 Сигнальные - реагируют на определенный флаг в любом действии

📌 Узконаправленные - реагируют только на определенный тип действия 

При использовании прослоек есть удобный формат объекта-действия. 

В поле meta записываем нужные поля, разные флаги и т.п.

```jsx
const action = {
 type: 'тип действия',
 payload: 'данные',
 meta: {
 // ключи и флаги для прослоек
 },
};
```

#### Logger middleware  🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶 

Напишем прослойку которая *для любого действия выводит в консоль его содержимое*

```jsx
const logger = store => next => action => {
 console.group('logger');
 console.log('Action:', action); // выведет в консоль экшн
 console.groupEnd('logger');
 next(action);  // передаст экшн дальше по цепочке
};
```

#### Throttle middleware  🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶 

📌 Допустим event должен выполняться максимум раз в n секунд. 

📌 Напишем прослойку которая ищет в поле meta флаг throttle.

```jsx
// зададим словарь, в который будем записывать флаги
const throttled = {};

const throttle = store => next => action => {

// проверяет есть ли у экшена поле meta и если есть то  возвращаем значение поля throttle в переменную time
 const time = action.meta && action.meta.throttle; 

// если Таких полей нет,  выстреливаем экшн 
 if (!time) return next(action);

// проверяем если словарь содержит такое поле, и оно в значении true,  то выходим
 if (throttled[action.type]) return;

// если такого поля в словаре нет, то добавляем его и устанавливаем значение в true
 throttled[action.type] = true;

// далее через указанное в time время флипаем флаг этого поля в false
 setTimeout(() => {
  throttled[action.type] = false;
  }, time);

// выстреливаем экшн
  next(action);
};

При повторном событии цикл пройдется заново по коду и если мы вызвали событие раньше через указанное время, то оно не сработает.
```

#### Confirmation middleware 🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶  

Напишем прослойку которая будет спрашивать действительно ли пользователь хочет выполнить какое-то действие.

📌 Ищет на экшене в meta поле shouldConfirm

📌 Если значение свойства shouldConfirm равно true, выводит модальное окно для подтверждения, и если пользователь подтвержает то передает действие дальше по цепочке.

📌 Если пользователь решил отменить действие, то просто ничего не делает, таким образом действие не доходит до редьюсеров

📌 Если поля shouldConfirm нет или его значение false, то действие передается дальше по цепочке

```jsx
const confirmation = store => next => action => {

 const shouldConfirm = action.meta && action.meta.shouldConfirm;

// если значение поля false то выстреливаем экшн
 if (!shouldConfirm) return next(action);
// вызываем модальное окно с подтверждением.
 const shouldProceed = confirm('Are you sure?');
// если юзер нажал OK то вернется true и экшн выстрелится 
// если нажал CANCEL то ничего не произойдет, экшн не пойдет дальше
 if (shouldProceed) next(action);
};
```

⭐️⭐️⭐️  Асинхронные действия  ⭐️⭐️⭐️ 

Из коробки, Redux не предоставляет функционала для отправки асинхронных действий. 

Эту задачу решают прослойки 

📌 Для простых асинхронных операций подойдет redux-thunk  
 
Асинхронные action creators выглядят следующим образом.

```jsx
// Функция получает необходимые параметры , а затем возвращает из себя функцию которая будут получать dispatch
const asyncActionCreator = args => dispatch => {};
```
Когда action creator возвращает функцию, эта функция будет выполняться прослойкой.

Такая функция не должна быть чистой, поэтому она может иметь побочные эффекты, в том числе выполнение асинхронных HTTP-запросов. 

В ее теле также могут быть отправлены другие сихронные действия.

```jsx
const asyncActionCreator = args => dispatch => {
 fetch('some url')
  .then(resp => resp.json())
  .then(data => ({
    type: 'FETCH_SUCCESS',
    payload: data,
  }));
  };
```

#### thunk middleware  🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶

[Github](https://github.com/reduxjs/redux-thunk)

Напишем прослойку thunk, которая умеет обрабатывать асинхронные action creators. 

❗️ Все что она умеет это отличить функцию от объекта. 

📌 Если действие это функция, оно будет вызвано и аргументами ему будут переданы dispatch и
getState, тем самым позволяя использовать dispatch в теле действия. 

📌 В противном случае, если это обычный объект, действие будет отправлено дальше по цепочке прослоек.

```jsx
// так как первым  аргументом будет store, то можно его сразу деструктуризировать на dispatch b getState
const thunk = ({ dispatch, getState }) => next => action =>
// проверяет, если экшн это функция то вызывает ее , если обеъект то выстреливает дальше 
 typeof action === 'function' ? action(dispatch, getState) : next(action);

```
⭐️⭐️⭐️ Асинхронный FLOW ⭐️⭐️⭐️

❗️❗️❗️❗️❗️❗️ НЕ ЗЫБЫТЬ ПОДКЛЮЧИТЬ THUNK в store

```jsx
import {createStore, applyMiddleware , compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Reducers/rootReducer';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, devTools(applyMiddleware(thunk)) );

export default store;

```


1️⃣ ➡ создаем Три обычных экшена

2️⃣ ➡ создаем асинхронный экшн, который в себе в зависимости от результат запускает синхронные экшены с информацией о статусе запроса, и экшн с ДАНЫМИ запроса  

```jsx
// СОЗДАДИМ ЭКШН КОТОРЫЙ ИНФОРМИРУЕТ О НАЧАЛЕ запроса 
const fetchDataRequest = ()=>({
  type: 'FETCH_REQUEST',
})
 
// СОЗДАДИМ ЭКШН КОТОРЫЙ ИНФОРМИРУЕТ О ОШИБКЕ
const fetchDataError = error=>({
  type: 'FETCH_ERROR',
  payload: error,
}) 

// СОЗДАДИМ ЭКШН КОТОРЫЙ получает данные  
const fetchDataSuccess = data=> ({
  type: 'FETCH_RESPONSE',
  payload: data,
})
  
// асинхронный экшн , передаем параметром URL для запроса 
export const asyncGalleryAction = query => dispatch => {
// выстреливаем экшн который сообщает что запрос пошел, можем запустить лоадер
    dispatch(fetchDataRequest());
// запрашиваем данные. после получения данных выстреливаем экшн
axios.get(query).then(response=> data.data.hits)
                .then( data=> dispatch(fetchDataSuccess(data)))
                .catch(error=> dispatch(fetchDataError(error)))

}
 
```
3️⃣ ➡ В редюсере   

```jsx
const initialState = {
  items: [],
  loading: false,
  error: null,
}
const fetchReducer = (state=initialState, {type,payload}){
  switch(type){
    case 'FETCH_REQUEST': 
      return {
        ...state,
        loading: true, 
      };
    case 'FETCH_RESPONSE': 
      return {
        ...state, 
        items: payload,
        loading:false,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading:false,
        error: payload,
      };
    default: return state
  }
}
```
 