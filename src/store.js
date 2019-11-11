const state = {
  fetchedUrls: [],
  fetchingState: 'none',
  rssItems: [],
  rssStreams: [],
  newPostsFetchingState: 'none',
  newPosts: [],
  timer: null,
  url: '',
  isValid: false,
};

export const setUrlFetched = (url) => {
  const { fetchedUrls } = state;
  state.fetchedUrls = [...fetchedUrls, url];
};

export const isUrlFetched = url => state.fetchedUrls.includes(url);

export const getState = () => state;

export const setStateValue = (key, value) => {
  state[key] = value;
};
