/**
 * Create array of quantity
 * @param count
 * @returns {*[]}
 */
function createNumbersArray(count) {
  let arr = [];
  for(let i = 1; count >= i; i++) {
    arr.push(i);
    arr.push(i);
  }
  return arr;
}

/**
 * Create shuffle array
 * @param arr
 * @returns {*}
 */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Iterating over a shuffled array and create cards
 * @param container
 * @param form
 */
function startGame(container, form) {
  const count = form.input.value;
  let t = 60;
  let inter = setInterval(() => {
    t--;
    document.querySelector('.btn').innerHTML = t + " сек.";
    if(t <= 0) {
      form.btn.disabled = false;
      form.btn.innerHTML = "Начать игру";
      form.input.disabled = false;
      document.querySelector('.row').remove();
      alert('Время вышло, вы проиграли!');
      clearInterval(inter);
    }
  }, 1000);

  const arrShuffle = shuffle(createNumbersArray(count * 2));
  const qtyShuffleArr = arrShuffle.length;
  let row = document.createElement('div');
  row.classList.add('row', `row-cols-${count}`, 'g-4', 'mb-5');
  arrShuffle.forEach((item) => {
    let colItem = card(item, qtyShuffleArr, inter);
    row.append(colItem.col);
  });
  container.append(row);
}

/**
 * Card for loop
 * @param item
 * @param qtyShuffleArr
 * @param inter
 * @returns {{col: HTMLDivElement}}
 */
function card(item, qtyShuffleArr, inter) {
  let col = document.createElement('div');
  col.classList.add('col', 'justify-content-center', 'd-flex');
  let colCard = document.createElement('div');
  colCard.classList.add('card');
  colCard.addEventListener('click', () => {
    colCard.classList.add('show-card');
    checkCards(colCard, item, qtyShuffleArr, inter);
  });
  col.append(colCard);
  return {col};
}

/**
 * Check pair of card, add colors, open card
 * @param colCard
 * @param item
 * @param qtyShuffleArr
 * @param inter
 */
function checkCards(colCard, item, qtyShuffleArr, inter){
  let pair = false;
  colCard.closest('.row').querySelectorAll('.col').forEach((el) => {
    let rowCard = el.querySelector('div.card');
    const rowCardN = parseInt(rowCard.textContent);
    if (rowCardN > 0 && rowCardN === parseInt(item)) {
      colCard.style.backgroundColor = rowCard.style.backgroundColor;
      colCard.innerHTML = item;
      rowCard.classList.add('pair');
      colCard.classList.add('pair');
      pair = true;
    } else if (rowCardN > 0 && rowCardN !== parseInt(item) && !rowCard.classList.contains('pair')) {
      rowCard.classList.remove('show-card');
      rowCard.style.backgroundColor = '#6c757d';
      rowCard.innerHTML = '';
    }
  });
  if (!pair) {
    colCard.style.backgroundColor = `hsl(${randColor().h}, ${randColor().s}%, ${randColor().l}%)`;
    colCard.innerHTML = item;
  }
  if (colCard.closest('.row').querySelectorAll('.pair').length === qtyShuffleArr) {
    document.querySelector('.btn').disabled = false;
    document.querySelector('.btn').innerHTML = "Начать игру";
    document.querySelector('input').disabled = false;
    document.querySelector('.row').remove();
    alert('Поздравляю, вы выиграли!');
    clearInterval(inter);
  }

}

/**
 * Random colors for pair of card
 * @returns {{s: number, h: number, l: number}}
 */
function randColor() {
  let
    h, s, l,
    min_s = 30, max_s = 70,
    min_l = 70, max_l = 100;

  h = Math.floor(Math.random() * 360);
  s = Math.floor(Math.random() * (max_s - min_s) + min_s);
  l = Math.floor(Math.random() * (max_l - min_l) + min_l);
  return {
    h, s, l
  }
}

/**
 * Create Form for start
 * @param name
 * @returns {{input: HTMLInputElement, form: HTMLFormElement, title: HTMLHeadingElement, btn: HTMLButtonElement}}
 */
function createCountForm(name) {
  let title = document.createElement('h1');
  let form = document.createElement('form');
  let input = document.createElement('input');
  let btn = document.createElement('button');
  let formText = document.createElement('div');
  let errorHtml = document.createElement('div');

  title.classList.add('justify-content-center', 'd-flex', 'pt-5', 'mb-5');
  title.innerHTML = name;
  form.classList.add('input-group', 'form-count', 'mb-5');
  input.classList.add('form-control');
  btn.classList.add('btn', 'btn-primary');
  btn.disabled = true;
  btn.innerHTML = "Начать игру";
  formText.classList.add("form-text");
  formText.innerHTML = "Количество карточек по вертикали/горизонтали (чётное число 2 - 10)";

  input.addEventListener('keydown', function(e){
    if ( e.keyCode === 46 || e.keyCode === 8 || e.keyCode === 9 || e.keyCode === 27 ||
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      return false;
    } else {
      if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105 )) {
        e.preventDefault();
      }
    }
  })
  input.addEventListener('keyup', () => {
    let error = false;
    if (input.value > 10 || input.value % 2 !== 0) {
      error = true;
    }
    input.value && input.value % 2 === 0 && input.value <= 10 ? btn.disabled = false : btn.disabled = true;
    errorInput(errorHtml, 'Пожалуйста, введите не более 2 значений и только четные числа от 2 до 10', input, error);
  })

  form.append(errorHtml);
  form.append(input);
  form.append(btn);
  form.append(formText);

  return {
    title,
    form,
    input,
    btn
  }
}

/**
 * Check for error enter input
 * @param errorHtml
 * @param title
 * @param el
 * @param show
 * @returns {*}
 */
function errorInput(errorHtml, title, el, show = false) {
  errorHtml.classList.add('invalid-feedback');
  if (show) {
    errorHtml.style.display = 'block';
    el.style.borderColor = 'red';
    errorHtml.innerHTML = title;
  } else {
    errorHtml.style.display = 'none';
    el.style.borderColor = '#dee2e6';
  }
  return errorHtml;
}

/**
 * Show cards after start
 * @param container
 * @param title
 */
function createApp(container, title = 'Игра в пары') {
  let appForm = createCountForm(title);
  let form = appForm.form.parentNode;

  appForm.form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!appForm.input.value) return false;
    appForm.btn.disabled = true;
    appForm.input.disabled = true;
    startGame(container, appForm);
  });

  container.insertBefore(appForm.title, form)
  container.append(appForm.form);
}
