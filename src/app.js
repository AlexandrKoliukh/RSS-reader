import { watch } from 'melanke-watchjs';
import { getRssData, checkInputValid } from './controllers';
import {
  renderForm, renderItems, renderStreams, valid,
} from './watchers';

export default () => {
  const state = {
    fetchedUrls: [],
    fetchingState: 'none',
    rssItems: [],
    rssStreams: [],
    isValid: false,
    url: '',
  };

  const rssUrlInput = document.getElementById('rssUrl');
  const mainForm = document.getElementById('mainForm');

  rssUrlInput.addEventListener('input', e => checkInputValid(e, state));
  rssUrlInput.addEventListener('paste', e => checkInputValid(e, state));

  mainForm.addEventListener('reset', () => {
    rssUrlInput.dispatchEvent(new Event('input'));
  });
  mainForm.addEventListener('submit', e => getRssData(e, state));

  watch(state, 'fetchingState', () => renderForm(state));
  watch(state, 'rssItems', () => renderItems(state));
  watch(state, 'rssStreams', () => renderStreams(state));
  watch(state, 'isValid', () => valid(state));
};
