### Routing

В DOM API нам будут нужны объекты

- history
- location
- match

Данные URL находится в объекте location.

### Routing

React Router - библиотека для управления роутингом в приложении, использует Контекст, которым мы оборачиваем App

React Router - это маршрутизатор который использует JSX

#### Структруа URL-строки

![pic](http://i.piccy.info/i9/08993c8e4dda4bec6b24fa3cad594e76/1552566771/31000/1307368/url.png)

Url адрес должен соответствовать тому, что отображено на странице.

- **https://**- протокол

- **mysite.com/** - хост

- **books/e3q76gm9lzk** - путь, то где мы находимся в приложении

- **e3q76gm9lzk** - url-параметр. Параметры бывают динамическими или статическими

- **? **- символ начала строки запроса

- **?category=adventure&status=unread** - строка запроса

- **category=adventure** - пара параметр=значение

- **&** - символ "И", разделяет параметры строки запроса

- **#comments** - якорь (хеш), определяет положение на странице

#### Типы history

История нашего хождения по ссылкам находится в объекте history

**Browser history** - использует HTML5 history API

#### Особенность browserHistory

При использовании такой истории, контент-сервер на любой запрос должен отдавать index.html, а управление маршрутизацией берет на себя React Router.

Если используется кастомная сборка webpack, то для devServer необходимо указать свойство **historyApiFallback: true**

## React Router

[Github](https://github.com/reach/router)

[Документация](https://reacttraining.com/react-router/web/guides/philosophy)

Предоставляет API (набор компонентов) для управления частями URL-строки и отображения различных компонетов в зависимости от текущего ее состояния.

Разбит на пакеты для различных платформ, нас интересует **react-router-dom**.

```jsx
npm i react-router-dom
```

В React Router есть три типа компонентов:

- компонент маршрутизатора,
- компоненты согласования маршрутов
- компоненты навигации.

### BrowserRouter

[Документация](https://reacttraining.com/react-router/web/api/BrowserRouter)

В основе каждого одностраничного приложения стоит маршрутизатор.

BrowserRouter - компонент для создания роутера, использует HTML5-историю (pushState, replaceState и popstate), чтобы синхронизировать интерфейс с URL-адресом.

Используя контекст, передает данные о текущем URL всему поддереву компонентов.

```jsx
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector("#root")
);
```

### Route

[Документация](https://reacttraining.com/react-router/web/api/Route)

Route - компонент который сопостоавляет строку которую мы передали в path="..." и с тем что находится в **location.pathname**

```jsx
import React from "react";
import { Route } from "react-router-dom";

const App = () => (
  <div>
    <Route path="/" exact component={Home} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
  </div>
);
```

Когда location.pathname === '/about', первый и третий рауты ничего не отрендерят, а второй отрендерит компонент About.

Согласование маршрута выполняется путем **сопоставления пропа path и текущего значения location.pathname**.

**Если значение location.pathname начинается** на указанный пусь в path, **<Route> отрендерит указанный компонент**, в противном случае отрендерит null.

<Route> без указанного path всегда рендерит компонент.

<Route> можно использовать в **любом месте где необходимо отображать контент** на основе текущего местоположения.

Проп **exact** указывает на необходимость **точного совпадения path и location.pathname**.

### Switch

Switch - используется для группировки <Route>. Возвращает **ПЕРВОЕ СОВПАДЕНИЕ**

Отрисует первый маршрут, path которого заматчился текущему location.pathname.

```jsx
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const App = () => (
  <div>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      // если не передается проп path то этот раут будет срабатывать всегда
      <Route component={PageNotFound} />
    </Switch>
  </div>
);
```

### Redirect

[Документация](https://reacttraining.com/react-router/web/api/Redirect)

Eсли ничего не заматчилось то switch заматчит компонент Redirect, который перенаправит туда, что описано в пропсе to='/'

```jsx
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Redirect to="/" />
    </Switch>
  </div>
);
```

### Link и NavLink

Для создания ссылок используем **<Link>** и **<NavLink>** . Оба компонента после компиляция возвращают тег <a>

Link

[Документация](https://reacttraining.com/react-router/web/api/Link)

```jsx
    <Link to="/books">Books</Link>
    <Link to="/books?category=adventure#treasure-island">Adventure Books</Link>
```

В пропсе to передаем

- href ссылки
- или объект со следующими (необязательными) свойствами:
  - pathname - строка, путь для ссылки
  - search - строковое представление параметров запроса
  - hash - хэш для добавления в конец URL
  - state - объект, который будет записан в location.state после перехода по ссылке

```jsx
<Link
  to={{
    pathname: "/books",
    search: "?category=adventure",
    hash: "#treasure-island",
    state: { from: "/dashboard" }
  }}
/>
```

NavLink

[Документация](https://reacttraining.com/react-router/web/api/NavLink)

<Link> тоже ссылка, c **дополнительными стилями**, если текущий URL совпадает со значением пропа to.

- **activeClassName** - строка классов для объеденения с className когда элемент активен. Добавляется к className когда будет активный, селектор описываем в .css

- **activeStyle** - объект инлайн стилей для добавления к элементу когда он активен.

- **exact** - когда true, активные классы/стили будут применяться только в том случае, если местоположение точно совпадает со значением пропа to.

```jsx
<NavLink to="/books" className="link" activeClassName="active">
  Books
</NavLink>
```

### Route в деталях

<Route> может отрисовать компонент следующими способами:

- component

- render

- children

**В одном <Router> можно использовать только один из них.**

В основном используется способ с `component={<ComponentName />}`.

#### component

Используется когда есть готовый компонент и его необходимо отобразить **без передачи дополнительных props**.
Для создания компонента используется React.createElement.

```jsx
// Хорошо
<Route path="/about" component={About} />

// Так НИКОГДА не делать!!!
<Route path="/about"
       component={ props => <About {...props} extraProp="amazing prop" />} />
```

Использование React.createElement означает, что если вместо ссылки на компонент будет передана
анонимная функция, для каждого ре-рендера будет создан новый компонент.
Это приведет к размонтированию существующего компонента и добавлению нового, вместо обновления существующего компонента.

#### render

Используется тогда, когда компоненту необходимо передать дополнительные пропы от <Route>.

```jsx
// Хорошо
<Route path="/about" render={() => <div>About Page</div>} />
// Хорошо
<Route path="/about" render={props => <About {...props} extraProp="amazing
prop" />} />
```

Рендер-пропс, отрендерит компонент с переданными пропами от <Route> и дополнительными, которые мы передадим

### Route props

[Документация](https://reacttraining.com/react-router/web/api/Route/route-props)

Проры, которые нам предоставляет <Route> это объекты **match, location и history**.

- match

Объект, содержит информацию **о том, как path заматчился с URL**.

Содержит следующие свойства:

- **params** - объект пар ключ:значение, соответствующих динамическим параметрам URL

- **isExact** - true/false буль, указыват на точное соотвествие path и URL

- **path** - строка, ПАТТЕРН пути на который замачился <Route path=''>. **Используется для создания вложенных маршрутов.**

- **url** - строка, совпавшая часть URL-адреса.
  **Используется для создания вложенной навигации**.

- location

Объект, поля которого **описывают текущее местоположение**, путь куда будет произведен переход и откуда пришли на текущий маршрут.

```jsx
{
 key: 'ac3df4',
 pathname: '/books'
 search: '?sortby=latest',
 hash: '#comments',
 state: {
	from: '/login'
	}
}
```

- history

history Объекты обычно имеют следующие свойства и методы:

- **length** - (число) Количество записей в стеке истории

- **action**- (строка) текущее действие ( PUSH, REPLACEили POP)

- **location**- (объект) Текущее местоположение.

  Может иметь следующие свойства:

  - **pathname** - путь URL
  - **search** - Строка запроса URL
  - **hash** - Фрагмент URL-хэша
  - **state**- специфичное для местоположения состояние, которое было предоставлено, например, push(path, - - state) когда это местоположение было помещено в стек.

Доступно только в браузере и истории памяти.

- **push**(path, [state]) - (функция) Добавляет новую запись в стек истории

- **replace**(path, [state]) - (функция) Заменяет текущую запись в стеке истории

- **go**(n)- (функция) Перемещает указатель в стеке истории по nзаписям

- **goBack**() - (функция) Эквивалентно go(-1)

- **goForward**() - (функция) Эквивалентно go(1)

- **block**(prompt)- (функция) Предотвращает навигацию (см. историю документов )

### withRouter()

Это HOC кмпонент высшего порядка, он **позволяет передать компоненту все свойства <Route>** аналогично методу рендер-пропс <Route>

```jsx
import React from 'react';
import {withRouter} from 'react-router-dom'

const Header = ({match, location,history}) => {
  return (
        // в теле компонента доступны пропы компонента <Router />
  )
}
// передаем все пропы компонента <Router /> компоненту  <Header /> используя HOC withRouter
export default withRouter(Header);
```

### Dynamic Routing

Компонент который отрисовывется через Route получает прицепом в пропс такие поля как history, match, location.

Для создания вложенной навигации будем использовать match а именно его поле url

Нужно объявить path у Route как динамический :

То, что написали после : будет добавлено как поле в объект match.params , а его значением будет

```jsx

// Для ссылки. которая будет вести на динамический путь нужно указать после слеша какой отличительный признак будет у url, обычно это id статьи или категория , заголовок статьи

// Эти данные должны быть доступны в компоненте, как пропсы или как данный которые вычислены на основании других данных, например после отфильтровки или других параметров


<Link to={`news/${newId}`} /> // направит к примеру на news/news-55
<Link to={``} />

После формирования Link нужно написать Route и объявить его как динамический.

<Route path="news/:id" />
// или используя данные с объекта match если мы пришли с другого route и получили его props
<Route path={`${match.path}/:id}` />

```

Пример отрисовки отдельной статьи 📌📌📌📌📌📌📌📌📌📌

```jsx
// MAIN  -------------------------------

const Main = () => {
  return (
	<Switch>
// Обязательно добавить exact чтобы Switch дошел до динамического Route
	    <Route exact path='/' component={All}/>
// Объявили что есть динамический путь, который будет отрисовываться в SinglePage
        <Route  path='/:id' component={SinglePage} />
    </Switch>
  )
}
⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️

//   ALL  -------------------------------
//  Получаем все новости и размножаем их возвращая компоненты NewsItem
const All = ({news}) => {
    return (
        <div className='news'>
            {news.map(el => <NewsItem key={el.url} data={el}/>)}
        </div>
    );
};
const MSTP = state => ({
    news: state.news,
	})

⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️

// NEWSITEM -------------------------------
// В пропсе в data лежат данные для отрисовки одной статьи
const NewsItem = ({data}) => {
	return (
		<div className = 'news__item'>
				<img src={data.urlToImage} alt={data.author} className = 'news__img'/>
				<h2 className = 'news__title'>{data.title}</h2>

// Помещаем ссылку для чтения статьи в отдельном компоненте, передав динамическим параметром дату публикации статьи
				<NavLink className='news__btn' to= {`/${data.publishedAt}`}>Читати</NavLink>
		</div>
	);
};

⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️

// SINGLEPAGE  -------------------------------

const SinglePage = ({news,match}) => {

// Получаем из стейта массив статей , и фильтруем только ту , по которой кликнули.
// Параметр отбора будет доступен через поле params объета match в поле ID которого записалось значение которое мы передали как динамическое в компоненте ВЫШЕ в NavLink
const data = news.find(el=> el.publishedAt === match.params.id)

    return (
			<div className='article'>

			<NavLink to="/"> На главную </NavLink>

// Подставляем значения из НАЙДЕННОЙ статьи

					<img src={data.urlToImage} alt={data.title} className='article-img'/>
					<h2 className='article-title'>{data.title}</h2>
					<p className='article-text'>{data.description}</p>

					<a href={data.url} target='_blank' className='article-link'>Читати на сайті</a>
			</div>
    );
};

const mstp = (state) => ({
    news: state.news,
})

```

### Хождение по истории

Если нужно вернутья или перейти на кокретную страницу, то можно в объект history запушить новую страницу, после чего осуществится переход

```jsx
<button onClick={() => this.props.history.push("/news")}> назад </button>
```

Можно передавать дополнительные параметры при клике через поле state , которое находится в объекте location.

Например можно записывать откуда мы пришли

Для этого деструктуризируем в пропс Link to объект location, у которго есть поля такие как pathname и state. В pathname запишем путь а в state запишем дополнительное поле from с предыдущим значением объекта location

```jsx
<Link to={{
	pathname : `news/${newId}`,
	state: {
		from: this.props.location
		}
}}
```

Таким образом когда мы перейдем по линку, в компонете в пропсах будет доступно прошлое значение объета location, которым можно восользоваться с целью обратного перехода

```jsx
// функция для хождения НАЗАД
goBack = ()=> {
деструктуризируем в переменную state поле state из объекта location, который доступен в props компонента
	const {state} = this.props.location;
пушим в history предыдуший путь, который лежит в объекте location.state.from
this.props.history.push(state.from)
}

```

---

### Дополнительные материалы

[Build your own React Router v4 ](https://tylermcginnis.com/build-your-own-react-router-v4/)

[Animated page transitions with React Router](https://hackernoon.com/animated-page-transitions-with-react-router-4-reacttransitiongroup-and-animated-1ca17bd97a1a)

[video](https://www.youtube.com/watch?v=chAJ61qxrz0&feature=youtu.be)
