const cookieBlock = document.querySelector('.cookie-block');
const button = cookieBlock.querySelector('.js-cookie-button');

if (localStorage.getItem('cookie-block')) {
  cookieBlock.classList.add('is-hidden');
}

button.addEventListener('click', () => {
  localStorage.setItem('cookie-block', 'true');
  cookieBlock.classList.add('is-hidden');
});