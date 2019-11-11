import WatchJS from 'melanke-watchjs';
import { getState } from './store';
import rssInputValidate from './inputValidator';
import getRssData from './getRssData';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import { rssListItemFormatter, rssStreamFormatter } from './rssDataFormatters';
import getModalContent from './modal';

const { watch } = WatchJS;
const state = getState();

document.addEventListener('DOMContentLoaded', () => {
  const rssUrlInput = document.getElementById('rssUrl');
  const mainForm = document.getElementById('mainForm');

  rssUrlInput.addEventListener('input', rssInputValidate);
  rssUrlInput.addEventListener('paste', rssInputValidate);

  mainForm.addEventListener('reset', () => {
    rssUrlInput.dispatchEvent(new Event('input'));
  });

  mainForm.addEventListener('submit', getRssData);
});

const rssUrlInput = document.getElementById('rssUrl');
const rssUrlSubmitButton = document.getElementById('urlSubmit');

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

const mainForm = document.getElementById('mainForm');
const formSubmitButton = document.getElementById('urlSubmit');
const rssDataContainer = document.getElementById('rssList');
const rssStreamContainer = document.getElementById('rssStreamList');
const loader = document.getElementById('loaderContainer');
const modal = document.getElementById('modal');

watch(state, 'fetchingState', () => {
  const { fetchingState } = state;
  if (fetchingState === 'requesting') {
    loader.classList.remove('d-none');
    formSubmitButton.setAttribute('disabled', 'disabled');
  } else if (fetchingState === 'success') {
    loader.classList.add('d-none');
    formSubmitButton.removeAttribute('disabled');
    mainForm.reset();
  } else if (fetchingState === 'failed') {
    loader.classList.add('d-none');
    formSubmitButton.removeAttribute('disabled');
  }
});

const handleClick = i => () => {
  modal.innerHTML = getModalContent(i);
  return false;
};

watch(state, 'rssItems', () => {
  const { rssItems } = state;
  rssDataContainer.innerHTML = rssListItemFormatter(rssItems).join('\n');
  rssItems.forEach((i) => {
    const item = document.getElementById(i.id);
    item.addEventListener('click', handleClick(i));
  });
});

watch(state, 'rssStreams', () => {
  const { rssStreams } = state;
  const formattedStreams = rssStreams.map(i => rssStreamFormatter(i));
  rssStreamContainer.innerHTML = formattedStreams.join('\n');
});
