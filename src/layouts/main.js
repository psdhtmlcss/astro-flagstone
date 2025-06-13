import IMask from 'imask';
import Modal from 'bootstrap/js/dist/modal';
import '@/components/header/header.js';
import '@/components/productsNav/productsNav.js';
import '@/components/cookieBlock/cookieBlock.js';

const maskOptions = {
  mask: '+{7}(000)000-00-00'
};

const phoneInput = document.querySelector('.js-phone-input');
const feedbackModalElement = document.getElementById('feedbackModal');

let mask;

if (phoneInput) {
  mask = IMask(phoneInput, maskOptions);
}

feedbackModalElement.addEventListener('show.bs.modal', evt => {
  let heading = feedbackModalElement.querySelector('.modal-title');
  heading.textContent = evt.relatedTarget.innerText;
})

feedbackModalElement.addEventListener('shown.bs.modal', evt => {
  phoneInput.focus();
})