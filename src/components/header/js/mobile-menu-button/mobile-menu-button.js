import { header, headerNav, body } from '../../../variables';

const mobileMenuButton = header.querySelector('.js-mobile-menu-button');

const onMobileMenuButtonClick = (evt) => {
  evt.preventDefault();
  headerNav.classList.add('open');
  body.style.overflow = 'hidden';
};

mobileMenuButton.addEventListener('click', onMobileMenuButtonClick);