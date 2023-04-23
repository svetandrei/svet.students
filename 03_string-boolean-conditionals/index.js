/**
 * Задача №1
 **/

let password = '4321_';

if (password >= 4 && (password.includes('_') || password.includes('-'))) {
  console.log('Пароль надёжный');
} else {
  console.log('Пароль недостаточно надёжный');
}


/**
 * Задача №2
 **/
let userName = 'аНдРЕй';
let userSurname = 'шВеЦ';

transformation = function (str, name = '') {
  let lower = str.toLowerCase();
  let firstLetter = lower.slice(0, 1);
  let resCapitalized = lower.replace(firstLetter, firstLetter.toUpperCase());
  if (str === resCapitalized) {
    console.log(name, 'осталось без изменений');
  } else {
    console.log(name, 'было преобразовано');
    console.log(resCapitalized);
  }
}
transformation(userSurname, 'Фамилия');

/**
 * Задача №3
 **/
let n = 7;
if ((n % 2)) {
  console.log(n, '- Нечетное число!');
} else {
  console.log(n, '- Четное число!');
}

