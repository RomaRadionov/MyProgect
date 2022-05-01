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
    <label class="todoList__custom-checkbox">
        <li class="todoList__list ${task.completed ? 'done' : ''}">
            <div class="todoList__list-nav">
                <input onclick="completeTask(${index})" class="todoList__done-btn todoList__hidden-checkbox" type="checkbox" ${task.completed ? 'checkbox' : ''}>
                <div class="todoList__ckeckbox">
                    <div class="todoList__checkmark">&#x2713;</div>
                </div>
                <div class="todoList__date">${task.date}</div>
                <div class="entering-numbers" title="Важніть завдання">
                    <button class="entering-numbers__arrow-left" id="left"><i class="fas fa-caret-left"></i></button>
                    <input class="entering-numbers__important" type="text" value="${task.important}" id="important" readonly>
                <button class="entering-numbers__arrow-right" id="right"><i class="fas fa-caret-right"></i></button>
                </div>
                <button class="todoList__edite" title="Редагувати" onclick="editeTaskModal(${index})"><i class="fas fa-edit"></i></button>
                <button class="todoList__delete" title="Видалити" onclick="deleteTaskModal(${index})"><i class="fas fa-times"></i></button>
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

/*==================== Фільтруємо таски(виконані таски внизу списку будуть) ====================*/
const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks,...completedTasks];
}

const filterButtonActiv = localStorage.getItem('activButton');
// console.log(filterButtonActiv);

const filterChecked = () => {
    const all = document.getElementById('all');
    const active = document.getElementById('active');
    const completed = document.getElementById('completed');
    if(filterButtonActiv == 'all'){
        all.checked = true;
        localStorage.setItem('activButton', 'all');
    }
    else if(filterButtonActiv == 'active'){
        active.checked = true;
        localStorage.setItem('activButton', 'active');
    }
    else if(filterButtonActiv == 'completed'){
        completed.checked = true;
        localStorage.setItem('activButton', 'completed');
        console.log(completed.checked);
    }
}

const fillHtmlList = () => {
    document.querySelectorAll('.bottom-items__filter input').forEach(radio => {
        radio.addEventListener('change', (e) => {
            filterTodoItems(e.target.id);
        });
    });


    /*==================== ФІЛЬТР ВИКОНАНИХ ТА АКТИВНИХ ТАСКІВ  ====================*/
    function filterTodoItems(id) {
        switch(id) {
            case 'completed':
                todoList.innerHTML = "";
                if (tasks.length > 0) {
                    // filterTasks();
                    tasks.forEach((item, index) => {
                        // console.log(item, index);
                        if(item.completed){
                            todoList.innerHTML += createTemplate(item, index);
                        }
                    });
                    todoItemElems = document.querySelectorAll('.todoList__list');
                }
                localStorage.setItem('activButton', 'completed')
                // filterChecked();
                break;
            case 'active':
                todoList.innerHTML = "";
                if (tasks.length > 0) {
                    // filterTasks();
                    tasks.forEach((item, index) => {
                        // console.log(item, index);
                        if(item.completed == false){
                            todoList.innerHTML += createTemplate(item, index);
                        }
                    });
                    todoItemElems = document.querySelectorAll('.todoList__list');
                }
                localStorage.setItem('activButton', 'active')
                // filterChecked();
                break;
            default: //All
                todoList.innerHTML = "";
                if (tasks.length > 0) {
                    filterTasks();
                    tasks.forEach((item, index) => {
                        // console.log(item, index);
                        todoList.innerHTML += createTemplate(item, index);
                    });
                    todoItemElems = document.querySelectorAll('.todoList__list');
                }
                localStorage.setItem('activButton', 'all')
                // filterChecked();
                break;
        }
    }
    filterTodoItems();
    /*==================== Відображаємо кількість тасків  ====================*/
    const itemsLeft = document.querySelector('.bottom-items__left span');
    itemsLeft.innerText = tasks.length;
}

filterChecked();
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
    filterChecked();
}
/*==================== INPUT ПОЛЕ ПУСТЕ!!! ====================*/
let emptyTask = document.getElementById('modal-empty');

const closeModalEmpty = () => {
    modal.innerHTML = '';
}

const empty = () => {
    modal.innerHTML += `
    <div class="modal-main active">
        <div class="modal-main__content" onclick="closeModalEmpty()">
            <div class="modal-main__body">
                <p class="modal-main__title">Поле пусте!!!</p>
                <button class="modal-main__close" id="delete"onclick="closeModalEmpty()">&times;</button>
                <div class="empty__actions">
                    <button class="button"onclick="closeModalEmpty()">Ok</button>
                </div>
            </div>
        </div>
    </div>
    `;
    return modal;
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
    <div class="modal-main active" id="modal__delete">
        <div class="modal-main__content" onclick="closeModalDeleteWindow()">
            <div class="modal-main__body">
                <p class="modal-main__title">Видалити задачу?</p>
                <button class="modal-main__close" id="delete" onclick="closeModalDeleteWindow()">&times;</button>
                <div class="modal-main__actions">
                    <button class="button" onclick="deleteTask(${index})">Так</button>
                    <button class="button" onclick="closeModalDeleteWindow()">Ні</button>
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
    <div class="modal-main active" id="modal__delete">
        <div class="modal-main__content">
            <div class="modal-main__body">
                <p class="modal-main__title">Редагувати завдання</p>
                <button class="modal-main__close" id="delete" onclick="closeModalDeleteWindow()">&times;</button>
                <textarea class="modal-main__input" id="modal-main__input">${tasks[index].description}</textarea>
                <div class="modal-main__actions">
                    <button class="button" onclick="editeTask(${index})">Зберегти</button>
                    <button class="button" onclick="closeModalDeleteWindow()">Відміна</button>
                </div>
            </div>
        </div>
    </div>
    `;
    return modal;
}

const editeTask = (index) => {
    let deskTaskTextArea = document.getElementById("modal-main__input").value;
    console.log(deskTaskTextArea);
    tasks[index].description = deskTaskTextArea;
    modal.innerHTML = '';
    updateLocal();
    fillHtmlList();
}

/*==================== Показує в консолі на який клас нажали ====================*/
document.addEventListener('click', (e) => {
    // console.log(e.target.classList.value);
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
let btnToggleForm = document.getElementById("form-box__toggle");
let formBox = document.getElementById("form-box");
let main = document.getElementById("main");

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

/*==================== ФОРМА ВХОДУ(form-box) АВТОРИЗАЦІЯ ====================*/
function exe (){
    let username = document.getElementById("username").value;
    let pass = document.getElementById("pass").value;
    if(username == "test" && pass == "test"){
        formBox.style.display = "none"
        main.style.display = "block";
    }
    else{
        console.log(username.value);
        console.log(pass.value);
    }
}

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'light'
const iconTheme = 'fa-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('theme')
const selectedIcon = localStorage.getItem('icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('theme', getCurrentTheme())
    localStorage.setItem('icon', getCurrentIcon())
})

/*==================== IMPORTANT SORT ====================*/
const importantBtn = document.getElementById('importantBtn');
const importantBtnIcon = document.getElementById('importantBtnIcon');

importantBtn.addEventListener('click', () => {
    if(importantBtnIcon.classList.contains('fa-caret-up')) {
        importantBtnIcon.classList.remove('fa-caret-up')
        importantBtnIcon.classList.toggle('fa-caret-down')
        importantSortUp()
    }

    else if(importantBtnIcon.classList.contains('fa-caret-down')) {
        importantBtnIcon.classList.remove('fa-caret-down')
        importantBtnIcon.classList.toggle('fa-caret-up')
        importantSortDown()
    }
})

const importantSortUp = () => {
    tasks.sort(function(a, b) {
        return a.important - b.important
    })
    todoList.innerHTML = "";
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            todoList.innerHTML += createTemplate(item, index);
        });
        // todoItemElems = document.querySelectorAll('.todoList__list');
    }
}

const importantSortDown = () => {
    tasks.sort(function(a, b) {
        return b.important - a.important
    })
    todoList.innerHTML = "";
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            todoList.innerHTML += createTemplate(item, index);
        });
        // todoItemElems = document.querySelectorAll('.todoList__list');
    }
}

/*==================== DATA SORT ====================*/
const dataBtn = document.getElementById('dataBtn');
const dataBtnIcon = document.getElementById('dataBtnIcon');

dataBtn.addEventListener('click', () => {
    if(dataBtnIcon.classList.contains('fa-caret-up')) {
        dataBtnIcon.classList.remove('fa-caret-up')
        dataBtnIcon.classList.toggle('fa-caret-down')
        dataSortUp()
    }

    else if(dataBtnIcon.classList.contains('fa-caret-down')) {
        dataBtnIcon.classList.remove('fa-caret-down')
        dataBtnIcon.classList.toggle('fa-caret-up')
        dataSortDown()
    }
})

const dataSortUp = () => {
    tasks.sort(function(a, b) {
        // let date1 = new Date(b.date)
        // console.log(date1, a.description)
        // let date2 = new Date(a.date, a.description)
        // console.log(date2)
        // // return date1 - date2
        // return date1 > date2 ? 1 : -1
        // console.log(`a`, new Date(a.date).valueOf(), a.description)
        // console.log(`b`, new Date(b.date).valueOf(), b.description)
        return new Date(a.date).valueOf() > new Date(b.date).valueOf() ? 1 : -1
    })
    todoList.innerHTML = "";
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            todoList.innerHTML += createTemplate(item, index);
        });
        // todoItemElems = document.querySelectorAll('.todoList__list');
    }
}

const dataSortDown = () => {
    tasks.sort(function(a, b) {
        // let date1 = new Date(a.date)
        // console.log(date1)
        // let date2 = new Date(b.date)
        // console.log(date2)
        // return date1 > date2 ? 1 : -1
        // return a.date > b.date ? 1 : -1
        return new Date(b.date).valueOf() > new Date(a.date).valueOf() ? 1 : -1
    })
    todoList.innerHTML = "";
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            todoList.innerHTML += createTemplate(item, index);
        });
        // todoItemElems = document.querySelectorAll('.todoList__list');
    }
}