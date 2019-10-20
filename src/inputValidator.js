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
  state.isValid = isURL(value.trim()) && !store.isUrlFetched(value.trim());
}

const setValidState = () => {
  rssUrlSubmitButton.removeAttribute('disabled');
  rssUrlInput.classList.remove('border-danger');
};

const setInvalidState = () => {
  rssUrlSubmitButton.setAttribute('disabled', 'disabled');
  rssUrlInput.classList.add('border-danger');
};

watch(state, 'isValid', () => {
  const { isValid } = state;
  if (isValid) {
    setValidState();
  } else {
    setInvalidState();
  }
});
