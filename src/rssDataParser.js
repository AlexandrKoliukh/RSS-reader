import uniqueId from 'lodash/fp/uniqueId';

const parser = new DOMParser();
const getData = node => (node.firstChild ? node.firstChild.data : node.innerText);

export default (data) => {
  const docXML = parser.parseFromString(data, 'text/xml');
  const error = docXML.querySelector('parsererror');
  if (error) throw new Error(error.querySelector('sourcetext').innerText);
  const xmlItems = docXML.querySelectorAll('item');

  const description = getData(docXML.querySelector('description'));
  const title = getData(docXML.querySelector('title'));

  const items = Array.from(xmlItems).map(i => ({
    title: getData(i.querySelector('title')),
    link: i.querySelector('guid').innerHTML,
    description: getData(i.querySelector('description')),
    pubDate: i.querySelector('pubDate').innerHTML,
    id: uniqueId(),
  }));

  return {
    stream: {
      description,
      title,
      id: uniqueId(),
    },
    items,
  };
};
