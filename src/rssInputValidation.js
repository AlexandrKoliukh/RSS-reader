import isURL from 'validator/lib/isURL';
import WatchJS from 'melanke-watchjs';

const { watch } = WatchJS;

const currentState = {
  isValid: true,
};

const rssUrlInput = document.getElementById('rssUrl');

export default () => {
  const { value } = rssUrlInput;
  console.log(value);
  currentState.isValid = isURL(value);
}

watch(currentState, 'isValid', () => {
  const { isValid } = currentState;
  if (isValid) rssUrlInput.classList.remove('border-danger');
  else rssUrlInput.classList.add('border-danger');
});
