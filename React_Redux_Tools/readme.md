#REACT |||||||||||||||||||||||||||||||||








# REDUX ||||||||||||||||||||||||||||||||

#### Методы хранилища

- dispatch(action)  
 Отправляет действие. Это единственный способ изменить состояние.

- getState() 
 Возвращает текущее состояние вашего приложения. Оно равно последнему возвращенному значению из редюсера хранилища.

- subscribe(listener)
Добавляет слушателя. Он будет вызываться каждый раз, когда действие отправлено и некоторая часть дерева состояния могла потенциально измениться.

-replaceReducer(nextReducer)
Заменяет редюсер, который в настоящее время используется хранилищем, чтобы вычислить состояние.
Это продвинутое API. Вам возможно понадобится это, если ваше приложение реализует разделение кода и вы хотите загрузить некоторые редюсеры динамично.  