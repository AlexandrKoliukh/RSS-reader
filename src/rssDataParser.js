const parser = new DOMParser();

export default (data) => {
  const docXML = parser.parseFromString(data, 'text/xml');
  const error = docXML.querySelector('parsererror');
  if (error) throw new Error(error.querySelector('sourcetext').innerText);

  const xmlItems = docXML.querySelectorAll('item');
  const description = docXML.querySelector('channel > title').textContent;
  const title = docXML.querySelector('channel > description').textContent;

  const items = Array.from(xmlItems).map(i => ({
    title: i.querySelector('title').textContent,
    link: i.querySelector('guid').innerHTML,
    description: i.querySelector('description').textContent,
    pubDate: i.querySelector('pubDate').innerHTML,
  }));

  return {
    stream: {
      description,
      title,
    },
    items,
  };
};
