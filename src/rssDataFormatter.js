const templateElement = document.getElementById('rssItem');

export default (data) => data.map((i) => {
  const clonedTemplateElement = templateElement.cloneNode(true);
  const title = document.createElement('h4');
  const link = document.createElement('a');

  title.innerText = i.title;
  link.setAttribute('href', i.link);
  link.innerHTML = '<button class="btn btn-secondary w-100">Источник</button>';

  clonedTemplateElement.appendChild(title);
  clonedTemplateElement.appendChild(link);

  return clonedTemplateElement.outerHTML;
});
