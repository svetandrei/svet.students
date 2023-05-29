/**
 * Массив объектов студента
 * @type {[{yearEducation: string, dateBirth: string, fio: string, faculty: string}, {yearEducation: string, dateBirth: string, fio: string, faculty: string}, {yearEducation: string, dateBirth: string, fio: string, faculty: string}, {yearEducation: string, dateBirth: string, fio: string, faculty: string}, {yearEducation: string, dateBirth: string, fio: string, faculty: string}]}
 */
const studentsList = [
  {
    fio: 'Тювильдин Алексей Васильевич',
    faculty: 'Информационные технологии',
    dateBirth: '30.12.2000',
    yearEducation: '2021-2025 (3 курс)',
  },
  {
    fio: 'Частина Анна Викторовна',
    faculty: 'Государственный язык',
    dateBirth: '03.06.2006',
    yearEducation: '2022-2026 (2 курс)',
  },
  {
    fio: 'Майстру Маша Васильевна',
    faculty: 'Художественная школа',
    dateBirth: '16.10.2003',
    yearEducation: '2020-2024 (3 курс)',
  },
  {
    fio: 'Саранди Тимур Дмитриевич',
    faculty: 'Академия литературы',
    dateBirth: '25.02.1999',
    yearEducation: '2018-2022 (Закончил)',
  },
  {
    fio: 'Хуссейн Сармед Сергеевич',
    faculty: 'Психология',
    dateBirth: '17.04.2004',
    yearEducation: '2019-2023 (4 курс)',
  },
]

/**
 * Save array in storage
 * @param appName
 * @param arObj
 */
function saveDataStorage(appName, arObj) {
  let arrStudents = getDataStorage('students', studentsList);
  arrStudents.push(arObj);
  localStorage.setItem(appName, JSON.stringify(arrStudents));
}

/**
 * Get students from storage
 * @param nameKey
 * @param studentsArr
 * @returns {*}
 */
function getDataStorage(nameKey, studentsArr) {
  let arrStudents = [];
  if (localStorage.getItem(nameKey) === undefined
    || localStorage.getItem(nameKey) == null) {
    localStorage.setItem(nameKey, JSON.stringify(studentsArr));
    arrStudents = studentsArr;
  } else {
    arrStudents = JSON.parse(localStorage.getItem(nameKey));
  }
  return arrStudents;
}

/**
 * Get html td student
 * @param studentObj
 * @returns {string}
 */
function getStudentItem(studentObj) {
  if (typeof studentObj === 'object') {
    return Object.values(studentObj).map((el, i, arr) => {
      return `<td>${el}</td>`;
    }).join('')
  }
}

/**
 * Get all rows of students
 * @param arrStudents
 */
function renderStudentsTable(arrStudents) {
  let tBody = document.querySelector('tbody');
  tBody.innerHTML = '';

  if (arrStudents.length && Array.isArray(arrStudents)) {
    let tHead = document.querySelector('thead tr');
    if (!tHead.children.length > 0) {
      tHead.innerHTML = '<th>#</th>';
      theadSortAndFilter(tHead);
    }
    let tr = '';
    for (let obj in arrStudents) {
      let lastTh = document.querySelector('table tbody tr:last-child th');
      let th = '';
      th = lastTh ? `<th>${Number(lastTh.textContent) + 1}</th>` : `<th>1</th>`;
      tr = document.createElement('tr');
      tr.append(th);
      tr.append(getStudentItem(arrStudents[obj]));
      tBody.innerHTML += tr.innerText;
    }
  } else {
    let tr = document.createElement('tr');
    tr.append(`<td colspan="${theadSortAndFilter('', true) + 1}" align="center">Совпадающих записей не найдено</td>`);
    tBody.innerHTML += tr.innerText;
  }
}

/**
 * Send form after valid, check
 * @type {HTMLFormElement}
 */
let form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let addStudent = [];
  let tr = document.createElement('tr');
  let error = false;
  let lastTh = document.querySelector('table tbody tr:last-child th');
  let th = document.createElement('th');
  let obj = {};
  th.innerHTML = lastTh ? Number(lastTh.textContent) + 1 : 1;
  form.querySelectorAll('input').forEach((el, i, arr) => {
    if (errorInput(el)) {
      error = true;
      return false;
    } else {
      if (!error) {
        obj[el.id] = getValObject(el);
      }
    }
  });
  if (!error) {
    saveDataStorage('students', obj);
    form.querySelectorAll('input').forEach((el) => el.value = '');
    renderStudentsTable(getDataStorage('students', studentsList));
  }
});

/**
 * Get age from student
 * @param birthday
 * @returns {number}
 */
function getAge(birthday) {
  let ageDifMs = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

/**
 * Get format value
 * @param el
 * @returns {string}
 */
function getValObject(el) {
  let nD = new Date();
  if (el.id === 'dateBirth') {
    let d = new Date(el.valueAsDate);
    return formatDate(d);
  } else if (el.id === 'yearEducation') {
    let curs = nD.getFullYear() - el.value < 4 ? (nD.getFullYear() - el.value) + ' курс': 'Закончил';
    return `${el.value} - ${nD.getFullYear()} (${curs})`;
  }
  else {
    return el.value.trim();
  }
}

/**
 * Get declination by age
 * @param number
 * @param titles
 * @returns {string}
 */
function declOfNum(number, titles) {
  let cases = [2, 0, 1, 1, 1, 2];
  return number + " " + titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

/**
 * Get format of Date
 * @param date
 * @returns {string}
 */
function formatDate(date) {
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;
  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;
  let y = date.getFullYear();
  return dd + '.' + mm + '.' + y + ' (' + declOfNum(getAge(date), ['год', 'года', 'лет']) + ')';
}

let inputs = document.querySelectorAll('input');
/**
 * Events input
 */
inputs.forEach(function(el) {
  el.addEventListener('keydown', (e) => {
    availableInput(e);
  })
  el.addEventListener('keyup', (e) => {
    let input = e.srcElement;
    errorInput(input);
  })
});

/**
 * Check available input
 * @param e
 * @returns {boolean}
 */
function availableInput(e) {
  if (e.srcElement.id !== 'yearEducation' && e.srcElement.id !== 'dateBirth') {
    let key = (window.event ? e.keyCode : e.which) || (e.clipboardData || window.clipboardData);
    let reg = new RegExp(/^[а-яё\s-]+$/i)
    if (reg.test(e.key) || key === 8 || key === 46
      || key === 37 || key === 39 || key === 13 || key === 9) {
      return false;
    }
    e.preventDefault();
  } else {
    if (e.keyCode === 46 || e.keyCode === 8 || e.keyCode === 9 || e.keyCode === 27 ||
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      return false;
    } else {
      if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105 )) {
        e.preventDefault();
      }
    }
  }
}

/**
 * Check to empty input
 * @param input
 */
function errorInput(input) {
  let error = false;
  let nameErr = '';
  let errorHtml = input.parentElement.querySelector('div.invalid-tooltip');
  let name = input.parentElement.querySelector('label').textContent;
  errorHtml.textContent = '';
  if (input.id === 'yearEducation') {
    if (input.value.length > 4) {
      error = true;
      nameErr = `Пожалуйста, введите не более 4 значений начало ${name}`;
    } else if (input.value.length === 0) {
      error = true;
      nameErr = `Пожалуйста введите ${name}`;
    } else if (input.value < 2000 || input.value > 2023) {
      error = true;
      nameErr = `Пожалуйста введите ${name} в диапазоне от 2000-го до текущего года`;
    }
  } else {
    if (input.value.length === 0) {
      error = true;
      nameErr = `Пожалуйста введите ${name}`;
    }
  }
  if (error) {
    errorHtml.style.display = 'block';
    input.style.borderColor = 'red';
    errorHtml.textContent = nameErr;
  } else {
    errorHtml.style.display = 'none';
    input.style.borderColor = '#ced4da';
  }
  return error;
}

/**
 * Get html th sort and filter
 * @param tHead
 * @param length
 * @returns {number}
 */
function theadSortAndFilter(tHead, length = false) {
  let lb = document.querySelectorAll('label.form-label');
  if (!length) {
    lb.forEach((txt) => {
      let th = document.createElement('th');
      let thS = document.createElement('div');
      thS.classList.add('th-sort', 'both');
      let thF = document.createElement('div');
      thF.classList.add('th-filter');
      let inputF = document.createElement('input');
      thS.textContent = txt.textContent;
      thS.addEventListener('click', (e) => {
        let col = e.target;
        let sort = null;
        if (col.classList.contains('both')) {
          changeTheadSort();
          e.target.classList.remove('both');
          e.target.classList.add('asc');
          sort = false;
        } else if (col.classList.contains('asc')) {
          changeTheadSort();
          col.classList.remove('asc');
          col.classList.add('desc');
          sort = true;
        } else if (col.classList.contains('desc')) {
          changeTheadSort();
          col.classList.remove('desc');
          col.classList.add('asc');
          sort = false;
        }
        renderStudentsTable(sortStudents(getDataStorage('students', studentsList), txt.getAttribute('for'), sort));
      });
      inputF.addEventListener('keyup', (e) => {
        renderStudentsTable(filterStudents(getDataStorage('students', studentsList), txt.getAttribute('for'), e.srcElement.value));
      });
      thF.append(inputF);
      th.append(thS);
      th.append(thF);
      tHead.append(th);
    });
  } else {
    return lb.length;
  }
}

/**
 * Change html sort and filter
 */
function changeTheadSort() {
  document.querySelectorAll('.table th div.th-sort').forEach((el, i, arr) => {
    if (el.classList.contains('desc')) el.classList.remove('desc');
    if (el.classList.contains('asc')) el.classList.remove('asc');
    if (!el.classList.contains('both')) el.classList.add('both');
  })
}

/**
 * Sort by column
 * @param arr
 * @param prop
 * @param sort
 * @returns {*}
 */
const sortStudents = (arr, prop, sort = false) => arr.sort((a, b) => (sort === false
  ? a[prop].toLowerCase() < b[prop].toLowerCase()
  : a[prop].toLowerCase() > b[prop].toLowerCase()) ? -1 : 1);

/**
 * Filter by column
 * @param arr
 * @param prop
 * @param value
 * @returns {*[]}
 */
function filterStudents(arr, prop, value) {
  let result = [],
    copyArr = [...arr];
  for(const item of copyArr) {
    if (String(item[prop].toLowerCase()).includes(value.toLowerCase()) === true) result.push(item);
  }
  return result;
}
