// @ts-check
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { promises as fs } from 'fs';
import path from 'path';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import prettier from 'prettier';
import nock from 'nock';
import MutationObserver from 'mutation-observer';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import app from '../src/app';

global.MutationObserver = MutationObserver;
axios.defaults.adapter = httpAdapter;
nock.disableNetConnect();


const prettierOptions = {
  parser: 'html',
  htmlWhitespaceSensitivity: 'ignore',
  tabWidth: 4,
};
const getTree = (el) => prettier.format(el.innerHTML, prettierOptions);
const testUrl = 'http://lorem-rss.herokuapp.com/feed';
const getFixturePath = (fileName) => path.resolve(__dirname, `../__fixtures__/${fileName}`);

let scope;

beforeEach(async () => {
  const pathToHtml = getFixturePath('index.html');
  const rssPath = getFixturePath('rss.xml');
  const html = await fs.readFile(pathToHtml, 'utf8');
  const rssData = await fs.readFile(rssPath, 'utf8');

  scope = nock('https://api.allorigins.win')
    .get('/raw')
    .query({ url: testUrl })
    .reply(200, rssData);

  document.body.innerHTML = html;
  app();
});

afterEach(async () => {
  nock.cleanAll();
});

test('initial state', async () => {
  const list = screen.getByTestId('rssList');
  const streamList = screen.getByTestId('streamList');
  const form = screen.getByTestId('urlForm');
  expect(getTree(list)).toMatchSnapshot();
  expect(getTree(streamList)).toMatchSnapshot();
  expect(getTree(form)).toMatchSnapshot();
});

test('Fetch and render RSS', async () => {
  const urlInput = screen.getByTestId('urlInput');
  const form = screen.getByTestId('urlForm');
  const list = screen.getByTestId('rssList');
  // const urlSubmit = document.getElementById('urlSubmit');
  const streamList = screen.getByTestId('streamList');

  userEvent.type(urlInput, testUrl);
  // userEvent.click(urlSubmit);
  form.dispatchEvent(new Event('submit'));

  await waitFor(() => {
    scope.done();
  });

  const showBtn = document.querySelector('[data-target="#modal"]');

  const modal = screen.getByTestId('modalContainer');

  userEvent.click(showBtn);

  expect(urlInput.value).toBe('');
  expect(getTree(list)).toMatchSnapshot();
  expect(getTree(streamList)).toMatchSnapshot();
  expect(getTree(modal)).toMatchSnapshot();
});
