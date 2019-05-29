## graphQL - язык для взaимодейтсвия с сервером для получения данных

1. Инициализируем проект и ставим пакеты

```js
npm  i cors express express-graphql graphql nodemon
```

2. Поднимаем сервер

```js
const express = require("express");
// перехватывает запросы и обрабатывает их
const graphqlMiddleware = require("express-graphql");

const app = express();
const port = 3005;

// обрабатываем все запросы на роут /graphql
app.use("/graphql", graphqlMiddleware({}));

// дефолтная обработка запроса
app.get("/", (req, res) => {
  res.send("GRAPH");
});

// запускаем сервер
app.listen(port, err => (err ? console.log(err) : console.log("SERVER START")));
```

3. Схема.

```js
// Создадим файл schema.js

const qraphql = require("graphql");

const { GraphQLObjectType, GraphQLString } = qraphql;

// GraphQLObjectType - описываем данные хранящиеся в базе
// - это ф-ция которая принимает объект
// содержит поле name и метод fields который возвращает объект с данными

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});
```

4. Запрос

В том же файле schema.js ниже

```js
// корневой запрос.
// Создаем новый объект который описывает запрос
const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      // какие аргументы принимает запрос. в этом случае принимает только поле id
      args: { id: { type: GraphQLString } },
      // в методе resolve описываем данные которые должны вернуться
      resolve(parent, args) {}
    }
  }
});

// экспортируем запрос. поместив в поле exports новый объект созданный GraphQLSchema
// и поместив туда поле query со значением Query-объекта запроса который создали ранее
module.exports = new GraphQLSchema({
  query: Query
});
```

5. Импорт в app.js

```js
const express = require("express");
const graphqlMiddleware = require("express-graphql");
const schema = require("../schema/schema");

const app = express();
const port = 3005;

// поместим schema в перехватчик
app.use(
  "/graphql",
  graphqlMiddleware({
    // объект описывающий запрос
    schema,
    // графический интерфейс
    graphiql: true
  })
);
```

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

graphQl = посылает http запрос (один маршрут для всех типов запроса) на gql сервер -> database -> clien

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

Пример запросов с использованием fragment

```js
query{
  graphql: repository(owner: "facebook", name: "graphql") {
    ...repoDetails
  }
  react: repository(owner: "facebook", name: "react") {
   ...repoDetails
  }
}

<!-- Определяем шаблон полей запроса -->

fragment repoDetails on Repository {
  name
  description
  createdAt
  homepageUrl
  id
  languages(first: 5) {
    nodes {
      name
    }
  }
}

```

### Переменные.

Пишутся через `$varname : vartype` также можно добавить `!` обязательна ли переменная иили нет

Объявим переменные owner и name, которые используем в как параметры в запросе

variables={
"owner" : ""facebook,
"name" : "react"
}

```js
query GetRepos($owner: String!, $name: String!) {
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
  languages(first: 5) {
    nodes {
      name
    }
  }
}
```

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
