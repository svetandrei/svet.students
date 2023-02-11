/**
 * Задача №1
 **/

let x1 = 6;
let y1 = 8;
let x2 = 4;
let y2 = 2;

let rectArea = Math.abs(x1 - x2) * Math.abs(y1 - y2);
console.log(rectArea);

/**
 * Задача №2
 **/

let a = 13.890123;
let b = 2.123;
let c = 2;

let res1 = Math.round(a % 1 * Math.pow(10, c));
let res2 = Math.round(b % 1 * Math.pow(10, c));

console.log(res1);
console.log(res2);

console.log('Исходное значение', res1, res2);
console.log('Оба числа равны', res1 === res2);
console.log('Первое число больше', res1 > res2);
console.log('Первое число меньше', res1 < res2);
console.log('Первое число больше либо равно', res1 >= res2);
console.log('Первое число меньше либо равно', res1 <= res2);
console.log('Оба числа не равны', res1 !== res2);


/**
 * Задача №3
 */
let n = 0;
let m = 100;

let range = Math.abs(n - m);

let resRand = Math.round(Math.random() * range);
let resRand2 = Math.round(Math.random() * range);

let min = Math.min(m, n);

let rand1 = min + resRand;
let rand2 = min + resRand2;

console.log(rand1, rand2);

console.log(rand1, rand2);
console.log('Минимальное число', min);
console.log('Оба числа равны', rand1 === rand2);
console.log('Первое число больше', rand1 > rand2);
console.log('Первое число меньше', rand1 < rand2);
console.log('Первое число больше либо равно', rand1 >= rand2);
console.log('Первое число меньше либо равно', rand1 <= rand2);
console.log('Оба числа не равны', rand1 !== rand2);
