import { header, headerNav, body } from "../../../variables";

const closeButton = header.querySelector('.js-close-button');

const onCloseButtonClick = (evt) => {
  evt.preventDefault();
  headerNav.classList.remove('open');
  body.style.overflow = 'visible';
};

closeButton.addEventListener('click', onCloseButtonClick);