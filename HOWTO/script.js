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

// const container = document.querySelector('.container');

// container.addEventListener('mouseover', (e)=>{
//     let customX = Math.floor(Math.random()*(innerWidth-e.clientX));
//     let customY = Math.floor(Math.random()*(innerHeight-e.clientY));
//     e.target.style.transition = '.7s';
//     e.target.style.left = `${customX}px`;
//     e.target.style.top = `${customY}px`;
// });

const body = document.querySelector('body');

const overlayHTML = ` <div class="overlay-wrap hidden">

                            <div class="overlay"> 

                                <div class="img-wrap">
                                    <img class="image" src="">
                                    <p class="image__title"></p>

                                    <div class="controls">
                                        <div class="gallery-sidebar__btn"></div>
                                        <div class="close-btn">X</div>  
                                    </div> 

                                </div> 
                            </div>

                            <div class="gallery-sidebar"></div>

                        </div>`;

body.innerHTML += overlayHTML;

const image = document.querySelector('.image');
const imgWrap = document.querySelector('.img-wrap');
const imageTitle = document.querySelector('.image__title');

const overlayWrap = document.querySelector('.overlay-wrap');
const overlay = document.querySelector('.overlay');
// controls
const closeBtn = document.querySelector('.close-btn');
const sidebarBtn = document.querySelector('.gallery-sidebar__btn');

const gallerySidebar = document.querySelector('.gallery-sidebar');
const gallery = body.querySelector("#gallery");


gallery.addEventListener('click', (e) => {  
    if (e.target.nodeName !== 'IMG') return;
    overlayWrap.classList.remove('hidden');
    console.log(e);
    image.setAttribute('src', e.target.dataset.big);
    imageTitle.textContent = e.target.getAttribute('al'); 
});

overlay.addEventListener('click', (e)=>{
    if(e.target == closeBtn || e.target == overlay)   overlayWrap.classList.add('hidden');
})

const allImage = [...document.querySelectorAll('#gallery img')].map(elem => elem.getAttribute('data-big'));
allImage.forEach(elem => {
    let singleImg = `<img class="single-image" src="${elem}">`;
    gallerySidebar.innerHTML += singleImg; 
})

sidebarBtn.addEventListener('click', (e)=>{
    gallerySidebar.classList.toggle('sidebar-width');
})
gallerySidebar.addEventListener('click', (e)=>{
    if(e.target.nodeName !== 'IMG') return;
    image.setAttribute('src', e.target.src);
    console.log(e);
})
