import rssInputValidate from './inputValidator';
import getRssData from './getRssData';

import 'bootstrap/dist/css/bootstrap.min.css';

document.addEventListener('DOMContentLoaded',() => {
  const rssUrlInput = document.getElementById('rssUrl');
  rssUrlInput.addEventListener('input', rssInputValidate);
  rssUrlInput.addEventListener('paste', rssInputValidate);

  const mainForm = document.getElementById('mainForm');
  mainForm.addEventListener('submit', getRssData);
});
