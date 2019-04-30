"use strict";

// 1. Length of object
// const obj = {
//   a: 1,
//   b: 2,
//   c: 3
// };

// let ObjectLength = Object.keys(obj).length;
// console.log(ObjectLength);

// //2. Iterate object
// const userObj = {
//   first: "John",
//   last: "Doe"
// };
// // standart
// for (let u in userObj) {
//   if (userObj.hasOwnProperty(u)) {
//     console.log(u, ":", userObj[u]);
//   }
// }
// // using array cycle method
// for (let u of Object.keys(userObj)) {
//   console.log(u, ":", userObj[u]);
// }

// new
// Object.entries(userObj).forEach(([key, value]) => console.log(key, ":", value));

// 3. Convert Object to Array
// const person = {
//   name: "Amy",
//   age: 40
// };
// // standart
// const newArr = Object.entries(person);
// // or
// const newArr2 = [];
// Object.keys(person).forEach(key => newArr2.push([key, person[key]]));
// // or
// const newArr3 = Object.keys(person).map(key => [key, person[key]]);

// 4. Object property.
// const user = {
//   name: "Sam",
//   age: 22,
//   isActive: false
// };
// // add new property
// Object.defineProperty(user, "email", {
//   configurable: false,
//   value: "Sam@yahoo.com",
//   enumerable: true
// });
// // close object for add new properties
// Object.preventExtensions(user);
// // Check is object can take a new property
// console.log(Object.isExtensible(user));
// // Get full information about property
// console.log(Object.getOwnPropertyDescriptor(user, "email"));

// 5. Prevent obj properies from being added deleted
// const user = {
//   name: "John",
//   email: "john@gmail.com",
//   phone: "0970706007"
// };

// // close object for config property and add new properties
// Object.seal(user);
// // but existing property can change
// user.name = "Yra";

// 6.Filter object

// const user = {
//   name: "Sam",
//   lastName: "Fisher",
//   age: 43,
//   password: 123546,
//   facebook: true
// };

// // in global scope
// const filteredUser = {};
// Object.keys(user)
//   .filter(k => k != "password")
//   .map(k => (filteredUser[k] = user[k]));

// // function that filter object
// function filterObject(obj, prop) {
//   const filteredUser = {};
//   Object.keys(obj)
//     .filter(k => k != prop)
//     .map(k => (filteredUser[k] = obj[k]));
//   return filterObject;
// }

// // second way
// const { password: _x, ...newObject } = user;

// const letsFilter = (obj, prop) => {
//   const { [prop]: _x, ...newObject } = obj;
//   return newObject;
// };

// ||||||||||||||||||  ARRAYS |||||||||||||||||||||

//1. fill element arr
// let phoneNumber = "555-525-6371";

// let newNumber = phoneNumber
//   .split("")
//   .filter(el => el != "-")
//   .fill("*", 0, 3)
//   .join("");
// console.log(newNumber); // ***5256371

// // 2. Find All indexes of element
// const names = ["Bob", "Spounge", "Bob", "Andrey", "Sanya"];

// // global scope
// const indexes = [];
// names.forEach((el, idx) => {
//   if (el === "Bob") {
//     indexes.push(idx);
//   }
// });

// // function
// const findAllIndexes = (arr, elem) => {
//   const i = [];
//   arr.forEach((el, idx) => el === elem && i.push(idx));
//   return i;
// };

// 3. Create array of numbers

// create arr and map lement
// const arr = Array.from([1, 3, 55], val => val * 3);
// console.log(arr);

// // fill array by numbers.
// const numbers = Array.from({ length: 10 }, (val, idx) => idx + 1);
// console.log(numbers);

// 4. Find Unique value in array
// const names = [
//   "Bob",
//   "Spounge",
//   "Bob",
//   "Andrey",
//   "Sanya",
//   "Alex",
//   "007",
//   "Alex"
// ];

// // filter method. indexOf because this methods find FIRST element,
// // it means that index of rest founded element dont equals current index
// const unique = names.filter((el, idx, arr) => arr.indexOf(el) === idx);

// // using Set
// const uniqueNames = [...new Set(names)];

// 5. Find diff between two arrays
// const arr1 = ["mers", "audi", "bmw", "lada", "honda"];
// const arr2 = ["audi", "bmw", "honda"];

// const difference = arr1.filter(el => !arr2.includes(el));
// // or
// const differenceSet = [...new Set(arr1)].filter(el => !arr2.includes(el));

// ||||||||||||||||||  FUNCTIONS |||||||||||||||||||||

// 1. DEBOUNCE. Limit time call function. HOFunction

const debounce = (func, ms) => {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(), ms);
  };
};

const onResize = () => console.log(window.innerWidth, window.innerHeight);

// wrap handler function in hof debounce
window.addEventListener("resize", debounce(onResize, 500));
