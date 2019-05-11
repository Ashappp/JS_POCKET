"use strict";

// // нужно записать все эти значения в один массив
// const numbers = [ [1, 8, "House"] , ["Wind", 887, "Left"] , [78,55,97]];

// // 1.
// const flatArr = numbers.flat();

// // 2.
// const newarr = [];

// numbers.forEach((elem, idx, arr)=> {
//     elem.forEach(elem=> newarr.push(elem))
// })

// // Min or Max value
// const maxMin = [-4, 66, 44, 12, 15, 25, 37, 41].sort((a,b)=> a-b);

// let min=maxMin[0];
// let max = maxMin[0];

// maxMin.forEach(el=> el < min ? min=el : min);
// maxMin.forEach(el=> el > max ? max=el : max);

// // Poly

// const isPoly = (word) => word === word.split('').reverse().join('');

// // создать двумерный массив

// const arr = [];
// for(let i=0; i< 3; i++){
//     let subarr = [];
//     for(let l=0; l< 4; l++){
//         subarr.push(l);
//     }
//     arr.push(subarr);
// }

// //
// // 1) Данно оригинальний масив let arr = [5,10,15,20,25,30,35,40];
// // 2) Данно масив з остатком let result = [10,20,35];
// // 3) Получить масив удаленых чисел;  [5,15,25,30,40];

// let arrr = [5,10,15,20,25,30,35,40,100];
// let result = [10,20,35,100];

// const removed = arrr.filter(el => !result.includes(el) );

// // Написать програму которая находит разницу значений двух масивов
//  [1, 2, 3], [100, 2, 1, 10]  [3, 10, 100]

// let oneArr = [1, 2, 3];
// let secondArr = [100, 2, 1, 10];
// let uniqueNumber = [];

// const un = oneArr.filter(el => secondArr.indexOf(el) > 0)

// let initial = [1,2,5,10,12,5,3,2,8,3];
// // 1.
// let unique = [...new Set(initial)];

// // 2.

// const unArray = [];

// for(let el of initial){
//     let flag = 0;

//     for(let inner of initial){
//         console.log(el , inner);
//         if(el === inner)  flag++;
//     }
//     console.log("===========================");
//     console.log(el, flag);
//     console.log("===========================");
//     if(flag===1){
//         unArray.push(el);
//     }

// }
// // reverse arr without mutation

// let mas = [
//     "Капуста",
//     "Репа",
//     "Редиска",
//     "Морковка",
//     "Bananas",
//     "apple",
//     "mango",
//     "cucumber"
//   ];

// const reversed = [];
// for(let i = mas.length-1; i >=0 ; i--){
//     reversed.push(mas[i])
// }

// 1
// let a = [1, 2, 3, 4, 5];
// let b = [4, 5, 6];
// let c = [];
// let min =[];
// let max=[];

// a.length > b.length ? max=[...a] : min=[...a];
// a.length < b.length ? max=[...b] : min=[...b];

// max.forEach((el, idx, arr)=> {
//     if(min[idx] === undefined) min[idx]=0;
//     return c.push(el+min[idx]);
// })
// c = c.reduce((acc,el)=> acc + el);

// // 2
// let aa = [1, 2, 3, 4, 5];
// let bb = [4, 5, 6];
// let cc =  aa.reduce((a,e)=>a+e) + bb.reduce((a,e)=>a+e);
// console.log(cc);

// let a = [2, 3, 4, 5, 6, 4, 77, 32, 4, 6, 19, 30, 8, 44];
// let b = [];

// a.forEach((elem, idx, arr) => {
//   if (arr[idx + 1]) {
//     b[idx] = arr[idx + 1] - arr[idx];
//   }
// });

// let a = [
//   "php",
//   "css",
//   "script",
//   "css",
//   "php",
//   "script",
//   "html",
//   "java",
//   "html"
// ];
// let b = [];

// a.forEach((el, idx, arr) => {
//   a.forEach((elem, idx, arr) => {
//     if (el === arr[idx + 1]) {
//       b.push(el);
//       a.splice(idx, 1);
//     }
//   });
// });

// Дан массив с числами. 
// Узнайте сколько элементов с начала массива надо сложить, 
// чтобы в сумме получилось больше 10-ти.


// let a = [2, 3, 4, 5, 6, 4, 77, 32, 4, 6, 19, 30, 8, 44];
// let sum = 0;
// let counter=0;

// a.forEach((elem,idx,arr)=> {
//     if(sum<10){
//         sum +=elem;
//         counter++
//     }
// });


// Дан двухмерный массив с числами, например [[1, 2, 3], [4, 5], [6]]. 
// Найдите сумму элементов этого массива. Массив, конечно же, может быть произвольным.

 
// let mass = [[1, 2, 3], [4, 5], [6]];
// let accum = 0;

// mass.forEach((elem)=> accum += elem.reduce((acc,el)=>acc+el)); 

let mass = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]];
let accum = 0;

