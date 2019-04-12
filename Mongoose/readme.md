Mongoose представляет специальную ODM-библиотеку (Object Data Modelling) для работы с MongoDB, которая позволяет сопоставлять объекты классов и документы коллекций из базы данных. 

```js
const mongoose = require("mongoose");

// идентификатор подключения
const uri = 'mongodb+srv://Begemoth:010203@cluster-2-fr33w.mongodb.net/MongooseDB?retryWrites=true'

// подключимся к базe
mongoose.connect( uri, { useNewUrlParser: true }, (err)=> err ? console.log(err) : console.log('CONNECTED'));

// поместим экземпляр Схемы в константу
const Schema = mongoose.Schema;

// определим кастомную схему на основе конструктора 
const customScheme = new Schema({
  name: String,
  age: Number,
  hobby: [String]
});

// создали модель на основе схемы
const Custom = mongoose.model('Custom', customScheme);

// создали екземпляр модели 
const person1 = new Custom({
  name: 'Andriy',
  age: 17,
  hobby: ['sport', 'spend money']
}).save((err)=> err ? console.log(err) : console.log('CREATED'))

const person2 = new Custom({
  name: 'Petro',
  age: 32,
  hobby: ['swimming', 'music']
}).save((err)=> err ? console.log(err) : console.log('CREATED'))


```

## CRUD FLOW
поиск осуществляется по модели
```js
const person = Custom.findOne({name: 'Andriy'}, (err, data)=> err ? console.log(err) : console.log(data)); 

const personHobbie = person.select('hobby');

const findById = Custom.findById('5caf8c3e64f8290560b6c9c7', (err, data)=> err ? console.log(err) : console.log(data))

Custom.updateOne({name : "Andriy"}, {name:"AAAAAAAAAA"}, (err, data)=> err ? console.log(err) : console.log(data) )

 
```