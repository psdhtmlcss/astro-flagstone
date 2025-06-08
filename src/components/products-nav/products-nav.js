import { productsNav, body } from '../variables';

const HEADER_HEIGHT = 97;
const MOBILE_SCREEN_WIDTH = 767;
const closeButton = productsNav.querySelector('.js-close-button');

const onCloseButtonClick = (evt) => {
  evt.preventDefault();
  productsNav.classList.remove('open');
  body.style.overflow = 'visible';
};

closeButton.addEventListener('click', onCloseButtonClick);
document.addEventListener('scroll', () => {
  if (window.screen.width > MOBILE_SCREEN_WIDTH) {
    window.scrollY >= HEADER_HEIGHT ? productsNav.classList.add('fixed') : productsNav.classList.remove('fixed');
  }
});