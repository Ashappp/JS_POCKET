Для использования ставим npm пакет

```js
npm i styled-component
```

Затем импортируем там где пишем стили

```jsx
import styled from "styled-components";
```

ИСПОЛЬЗОВАНИЕ

### Обычная стилизация.

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

### С использованием переменных

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

### Наследование стилей

Если необходимо наследовать стили от другого компонента, то следует передать этот компонент в метод styled(...), а в бектиках пишем уже если нужно переопределить или добавить что то

```jsx
// Наследуемся от компоненты Button и переопределям только цвет шрифта
const Cancel = styled(Button)`
  color: "#fff";
`;
```

### Глубокок наследование/ссылка компоненты с потрохами и переназначение стилей.

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

### Media Queries
