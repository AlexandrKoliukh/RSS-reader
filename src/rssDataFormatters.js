export const rssListItemFormatter = (data) => data.items.map((i) => {
  return (
    `<div class="card">
        <a href="${i.link}">${i.title}</a>
    </div>`
  );
});

export const rssStreamFormatter = (data) => {
  return (
    `<div class="card">
        <h4>${data.title}</h4>
        <p>${data.description}</p>
    </div>`
  );
};
