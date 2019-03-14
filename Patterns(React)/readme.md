

 
# ||||||||||||||||||||||||||   P A T T E R N S   |||||||||||||||||||||||||| 
 
 

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
  handleCurrentPage = async({target})=>{ 
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
this.props.children
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
