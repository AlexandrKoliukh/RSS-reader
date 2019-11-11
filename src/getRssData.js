// eslint-disable-next-line lodash-fp/use-fp
import { differenceWith } from 'lodash';
import axios from 'axios';
import rssDataParser from './rssDataParser';
import {
  isUrlFetched, setUrlFetched, setStateValue, getState,
} from './store';

const corsUrl = 'https://cors-anywhere.herokuapp.com/';
const rssUrlInput = document.getElementById('rssUrl');
const state = getState();

const fetchRss = () => axios.get(`${corsUrl}${state.url}`)
  .then(({ data }) => {
    const parsedData = rssDataParser(data);

    if (!isUrlFetched(state.url)) {
      setStateValue('rssStreams', [parsedData.stream, ...state.rssStreams]);
    }
    const newPosts = differenceWith(
      parsedData.items, state.rssItems, (obj1, obj2) => obj2.link === obj1.link,
    );

    setStateValue('rssItems', [...newPosts, ...state.rssItems]);
    setUrlFetched(state.url);
  })
  .then(() => setTimeout(() => fetchRss(), 5000));

const handleSubmit = (e) => {
  e.preventDefault();
  setStateValue('url', rssUrlInput.value.trim());
  setStateValue('fetchingState', 'requesting');
  fetchRss()
    .then(() => {
      setStateValue('fetchingState', 'success');
    })
    .catch((error) => {
      setStateValue('fetchingState', 'failed');
      throw new Error(error);
    });
};

export default handleSubmit;
