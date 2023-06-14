/**
 * Get students
 * @returns {Promise<*>}
 */
const getStudents = async () => {
  const response = await fetch('http://localhost:3000/api/students');
  return await response.json();
}

/**
 * Get format students
 * @param items
 * @returns {*}
 */
function getFormatStudents(items) {
  return items.map((item, i, arr) => {
    let newStud = {};
    newStud['id'] = item['id'];
    newStud['fio'] = item['name'] + ' ' + item['surname'] + ' ' + item['lastname'];
    newStud['faculty'] = item['faculty'];
    newStud['dateBirth'] = item['birthday'];
    newStud['yearEducation'] = item['studyStart'];
    return newStud;
  });
}

/**
 * Add new student
 * @param obj
 * @returns {Promise<void>}
 */
async function addStudent(obj) {
  const {faculty, dateBirth, yearEducation } = obj;
  let fio = obj.fio.split(' ');
  await fetch('http://localhost:3000/api/students', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: fio[1],
      surname: fio[2],
      lastname: fio[0],
      faculty: faculty,
      birthday: dateBirth,
      studyStart: yearEducation,
    })
  });
}

/**
 * Get html td student
 * @param tr
 * @param studentObj
 * @returns {void}
 */
function getStudentItem(tr, studentObj) {
  if (typeof studentObj === 'object') {
    let cancelTd = ['id'];
    for (let key in studentObj) {
      if (cancelTd.includes(key)) continue;
      let td = document.createElement('td');
      td.innerText = studentObj[key];
      tr.append(td);
    }
  }
}

/**
 * Delete student by id
 * @param id
 * @returns {Promise<void>}
 */
async function deleteStudent(id) {
  if (confirm('Вы уверены?')) {
    await fetch(`http://localhost:3000/api/students/${id}`, {
      method: 'DELETE',
    })
  }
}

/**
 * Get all rows of students
 * @param arrStudents
 */
function renderStudentsTable(arrStudents) {
  let tBody = document.querySelector('tbody');
  tBody.innerHTML = '';
  let tHead = document.querySelector('thead tr');
  if (!tHead.children.length > 0) {
    tHead.innerHTML = '<th>#</th>';
    theadSortAndFilter(tHead);
  }
  if (arrStudents.length && Array.isArray(arrStudents)) {
    let tr = '';
    for (let obj in arrStudents) {
      let lastTh = document.querySelector('table tbody tr:last-child th');
      let th = document.createElement('th');
      th.innerHTML = lastTh ? Number(lastTh.textContent) + 1 : 1;
      tr = document.createElement('tr');
      tr.append(th);
      getStudentItem(tr, arrStudents[obj]);
      action(tr, arrStudents[obj]);
      tBody.append(tr);
    }
  } else {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.colSpan = theadSortAndFilter('', true) + 2;
    td.textContent = 'Записей не найдено';
    td.style.textAlign = 'center';
    tr.append(td);
    tBody.append(tr);
  }
}

/**
 * Action for row
 * @param tr
 * @param item
 */
function action(tr, item) {
  let lastTd = document.createElement('td');
  lastTd.style.textAlign = 'center';
  lastTd.dataset.id = item.id;
  let btnDel = document.createElement('button');
  let iconDel = document.createElement('i');
  iconDel.classList.add('bi', 'bi-trash');
  btnDel.type = 'button';
  btnDel.classList.add('btn', 'btn-outline-danger');
  btnDel.addEventListener('click',  async(e) => {
    tr.remove(); await deleteStudent(item.id); getStudents().then(result => renderStudentsTable(getFormatStudents(result)));
  });
  btnDel.append(iconDel);
  lastTd.append(btnDel);
  tr.append(lastTd);
}

/**
 * Send form after valid, check
 * @type {HTMLFormElement}
 */
let form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
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
    await addStudent(obj);
    form.querySelectorAll('input').forEach((el) => el.value = '');
    getStudents().then(result => renderStudentsTable(getFormatStudents(result)));
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
  } else {
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
        sortStudents(async () => getStudents(), txt.getAttribute('for'), sort).then(result => renderStudentsTable(result));
      });
      inputF.addEventListener('keyup', (e) => {
        filterStudents(async () => getStudents(), txt.getAttribute('for'), e.srcElement.value).then(result => renderStudentsTable(result));
      });
      thF.append(inputF);
      th.append(thS);
      th.append(thF);
      tHead.append(th);
    });
    let lastTh = document.createElement('th');
    lastTh.textContent = 'Действия';
    tHead.append(lastTh);
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
const sortStudents = async (arr, prop, sort = false) => {
  let res = await arr();
  return getFormatStudents(res).sort((a, b) => (sort === false
  ? a[prop].toLowerCase() < b[prop].toLowerCase()
  : a[prop].toLowerCase() > b[prop].toLowerCase()) ? -1 : 1)
}

/**
 * Filter by column
 * @param arr
 * @param prop
 * @param value
 * @returns {*[]}
 */
const filterStudents = async (arr, prop, value) => {
  let arrRes = await arr();
  let result = [],
    copyArr = [...getFormatStudents(arrRes)];
  for(const item of copyArr) {
    if (String(item[prop].toLowerCase()).includes(value.toLowerCase()) === true) result.push(item);
  }
  return result;
}
