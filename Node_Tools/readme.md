# Модули NODE

## RESPONSE 

### response.writeHead

response.writeHead(statusCode[, statusMessage][, headers])

statusCode - <Число>
statusMessage - <Строка>
headers - <Объект>

Посылает заголовок ответа на запрос. 
Код состояния представляет собой 3-значный код состояния HTTP, например 404. 
Последний аргумент, headers, это заголовки ответа. 
При желании можно задать удобно читаемое для человека statusMessage в качестве второго аргумента.

```jsx
var body = 'hello world';
response.writeHead( 200, {
  'Content-Length': Buffer.byteLength(body),
  'Content-Type': 'text/plain' });
```

Этот метод должен быть вызван только один раз на сообщение, и он должен быть вызван до того как будет вызван response.end(). 

Если вы вызовете response.write() или response.end() до вызова response.writeHead(statusCode[, statusMessage][, headers]), то будут вычислены неявные / переменные заголовки и вызовут для вас эту функцию.

Когда заголовки были установлены с помощью response.setHeader(), то они будут объединены с заголовками, которые переданы на response.writeHead(), а преимущество будут иметь заголовки, переданные на response.writeHead().

```jsx
// returns content-type = text/plain
const server = http.createServer((req,res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, {'Content-Type' : 'text/plain'});
  res.end('ok');
});
```

Обратите внимание, что Content-Length задается в байтах, а не в символах. Приведенный выше пример работает, потому что строка 'hello world' содержит только однобайтовые символы. Если тело содержит символы с более высокой кодировкой, то для определения количества байтов в заданной кодировке должен быть использован Buffer.byteLength() .

Node.js не проверяет, являются ли одинаковыми Content-Length и длина тела которое было передано. Попытка установить имя поля заголовка или значение, которое содержит недопустимые символы приведет к выдаче ошибке TypeError.


### response.write

response.write(chunk[, encoding][, callback])

chunk - <Строка> | <Буфер>
encoding - <Строка>
callback - <Функция>

Возвращает: <Boolean>

Если этот метод вызывается и при этом не был вызван response.writeHead(), то он переключится в режим неявного заголовка и сбросит данные неявных заголовков. 

Отправляет часть тела ответа. Этот метод может быть вызван несколько раз для отправки последующих частей тела заголовка.

chunk может быть строкой или буфером. 
Если chunk является строкой, то второй параметр указывает, как кодировать его в поток байтов. 
По умолчанию encoding (кодировка) это 'utf8'. callback будет вызван тогда, когда этот фрагмент данных будет сброшен.

Примечание: Это необработанное тело HTTP и не имеет ничего общего с multi-part кодировками тела заголовка более высокого уровня, которые могут быть использованы. В первый раз когда вызывается response.write() , он будет посылать информацию буферизованного заголовка и первое тело заголовка клиенту.

Второй раз когда вызывается response.write(), Node.js предполагает, что вы будете совершать потоковую передачу данных и посылает это отдельно. 
То есть, данные буферизуются до первого фрагмента тела.

Возвращает **true**, если все данные были успешно сброшены в буфер ядра. 
Возвращает **false**, если все или часть данных были поставлены в очередь в памяти пользователя.
Событие 'drain' будет сгенерировано когда буфер станет снова свободен.


### response.end

response.end([data][, encoding][, callback])

data - <Строка> | <Буфер>
encoding - <Строка>
callback - <Функция>

Этот метод отправляет серверу сигнал что были отправлены все заголовки и тело ответа; что сервер должен считать это сообщение завершенным.

Метод, response.end() ДОЛЖЕН быть вызван при каждом ответе. 
Если data определены, то это эквивалентно вызову response.write(data, encoding) с последующим response.end(callback).

Если указан callback, то он будет вызван, когда ответный поток будет закончен.

# MODULE

### fs  FILE SYSTEM

💡 .write(fd, buffer, offset, length[, position], callback)

fd - <Число>
buffer - <Строка> | <Буфер>
offset - <Число>
length - <Число>
position - <Число>
callback - <Функция>

Запись buffer в файл, указанный с помощью fd.

offset и length определяют часть буфера для записи.

position относится к смещение от начала файла, в котором эти данные должны быть записаны.

Если typeof position !== 'number', данные будут записаны в текущей позиции. См pwrite (2).

Обратному вызову будет дано три аргумента (err, written , buffer), где written указывает, сколько байтов были записано от buffer. Обратите внимание, что небезопасно использовать fs.write несколько раз на том же файле, не дожидаясь обратного вызова.

Для этого сценария, настоятельно рекомендуется использовать fs.createWriteStream.  

💡 .write(fd, data[, position[, encoding]], callback)

fd - <Число>
data - <Строка> | <Буфер>
position - <Число>
encoding - <Строка>
callback - <Функция>

Записывает data (Данные) в файл, указанный с помощью fd.

Если data не экземпляр Buffer, то значение будет приведено к строке.

position относится к смещению от начала файла, в котором эти данные должны быть записаны. (смещение - величина, показывающая при относительном методе адресации смещение ячейки памяти относительно базового адреса, т.е. число адресуемых элементов (расстояние) между двумя ячейками памяти)

Если typeof position !== 'number' то данные будут записаны в текущей позиции. См pwrite (2).

encoding является ожидаемой строкой кодирования.

Обратный вызов получит три аргумента (err, written, string), где written определяет, сколько байтов должны быть записано в переданную строку. Обратите внимание, что записанные байты не являются тем же самым что и символы строки. См Buffer.byteLength.

В отличие от записи в буфер при, должна быть записана вся строка. Ни одна подстрока не может быть указана. Это происходит потому, что смещение в байтах полученных данных не может быть таким же, что и смещение в строке.

Обратите внимание, что небезопасно использовать fs.write несколько раз на одном том же файле, не дожидаясь обратного вызова. Для этого сценария, настоятельно рекомендуется fs.createWriteStream.

В Linux, позиционные записи не работают, если файл открыт в режиме добавления. Ядро игнорирует позицию аргумента и всегда добавляет данные в конец файла.

💡 .writeFile(file, data[, options], callback)

file - <Строка> | <Буфер> | <Число> имя файла или файловый дескриптор
data - <Строка> | <Буфер>
options - <Object> | <Строка>
encoding - <Строка> | <Null> (По умолчанию 'utf8')
mode - <Число> (По умолчанию 0o666)
flag - <Строка> (По умолчанию 'w')
callback - <Функция>

Асинхронно записывает данные в файл, заменяя файл, если он уже существует. data может быть строкой или буфером. Опция ENCODING игнорируется, если data является буфером. По умолчанию это 'UTF-8'.

```jsx
fs.writeFile('message.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
}); 


fs.writeFile('message.txt', 'Hello Node.js', 'utf8', callback);

``` 
  
Обратите внимание, что это небезопасно использовать fs.writeFile несколько раз на том же файле, не дожидаясь обратного вызова. Для этого сценария, настоятельно рекомендуется fs.createWriteStream.

Обратите внимание:

Если дескриптор файла задан как файл, то он не будет автоматически закрыт.

💡 .writeFileSync(file, data[, options])
file - <Строка> | <Буфер> | <Число> имя файла или файловый дескриптор
data - <Строка> | <Буфер>
options - <Object> | <Строка>
encoding - <Строка> | <Null> (По умолчанию 'utf8')
mode - <Число> (По умолчанию 0o666)
flag - <Строка> (По умолчанию 'w')
Синхронная версия fs.writeFile(). Возвращает undefined.


💡 .readFile(file [, options], callback)

file - <Строка> | <Буфер> | <Число> имя файла или файловый дескриптор
options - <Строка> | <Объект>
encoding - <Строка> (по умолчанию 'utf8')
flag - <Строка> (по умолчанию 'r')
callback - <Функция>

Асинхронно читает все содержимое файла. 

```jsx
 fs.readFile('/etc/passwd', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```
Обратному вызову передается два аргумента (err, data), где data это содержимое файла.

Если не указано кодирования, тогда возвращается исходный буфер. 
 
```jsx
fs.readFile('/etc/passwd', 'utf8', callback);

```

💡 .readFileSync(file[, options])

file - <Строка> | <Буфер> | <Число> имя файла или файловый дескриптор
options - <Строка> | <Объект>
encoding - <Строка> (по умолчанию 'utf8')
flag - <Строка> (по умолчанию 'r')

Синхронная версия fs.readFile. 

Возвращает содержимое файла. 

Если опция encoding задана, то эта функция возвращает строку. 

В противном случае она возвращает буфер.

 

💡 .readdirSync(path[, options])

path - <Строка> | <Буфер>
options - <Строка> | <Объект>
encoding - <Строка> (по умолчанию 'utf8')

Синхронный readdir(3). 
Возвращает массив имен файлов исключая '.' а также '..'.

Дополнительный аргумент options может быть строкой, определяющей кодировку, или объектом со свойством encoding определяющим схему кодирования символов, чтобы использовать ее для имен файлов, переданных в функцию обратного вызова. 
Если encoding устанавливается как 'buffer', имена файлов которые возвращаются будут переданы в качестве объектов Buffer.



### Методы отрисовки шаблона 

```js
// нужно указать папку где будут файлы шаблонизатора  
app.set('views', path.join(__dirname, 'views')); 

// тут нужно указать какой шаблонизатор будет использоваться 
app.set('view engine', 'pug'); 

// далее там где необходмо отрендерить разметку , вызываем render()
// тут вызвали файл шаблона stores и передали туда ПРОПС как объект в котором данные которые будут использоваться
 res.render('stores', {title: 'Stores', stores: stores})
```



### CRUD

```js
const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');

const app = express();

// путь к папке 
const userDb = path.join(__dirname, '../db'); 
// путь к файлу
const userFileDb = path.join(__dirname, '../db/users.json'); 
// получим файл 
const userFile = JSON.parse(fs.readFileSync(userFileDb, 'utf-8'));

const startServer = port => { 

app.use(bodyParser.json());


app.all('/', (req,res)=>{
  debugger;
  res.send('MAIN')
})

//  ДОБАВЛЕНИЕ НОВОГО JSON.  
app.post('/user', (req,res)=>{ 
  const body = req.body; 
  if(body && body.userName){ 
    // параметры - 1 - путь+отличительное имя файла 2-тело файла. ЧТО записать
    fs.writeFileSync(`${userDb}/${body.userName}.json`, JSON.stringify(body));
  }
});

  // ДОБАВЛЕНИЕ В СУЩЕСТВУЮЩИЙ  JSON 
  app.post('/adduser', (req,res)=>{ 
    const body = req.body; 
    if(body && body.userName){ 
      // создадим промежуточный массив, распылив в него старый 
      const newData = [...userFile.users, body];
      fs.writeFileSync(`${userDb}/users.json`, JSON.stringify({users: newData}));
    } 
  res.send(req.body);
})

// ОБНОВЛЯЕМ user JSON
  app.put('/user/:id', (req,res)=> {
    const userId = req.params.id; 
    const body = req.body;

    const updatedUser = userFile.users.map(el=> el.uid == userId ? {...el,body}: el);
    fs.writeFileSync(`${userDb}/users.json`, JSON.stringify({users: updatedUser}));

    res.send(req.body); 
  })

  // УДАЛЯЕМ конкретного USERa из  JSON
  app.delete('/removeuser/:id',(req,res)=>{
    const userId = req.params.id; 
    const deletedUser = userFile.users.find(el=> el.uid == userId);
    const filteredUsers = userFile.users.filter(el=> el.uid != userId);
    fs.writeFileSync(`${userDb}/users.json`, JSON.stringify({users: filteredUsers}));
    res.send(deletedUser); 
  })

  // УДАЛЯЕМ файл из директори
  app.get('/removefile/:name', (req, res)=>{
    const nameToDelete = req.params.name;  
    fs.unlink(`${userDb}/${nameToDelete}.json`, (err)=>{
      if (err) throw err;
      console.log("DELETED");
    })
    res.send(`File with user ${nameToDelete} was deleted`);
  })
 
  app.listen(port, ()=>{
    console.log('Start at port', port);
  })
}

module.exports = startServer;
```
























### path

💡 .extname(path)  - path <Строка>

❗️❗️❗️ Возвращает строку

Метод path.extname() возвращает расширение переданного аргументом строки .
Если точки нет в конце пути или если первый символ базового имени path(см. path.basename()) является точкой, то возвращается пустая строка.

⭕️ Выпадает ошибка TypeError если pathне является строкой.

```jsx
path.extname('index.html')
// Возвращает: '.html'

path.extname('index.coffee.md')
// Возвращает: '.md'

path.extname('index.')
// Возвращает: '.'

path.extname('index')
// Возвращает: ''

path.extname('.index')
// Возвращает: ''
```

💡 dirname(path)  - path <Строка>

❗️❗️❗️  Возвращает строку

Метод path.dirname() возвращает имя директории path, подобно команде dirname на Linux.

⭕️ Может выпадать ошибка TypeError если path не является строкой.

```jsx
path.dirname('/foo/bar/baz/asdf/quux')
// Возвращает: '/foo/bar/baz/asdf'
```

💡 path.join([...paths])  …paths <Строка> 
Последовательность сегментов пути

❗️❗️❗️ Возвращает строку

Метод path.join() объединяет все данные сегменты пути вместе, используя для этого заданный платформенный разделитель, и приводит полученный путь к нормальному виду.

Нулевой сегмент path игнорируется.
Если в результате объединения путей получилась строка с нулевой длиной, тогда возвращается ‘.’, представляя собой текущую рабочую директорию.

⭕️ Выпадает ошибка TypeError, если любой из сегментов path не является строкой.


```jsx
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
// Возвращает: '/foo/bar/baz/asdf'

path.join('foo', {}, 'bar')
// Выдает TypeError: Arguments to path.join must be strings
```

💡 .parse(path)   - path <Строка>

❗️❗️❗️  Возвращает объект

Метод path.parse() возвращает объект, чьи свойства представляют собой важные элементы пути.

⭕️Возвращаемый объект будет иметь такие свойства:

```jsx

// root : <Строка>
// dir  : <Строка>
// base : <Строка>
// ext  : <Строка>
// name : <Строка> 


path.parse('/home/user/dir/file.txt')

// Возвращает:
{
   root : "/",
   dir : "/home/user/dir",
   base : "file.txt",
   ext : ".txt",
   name : "file"
}
```

💡 resolve([...paths])  …paths <Строка> 

Последовательность сегментов пути

❗️❗️❗️ Возвращает строку

Метод path.resolve() превращает последовательность путей или сегментов пути в абсолютный путь.

Данная последовательность путей обрабатывается справа налево, добавляя префикс к каждому последующему пути перед компоновкой абсолютного пути. Например, задана последовательность сегментов пути: /foo, /bar, /baz , вызов path.resolve('/foo', '/bar', 'baz') возвратит /bar/baz.

Если после обработки все данные сегменты абсолютного пути не были сгенерированы, используется текущая рабочая директория.

Путь, полученный в результате, нормализуется и слэши, завершающие его, удаляются, но только если путь не был превращен в путь к корневой директории.

Сегменты нулевого пути игнорируются.

Если не передается сегментов пути, path.resolve() возвращает абсолютный путь к текущей рабочей директории.

⭕️ Выпадает ошибка TypeError, если любой из аргументов не является строкой.


```jsx
path.resolve('/foo/bar', './baz')
// Возвращает: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/')
// Возвращает: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')
// если текущая рабочая директория /home/myself/node,
// Возвращает '/home/myself/node/wwwroot/static_files/gif/image.gif'
```