import isURL from 'validator/lib/isURL';
import WatchJS from 'melanke-watchjs';
import store from './Store';

const { watch } = WatchJS;

const state = {
  isValid: false,
};

const rssUrlInput = document.getElementById('rssUrl');
const rssUrlSubmitButton = document.getElementById('urlSubmit');

export default (e) => {
  const { value } = e.target;
  console.log(store);
  state.isValid = isURL(value.trim()) && !store.isUrlFetched(value);
}

watch(state, 'isValid', () => {
  const { isValid } = state;
  if (isValid) {
    rssUrlSubmitButton.removeAttribute('disabled');
    rssUrlInput.classList.remove('border-danger');
  } else {
    rssUrlSubmitButton.setAttribute('disabled', 'disabled');
    rssUrlInput.classList.add('border-danger');
  }
});
