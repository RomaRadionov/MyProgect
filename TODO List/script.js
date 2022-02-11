const addTaskBtn = document.getElementById('add-task-btn'); // кнопка Додати
const deskTaskInput = document.getElementById('description-task'); // поле в якому будемо вводити опис нашого завдання(Task - далі це буде відправлятися в функцію з параметром description)
const todoList = document.querySelector('.todoList'); // а сюда будемо відправляти опис нашого завдання(Task)
const modalClose = document.querySelector('.modal__content');
const modalDelete = document.querySelector('.modal__delete');

let tasks; // об'єкт
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks')) //  при загрузкі сторінки робимо перевірку. !localStorage.tasks ? tasks = [] якщо в нас немає завдань то наш массив пустий. : tasks = JSON.parse(localStorage.getItem('tasks')) а якщо в нас є завдання то беремо його методом getItem в форматі JSON за допомогою метода parse щоб перетворити зі строки в об'єкт

let todoItemElems = [];

function Task(description, impor) {  // створюємо функцію яка буде створювати в об'єкті tasks об'єкт з параметрами які далі описані
    this.description = description; // ключ об'єкта description буде дорівнювати description(опис таски яки вводить користувач в інпут) який приймає функція
    this.completed = false;  //Ключ об'єкта який буде при створенні за замовчанням false(незавершений)
    this.date = genDate();
    this.important = impor;
}

const createTemplate = (task, index) => {
    return `
    <label class="custom-checkbox">
        <li class="list ${task.completed ? 'done' : ''}">
            <div class="list-nav">
                <input onclick="completeTask(${index})" class="done-btn hidden-checkbox" type="checkbox" ${task.completed ? 'checkbox' : ''}>
                <div class="ckeckbox">
                    <div class="checkmark">&#x2713;</div>
                </div>
                <div class="date">${task.date}</div>
                <div class="entering-numbers" title="Важніть завдання">
                    <button class="arrow-left" id="left"><i class="fas fa-caret-left"></i></button>
                    <input type="text" value="${task.important}" id="important" readonly>
                <button class="arrow-right" id="right"><i class="fas fa-caret-right"></i></button>
                </div>
                <button class="edite" title="Редагувати" onclick="editeTaskModal(${index})"><i class="fas fa-pen"></i></button>
                <button class="delete" title="Видалити" onclick="deleteTaskModal(${index})"><i class="fas fa-times"></i></button>
            </div>
            <div class="content">
                <div class="container">
                    <p class="${task.completed ? 'doneTask' : ''}">${task.description}</p>
                </div>
            </div>
        </li>
    </label>
    `
}

const fillHtmlList = () => {
    todoList.innerHTML = "";
    if(tasks.length > 0) {
        tasks.forEach((item, index) =>{
            todoList.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.list');
    }
}

fillHtmlList();

const updateLocal = () => { // функція яка буде відправляти в localStorage наші таски
    localStorage.setItem('tasks', JSON.stringify(tasks)); // звертаємось до сховища localStorage за допомогою метода setItem(він буде відправляти з нашого об'єкта tasks наші ключі і значення коючів). Створюємо ключ 'tasks' в localStorage і додаємо значення з нашого об'єкта tasks в форматі JSON з методом stringify(цей метод буде перетворювати ключ об'єкта в строку)
}

const completeTask = index => {
    console.log(index);
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed){
        todoItemElems[index].classList.add('done');
    } else{
        todoItemElems[index].classList.remove('done');
    }
    updateLocal();
    fillHtmlList();
}
/*==================== INPUT ПОЛЕ ПУСТЕ!!! ====================*/
let emptyTask = document.getElementById('modal-empty');

const closeModalEmpty = () => {
    emptyTask.innerHTML = '';
}

const empty = () => {
    emptyTask.innerHTML += `
    <div class="empty__modal active">
        <div class="empty__content" onclick="closeModalEmpty()">
            <div class="empty__body">
                <p class="empty__title">Поле пусте!!!</p>
                <button class="modal-delete" id="delete"onclick="closeModalEmpty()">&times;</button>
                <div class="empty__actions">
                    <button class="btnAdd"onclick="closeModalEmpty()">Ok</button>
                </div>
            </div>
        </div>
    </div>
    `;
    return emptyTask;
}

addTaskBtn.addEventListener('click', () => { // при нажиманні на кнопку Додати(click)
    if(deskTaskInput.value.trim().length === 0) return empty();
    tasks.push(new Task(deskTaskInput.value, important.value)); // звертаємось до об'єкта tasks за допомогою метода push(добавляє елемент в кінець масива). Створюємо новий об'єкт Task(наша функція) зі значеням яке получаємо в інпуті(deskTaskInput.value)
    console.log(tasks);
    updateLocal(); // при нажиманні кнопки Додати буде визиватись функція яка буде відправляти в localStorage дані
    fillHtmlList();
    deskTaskInput.value = ''; // після додавання таску наш інпут очищаєтся, щоб записати новий таск
    important.value = '1';
})

/*==================== MODAL DELETE ====================*/
let modal = document.getElementById('modal-active');

const deleteTaskModal = index => {
    console.log(index);
    modalDeleteWindow(index);
}


const closeModalDeleteWindow = () => {
    // const modalClose = document.querySelector('.modal__content');
    // if(e.target.classList.value = modalClose){
    //     modal.innerHTML = '';
    // }else
    modal.innerHTML = '';
}

/*==================== ВИДАЛЯЄМО ТАСКУ ====================*/
const modalDeleteWindow = index => {
    modal.innerHTML += `
    <div class="modal__delete active" id="modal__delete">
        <div class="modal__content" onclick="closeModalDeleteWindow()">
            <div class="modal__body">
                <p class="modal__title">Видалити задачу?</p>
                <button class="modal-delete" id="delete" onclick="closeModalDeleteWindow()">&times;</button>
                <div class="modal__actions">
                    <button class="btnAdd" onclick="deleteTask(${index})">Так</button>
                    <button class="btnAdd" onclick="closeModalDeleteWindow()">Ні</button>
                </div>
            </div>
        </div>
    </div>
    `;
    console.log(index);
    return modal;
}

const deleteTask = index => {
    console.log(index);
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
}

/*==================== РЕДАГУЄМО ТАСКУ ====================*/
const editeTaskModal = (index) => {
    console.log(tasks[index].description);
    modalEditeWindow(index);
}

const modalEditeWindow = (index) => {
    modal.innerHTML += `
    <div class="modal__delete active" id="modal__delete">
        <div class="modal__content">
            <div class="modal__body">
                <p class="modal__title">Редагувати завдання</p>
                <button class="modal-delete" id="delete" onclick="closeModalDeleteWindow()">&times;</button>
                <textarea class="edite-input">${tasks[index].description}"</textarea>
                <div class="modal__actions">
                    <button class="btnAdd" onclick="editeTask(${index})">Зберегти</button>
                    <button class="btnAdd" onclick="closeModalDeleteWindow()">Відміна</button>
                </div>
            </div>
        </div>
    </div>
    `;
    console.log(index);
    return modal;
}

/*==================== Показує в консолі на який клас нажали ====================*/
document.addEventListener('click', (e) => {
    console.log(e.target.classList.value);
})

/*==================== ДОДАЄМО ДАТУ В LOCALSTORAGE ====================*/
function genDate(){
    // использование маленьких внутрених функций позволяет экономить код
    function withZero(num){
    return num < 10 ? '0'+ num: num;
    }
    // разбивка на отдельные константы (переменные) позволяет с легкостью манипулировать
    // порядком елементов, после получения нужного порядка можно оптимизировать до одной строки.
    const pDate = new Date();
    const hour = withZero(pDate.getHours());
    const min = withZero(pDate.getMinutes());
    const day = withZero(pDate.getDate());
    const month = withZero(pDate.getMonth() + 1);
    const year = pDate.getFullYear();
    console.log(`${day}/${month}/${year} ${hour}:${min}`);
    console.log(pDate);
    return `${day}/${month}/${year} ${hour}:${min}`;
}

/*==================== ПЕРЕКЛЮЧАЄМ ВАЖНІСТЬ(important) ====================*/
var important = document.getElementById('important');
var left = document.getElementById('left');
var right = document.getElementById('right');

function isValid(n) {
	let min = 1;
	let max = 5;
    if (n >= min && n <= max) {
        return true;
    }
    return false;
}

left.addEventListener('click', function(e){
	let n = parseInt(important.value);
    --n;
	let val = isValid(n);
	if(!!val) {
		important.value = n;
        console.log("Inc: %d", n);
    }
});

right.addEventListener('click', function(e){
	let n = parseInt(important.value);
    ++n;
	let val = isValid(n);
	if(!!val) {
		important.value = n;
        console.log("Dec: %d", n);
    }
});

/*==================== ФОРМА ВХОДУ(form-box) ПЕРЕМИКАЧ ====================*/
let loginForm = document.getElementById("login");
let registerForm = document.getElementById("register");
let btnToggleForm = document.getElementById("btn-toggleForm");

function register(){
    loginForm.style.left = "-400px"
    registerForm.style.left = "50px"
    btnToggleForm.style.left = "102px"
}
function login(){
    loginForm.style.left = "50px"
    registerForm.style.left = "450px"
    btnToggleForm.style.left = "0"
}