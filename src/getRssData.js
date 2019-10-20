import WatchJS from 'melanke-watchjs';
import axios from 'axios';
import rssDataParser from './rssDataParser';
import { rssListItemFormatter, rssStreamFormatter } from './rssDataFormatters';
import getModalContent from './modal';

import store from './Store';

// const xml = ('<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title><![CDATA[Lorem ipsum feed for an interval of 1 minutes]]></title><description><![CDATA[This is a constantly updating lorem ipsum feed]]></description><link>http://example.com/</link><generator>RSS for Node</generator><lastBuildDate>Sat, 19 Oct 2019 15:46:09 GMT</lastBuildDate><pubDate>Sat, 19 Oct 2019 15:46:00 GMT</pubDate><copyright><![CDATA[Michael Bertolacci, licensed under a Creative Commons Attribution 3.0 Unported License.]]></copyright><ttl>1</ttl><item><title><![CDATA[Lorem ipsum 2019-10-19T15:46:00Z]]></title><description><![CDATA[Ut aliqua ut velit nisi proident commodo ad.]]></description><link>http://example.com/test/1571499960</link><guid isPermaLink="true">http://example.com/test/1571499960</guid><dc:creator><![CDATA[John Smith]]></dc:creator><pubDate>Sat, 19 Oct 2019 15:46:00 GMT</pubDate></item><item><title><![CDATA[Lorem ipsum 2019-10-19T15:45:00Z]]></title><description><![CDATA[Ullamco id culpa consequat incididunt fugiat in ipsum est amet.]]></description><link>http://example.com/test/1571499900</link><guid isPermaLink="true">http://example.com/test/1571499900</guid><dc:creator><![CDATA[John Smith]]></dc:creator><pubDate>Sat, 19 Oct 2019 15:45:00 GMT</pubDate></item><item><title><![CDATA[Lorem ipsum 2019-10-19T15:44:00Z]]></title><description><![CDATA[In non commodo dolore eiusmod qui consequat dolor deserunt elit.]]></description><link>http://example.com/test/1571499840</link><guid isPermaLink="true">http://example.com/test/1571499840</guid><dc:creator><![CDATA[John Smith]]></dc:creator><pubDate>Sat, 19 Oct 2019 15:44:00 GMT</pubDate></item><item><title><![CDATA[Lorem ipsum 2019-10-19T15:43:00Z]]></title><description><![CDATA[Fugiat esse anim aliqua pariatur ea Lorem cillum dolor proident culpa.]]></description><link>http://example.com/test/1571499780</link><guid isPermaLink="true">http://example.com/test/1571499780</guid><dc:creator><![CDATA[John Smith]]></dc:creator><pubDate>Sat, 19 Oct 2019 15:43:00 GMT</pubDate></item><item><title><![CDATA[Lorem ipsum 2019-10-19T15:42:00Z]]></title><description><![CDATA[Exercitation sit labore officia ad qui nostrud deserunt id aliqua tempor do enim nisi.]]></description><link>http://example.com/test/1571499720</link><guid isPermaLink="true">http://example.com/test/1571499720</guid><dc:creator><![CDATA[John Smith]]></dc:creator><pubDate>Sat, 19 Oct 2019 15:42:00 GMT</pubDate></item><item><title><![CDATA[Lorem ipsum 2019-10-19T15:41:00Z]]></title><description><![CDATA[Sunt sit id culpa et cillum velit amet quis.]]></description><link>http://example.com/test/1571499660</link><guid isPermaLink="true">http://example.com/test/1571499660</guid><dc:creator><![CDATA[John Smith]]></dc:creator><pubDate>Sat, 19 Oct 2019 15:41:00 GMT</pubDate></item><item><title><![CDATA[Lorem ipsum 2019-10-19T15:40:00Z]]></title><description><![CDATA[Duis labore culpa proident minim in.]]></description><link>http://example.com/test/1571499600</link><guid isPermaLink="true">http://example.com/test/1571499600</guid><dc:creator><![CDATA[John Smith]]></dc:creator><pubDate>Sat, 19 Oct 2019 15:40:00 GMT</pubDate></item><item><title><![CDATA[Lorem ipsum 2019-10-19T15:39:00Z]]></title><description><![CDATA[Lorem ex elit excepteur magna ut quis sit consequat qui non minim id.]]></description><link>http://example.com/test/1571499540</link><guid isPermaLink="true">http://example.com/test/1571499540</guid><dc:creator><![CDATA[John Smith]]></dc:creator><pubDate>Sat, 19 Oct 2019 15:39:00 GMT</pubDate></item><item><title><![CDATA[Lorem ipsum 2019-10-19T15:38:00Z]]></title><description><![CDATA[Irure sit culpa Lorem culpa nulla mollit anim voluptate Lorem.]]></description><link>http://example.com/test/1571499480</link><guid isPermaLink="true">http://example.com/test/1571499480</guid><dc:creator><![CDATA[John Smith]]></dc:creator><pubDate>Sat, 19 Oct 2019 15:38:00 GMT</pubDate></item><item><title><![CDATA[Lorem ipsum 2019-10-19T15:37:00Z]]></title><description><![CDATA[Incididunt elit non est commodo elit elit amet aute anim dolore voluptate magna enim magna.]]></description><link>http://example.com/test/1571499420</link><guid isPermaLink="true">http://example.com/test/1571499420</guid><dc:creator><![CDATA[John Smith]]></dc:creator><pubDate>Sat, 19 Oct 2019 15:37:00 GMT</pubDate></item></channel></rss>');

const { watch } = WatchJS;
const corsUrl = 'https://cors-anywhere.herokuapp.com/';
// const corsUrl = 'https://crossorigin.me/';

const state = {
  fetchingState: 'none',
  rssItems: [],
};

const mainForm = document.getElementById('mainForm');
const formSubmitButton = document.getElementById('urlSubmit');
const rssUrlInput = document.getElementById('rssUrl');
const rssDataContainer = document.getElementById('rssList');
const rssStreamContainer = document.getElementById('rssStreamList');

const setClickOnItems = (parsedData) => {
  parsedData.items.map((i) => {
    document.getElementById(i.id).addEventListener('click', () => {
      document.getElementById('modal').innerHTML = getModalContent(i);
    })
  })
};

export default (e) => {
  e.preventDefault();
  state.fetchingState = 'requesting';
  const url = rssUrlInput.value.trim();

  return axios.get(`${corsUrl}${url}`)
    .then(({ data }) => {
      const parsedData = rssDataParser(data);
      const formattedData = rssListItemFormatter(parsedData);
      const formattedStream = rssStreamFormatter(parsedData);

      rssDataContainer.innerHTML += formattedData.join('\n');
      rssStreamContainer.innerHTML += formattedStream;
      setClickOnItems(parsedData);

      store.setUrlFetched(url);
      state.fetchingState = 'success';
    })
    .catch((error) => {
      state.fetchingState = 'failed';
      throw new Error(error);
    });
}

const loader = document.getElementById('loaderContainer');

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
