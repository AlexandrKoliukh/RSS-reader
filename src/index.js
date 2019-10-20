import rssInputValidate from './inputValidator';
import getRssData from './getRssData';

import 'bootstrap/dist/css/bootstrap.min.css';

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
