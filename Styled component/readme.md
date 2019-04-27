Для использования ставим npm пакет

```js
npm i styled-component
```

Затем импортируем там где пишем стили

```jsx
import styled from "styled-components";
```

ИСПОЛЬЗОВАНИЕ

### Обычная_стилизация.

Создаем компонент , записываем в поле styled тот html тег который появится в разметке
Открываем бэктики и пишем обычный css

```jsx
const Button = styled.button`
  padding: 25px;
  background-color: palevioletred;
  border: none;
  margin: 20px;
`;
```

### С*использованием*переменных

Можно использовать переменные подобно SASS. для етого вставляем их используя стандартную втавку JS `${...}`

```jsx
let size = 12;
let colorRegular = "#ccc";

const Button = styled.button`
  padding: 25px;
  margin-bottom: ${size}px;
  background-color: palevioletred;
  border: none;
  margin: 20px;
  color: ${colorRegular};
`;
```

### Ховер

Если ховер пишем на сам елемент, ТО синтаксис подобно scss.
&:hover{....}

```jsx
const Title = styled.h2`
  background-color: aquamarine;
  width: 200px;
  &:hover {
    font-size: 70px;
    transition: 0.5s;
  }
`;
```

Если ховер на должен отработать на другом елементе то нужно вставить тот компонент или елемент на котором должны проихойти изменения

```jsx
// При наведении на родителя стили сработают

const Controls = styled.div`
  //на компоненте Buttom
  &:hover ${Button} {
    background-color: #ccc;
  }

  // на елементе h2
  &:hover h2 {
    width: 400px;
  }
`;
```

### Наследование_стилей

Если необходимо наследовать стили от другого компонента, то следует передать этот компонент в метод styled(...), а в бектиках пишем уже если нужно переопределить или добавить что то

```jsx
// Наследуемся от компоненты Button и переопределям только цвет шрифта
const Cancel = styled(Button)`
  color: "#fff";
`;
```

### Стили*по*селекторам*для*вложенных_елементов

Чтобы не создавать новый styled компонент, можно в родительском css styled блоке писать правила для вложенных елементов, по селектору (класса, тега)

```jsx
// Родительский блок
const Appheader = styled.header`
  padding: 10px;
  text-align: center;
  // селектор дочернего елемента, можно и по селектору тега span
  .color {
    background-color: yellow;
    border: 2px solid #000;
    font-weight: 800;
  }
`;

//---------
<Appheader>
  <span className="color">App header</span>
</Appheader>;
```

### Глубокое_наследование

Ссылка на компонент с потрохами и переназначение стилей.

Выбираем компонент который хотим наследовать, передаем ему в props className и назначаем его в оберточном елементе. Пустой className нужен ВЕРОЯТНО для того чтобы react не назначал свой

```jsx
const Description = ({ className }) => (
  <div className={className}>
    <p>Some text</p>
    <span>description</span>
  </div>
);
```

Создаем копию вызвав метод styled куда передаем наследуемый компонент. в бэктиках переназначаем если необходимо стили для каждго из елементов можно отдельно

```jsx
const SubDescription = styled(Description)`
  p {
    padding: 0 30px;
    font-weight: 700;
  }
  span {
    color: blue;
  }
`;
```

### Media_Queries

В `` указываем директиву @media и погнали. Можно внутри указывать компонент и назначать стили для нее

```jsx
/
const Controls = styled.div`
  button {
    background-color: palevioletred;
    &:hover {
      background-color: green;
    }
  }
// Начиная с минимальной ширины сработают правила
  @media (min-width: 768px) {
    background-color: purple;
// также можно выбирать отдельно для компоненты
    ${Button} {
      color: green;
    }
  }
`;

```

### СSS_helper

Можно напистаь переменную миксин/хелпер и использовать ее в стилях компонента.

- если хелпер это просто набор css правил то пишем без вызова метода css
- если в хелпере будут вызываться функции или динамически подставляться пропсы, тогда нужно заимпортить css модуль из styled-component

```jsx
import styled, { css } from "styled-components";
```

Cоздадим хелпер который центрирует блок. Также сделаем возможным изменять положение блока например по вертикали, передав туда данные, которые получим из пропсов

```jsx
// CSS HELPERS
const centered = css`
  position: absolute;
  top: ${({ top }) => top + "%"};
  left: 50%;
  transform: translate(-50%, -50%);
`;
```

Используем этот хелпер например в медиаправилах.

```jsx
// кнопка
const Button = styled.button`
  padding: 25px;
  background-color: palevioletred;
  border: none;
  margin: 20px;
  color: ${fontColor};
  // при минимальной ширине 900 пикселей к кнопке применится наш хелпер
  @media (min-width: 900px) {
    ${centered};
  }
`;
```

### Global_Styles

Для установки глобальных стилей, типа нормализации, шрифтов и т.п необходимо

- импортировать createGlobalStyle из styled-components

```jsx
import { createGlobalStyle } from "styled-components";
```

- в корне scr создать файл например Globalstyles

- в файле создать переменную, куда прописать все глобальные стили

```jsx
const GlobalStyle = createGlobalStyle`
*{
    box-sizing:border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: Monospace,  sans-serif; 
  background-color: #ccc;
}`;
```

- произвести экспорт переменной

```jsx
export default GlobalStyle;
```

- заимпортить переменную в App компоненте и поместить ее в конец компоненты

```jsx
import React from "react";
import Header from "./Header";
// global styles
import GlobalStyle from "./GlobalStyles";

function App() {
  return (
    <div className="App">
      <Header />
      <GlobalStyle />
    </div>
  );
}

export default App;
```

### HOC_Styled

Использование styled hoc - оборачиваем созданный компонент , стилизуем его и експортируем дальше

Создадим компонент. Нужно не забыть заглушить поле className чтобы гарантированно поставились НАШИ стили.

```jsx
import React from "react";
import styled from "styled-components";

const Footer = ({ className }) => {
  return (
    <footer className={className}>
      <p>This is footer app</p>
    </footer>
  );
};
```

Обернем его в styled HOC и зададим стили для всего блока и для вложенных также

```jsx
export default styled(Footer)`
  padding: 10px;
  background-color: aquamarine;
  p {
    text-align: center;
  }
`;
```
