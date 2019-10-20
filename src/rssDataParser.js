const parser = new DOMParser();

export default (data) => {
  const docXML = parser.parseFromString(data, "text/xml");
  const error = docXML.querySelector('parsererror');
  if (error) throw new Error(error.querySelector('sourcetext'));

  const items = docXML.querySelectorAll('item');
  return Array.from(items).map((i) => {
    const title = i.querySelector('title').firstChild.data;
    const link = i.querySelector('guid').innerHTML;
    return {
      title,
      link
    }
  });
}