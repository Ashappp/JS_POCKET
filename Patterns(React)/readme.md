

 
# ||||||||||||||||||||||||||   P A T T E R N S   |||||||||||||||||||||||||| 

------------- Отправка медиафайла REACT -> NODE ----------------

### REACT

```jsx
import React , {Component} from 'react'; 

export default class Avatar extends Component{

state={ image: '', }

// обработчик на инпут с типом file
getUserAvatarHandler = ({target})=>{
    // записываем данные о загружаемом файле 
    const file = target.files[0];
    // записываем в стейт
    this.setState({image: file}); 
}

// обработчик на конопку отправки
sendUserAvatarHandler = ()=>{
    // получаем из стейта аватар
    const {image} = this.state; 

    // создаем на базе конструктора FormData объект
    const formdata = new FormData();
    // наполняем его методом конструктора append
    // 1 - параметр значение атрибута name инпута 
    // 2 - параметр value инпута
    formdata.append('mediafile', image);  

    // путь для загрузки файла
    const url = 'http://localhost:7000/upload';

    // посылаем данные на сервер. 
    fetch(url, {method: 'POST', body: formdata}).then(res=> console.log(res))
}

render(){  
    return ( 
    <div> 
        <label htmlFor="avatar" 
        style={{'backgroundColor': '#ccc', 'width': '150px'}}>
            LOAD IMAGE
        </label>

        <input  type="file" 
                name="avatar" 
                id="avatar" 
                style={{'display':'none'}} 
                onChange={this.getUserAvatarHandler}
        />

        <button onClick={this.sendUserAvatarHandler}>SEND IMAGE</button>
    </div> 
    )
}   
}

```

### NODE 

```js
const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
 
const app = express();

// объект настроек для multer
const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function(req, file, cb){
       cb(null, `image-${Date.now()}${path.extname(file.originalname)}`);
    }
 });
 
 const upload = multer({
    storage: storage,
    limits:{fileSize: 10000000},
 });

// middleware
app.use(cors());
app.use(express.json()); 

// обрабатываем роут , вызываем upload.single в который передаем значение атрибута name инпута
app.post("/upload", upload.single("mediafile"), (req, res) => { 
       res.send(200).json({success: true, message: 'File available on path http://host/upload/filename'});
    })
// отдаем картинки. НЕ забыть указывать имя файла
app.get('/upload', express.static('./public/uploads'));  

app.get('/', (req,res)=>{
    res.send('WORK')
})
 
app.listen(7000, ()=> console.log('SERVER START on port 7000'))

```


---------------  Асинхронный FLOW REDUX  ---------------

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


------------------ Показываем и скрываем Текст ------------------

Иногда нужно показыть к примеру информационный текст и скрыть его 

```jsx
// Создаем функцию которая записываем в  стейт текст 

printMessage = (message)=> {

        this.setState({
            formSuccess: message // Записываем текст
        });

        setTimeout(()=>{         // Через время убираем, передав пустую строку
            this.setState({
                formSuccess: ''
            });
        }, 2000)
    }

```


------------------ Паттерн работы с постами на примере REDUX Reducer ------------------

На примере КОЛЛЕКЦИИ []
```jsx
const  arrayReducer = (state = [], { type, payload }) => {
 switch (type) {

  case 'FETCH_POSTS':
    return payload;

  case 'ADD_POST':
    return [...state, payload];

  case 'UPDATE_POST':
    return state.map(post => (post.id === payload.id ? payload : post));

  case 'DELETE_POST':
    return state.filter(post => post.id !== payload.id);

  default:
    return state;
 }
}
```
На примере СЛОВАРЯ {}

```jsx
const  objectReducer = (state = {}, { type, payload }) => {
switch (type) {

  case 'FETCH_POSTS':
    return payload;
// Если такого поста нет , то он добавится, а если есть ТО ПЕРЕТРЕТ предыдущий
 case 'ADD_POST':
 case 'UPDATE_POST':
   return { ...state, [payload.id]: payload };
// получим в переменную rest остаток объекта БЕЗ ненужного елемента
 case 'DELETE_POST':  
 const { [payload.id]: _, ...rest } = state;
    return rest; 
 
 default:
    return state;
 }
}

```

------------------ Фильтр объекта без мутации ------------------

Иногда нужно получить объект без какого то поля не мутируя исходный объект

```jsx
// Используем демтруктуризацию объекта oldObject. Например нам не нужно поле city, мы деструктуризируем его в переменную _ которую нигде не будем использовать


const {city: _, ...newObject} = oldObject;
// в константу newObject попали все поля объекта oldObject

```
------------------ Initial state from Localstorage в REDUX ------------------

В случае если необходимо чтобы в стейт попадали данные из стореджа, и не танцевать с бубном, используем следующий прием

```jsx
// получаем сторедж ЕСЛИ он есть или пустой объект
const initialState = JSON.parse(localStorage.getItem('key')) || {};

// инициализируем стейт НЕ с данными из стореджа 
const someReducer = (state=initialState, action ){
  ...other code
}
```

------------------ Кастомный REACT ХУК fetch запроса ------------------

```jsx
import {useEffect, useState} from 'react'; 

const useFetch =(url)=>{ 
  // стейт пустой массив
  const [data, setData]= useState([]);

// используем хук useEffect
  useEffect( ()=> {
// запрашиваемся по URL
    fetch(url)
      .then(resp => resp.json())
// используем хук useState, его вторую часть (функцию аналог setstate) и записываем в стейт данные запроса
      .then(data=> setData(data))
  } , []);

  return data;
}
export default  useFetch;
```

 -------- Формирование полей стейта на основании данных из input --------
 -------- и дальнейшая запись в массив в виде елементов {}.     --------

1. С использованием ХУКа useState

```jsx
// В родительском компоненте есть массив с данными , нужно собрать данные из форм и записать объектом подобной структуры в массив 
 const userData = [ { id: 1,  name: "Homer", username: "floppydiskette" }, и так далее];
// user будет пробрасываться в дочернем компоненте
const addUser = user => {
  // добавим новое полe id 
  user.id = Date.now();
  // запишем в основной массив новыей елемент , с данными собранными с инпутов
  setUsers([...users, user]);
}

// ДОЧЕРНИЙ КОМПОНЕНТ С ФОРМОЙ
 
// сформировали нужный объект и сделали его по умолчанию 
  const initialState ={
    name: '',
    username: '',
  }
// записали в стейт объект с нужными полями
  const [user, setUser] = useState(initialState);

// получаем в переменные значение инпутов (html атрибут name такой же как и поле в стейте.)
  const inputChange = (e) => {
    const {name, value} = e.target;
    // записываем в стейт данные предварительно спреднув старый стейт , затем перетираем новыми данными
    setUser ({...user, [name]:value});
  }

  const formSubmit = e => { 
    e.preventDefault(); 
// если поля НЕ пустые то вызываем фунцию записи add проброшенную из РОДИТЕЛЬСКОГО компонента
// add это функция, которая записывает в основной массив собранные данные из инпутов 
    user.name && user.username && add(user) ; 
// очишаем поля инпутов
    setUser(initialState);
  } 
}
// форма с двумя инпутами
  return (
    <form onSubmit={formSubmit}>  
      <input type="text" name="name" value={user.name} onChange={inputChange}/> 
      <input type="text" name="username" value={user.username} onChange={inputChange}/> 
    </form>
  );
  

```
 
------------------ Динамическая стилизация ------------------

В зависимости от условия, например клик на что-то или изменение состояния, нужно поменять стили для компонента, стили можно задавать инлайн или в className

1. className ------------------

создадим массив например сразу после метода render или на самом верху, до объявления компонентав который будем пушить при натуплении определенных условий елементы-строки который будут назначены как классы в атрибуте className

матод с массивом
```jsx
const css = [];

// Произошли какие то события и нам нужно поменять класс
 if ( this.state.persons.length <= 2 ) css.push( 'red' ); // css = ['red'] 
 if ( this.state.persons.length <= 1 ) css.push( 'bold' ); // css = ['red', 'bold']  

// в атрибуте className компонента разбиваем массив в строку по разделителю

<div className={css.join(' ')}

// получаем <div className="red bold"
```

2. Inline style  ------------------

создаем объект со стилями или просто пустой объект
```jsx
const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer', 
    };
    
const css ={}

// Произошли какие то события и нам нужно поменять класс

// добавляем поле в пустой объект 
 if ( this.state.isActive) css.color = '#000' //  color : #000 

// или обновляем существующий объект 
 if ( this.state.persons.length <= 1 ) style.padding = '10px 5px'; // padding : 10px 5px  

// В компионенте значением атрибута/props style размещаем нужный объект сто стилями

<p  style={css}> Some text </>
<span style ={style}> Some content </span>

// можно назначить эти объекты разным компонетам в качестве стилей и при наступлении каких то событий менять значение полей объекта, таким образом измення сразу стили у всех компонентов , которым прописали это объект. Аналог css переменных 

```
3. Стилизация spread props  ------------------

Есть компонент <Button > в котором лежит span с пропсами style в который при наступлении каких то условий мы прокинем дополнительный стили c помощью спреда инлайновых стлей. 



```jsx
// Передающий компонент. Передаем пропсом add объект со стилями
<div> 
  <Button add={{fontSize: '12px', display: 'inline-block' }}/>
</div>

// Принимающий компонент. Распыляем в инлайновых стилях объект, тем самым применяя их
<span style={{
  color: '#fff',
  border:'1px solid #ccc',
  ...props.add 
}}> </span>

```



------------------ ASYNC / AWAIT / second argument setState ------------------

Чтобы гарантировано получать изменные данные из стейта можно пойти несколькими путями. 
Так как setState это асинхронная операция то мы не можем гарантировтаь что стейт обновится сразу 
Поэтому есть несколько приемов

1. Передавать вторым аргументом метода setState, функцию с тем что нам нужно  

```jsx
this.setState({ data: value} , ()=> do something)
```

2. Использовать конструкцию async await

```jsx
//  Объявили функцию как асинхронную
  handleCurrentPage = async ({target})=>{ 
//  ждем пока выполнится 
  await this.setState({
    currentPage: target.value,
    error: false,
  })
// используем изменненные АКТУАЛЬНЫЕ данные в стейте. 
  if(this.state.currentPage === '' || this.state.currentPage < 1) return; 

}

```

------------------ Кастомный фильтр не изменяя стейт  ------------------

Если нам нужно отрисовать данные из стейта по разным условиям, на примере приложения TODO список завершенный текущих и всех дел, то если брать данные из стейта наприямуя и применять к ним фильтр то массив который в стейте мутируется и в дальнейшем мы не сможем отображаать корректные данные. 
В компоненте который будет отображать данные из стейта по разным фильтрам, мы делаем следующее, берем массив из стейта и копируем его в переменную, дальше эту переменную отдаем как props в компонент и делаем там все что нужно. 

Также можно через создание функции с фильтрацией. 

```jsx
// фукция которая принимает массив и фильтр
const filterItem = (arr, filter) => {
  // проверяет, если переданный аргумент буль , то фильтруем по нему, иначе возвращает сам елемент
	return arr.filter(elem=> typeof filter == 'boolean' ? elem.complete == filter : elem)
} 
Далее в теле компонента, когда все props прокинуты ( { массив , фильтр} ) мы вызываем созданную функцию и передаем туда данные 

filterItem(массив, фильтр ) // На этом этапе у нас отфильтрованный массив по условия
.map(elem => .....) // теперь на основании отфильтрованного массива работаем с коллекцией

```
------------------ Добавление класса css по условию ------------------

```jsx

// создадим переменную которая хранит в себе класс или классы, которые мы можем применять к елементам
      let classCss = 'todo-list-item-label';

// если в переменной которая хранит в себе значение поля done будет true , то добавим в переменную класс 
       (флаг или условие) ? classCss += ' done' : classCss;  

// затем в return в теге прописываем в className={classCss}
<span className={classCss}>

```
------------------  Запись в localstorage данных которые пришли от сервера ------------------

- делаем запрос fetch/axios затем в then где есть доступ к объекту с данными , вторым параметром функции setState передаем команду записи в локаолстредж

```jsx
axios.get(url).then(response=>response.data)
              .then(data => this.setState( { hits: data, loading : false}, ()=> localStorage.setItem('key' , JSON.stringify(data)) ) )
              .catch(err = > this.setState({error : err, loading: false }))
```

------------------ Получение данных от другого ресурса ------------------

- создаем асинхронную функцию
- получаем преобразованный объект
- при вызове функции в блоке .then() делаем с данными все что нужно

```jsx

const getResource = async (url) => {
  const result = await fetch(url);
  return await result.json(); 
}

getResource('some url').then(data => do something)

```

------------------ Разбивка компонентов на блоки кода ------------------

- если родительский компонент большой и будет повторяться то можем вынести его в отдельный блок за пределы КЛАССА и затем переиспользовать. Аргументами при вызове будут другие блоки-компоненты

```jsx
const Row = ({left , right}) =>{
  return (
    <div className="row">
      <div className="col-md-6">
        {left}
      </div>
      <div className="col-md-6">
        {right}
      </div>
    </div>
  );
}
// В классе
render(){
// Выносим компоненты по блокам
const item = (
  ...код компонента
);
const description = (
  ...код компонента
)
return (
  // Используем родительскую разметку и подставляем аргументами блоки-компоненты
  <Row left={item} right={description}>
)
}

```

------------------ CHILDREN ------------------

Все что мы пишем в теле компонента, между открывающим и закрывающим тегом будет доступно через

```jsx
this.props.children
```

Там можно передавать любые данные

------------------ Деструктуризация значений ------------------

- деструктуризировать props
- деструктуризировать state

```jsx
render(){

const {one, two, three} = this.props;
const {value1, value2} = this.state;

return(
  ...code
)

}
```

------------------ Паттерн для полей форм ------------------

При заполнении формы у нас присутствуют разные инпуты, такие как email, password, text и т.п. для того чтобы собрать с них значения нужно для каждого инпута вешать событие onchange и обработчик для кажого инпута свой. Для того чтобы не плодить множество обработчков, существует паттерн.
Привязываемся к значению атрибута name, который зададим для каждого инпута свой и затем используя объект события и вычисляемое свойство объета [ключ] : значение, будем записывать такие значения в state

```jsx
state = {
  login : '',
  email : '',
  password : '',
}

// один обработчик для каждого инпута
handleChange = (evt) => {
  this.setState({
    // берем значение атрибута name и значение value у инпутов
    [evt.target.name] : evt.target.value,
  })
}

render(){
  // для удобства деструктуризируем state
  const {login, email, password} = this.state;
  return(
    <form>
      <input name="login" onchange={this.handleChange} value={login}>
      <input name="email" onchange={this.handleChange} value={email}>
      <input name="password" onchange={this.handleChange} value={password}>
    </form>
  )
}
```

Аналогичные трюки можно проделывать и с остальными елементами формы такими как checkbox, radio, select

------------------ Перебор коллекции / Создание массива объектов / Живой поиск ------------------

```jsx

// основной класс App
class App extends Component{

// в стейте будет массив заметок  [{...}, {...}, {...}] и фильтр, по которому будем фильтровать елементы массива
state = {
  notes: [],
  filter: '',
}

// метод создания новой заметки и обновления стейта. ВЫЗЫВАТЬСЯ будет в дочернем компоненте при сабмите формы. Параметр text - это будет значение input
addNote = (text) =>{
  // новая заметка
  const note = {
    id: Math.floor(Math.random()*1000),
    text
  }
// обновляем state, записываем новый елемент {} который создали выше, и спреднули старый елемент. НА БАЗЕ ПРЕДЫДУЩЕГО СОСТАВЛЯЕМ НОВОЕ
  this.setState ((prevState)=>({
    notes : [note , ...prevState.notes],
  }))
}
// Метод удаления елемента-заметки из массива заметок. Вызывается как обработчик на клик по кнопке в компоненте NoteList. Параметр id  это id текущего елемента
deleteNote = (id)=>{
  this.setState((prevState)=>({
    notes : prevState.notes.filter(elem => elem.id !== id),
  }))
}
// Метод который получает и сетит строку по которой будет фильтроваться массив заметок. Вызывается как обработчик onChange на инпуте в компоненте Search
filterNotes = (evt) =>{
  this.setState({filter : evt.target.value})
}



render (){
// поместим в переменную массив заметок и значение поля filter из state
  const {notes, filter} = this.state;
// создадим отфильтрованный массив НА БАЗЕ МАССИВА ИЗ state, возьмем массив и значение фильтра из state.
  const filteredArr = notes.filter(elem=> elem.text.includes(filter))
  return (
// пробросим кастомный prop onSubmit, в который передадим метод добавления новой заметки
    <NoteEditor customSubmit={this.addNote}/>
// Фильтр
    <Search value={filter} filterNote={this.filterNotes}/>
// пробросим кастомный props в который передадим массив заметок для рендера
// filteredArr это массив отфильтрованных заметок для рендера
    <NoteList notes={filteredArr} removeNote={this.deleteNote}/>
  )
}
} // end App
```

```jsx
//----------- ДРУГОЙ файл. КОМПОНЕНТ ФОРМЫ ---------------
class NoteEditor extends Component{

// в стейте значение инпута формы
  state = {
    value: '',
  }

// метод/обработчик для обновления state из поля input
handleChange = (evt) =>{
  this.setState({
    value : evt.target.value,
  });
}

// метод/обработчик для сабмита формы
handleSubmit = (evt) =>{
  evt.preventDefault();

// проверка на пустое поле state
  if(this.state.value.trim() === '') return;

// вызываем проброшенный кастомный props из App, значением которого является метод компонента App, который создает новую заметку, аргументом передается текст, который мы получили из инпута формы и который записан в state
  this.props.customSubmit(this.state.value);

// после использования очищаем поле state
  this.setState({
    value: '',
  })
}

  render(){
    // поместим в переменную значение поля value из  state
    const {value} = this.state;

    return (

      <form onSubmit={this.handleSubmit}>
        <input  type="text" onChange={this.handleChange} value={value}>
        <button>Add note<button/>
      </form>
    )
  }
};
```

```jsx
//----------- ТРЕТИЙ файл. КОМПОНЕНТ СПИСОК ---------------

// деструктуризируем проброшенный массив заметок notes
const NoteList = ({notes, removeNote})=> {
  <ul>
// отобразим заметки в <li> перебрав их методом map()
    {notes.map(elem=> (
      <li key={elem.id}>
        <p>{elem.text}</p>
// в обработчик передадим проброшенный через props removeNote
        <button onClick={ () => removeNote(elem.id) }> Delete <button/>
      </li>
      ))}
  </ul>
}
```

```jsx
//----------- ЧЕТВЕРТЫЙ файл. КОМПОНЕНТ ПОИСК ---------------

// деструктуризируем проброшенный массив заметок notes
const Search = ({filter, filterNote})=> {
   return ( 
// значение инпута это значение поля filter из App 
// метод компонента Арр filterNote, который меняет поле filter state 
      <input type="text" value={filter} onChange={filterNote}/>  
   )
}
```
