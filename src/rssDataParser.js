import { uniqueId } from 'lodash';

const parser = new DOMParser();

export default (data) => {
  const docXML = parser.parseFromString(data, "text/xml");
  const error = docXML.querySelector('parsererror');
  if (error) throw new Error(error.querySelector('sourcetext'));

  const xmlItems = docXML.querySelectorAll('item');
  const description =
    docXML.querySelector('description').firstChild ?
      docXML.querySelector('description').firstChild.data
    : docXML.querySelector('description').innerText;

  const title =
    docXML.querySelector('title').firstChild ?
      docXML.querySelector('title').firstChild.data
    : docXML.querySelector('title').innerText;

  const items = Array.from(xmlItems).map((i) => {
    const title =
      i.querySelector('title').firstChild ?
        i.querySelector('title').firstChild.data
      : i.querySelector('title').innerText;

    const link = i.querySelector('guid').innerHTML;
    const description =
      i.querySelector('description').firstChild ?
        i.querySelector('description').firstChild.data
      : i.querySelector('description').innerText;

    return {
      title,
      link,
      description,
      id: uniqueId(),
    }
  });
  return {
    title,
    description,
    items,
  }
}