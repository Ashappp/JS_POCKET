![pic](http://i.piccy.info/i9/31f128f24d43ee72ec6fbfe2c4d98f09/1553719913/17856/1309575/social.png)

Ставим

```jsx
npm i firebase
```

Логинимся под своим гугл аккаунтом, создаем новый проект и копируем конфигурационные данные которые соответствуют проекту
```jsx
import firebase from 'firebase'; 
 
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyDUt5Ns7qmAziDkK5qLqeI1d2dB3RE-Wb0",
    authDomain: "first-flight-2f130.firebaseapp.com",
    databaseURL: "https://first-flight-2f130.firebaseio.com",
    projectId: "first-flight-2f130",
    storageBucket: "first-flight-2f130.appspot.com",
    messagingSenderId: "712654646387"
  };

  firebase.initializeApp(config); 

  export default firebase;
```

### .database()
Связь с базой данных 
```jsx
firebase.database()

// поместим связь с базой в переменную 
export const database = firebase.database();  

```
### .ref()  JOURNEY on DATABASE
сослаться на 
- корневое , если не передали аргумент .ref()
- дочернее поле/местоположение в базе, которое указали аргументом .ref("/поле")
- также можно путешествовать по дереву базы через относительные адреса '/name/anothername/andMorename'
  
```jsx 
firebase.database().ref()
firebase.database().ref("/news") 
firebase.database().ref("/news/articles") 

// можно для удобства создать в константу ссылку на на базу
export const rootRef = firebase.database().ref()
```
##### |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

Чтение из базы READ

### .on('event', successCallback)  
### .once('event', successCallback)

Чтобы подписаться на событие и слушать изменения, используйте on() 
Чтобы подписаться на событие И после разового срабатывания ОТПИСАТЬСЯ, используйте once() 

Вы можете использовать событие "value", чтобы прочитать статический снимок содержимого по заданному пути, поскольку они существовали на момент события.

'value'
Этот метод запускается один раз, когда слушатель подключен, и снова каждый раз, когда изменяются данные, включая дочерние. 

callback
В коллбек передается снимок из базы данных, содержащий все данные в этом месте, включая дочерние данные.

val()
Вы можете получить данные в снимке с помощью метода val().

Если данных нет, моментальный снимок вернет 
- false, когда вы вызываете функцию there ()
- null, когда вы вызываете val () для него. 

 ```jsx
const starCountRef = firebase.database().ref('posts/').on('value', (snapshot)=>{
   this.setState({
     posts : snapshot.val()
   })
});
 ```
##### |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

Запись в базу 

### set ()  CREATE
Чтобы не перетирать данные, а добавлять новое поле, нужно в ref() передать новое поле.
Например есть поле с именем user где хранятся данные о пользователях, чтобы добавить нового пользователя нужно через / добавить новое поле. Вот так  'users/новоеполе'

Аргуметом set() передаем то что хотим записать в базу. Любые данные ([],{}, num, str, boolean)

```jsx
const  writeUserData = (userId, name, email, imageUrl)=> {

  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
```
### .push()
Добавление в поле, к существующим записям НЕ перетирая.
ID будет добавляться сервером 

```jsx 
 database.ref('/news/поле куда пушить/').push(новые данные)
 database.ref().child('поле куда пушить').push(новые данные)
```

##### |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



При вызове update () вы можете обновить дочерние значения нижнего уровня, указав путь к ключу. Если данные хранятся в нескольких местах для лучшего масштабирования, вы можете обновить все экземпляры этих данных, используя разветвление данных.




События 
"value"
"child_added" 
"child_changed"
"child_removed"
"child_moved"
