## graphQL - язык для взaимодейтсвия с сервером для получения данных

REST - основаны на эндроинтах и работой с url строкой, где мы передаем все то что нам необходимо через параметры и пути.

- Запрос REST

```js
https://site.com/api/user/1/post/1/comment

https://code.ru/api/post/author/42

```

- Запрос graphQl

```js
query {
    posts(id:1){
        id
        title
        author{
            firstname
            lastname
        }
    }
}
```

#### Как работает

REST = посылает get запрос к базе откуда получает данные

graphQl = посылает http запрос (один маршрут для всех типов запроса) на gql сервер -> database -> client

- get запрос

```
fetch('https://code.ru/graphql?query={post(id:1){...}}')
```

- post запрос

```
fetch('https://code.ru/graphql' , {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		query: `
			{
				posts(id:1){
					id
					title
					author{
							firstname
							lastname
					}
				}
			}
		`
	})
})
```

GQL - используется как посредник между клиентом и сервером, предоставляя единый API.

#### Основные понятия

1. Запрос - то что клиент отправляет на сервер и что хочет получить.

2. Тип - gql типизированный язык.

Перед тем как отправить запрос, нужно определить типы передаваемых полей в запросе

```
type Post{
	id: ID!
	title: String!
	content: String
	author: Author!
	status: Status!
	comment: [Comment]!
}
```

3. Изменение - изменение данных (аналог PUT DELETE UPDATE) ключевое слово mutation

```js
mutation{
	createPost(input:{
		title: "Знакомство с GQL"
		content: "..."
		status: {
			firstname: "Олег"
			lastname: "Попов"
			status: DRAFT
		}
	})
}
```

### В языке запросов GraphQL поля могут быть либо

- скалярными типами,
- типами объектов.

**Скалярные** типы похожи на примитивы в других языках.
Это листья наших выборок. В GraphQL имеется пять встроенных скалярных типов:

1. целочисленные (Int),
2. с плавающей запятой (Float),
3. строки (String), логические (Boolean)
4. уникальные идентификаторы (ID)

**Типы объектов** GraphQL представляют собой группы из одного или нескольких полей, которые вы определяете в своей схеме.
Они устанавливают форму объекта JSON, который должен быть возвращен

# Query

Запрос описывает данные, которые вы хотите получить от сервера GraphQL

Когда вы отправляете запрос, вы запрашиваете единицы данных по полям.

Эти поля отображаются в том же поле в ответе данных в формате JSON, который вы получаете с сервера

Например, если вы отправляете запрос allLifts и запрашиваете поля name и status, вы должны получить ответ в формате JSON, содержащий массив allLifts и строки name и status каждого подъемника, как показано здесь:

```js
query {
  allLifts {
  name
  status
 }
}
```

- Вы можете добавить несколько запросов к документу запроса, но одновременно можно инициировать **только одну операцию**.

Если требуется отправить один запрос всех указанных данных, то нужно поместить все в один и тот же запрос:

```js
query liftsAndTrails {
  liftCount(status: OPEN)
    allLifts {
      name
      status
    }
    allTrails {
      name
      difficulty
    }
}
```

`query` — **это тип GraphQL**.
Мы называем его корневым типом, потому что это тип, который сопоставляется с операцией, а операции представляют собой корни нашего документа запроса.
Поля, доступные для запроса в API GraphQL, определены в данной схеме API.
В документации указывается, какие поля доступны для выбора в типе query.

Когда мы пишем запросы, мы выбираем поля, которые нам нужны, **заключая их в фигурные скобки**.
Эти блоки называются **выборками**.
Поля, которые мы определяем в выборке, напрямую связаны с типами GraphQL.

Ответ в формате JSON содержит все данные, которые мы запросили.

Эти данные форматируются как JSON и поставляются в том же виде, что и наш запрос.

Каждому полю JSON выдается то же имя, что и поле в нашей выборке.

- Мы можем изменить имена полей в объекте ответа в запросе, указав псевдонимы, как показано ниже:

```js
query liftsAndTrails {
  open: liftCount(status: OPEN) // псевдоним open
    chairlifts: allLifts {      // псевдоним chairlifts
    liftName: name              // псевдоним liftName
    status
  }
  skiSlopes: allTrails {        // псевдоним skiSlopes
    name
    difficulty
  }
}
```

Ниже приводится ответ:

```js
{
 "data": {
 "open": 5,
 "chairlifts": [
  {
  "liftName": "Astra Express",
  "status": "open"
  }
  ],
  "skiSlopes": [
  {
  "name": "Ditch of Doom",
  "difficulty": "intermediate"
  }
 ]
 }
}
```

#### Фрагменты

Документ GraphQL-запроса может содержать определения операций и фрагментов. Фрагменты — **это выборки, которые можно повторно использовать** в нескольких операциях

```js
query {
  Lift(id: "jazz-cat") {
    name
    status
    capacity
    night
    elevationGain
    trailAccess {
      name
      difficulty
    }
  }
  Trail(id: "river-run") {
    name
    difficulty
    accessedByLifts {
      name
      status
      capacity
      night
      elevationGain
    }
  }
}
```

Как видно из запроса эти поля повторяются в нескольких выборках

```js
name;
status;
capacity;
night;
elevationGain;
```

Фрагменты создаются с помощью идентификатора `fragment`.

Фрагменты — это выборки определенных типов, поэтому вы должны указать тип, связанный с каждым фрагментом, в его определении.

##### Фрагменты бывают

- именованые
- встроенные

Пример с `встроенными` фрагметами `...on`

```js
query schedule {
  agenda {
    ...on Workout {    // тип Workout
      name
      reps
    }
    ...on StudyGroup { // тип StudyGroup
      name
      subject
      students
    }
  }
}
```

- Пример с `именоваными` фрагментами создаем путем объявления `fragment customName on TypeName` и затем используется в теле запроса

```js
query today {
 agenda {
 ...workout  // именованый фрагмент
 ...study    // именованый фрагмент
 }
}

// именованый фрагмент
fragment workout on Workout {
 name
 reps
}

// именованый фрагмент
fragment study on StudyGroup {
 name
 subject
 students
}
```

Фрагмент в данном примере называется `liftInfo`, и это выборка `Lift`.

```js
fragment liftInfo on Lift {
  name
  status
  capacity
  night
  elevationGain
}
```

Когда нужно добавить поля фрагмента liftInfo в другую выборку, следует указать три точки и имя фрагмента

```js
query {
  Lift(id: "jazz-cat") {
  ...liftInfo   // используем фрагмент
  trailAccess {
    name
    difficulty
    }
  }
  Trail(id: "river-run") {
    name
    difficulty
    accessedByLifts {
    ...liftInfo   // используем фрагмент
    }
  }
}
```

Фрагменты можно сочетать

```js
query {
  allTrails {
  ...trailStatus   // используем фрагмент
  ...trailDetails  // используем фрагмент
  }
}
// фрагмент
fragment trailStatus on Trail {
  name
  status
}

// фрагмент
fragment trailDetails on Trail {
  groomed
  trees
  night
}
```

### Объединения.

Если нужно в одном запросе получать более одного типа, то можно создавать объединения, связывающие разные типы объектов

- Пример с `встроенными` фрагметами ...on

```js
query schedule {
  agenda {
    ...on Workout {    // тип Workout
      name
      reps
    }
    ...on StudyGroup { // тип StudyGroup
      name
      subject
      students
    }
  }
}
```

- Пример с `именоваными` фрагментами

```js
query today {
 agenda {
 ...workout  // именованый фрагмент
 ...study    // именованый фрагмент
 }
}

// именованый фрагмент
fragment workout on Workout {
 name
 reps
}

// именованый фрагмент
fragment study on StudyGroup {
 name
 subject
 students
}
```

Ответ прийдет с теми полями типов которые указали

### Интерфейсы

Интерфейсы — это еще один вариант при работе с несколькими типами объектов, которые могут быть возвращены в одном поле.
При запросе интерфейса мы также можем использовать фрагменты для выборки дополнительных полей при возврате определенного типа объекта

Интерфейс представляет собой абстрактный тип, устанавливающий список полей, которые должны быть реализованы в похожих типах объектов.

```js
query schedule {
  agenda {
    name
    start
    end
    ...on Workout {
      reps
    }
  }
}
```

# Мутации

Mutation — корневой тип данных.
Используются для изменения существующих или добавления новых данных.
Схема API определяет поля, доступные для этого типа.

```js
// создание новой песни
mutation createSong {
  addSong(title:"No Scrubs", numberOne: true) {
  id
  title
  numberOne
  }
}

// пример ответа на данную мутацию
{
 "data": {
  "addSong": {
    "id": "5aca534f4bb1de07cb6d73ae",
    "title": "No Scrubs",
    "numberOne": true
  }
 }
}
```

Мы также можем задействовать мутации для изменения существующих данных.
Предположим, что нам нужно изменить статус канатной дороги «Снежный клык».
Мы могли бы использовать мутацию вот так:

```js
mutation closeLift {
 setLiftStatus(id: "jazz-cat" status: CLOSED) {
  name
  status
 }
}
```

### Переменные.

Пишутся через `$varname : vartype` также можно добавить `!` обязательна ли переменная иили нет

Переменные заменяют статическое значение в запросе, чтобы вместо этого мы могли передавать динамические значения

Объявим переменные owner и name, которые используем в как параметры в запросе

```js
mutation createSong($title:String! $numberOne:Int $by:String!){
 addSong(title:$title, numberOne:$numberOne, performerName:$by){
  id
  title
  numberOne
 }
}
```

# Подписки

Третий тип операции, доступный с помощью GraphQL, — **это подписка**.

Бывают случаи, когда клиент может захотеть получать обновления в реальном времени с сервера.

Подписка позволяет **перехватывать события API GraphQL** для изменения данных в реальном
времени.

Подобно мутации и запросу, **подписка является корневым типом**.

Изменения данных, которые клиенты могут отслеживать, определяются в схеме API как поля под типом `subscription`.

Мы можем отслеживать изменение статуса любого подъемника с помощью подписки:

```js
subscription {
  liftStatusChange {
    name
    capacity
    status
  }
}
```

- Когда мы запускаем эту подписку, мы отслеживаем изменения статуса подъемника

- Когда подписка отправляется на сервер, она отслеживает любые изменения данных

- Чтобы увидеть результат работы подписки нужно отправить мутацию.

# Самодиагностика

Самодиагностика — это возможность запрашивать **детали о текущей схеме API**.
Например, если нужно знать, какие типы GraphQL доступны в нашем API, мы можем просмотреть эту информацию, выполнив запрос \_\_schema,

```js
query {
  __schema {
    types {
      name
      description
    }
  }
}
```

мы видим все типы, доступные в API, включая корневые, пользовательские и даже скалярные.

Если нужны данные определенного типа, мы можем, выполняя запрос \_\_type, отправить имя нужного типа в качестве аргумента:

```js
// Этот запрос на самотестирование показывает нам все поля, доступные для запроса Lift
query liftDetails {
  __type(name:"Lift") {
    name
    fields {
      name
      description
      type {
       name
      }
    }
  }
}
```

# Абстрактные синтаксические деревья

Документ запроса представляет собой строку.
Когда мы отправляем запрос в API GraphQL, эта строка разбирается на абстрактное синтаксическое дерево и проверяется до запуска операции.

- АСД — иерархический объект, представляющий наш запрос.
- АСД — объект, который содержит вложенные поля, представляющие детали GraphQL-запроса.

#### Flow

1. Первым шагом в данном процессе является разделение строки на меньшие части.
   Это включает в себя анализ ключевых слов, аргументов и даже скобок и двоеточий в набор отдельных токенов.
   Такой процесс называется **лексированием или лексическим анализом**.

2. Затем лексированный запрос анализируется в АСД.
   Запрос намного проще динамически модифицировать и проверять в виде АСД.
   Например, ваши запросы начинаются как документ GraphQL.
   Документ содержит хотя бы одно определение, но оно также может содержать и список определений.

**Определения** могут быть только одного из двух типов:

- OperationDefinition

  - query
  - mutation
  - subscription

- FragmentDefinition
  - fragment

Ниже приведен пример документа, который содержит **три** определения — **две операции и один фрагмент**:

```js
query jazzCatStatus {    // OperationDefinition
  Lift(id: "jazz-cat") {  // SelectionSet
    name
    night
    elevationGain
    trailAccess {
      name
      difficulty
    }
  }
}

mutation closeLift($lift: ID!) {  // OperationDefinition
 setLiftStatus(id: $lift, status: CLOSED ) {
 ...liftStatus
 }
}

fragment liftStatus on Lift {    // FragmentDefinition
 name
 status
}
```

**OperationDefinition** может содержать только _один из трех_ типов операций:

- mutation
- query
- subscription

Каждое **OperationDefinition** операции содержит

- OperationType
- SelectionSet (выборка)

**Фигурные скобки**, которые указываются после каждой операции, содержат выборку `SelectionSet`.

Это фактические поля, которые мы запрашиваем вместе с их аргументами.
Например, поле Lift — это SelectionSet для запроса jazzCatStatus, а поле setLiftStatus представляет собой выборку для мутации closeLift.

Выборки вложены друг в друга.

```js
query jazzCatStatus {     // OperationDefinition - query
  Lift(id: "jazz-cat") {  // 1 SelectionSet
    name                  // 2 SelectionSet
    night                 // 2 SelectionSet
    elevationGain         // 2 SelectionSet
    trailAccess {         // 2 SelectionSet
      name                // 3 SelectionSet
      difficulty          // 3 SelectionSet
    }
  }
}
```

Запрос jazzCatStatus содержит **три** вложенные `SelectionSet` (выборки).

1. Первая выборка SelectionSet включает поле Lift.
2. Внутрь вложена выборка SelectionSet, которая содержит поля name, night, elevationGain, trailAccess
3. Ниже поля trailAccess вложена еще одна выборка SelectionSet, которая включает поля name и difficulty

GraphQL может пройтись по этому АСД и проверить его относительно языка GraphQL и текущей схемы.

- Если синтаксис языка запроса правильный, а схема содержит поля и типы, которые мы запрашиваем, выполняется операция.

- Если нет, вместо этого возвращается соответствующая ошибка.

### Директивы

Нужны чтобы указать серверу определенные условия или хотим пропустить какието значения

Пишутся через @include(if : \$varname или другое условие)

```js
query GetRepos($owner: String!, $name: String!, $includeIssues: Boolean!) {
  graphql: repository(owner: $owner, name: $name) {
    ...repoDetails
  }
}

fragment repoDetails on Repository {
  name
  description
  createdAt
  homepageUrl
  id
  issues(first: 10) @include(if : $includeIssues) {
    nodes {
      id
      author {
        login
      }
      body
    }
  }
}
```
