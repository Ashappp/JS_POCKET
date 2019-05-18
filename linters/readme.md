Линтеры - следят и предупреждают.
must have

### Ставим пакеты

```js
npm i --save-dev
prettier
eslint-config-airbnb
eslint-config-prettier
eslint-plugin-prettier
eslint-plugin-react
eslint-plugin-import
eslint-plugin-jsx-a11y
husky
lint-staged
```

### Ставим плагины для IDE

- prettier
- eslint

Husky работает в связке с lint-staged. **До установки в проект, папка с проектом уже должна отслеживаться git**

### Создаем файлы-конфигурцядом с package.json

- для IDE **.editorconfig**

```js
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
insert_final_newline = true
```

- для Prettier **.prettierrc**

```js
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "avoid",
  "proseWrap": "always"
}
```

- для Eslint **.eslintrc**

```js
{
  "extends": [
    "eslint:recommended",
    "airbnb",
    "plugin:import/errors",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "prettier/react"
  ],
  "plugins": ["react", "import", "prettier", "jsx-a11y"],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "jest": true
  },
  "rules": {
    "no-console": 1,
    "linebreak-style": ["error", "unix"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/destructuring-assignment": [
      2,
      "always",
      { "ignoreClassFields": true }
    ]
  },
  "globals": {
    "window": true,
    "document": true,
    "localStorage": true,
    "FormData": true,
    "FileReader": true,
    "Blob": true,
    "navigator": true
  }
}
```

- для Staged-lint **.lintstagedrc**

```js
{
  "linters": {
    "src/**/*.{json,css}": ["prettier --write", "git add"],
    "src/**/*.js": ["prettier --write", "eslint --fix", "git add"]
  }
}
```

- для Husky **.huskyrc**

```js
{
  "hooks": {
    "pre-commit": "lint-staged"
  }
}
```

### Создание задач

В `package.json` нужно дополнить поле `scripts`

- lint (запускает отслеживание)
- lint:fix (запускает исправление некоторых ощибок)
- lint:format (запускает испоавления стиля кода)

```js
// дополнить к существующим скриптам
"scripts": {
  "lint": "eslint src/**/*.js",
  "lint:fix": "eslint src/**/*.js --fix",
  "lint:format": "prettier src/**/*.{js,css,json} --write"
  }
```

### Настройки IDE VSCode

```js
{
  "files.autoSave": "onFocusChange",
  "editor.formatOnSave": true,
  "eslint.autoFixOnSave": true,
  "eslint.alwaysShowStatus": true
}
```
