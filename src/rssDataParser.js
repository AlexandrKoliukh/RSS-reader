import { uniqueId } from 'lodash';

const parser = new DOMParser();

export default (data) => {
  const docXML = parser.parseFromString(data, "text/xml");
  const error = docXML.querySelector('parsererror');
  if (error) throw new Error(error.querySelector('sourcetext'));

  const xmlItems = docXML.querySelectorAll('item');
  const description = docXML.querySelector('description').firstChild.data;
  const title = docXML.querySelector('title').firstChild.data;
  const items = Array.from(xmlItems).map((i) => {
    const title = i.querySelector('title').firstChild.data;
    const link = i.querySelector('guid').innerHTML;
    const description = i.querySelector('description').firstChild.data;
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