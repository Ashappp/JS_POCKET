
Структура проекта Gulp

- папка SRC    (рабочие файлы)
 - папки html scss js fonts img .....
 - рядом с ними index.html
 - в папке scss создаем файл style.scss

- папка BUILD (выходные данные)

при запуске берет файлы из build , пропускаеи их через pipe и выводит в build

- package.json
- gulpfile.js


1. Создаем новый проект
``` 
npm init 
```

1. package.json создается автоматически при запуске 
2. gulpfile.js создаем вручную


В файле gulpfile.js пишутся инструкции и команды для gulp

2. Установим пакет gulp 
```jsx
npm i gulp
```

После установки появляется папка node_modules с пакетами, и в файле package.json появилось новое поле 

```javascript
"dependencies": {
    "gulp": "^4.0.0"
  }
```
3. сделать импорт файла gulp в gulpfile.js
```jsx
// импорт файла gulp 
const qulp = require('gulp'); 
```


4. Установим доп пакеты для проекта (html, css и т.п )

```jsx
 npm i gulp-autoprefixer 
       browser-sync
       gulp-cssnano 
       gulp-rigger 
       gulp-sass 
       run-sequence
```

5. Напишем первый таск. Алгорит работы. 
 - вызываем метод .task
 - передаем обязательные параметры ИМЯ и ФУНКЦИЮ
 - указываем файл который запускаем в работу
 - вызываем методы .pipe(), которые вызывают те пакеты , которые нужна
 - указываем выходную папку. Она создастся  САМА

```javascript
// TASK

//  вызываем метод .task 
// Аргументы которые передаем
// 1. ИМЯ задания (кастомное)  2. ФУНКЦИЯ в которой будт движуха

gulp.task('html' , function (){
    return gulp.src('./src/index.html')        // нужно указать индексный файл в папке scr
                .pipe(rigger())                // пропускаем через первую ТРУБУ-плагин rigger, 
                .pipe(gulp.dest('build/'))     // указываем папку в которой будет результат работы.
                .pipe(browserSync.stream());   // live reload


});

// ПРИМЕР КОНФИГУРАЦИОННОГО ФАЙЛА 


// импорт файла gulp 
const gulp = require('gulp'); 
const browserSync = require('browser-sync').create(); // синхронизация и лайв релоад
const runSequence = require('run-sequence'); // собираем проект по порядку

// импорт доп. модули 
const rigger = require('gulp-rigger');
const autoprefixer = require('gulp-autoprefixer');
const cssNano = require('gulp-cssnano');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');




// RUN
gulp.task('build', function(callback) { // указываем очередность команд для сборки
    runSequence(
                'html',
                'css',
                'img',
                'fonts',
                'browser-sync',
                'watch',
                 callback
                 );
  });

// WATCH
// 1. указываем пути, к ОТСЛЕЖИВАЕМОМУ файлу, 2. тот ТАСК который запустится
gulp.task('watch', function(){
    gulp.watch('./src/html/*.html', ['html']);
    gulp.watch('./src/scss/*.scss', ['css']);
    gulp.watch('./src/js/*.js', ['js']);  
});

//  LIVE reload 
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

 

// HTML
gulp.task('html' , function (){
    return gulp.src('./src/index.html')    
                .pipe(rigger())            
                .pipe(gulp.dest('build/')) 
                .pipe(browserSync.stream());  
});

// CSS 
gulp.task('css', function(){
    return gulp.src('./src/scss/style.scss')
                .pipe(sass().on('error', sass.logError))
                .pipe(autoprefixer({
                    browsers: ['last 2 versions'],
                    cascade: false
                }))
                .pipe(cssNano())
                .pipe(gulp.dest('build/css'))
                .pipe(browserSync.stream());  
});

// IMAGE 
gulp.task('img', function(){ 
   return gulp.src('src/images/*')
             .pipe(imagemin())
             .pipe(gulp.dest('build/img'))
});

// FONTS 
gulp.task('fonts', function(){
return gulp.src('./src/fonts/*')
            .pipe(gulp.dest('./build/fonts/'));
}); 

```
