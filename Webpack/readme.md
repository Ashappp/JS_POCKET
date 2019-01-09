


1. Запуск npm
// флаг -y ставит значения по умолчанию и создает новый проект
npm init -y 

2. Ставим Webpack
// ставим два пакета, сам вебпак и его консольную версию 
npm i --save-dev webpack webpack-cli

3. В структуре проекта создаем папку  SRC, которая будет основной и где будут лежать рабочие файлы проекта

    3.1 Создадим файл index.js 

4. В папке src создаем файл webpack.config.js, который является основным, и управляет потоками проекта
```javascript
// модуль который будет содержать адрес/путь проекта на жестком диске
const path = require('path');

module.exports = {
  entry: './src/index.js', // точка входа
  output: {
    path: path.resolve(__dirname, 'имя папки'), // в какую ПАПКУ разместить  скомпилированный файл
    filename: 'имя_файла.js' //  в какой ФАЙЛ записать  
  }
}; 
```

5. В основном файле настроек проекта package.json напишем Npm скрипты

"scripts": {
    "start": "webpack --mode development",
    "build": "webpack --mode production" 
}
6. Ставим транспайлер. Зависимость разработки --save-dev

- Babel- транспайлер. Переводит современный код в код который поддерживается всеми браузерами
// babel-core - основной пакет
// babel-core загрузчик для webpack
// пресет для babel - для обработки самого последнего синтаксиса языка и новых фичей

npm install babel-core babel-loader babel-preset-env --save-dev 

- создаем в папке src файл настроек для babel  .babelrc, где пропымсаем пресеты
```javascript
{
    "presets": ["env"]
}
```
7. Для того чтобы заработал babel, нужно добавить его в  файл настроек webpack в module
- module - это объект, который описывает набор правил для наших загрузчиков

```javascript
// модуль который будет содержать адрес/путь проекта на жестком диске
const path = require('path');

module.exports = {
  entry: './src/index.js', // точка входа
  output: {
    path: path.resolve(__dirname, 'имя папки'), // в какую ПАПКУ разместить  скомпилированный файл
    filename: 'имя_файла.js' //  в какой ФАЙЛ записать  
  },
  module: {
//массив загрузчиков
    rules: [
      {
// тестируем все файлы регуляркой. отбираем только с расширением.js
        test: /\.js$/, 
//исключаем все что лежит в служебной папке node_modules
        exclude: /node_modules/,
// используй загрузчик babel-loader
        use:  ["babel-loader"],
      }
    ]
  }

}; 
```

8. HTML 
 Создадим и добавим файл index.html в рабочую папку SRC. Чтобы использовать этот файл в качестве шаблона, нам понадобится html-плагин.

О плагине

[Github плагина](https://github.com/jantimon/html-webpack-plugin)
[HABR](https://habr.com/post/350886/)

npm install html-webpack-plugin --save-dev

8.1 После установки плагина нужно добавить его в файл настроек webpack в верхней части 
 ```javascript
 
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключаем плагин

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
//
  plugins: [ 
      new HtmlWebpackPlugin({ 
      hash: true,
      template: './src/index.html', // откуда взять файл для обработки
      filename: 'index.html' // имя файла который нужно будет создать
    })
  ]

}; 
```
Теперь наш файл из ./src/index.html стал шаблоном для конечного файла index.html, котрый будет в билде(основной сборке).

9. СSS. Создаем style.css в нашей папке ./src  И сразу сделаем импорт в src/index.js

```javascript
import './style.css'
```

CSS по умолчанию не поддерживается, поэтому необходимо установить загрузчик для него.

```javascript 
// style-loader - берет css и инлайнит его в <head> в теге <style>
// css-loader - загрузчик для css файлов
// sass-loader - загрузчик для sass файлов
// node-sass - для преобразования sass в css 

npm install --save-dev style-loader css-loader sass-loader node-sass
```
9.1 Нужно добавить загрузчики в файл настроки webpack
```javascript
 
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключаем плагин

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
        exclude: /node_modules/, // игнорируем все  что в node_modules
// справа налево указываем какими загрузчиками их обрабатывать 
        use: ["style-loader", "css-loader"] 

      }
    ]
  },
//
  plugins: [ 
      new HtmlWebpackPlugin({ 
      hash: true,
      template: './src/index.html',  
      filename: 'index.html'  
    })
  ]

}; 
```

9.2 Для .... mini-css-extract

[Github плагина](https://github.com/webpack-contrib/mini-css-extract-plugin)

npm install --save-dev mini-css-extract-plugin

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

10. SCSS 

Создаем style.scss в нашей папке ./src И сразу сделаем импорт в src/index.js

```javascript
import './style.css';
// импорт style.scss
import './style.scss'
```

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

11. PostCSS
PostCSS предоставляет нам autoprefixer, cssnano/cleancss (оптизицация размера css файла)

[Github плагина](https://github.com/postcss/postcss)
[Каталог PostCSS плагинов](https://www.postcss.parts/)

Установим необходимый autoprefixer

```javascript
// postcss-loader
// autoprefixer
npm install postcss-loader autoprefixer --save-dev 
``` 

После установки   

- создать в рабочей папке SRC файл конфигурации postcss.config.js , где указать что нам для работы необходим плагин autoprefixer

```javascript
module.exports = {
    plugins: [require('autoprefixer')];
}
```

- прописываем его в файл конфигурации webpack  в загрузчики css и scss. поскольку post-css может рабоать только с .css файлами, то нужно в массиве загрузчиков CSS ставить его первым, а если мы работаем с SCSS то указываем его после sass-loader НО перед css-loader

 
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
  
12. Clean
Чтобы перед перегенерацией файлов очистить нашу билд папку ./build используем плагин clean-webpack-plugin

[Github плагина](https://github.com/johnagan/clean-webpack-plugin)

npm i clean-webpack-plugin --save-dev

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

13. IMAGE 
Для загрузки картинок таже нужен лоадер file-loader

npm install --save-dev file-loader

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

14.  Babel_polyfill
Дает возможность писать по современному стандарту, преобразуя ES6-7-8 в ES5

npm install --save babel-polyfill

После установки следует  обновить конфигурацию webpack и добавить babel-polyfill в поле entry 
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
// изменяем значение entry, теперь это массив значений, читается справо налево
// сперва соберется коневой index.js затем на его основе преобразуется код в ES5
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
  ]

}; 
```

15. DEVSERVER
Поднимает webserver , для отображения результата разработки 

[Github плагина](https://github.com/webpack/webpack-dev-server)

npm install webpack-dev-server --save-dev

После установки необходимо в файле-манифесте package.json в npm скрипте "start" добавить значение  "webpack --mode development" и флаг --open  чтобы открывалось по умолчанию окно браузера

"scripts": {
    "start": "webpack-dev-server webpack --mode development --open",
    "build": "webpack --mode production",
}

Также нужно добавить новое поле devServer для объекта, которое содержит настройки
Про доступные настройки [читаем](https://webpack.js.org/configuration/dev-server/)  

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
// изменяем значение entry, теперь это массив значений, читается справо налево
// сперва соберется коневой index.js затем на его основе преобразуется код в ES5
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
    port: 9001,
  }, 
}; 
```









