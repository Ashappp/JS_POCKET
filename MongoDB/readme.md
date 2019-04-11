![pic](http://i.piccy.info/i9/ba321f1c0a31a09020e2a6208ee21ed9/1554789851/162103/1309575/MongoDB_1440x728.jpg)

База с открытым исходным кодом. Хранит данные в BSON фформате все расространенные типы данных. 

Система управления БД состоит НЕ из таблиц в ИЗ коллекий. [ {}, {}]
Каждая коллекция имеет свое уникальное имя - произвольный индентификатор.

ВАРИАНТ с локальной базой 

# Консоль Windows

- качаем базу, опредеяем путь 
- снимаем галку с Service
- ставим галку + Compass 
- создаем папку data/db
- создаем папку log/mongo.log
- запускаем консоль от Админа
- переходим в папку /bin откуда выполяняем
- C:\MongoDB\bin> mongod --directoryperdb --dbpath C:\MongoDB\data\db --logpath C:\MongoDB\log\mongo.log --logappend --install
- затем выполняем C:\MongoDB\bin> net start MongoDB
- после успешного выполнения выролняем C:\MongoDB\bin> mongo
- получаем успешное подключение
 

# Файл package.json
```json
{
  "test_node": "node+mongo",
  "version": "1.0.0",
  "scripts":{
    "start": "nodemon app.js"
  },
  "dependencies": {
    "mongo": "^0.1.0",
    "mongodb": "^3.2.3",
    "mongoose": "^5.5.0",
    "nodemon": "^1.18.11"
  }
}
```

# Файл index.js 
```jsx
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/youtube', { useNewUrlParser: true })
  .then(()=> console.log("START"))
  .catch(err=> console.log(err))  
```

Если все сделали правильно , то запустив npm start получаем

```js
  syscall: 'connect',
  address: '127.0.0.1',
  port: 27017 }
[nodemon] clean exit - waiting for changes before restart
[nodemon] restarting due to changes...
[nodemon] starting `node app.js`
START
```

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  
Комманды в консоли 
```jsx

use  dbmame  - создаст базу с именем dbname
show dbs - выводит название всех БД
dropDatabase - удалит базу данных
createCollection - создаст коллекцию

```

Администрирование БД

mongo 
- запускаем интеракивную оболочку mongoDB, которая позволяет просматривать, вставлять, удалять и обновлять данные

mongostat 
- инструмент коммандной строки который сумирует список статических данных для испольняемого экземпляра

mongotop 
- метод для отслеживания времени,потраченного на чтение/запись в БД

mongoimport/mongoexport
- утилиты для импорта/экспорта данных в форматы JSON и др

mongodump 
- создает бекап БД

mongostore 
- записывает данные из бекапа в новую БД

mongofiles
- управляет файлами в системе GridFS


::::::::::::::::::::::::::::::::::::::::::::::::

- Драйвер MOngoDB - библиотека для соединения и синхронизации между приложением и базой данных MongoDB. 

Методы

- connect(url, callback)  выполняет подключение к серверу MongoDB
url-адрес сервера
callback - ф-ция которая вызывается при кстановке подключения

- insertOne(document, callback) добаляет Один елемент в коллекциб
- insertMany(document, callback) добавляет массив елементов в коллекцию 
document - добавляемый объект
callback - ф-ция которая выполниится после добавления 

- find() - возвращает данные из коллекции по критериям

- findOne() - возвращает один документ из коллекции по критериям

- updateOne() - обновляет ОДИН документ , который соответствует критерию фильтрации и возырвщает информацию об операции обновления

- updateMany() - обновляет ВСЕ документы, которые соответствуют критерию фильтрации и возвращает информацию об операции обновления

- findOneAndUpdate() - обновляет один документ, который соответствует критерию фильтрации и возвращает обновленный документ

- deleteMany() - удаляет все документы , которые соответсвтуют определенному критерию

- deleteOne({name: 'Vasya'}) - удаляет один документ , который соответсвует определенному критерию 

- findOneAndDelete() - получает и удаляет один документ, который соответсвует определенному критерию 

- drop() - удаляет всю коллекцию 

## C R U D   F L O W
```js
const MongoClient = require('mongodb').MongoClient; 

// идентификатор поделючения к БД
const uri = "mongodb+srv://Begemoth:010203@cluster-2-fr33w.mongodb.net/test?retryWrites=true";

// создаем подключение
const client = new MongoClient(uri, { useNewUrlParser: true });



// подключаемся используя метод CONNECT
client.connect( async err => { 

// обрабатываем статус подключения
  (err) ? console.log(err) :  console.log('CONNECTION SUCCESS'); 

// ссылка на базу данных 
  const db = client.db("Customers");
// ссылка на коллекцию  
  const userCollection = db.collection("users");


// ------------  C R U D  ------------

// ДОБАВИТЬ ОДИН ---- CREATE
  userCollection.insertOne({name:'SSY'} ,()=> console.log('CREATE ONE'));


// ДОБАВИТЬ МНОЖЕСТВО ---- CREATE
  userCollection.insertMany([{age: 44, alive: true}, {role:'tank', position: 2}], ()=>console.log('CREATE MANY'));


// НАЙТИ ---- READ
  const all = await userCollection.find().toArray();
  const one = await userCollection.findOne({name: 'Y'});
  const concrete = await userCollection.find({role: 'tank'}).toArray(); 
   

// ОБНОВЛЕНИЕ  ---- UPDATE
  userCollection.updateOne({name:'Y'}, {$set:{name:'ZZZZ'}});
  userCollection.updateMany({name:'SSY'}, {$set:{lastname:'ADD-new-prop'}});
  userCollection.updateMany({name:'SSY'}, {$set:{name:'CHANGED-old-name'}});
  const updated = await userCollection.findOneAndUpdate({name: 'CHANGED-old-name'},{$set:{lastname:'retOr'}}, {returnOriginal:false});
   

// УДАЛЕНИЕ  ----  DELETE
  userCollection.deleteOne({name: "CHANGED-old-name"});
  userCollection.deleteMany({name: "CHANGED-old-name"});
  const deleted = await userCollection.findOneAndDelete({name: "SSY"});
   userCollection.drop();


  client.close();

}); 
```