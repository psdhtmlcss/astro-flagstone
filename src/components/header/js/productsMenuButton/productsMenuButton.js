import { header, productsNav, body } from '../../../variables';

const productsMenuButton = header.querySelector('.js-products-menu-button');

const onProductsMenuButtonClick = (evt) => {
  evt.preventDefault();
  if (productsNav) {
    productsNav.classList.add('open');
    body.style.overflow = 'hidden';
  }
};

productsMenuButton.addEventListener('click', onProductsMenuButtonClick);

