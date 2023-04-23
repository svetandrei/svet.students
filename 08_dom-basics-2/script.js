(function () {
  let arr = [];
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoItemForm(){
    let form = document.createElement('form');
    let input = document.createElement('input');
    let btnWrapper = document.createElement('div');
    let btn = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    btnWrapper.classList.add('input-group-append');
    btn.classList.add('btn', 'btn-primary');
    btn.disabled = true;
    btn.textContent = 'Добавить дело';

    input.addEventListener('input', function() {
      input.value ? btn.disabled = false : btn.disabled = true;
    });

    btnWrapper.append(btn);
    form.append(input);
    form.append(btnWrapper);

    return {
      form,
      input,
      btn
    }
  }

  function listTodo() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoApp(container, title = 'Список дел', appName){
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = listTodo();
    let todoItem;

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    if (localStorage.getItem(appName)) {
      let arTodo = JSON.parse(localStorage.getItem(appName));
      arTodo.forEach((obj) => {
        todoItem = addTodoItem(obj, appName);
        todoList.append(todoItem.item);
      });
    }

    todoItemForm.form.addEventListener('submit', function (e){
      e.preventDefault();

      if (!todoItemForm.input.value) {
        return;
      }

      let todoCurItemValue = todoItemForm.input.value;

      let obj = {};
      obj.id = Math.random().toString(36).substring(2, 5);
      obj.name = todoCurItemValue;
      obj.done = false;

      todoItem = addTodoItem(obj, appName);

      todoList.append(todoItem.item);
      todoItemForm.input.value = '';
      todoItemForm.btn.disabled = true;
    })

  }

  function saveDataStorage(appName, arObj) {
    localStorage.setItem(appName, JSON.stringify(arObj));
  }

  function addTodoItem(obj, appName) {
    arr.push(obj);
    saveDataStorage(appName, arr);

    let item = document.createElement('li');

    let btnGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.dataset.id = obj.id;
    item.textContent = obj.name;
    obj.done ? item.classList.add('list-group-item-success') : item.classList.remove('list-group-item-success');

    btnGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = "Готово";
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    doneButton.addEventListener('click', function (){
      item.classList.toggle('list-group-item-success');
      let post = arr.find((post) => post.id === item.dataset.id);
      post.done ? post.done = false : post.done = true;
      saveDataStorage(appName, arr);
    });
    deleteButton.addEventListener('click', function (){
      if (confirm('Вы уверены?')) {
        const index = arr.findIndex(n => n.id === item.dataset.id);
        if (index !== -1) {
          arr.splice(index, 1);
          item.remove();
          saveDataStorage(appName, arr);
        }
      }
    });

    btnGroup.append(doneButton);
    btnGroup.append(deleteButton);
    item.append(btnGroup);

    return {
      item
    }
  }

  window.createTodoApp = createTodoApp;
})();
