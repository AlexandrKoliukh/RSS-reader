import rssInputValidator from './rssInputValidation';
import 'bootstrap/dist/css/bootstrap.min.css';

document.addEventListener('DOMContentLoaded',() => {
  const a = document.getElementById('rssUrl');
  a.addEventListener('input', rssInputValidator);
});
