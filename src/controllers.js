import axios from 'axios';
// eslint-disable-next-line lodash-fp/use-fp
import { differenceWith } from 'lodash';
import isURL from 'validator/lib/isURL';
import parseRssData from './rssDataParser';

const state = {
  fetchedUrls: [],
  fetchingState: 'none',
  rssItems: [],
  rssStreams: [],
  isValid: false,
  url: '',
};

export const getState = () => state;

const isUrlFetched = url => state.fetchedUrls.includes(url);
const setUrlFetched = (url) => {
  const { fetchedUrls } = state;
  state.fetchedUrls = [...fetchedUrls, url];
};

const corsUrl = 'https://cors-anywhere.herokuapp.com/';

export const inputValidator = (e) => {
  const { value } = e.target;
  state.isValid = isURL(value.trim()) && !isUrlFetched(value.trim());
};

export const fetchRss = () => axios.get(`${corsUrl}${state.url}`)
  .then(({ data }) => {
    const parsedData = parseRssData(data);
    if (!isUrlFetched(state.url)) {
      state.rssStreams = [parsedData.stream, ...state.rssStreams];
    }
    setUrlFetched(state.url);
    const newPosts = differenceWith(
      parsedData.items, state.rssItems, (obj1, obj2) => obj2.link === obj1.link,
    );
    if (newPosts.length === 0) return;

    state.rssItems = [...newPosts, ...state.rssItems];
  })
  .then(() => setTimeout(() => fetchRss(), 5000));

export const getRssData = (e) => {
  e.preventDefault();
  const { value } = e.target.rssUrl;
  state.url = value.trim();
  state.fetchingState = 'requesting';
  fetchRss()
    .then(() => {
      state.fetchingState = 'success';
    })
    .catch((error) => {
      state.fetchingState = 'failed';
      throw new Error(error);
    });
};
