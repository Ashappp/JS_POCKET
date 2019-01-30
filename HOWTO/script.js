"use strict";
// 1) При скролі сайту на велечину хедера фбо більше меню стає фіксованим
// 2) При скролі сайту меньше ніж висота хедера меню стає на почвткову позицію  

// const header = document.querySelector('.header').clientHeight; 
// const nav = document.querySelector('.nav');

// document.addEventListener('scroll', (e)=>{ 
//     return (pageYOffset > header) ? nav.classList.add('fixed-nav'): nav.classList.remove('fixed-nav');
// })

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::

/* 
2) Написати скрипт який при ховері буде міняти позицію кнопок на екрані, 
щоб не можна було по них клікнути

3) Нова позиція кнопок має бути випадковою

4) Кнопки не повинні виїжати за межі екрану

5) Позиція кнопок має вираховуватися відносно висоти і ширини вікна браузера

6) Переміщення кнопок зробити плавним за допомогою transition

7) Визначати кнопку на якій відбулася подія можна двома способами:
    7.1) event
    7.2) this

8) Корисні команди:
window.innerWidth
window.innerHeight
clientHeight
clientWidth
mouseenter */

const container = document.querySelector('.container');

container.addEventListener('mouseover', (e)=>{ 
    let customX = Math.floor(Math.random()*(innerWidth-e.clientX));
    let customY = Math.floor(Math.random()*(innerHeight-e.clientY)); 
    e.target.style.transition = '.7s';
    e.target.style.left = `${customX}px`;
    e.target.style.top = `${customY}px`;
})