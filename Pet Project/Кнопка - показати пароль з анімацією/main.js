const showPasswordButton = document.querySelector('#show-password-btn');
const passwordInput = document.querySelector('#password');

const TIME_SHOW_PASSWORD = 5000;

if (showPasswordButton && passwordInput) showPasswordButton.addEventListener('click', showPassword);

function showPassword(){
    if (passwordInput.classList.contains('animate-password')) return;
    passwordInput.setAttribute('type', 'text');
    passwordInput.classList.add('animate-password');

    let interval = setInterval(function(){
        passwordInput.setAttribute('type', 'password');
        passwordInput.classList.remove('animate-password');
        clearInterval(interval);
    }, TIME_SHOW_PASSWORD);
}