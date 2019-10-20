import rssInputValidate from './inputValidator';
import getRssData from './getRssData';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';

document.addEventListener('DOMContentLoaded',() => {
  const rssUrlInput = document.getElementById('rssUrl');
  const mainForm = document.getElementById('mainForm');

  rssUrlInput.addEventListener('input', rssInputValidate);
  rssUrlInput.addEventListener('paste', rssInputValidate);

  mainForm.addEventListener('reset', () => {
    rssUrlInput.dispatchEvent(new Event('input'));
  });
  mainForm.addEventListener('submit', getRssData);


});
