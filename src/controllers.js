import axios from 'axios';
// eslint-disable-next-line lodash-fp/use-fp
import { differenceWith } from 'lodash';
import isURL from 'validator/lib/isURL';
import parseRssData from './rssDataParser';

const isUrlFetched = (url, state) => state.fetchedUrls.includes(url);

export const change = (e, state) => {
  const currentState = state;
  const { value } = e.target;
  currentState.isValid = isURL(value.trim()) && !isUrlFetched(value.trim(), currentState);
};

export const fetchRss = (state) => {
  const currentState = state;
  const createUrl = (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

  return axios.get(createUrl(state.url))
    .then(({ data }) => {
      const parsedData = parseRssData(data);
      if (!isUrlFetched(currentState.url, currentState)) {
        currentState.rssStreams = [parsedData.stream, ...currentState.rssStreams];
      }
      currentState.fetchedUrls = [...currentState.fetchedUrls, currentState.url];
      const newPosts = differenceWith(
        parsedData.items, currentState.rssItems, (obj1, obj2) => obj2.link === obj1.link,
      );
      if (newPosts.length === 0) return;

      currentState.rssItems = [...newPosts, ...currentState.rssItems];
    })
    .then(() => setTimeout(fetchRss, 5000, currentState));
};

export const getRssData = (e, state) => {
  e.preventDefault();
  const currentState = state;
  const { value } = e.target.elements.rssUrl;
  currentState.url = value.trim();
  currentState.fetchingState = 'requesting';
  fetchRss(currentState)
    .then(() => {
      currentState.fetchingState = 'success';
    })
    .catch((error) => {
      currentState.fetchingState = 'failed';
      throw new Error(error);
    });
};
