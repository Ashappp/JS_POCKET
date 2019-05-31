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

<!-- ### Директивы

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
``` -->
