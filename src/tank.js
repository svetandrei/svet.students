// это функция, внутри которой нужно написать ваш код
// roadMines (массив ячеек поля) будет задаваться в момент вызова функции, как в примере кода под ней
function moveTank(roadMines) {
  let hit, i = false;
  for (i; i < roadMines.length; i++) {
    if (roadMines[i] === true && hit === false) {
      console.log('Танк поврежден');
      hit = true;
    } else if (roadMines[i] === true && hit === true) {
      console.log('Танк уничтожен');
      break;
    } else {
      console.log(`Танк переместился на ${i + 1}`);
    }
  }
}

// вызов функции
moveTank([false, false, false, false, false, false, false, false, false, false]); // танк проедет по полю без мин
// можете вызывать функцию сколько угодно раз подряд с различными параметрами

// строка ниже необходима, чтобы работало автоматическое тестирование
// не изменяйте этот код!
export default moveTank;
