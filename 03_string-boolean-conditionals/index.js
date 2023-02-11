/**
 * Задача №1
 **/

let password = '4321_';

if (password >= 4 && password.includes('_')) {
  console.log('Пароль надёжный');
} else {
  console.log('Пароль недостаточно надёжный');
}


/**
 * Задача №2
 **/
let userName = 'аНдРЕй';
let userSurname = 'шВеЦ';

let lower = userName.toLowerCase();
let firstLetter = lower.slice(0,1);
let resCapitalized = lower.replace(firstLetter, firstLetter.toUpperCase());
console.log(resCapitalized);

/**
 * Задача №3
 **/
let n = 7;
if ((n % 2)) {
  console.log(n, '- Нечетное число!');
} else {
  console.log(n, '- Четное число!');
}

