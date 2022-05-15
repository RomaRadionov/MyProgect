var date = new Date();

const elementDate = document.getElementById("printDate");
const elementDay = document.getElementById("printDay");
const elementTime = document.getElementById("printTime");
const listOfDays =[
    "Неділя",
    "Понеділок",
    "Вівторок",
    "Середа",
    "Четверг",
    "П'ятниця",
    "Субота",
];

function printDate() {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    elementDate.innerHTML = day + " / " + month + " / " + year;
}

function printDay() {
    date = new Date();
    var numberOfDay = date.getDay();
    var day = listOfDays[numberOfDay];
    elementDay.innerHTML = day;
}

function printTime() {
    date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (hours > 12) {
        hours = hours -12;
        elementTime.innerHTML = hours + " : " + minutes + " : " + seconds + " PM ";
    }
    else if (hours < 12) {
        elementTime.innerHTML = hours + " : " + minutes + " : " + seconds + " AM ";
    }
    else if (hours = 12) {
        elementTime.innerHTML = hours + " : " + minutes + " : " + seconds + " PM ";
    }
}

setInterval(function() {
    printTime();
    printDate();
    printDay();
}, 1000)