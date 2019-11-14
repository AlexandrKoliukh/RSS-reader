import WatchJS from 'melanke-watchjs';
import { inputValidator, getRssData, getState } from './controllers';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import {
  renderForm, renderItems, renderStreams, valid,
} from './watchers';

const { watch } = WatchJS;
const state = getState();

document.addEventListener('DOMContentLoaded', () => {
  const rssUrlInput = document.getElementById('rssUrl');
  const mainForm = document.getElementById('mainForm');

  rssUrlInput.addEventListener('input', e => inputValidator(e));
  rssUrlInput.addEventListener('paste', e => inputValidator(e));

  mainForm.addEventListener('reset', () => {
    rssUrlInput.dispatchEvent(new Event('input'));
  });

  mainForm.addEventListener('submit', e => getRssData(e));
});

watch(state, 'fetchingState', () => renderForm(state));
watch(state, 'rssItems', () => renderItems(state));
watch(state, 'rssStreams', () => renderStreams(state));
watch(state, 'isValid', () => valid(state));
