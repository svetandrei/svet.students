let nums = [];
let days = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
let date = new Date();
let curNum = date.getDate();
let curDay = date.getDay();
let curMonth = date.getMonth();
let arrMonth = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Ноябрь',
  'Декабрь',
];
let qtDayOfMonth = 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();

for (let i = 1; i < 32; i++) {
  nums.push(i);
}

nums.forEach(e => {
  if (e >= curNum && e <= qtDayOfMonth) {
    console.log(`${e} ${arrMonth[curMonth]}, ${days[curDay - 1]}`);
    curDay < days.length ? curDay++ : curDay = 1;
  }
});
