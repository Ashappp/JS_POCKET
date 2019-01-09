WEBPACK
- [Запуск](#Запуск)
- [Установка](#Установка)
- [Структура](#Структура)
- [Пакеты](#Пакеты)
  - [Babel](#babel)
  - [HTML](#HTML)
  - [CSS](#CSS)
  - [Mini CSS](#Mini_CSS)
  - [SCSS](#SCSS)
  - [Post CSS](#PostCSS)
  - [Clean](#Clean)
  - [Image](#IMAGE)
  - [Babel polyfill](#Babel_polyfill)
  - [Devserver](#DEVSERVER)
------------


Настройка

[Webpack 4: практические рекомендации по настройке](https://tproger.ru/translations/configure-webpack4/)

[Guide to Webpack 4 and Module Bundling](https://www.sitepoint.com/beginners-guide-webpack-module-bundling/)

[Webpack : Getting Started](https://webpack.js.org/guides/getting-started/)

------------

Линки

[Webpack оф.сайт](https://webpack.js.org/)

[Документация webpack](https://webpack.js.org/concepts/)

------------

Webpack - это менеджер модульных зависимостей, сборщик модулей.
Webpack анализирует ваше дерево зависимостей, создает для них модули и объединяет всю сеть в управляемые выходные файлы.
Он так же позволяет разработчикам использовать CommonJS, AMD или ES6 модули.
Webpack можно научить трансформировать все ваши ресурсы, такие как HTML и CSS, и даже изображения. Он может дать вам больше контроля над количеством HTTP-запросов создаваемых приложением итд. Webpack также позволяет легко использовать npm-пакеты.

#### Основные понятия Webpack 4
 - точка входа **entry**
 - точка вывода, загрузчики (лоадеры) 
 - плагины. 
 
**Точка входа (entry)**
Это  .js файл в котором производится import других необходимых файлов и пишется основная логика

**Точка вывода (output)**
Это  папка build/ или dist/ или wateveryounameit/ папка, где будет размещен конечный .js файл. Это ваш окончательный результат, который впоследствии будет загружен в index.html.

**Загрузчики (loaders)**
В основном компилируют или транспилируют ваш код, например, postcss-loader будет проводить ваши стили через разные плагины.

**Плагины (plugins)**
Играют жизненно важную **роль в выводе кода в файлы**.

### 1. Запуск
Создаем папку с именем проекта и переходим в нее.
В консоли запускаем пакетный менеджер npm

```javascript
// флаг -y ставит значения по умолчанию и создает новый проект
npm init -y 
```

### 2. Установка 
Установим Webpack

```javascript
// ставим два пакета, сам вебпак и его консольную версию  webpack-cli
npm i --save-dev webpack webpack-cli
```

### 3. Структура 

В структуре проекта создаем папку  SRC, которая будет основной и где будут лежать рабочие файлы проекта такие как** index.js** файл стилей **style.cs**s, html шаблон **index.html** и т.д. из которых будет компилироваться проект в папку build

**3.1** Создадим файл **index.js** который является корнем проекта

**3.2** В папке src создаем файл **webpack.config.js**, который является основным для webpack, и управляет пакетами проекта
```javascript
// модуль который будет содержать адрес/путь проекта на жестком диске
const path = require('path');

module.exports = {
  entry: './src/index.js', // точка входа
  output: {
  // в какую ПАПКУ разместить  скомпилированный файл
    path: path.resolve(__dirname, 'имя папки'), 
    filename: 'имя_файла.js' //  в какой ФАЙЛ записать  
  }
}; 
```

**3.3**. В основном файле настроек проекта** package.jso**n напишем **Npm скрипты**

```javascript
// --mode development режим разработки
// --mode production  режим продакшн
"scripts": {
    "start": "webpack --mode development",
    "build": "webpack --mode production" 
}
```
### 4. Пакеты

#### Babel
Ставим транспайлер Babel. Переводит современный код в код который поддерживается всеми браузерами

```javascript
// babel-core - основной пакет
// babel-core загрузчик для webpack
// пресет для babel - для обработки самого последнего синтаксиса языка и новых фичей
npm install babel-core babel-loader babel-preset-env --save-dev 
```

- создаем в **папке src** файл настроек для babel  **.babelrc**, где пропысываем пресеты
```javascript
{
    "presets": ["env"]
}
```
- Для того чтобы заработал babel, нужно добавить его в  файл настроек webpack в **module**
- **module** - это объект, который описывает набор правил для наших загрузчиков

```javascript 
const path = require('path');

module.exports = {
  entry: './src/index.js',  
  output: {
    path: path.resolve(__dirname, 'имя папки'), 
    filename: 'имя_файла.js'  
  },
  module: {
//массив загрузчиков
  	rules: [ 
	{
		test: /\.js$/, // отбираем только с расширением.js 
        exclude: /node_modules/, //игнор папке node_modules 
        use:  ["babel-loader"], // используй загрузчик babel-loader
      }
    ]
  } 
}; 
```

------------


#### HTML 
 Создадим и добавим файл index.html в рабочую папку SRC.
 Чтобы использовать этот файл в качестве шаблона, нам понадобится html-плагин **HtmlWebpackPlugin** .

О плагине

[Github плагина](https://github.com/jantimon/html-webpack-plugin)
[HABR](https://habr.com/post/350886/)

```javascript
npm install html-webpack-plugin --save-dev
```

- После установки плагина нужно **добавить его в файл настроек webpack** в верхней части 

```javascript 
const path = require('path');
 // подключаем плагин
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',  
  output: {
    path: path.resolve(__dirname, 'имя папки'),  
    filename: 'имя_файла.js' 
  },
  module: {
    rules: [
      { 
        test: /\.js$/,  
        exclude: /node_modules/, 
        use:  ["babel-loader"],
      }
    ]
  },
// поле для плагинов
  plugins: [ 
      new HtmlWebpackPlugin({ 
      hash: true,
      template: './src/index.html', // откуда взять файл для обработки
      filename: 'index.html' // имя файла который нужно будет создать
    })
  ] 
}; 
```
**Теперь наш файл из ./src/index.html стал шаблоном для конечного файла index.html, котрый будет в билде(основной сборке).**

------------


####  СSS
Создаем style.css в нашей папке ./src И сразу сделаем **импорт в src/index.js**

```javascript
import './style.css'
```

**CSS** по умолчанию не поддерживается, поэтому необходимо установить **загрузчик** для него.

```javascript 
// style-loader - берет css и инлайнит его в <head> в теге <style>
// css-loader - загрузчик для css файлов
// sass-loader - загрузчик для sass файлов
// node-sass - для преобразования sass в css 

npm install --save-dev style-loader css-loader sass-loader node-sass
```
- Нужно **добавить** загрузчики в **файл настроки webpack**

```javascript 
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
  entry: './src/index.js',  
  output: {
    path: path.resolve(__dirname, 'имя папки'),  
    filename: 'имя_файла.js' 
  },
  module: {
    rules: [
      { 
        test: /\.js$/,  
        exclude: /node_modules/, 
        use:  ["babel-loader"],
      },
      {
// проверяем все файлы которые с расширением .css
        test: /\.css$/, 
// игнорируем все  что в node_modules
        exclude: /node_modules/,  
// справа налево указываем какими загрузчиками их обрабатывать 
        use: ["style-loader", "css-loader"]  
      }
    ]
  }, 
  plugins: [ 
      new HtmlWebpackPlugin({ 
      hash: true,
      template: './src/index.html',  
      filename: 'index.html'  
    })
  ] 
}; 
```

------------

#### Mini_CSS
mini-css-extract получает файл css и компилирует его в папку build

[Github плагина](https://github.com/webpack-contrib/mini-css-extract-plugin)

```javascript
npm install --save-dev mini-css-extract-plugin
```

После установки 
- прописываем его в файл настроки webpack в верхней части где мы подключали предыдущие плагины 
- прописать его в качестве лоадера для CSS
- прописать его в массив плагинов

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');  

// подключили плагин MiniCssExtractPlugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.js',  
  output: {
    path: path.resolve(__dirname, 'имя папки'),  
    filename: 'имя_файла.js' 
  },
  module: {
    rules: [
      { 
        test: /\.js$/,  
        exclude: /node_modules/, 
        use:  ["babel-loader"],
      },
      { 
        test: /\.css$/,  
        exclude: /node_modules/, / 
// добавили лоадер MiniCssExtractPlugin.loader
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader"]  
      }
    ]
  },
//
  plugins: [ 
      new HtmlWebpackPlugin({ 
      hash: true,
      template: './src/index.html',  
      filename: 'index.html'  
    }),
// добавили в плагины
    new MiniCssExtractPlugin({
      filename: 'style.css', // файл в рабочей папке src
    }),
  ] 
}; 
```

------------


#### SCSS 

Создаем style.scss в нашей папке ./src  И сразу сделаем **импорт в src/index.js**

```javascript
import './style.css';
// импорт style.scss
import './style.scss'
```
Установим пакет
```javascript  
// sass-loader - загрузчик для sass файлов
// node-sass - для преобразования sass в css 

npm install --save-dev sass-loader node-sass
```

После установки 

- прописываем его в файл настроки webpack в верхней части где мы подключали предыдущие плагины 
- прописать его в качестве лоадера для CSS
- прописать его в массив плагинов

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');  

// подключили плагин MiniCssExtractPlugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.js',  
  output: {
    path: path.resolve(__dirname, 'имя папки'),  
    filename: 'имя_файла.js' 
  },
  module: {
    rules: [
      { 
        test: /\.js$/,  
        exclude: /node_modules/, 
        use:  ["babel-loader"],
      },
      { 
        test: /\.css$/,  
        exclude: /node_modules/, /   
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader"]  
      },
// ОБЪЯВИЛИ
       { 
        test: /\.scss$/,  
        exclude: /node_modules/, / 
// добавили лоадер , ПОСЛЕ css-loader
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]  
      }
    ]
  },
//
  plugins: [ 
      new HtmlWebpackPlugin({ 
      hash: true,
      template: './public/index.html',  
      filename: 'index.html'  
    }), 
    new MiniCssExtractPlugin({
      filename: 'style.css',  
    }),
  ] 
}; 
```

#### PostCSS

PostCSS предоставляет разные возможности нам **autoprefixer**, **cssnano/cleancss** (оптизицация размера css файла) и пр.

[Post CSS Wikipedia](https://ru.wikipedia.org/wiki/PostCSS)
[Github плагина](https://github.com/postcss/postcss)
[Каталог PostCSS плагинов](https://www.postcss.parts/)

Установим например  **autoprefixer**

```javascript
// postcss-loader
// autoprefixer
npm install postcss-loader autoprefixer --save-dev 
``` 

После установки   

- создать в рабочей папке **SRC** файл конфигурации **postcss.config.js** , где указать что нам для работы необходим плагин **autoprefixer**

```javascript
module.exports = {
    plugins: [require('autoprefixer')];
}
```

- **прописываем** его в файл конфигурации webpack ** в загрузчики css и scss. **
- поскольку post-css может рабоать только с .css файлами, то нужно в массиве загрузчиков **CSS ставить его первым**, а если мы работаем с **SCSS** то указываем его **ПОСЛЕ sass-loader НО перед css-loader**

 
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.js',  
  output: {
    path: path.resolve(__dirname, 'имя папки'),  
    filename: 'имя_файла.js' 
  },
  module: {
    rules: [
      { 
        test: /\.js$/,  
        exclude: /node_modules/, 
        use:  ["babel-loader"],
      },
      { 
        test: /\.css$/,  
        exclude: /node_modules/, /   
// добавили лоадер , ПЕРЕД css-loader
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]  
      }, 
       { 
        test: /\.scss$/,  
        exclude: /node_modules/, / 
// добавили лоадер , ПОСЛЕ cass-loader НО перед css-loader
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", sass-loader"]  
      }
    ]
  },
//
  plugins: [ 
      new HtmlWebpackPlugin({ 
      hash: true,
      template: './src/index.html',  
      filename: 'index.html'  
    }), 
    new MiniCssExtractPlugin({
      filename: 'style.css',  
    }),
  ] 
}; 
```
  
####  Clean
Чтобы перед перегенерацией файлов очистить нашу билд папку ./build используем плагин clean-webpack-plugin

[Github плагина](https://github.com/johnagan/clean-webpack-plugin)

```javascript
npm i clean-webpack-plugin --save-dev
```

После установки 
- добавляем его в файле конфигурации как необходимый 

- добавляем в поле plugins

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// добавляем как необходимый плагин
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',  
  output: {
    path: path.resolve(__dirname, 'имя папки'),  
    filename: 'имя_файла.js' 
  },
  module: {
    rules: [
      { 
        test: /\.js$/,  
        exclude: /node_modules/, 
        use:  ["babel-loader"],
      },
      { 
        test: /\.css$/,  
        exclude: /node_modules/, /  
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"] 

      }, 
       { 
        test: /\.scss$/,  
        exclude: /node_modules/, /  
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", sass-loader"] 

      }
    ]
  },
//
  plugins: [ 
// добавляем сюда
      new CleanWebpackPlugin('build'),
      new HtmlWebpackPlugin({ 
      hash: true,
      template: './src/index.html',  
      filename: 'index.html'  
    }), 
    new MiniCssExtractPlugin({
      filename: 'style.css',  
    }),
  ] 
}; 
```

#### IMAGE 
Для загрузки картинок  нужен лоадер **file-loader**

```javascript
npm install --save-dev file-loader
```

После установки 
- импортируем в коневой файл src/index.js

```javascript
import './style.css'; 
import './style.scss';

//импортируем 
import imageUrl from './имя_папки/имя_файла.png';
```
- добавляем в конфиге webpack в поле modules в массив правил

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',  
  output: {
    path: path.resolve(__dirname, 'имя папки'),  
    filename: 'имя_файла.js' 
  },
  module: {
    rules: [
      { 
        test: /\.js$/,  
        exclude: /node_modules/, 
        use:  ["babel-loader"],
      },
      { 
        test: /\.css$/,  
        exclude: /node_modules/, /  
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]  
      }, 
       { 
        test: /\.scss$/,  
        exclude: /node_modules/, /  
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", sass-loader"]  
      },
// добавляем сюда
      {
// отбираем все .png .svg .jpg .gif
        test: /\.(png|svg|jpg|gif)$/, 
        use: ["file-loader"]
       },
    ]
  },
  plugins: [  
      new CleanWebpackPlugin('build'),
      new HtmlWebpackPlugin({ 
      hash: true,
      template: './src/index.html',  
      filename: 'index.html'  
    }), 
    new MiniCssExtractPlugin({
      filename: 'style.css',  
    }),
  ] 
}; 
```

#### Babel_polyfill
Дает возможность писать по современному стандарту, преобразуя ES6-7-8 в ES5

```javascript
npm install --save babel-polyfill
```

После установки следует  **обновить конфигурацию webpack** и добавить babel-polyfill в поле entry 

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
// изменяем значение entry, теперь это массив значений, читается справо налево
// сперва соберется коневой index.js затем на его основе преобразуется код в ES5
  entry: ['babel-polyfill','./src/index.js'],  // babel <=- index.js
  output: {
    path: path.resolve(__dirname, 'имя папки'),  
    filename: 'имя_файла.js' 
  },
  module: {
    rules: [
      { 
        test: /\.js$/,  
        exclude: /node_modules/, 
        use:  ["babel-loader"],
      },
      { 
        test: /\.css$/,  
        exclude: /node_modules/, /  
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]  
      }, 
       { 
        test: /\.scss$/,  
        exclude: /node_modules/, /  
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", sass-loader"]  
      }, 
      { 
        test: /\.(png|svg|jpg|gif)$/, 
        use: ["file-loader"]
       },
    ]
  },
  plugins: [  
      new CleanWebpackPlugin('build'),
      new HtmlWebpackPlugin({ 
      hash: true,
      template: './src/index.html',  
      filename: 'index.html'  
    }), 
    new MiniCssExtractPlugin({
      filename: 'style.css',  
    }),
  ] 
}; 
```

#### DEVSERVER
Поднимает webserver , для отображения результата разработки 

[Github плагина](https://github.com/webpack/webpack-dev-server)

```javascript
npm install webpack-dev-server --save-dev
```

После установки необходимо в файле-манифесте **package.json** в npm скрипте "start" **добавить значение  "webpack --mode development" и флаг --open**  чтобы открывалось по умолчанию окно браузера

```javascript
"scripts": {
    "start": "webpack-dev-server webpack --mode development --open",
    "build": "webpack --mode production",
}
```

Также нужно **добавить новое поле devServer** для объекта, которое содержит настройки

Про доступные настройки [читаем тут](https://webpack.js.org/configuration/dev-server/)  

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill','./src/index.js'],  
  output: {
    path: path.resolve(__dirname, 'имя папки'),  
    filename: 'имя_файла.js' 
  },
  module: {
    rules: [
      { 
        test: /\.js$/,  
        exclude: /node_modules/, 
        use:  ["babel-loader"],
      },
      { 
        test: /\.css$/,  
        exclude: /node_modules/, /  
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]  
      }, 
       { 
        test: /\.scss$/,  
        exclude: /node_modules/, /  
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", sass-loader"]  
      }, 
      { 
        test: /\.(png|svg|jpg|gif)$/, 
        use: ["file-loader"]
       },
    ]
  },
  plugins: [  
      new CleanWebpackPlugin('build'),
      new HtmlWebpackPlugin({ 
      hash: true,
      template: './src/index.html',  
      filename: 'index.html'  
    }), 
    new MiniCssExtractPlugin({
      filename: 'style.css',  
    }),
  ],
// создаем новое поле 
  devServer: {
    contentBase: DIST_DIR,
    publicPath: '/',
    hot: true,
    historyApiFallback: true,
    noInfo: false,
    quiet: false,
    stats: 'errors-only',
    clientLogLevel: 'warning',
    compress: true,
    port: 9001, // порт можно указать любой
  },  
};  
```









