import { modalContentFormatter, rssListItemFormatter, rssStreamFormatter } from './renderer';

const rssUrlInput = document.getElementById('rssUrl');
const rssUrlSubmitButton = document.getElementById('urlSubmit');
const mainForm = document.getElementById('mainForm');
const formSubmitButton = document.getElementById('urlSubmit');
const rssDataContainer = document.getElementById('rssList');
const rssStreamContainer = document.getElementById('rssStreamList');
const loader = document.getElementById('loaderContainer');
const modal = document.getElementById('modal');

export const valid = (state) => {
  const { isValid } = state;
  if (isValid) {
    rssUrlSubmitButton.removeAttribute('disabled');
    rssUrlInput.classList.remove('border-danger');
  } else {
    rssUrlSubmitButton.setAttribute('disabled', 'disabled');
    rssUrlInput.classList.add('border-danger');
  }
};

export const renderForm = (state) => {
  const { fetchingState } = state;
  switch (fetchingState) {
    case 'requesting':
      loader.classList.remove('d-none');
      formSubmitButton.setAttribute('disabled', 'disabled');
      break;
    case 'success':
      loader.classList.add('d-none');
      formSubmitButton.removeAttribute('disabled');
      mainForm.reset();
      break;
    case 'failed':
      loader.classList.add('d-none');
      formSubmitButton.removeAttribute('disabled');
      break;
    case 'none': break;
    default: throw new Error('Unknown state');
  }
};

const handleClick = (e, state) => {
  const { target } = e;
  if (!target.dataset.toggle) return;

  const modalData = state.rssItems.find(i => i.link === target.dataset.href);
  modal.innerHTML = modalContentFormatter(modalData);
};

export const renderItems = (state) => {
  const { rssItems } = state;
  rssDataContainer.innerHTML = rssListItemFormatter(rssItems).join('\n');
  rssItems.forEach((i) => {
    const item = document.querySelector(`[data-href="${i.link}"]`);
    item.addEventListener('click', e => handleClick(e, state));
  });
};

export const renderStreams = (state) => {
  const { rssStreams } = state;
  const formattedStreams = rssStreams.map(i => rssStreamFormatter(i));
  rssStreamContainer.innerHTML = formattedStreams.join('\n');
};
