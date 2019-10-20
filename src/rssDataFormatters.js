export const rssListItemFormatter = (data) => data.items.map((i) => {
    return `<div class="card">
        <a href="${i.link}">${i.title}</a>
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#modal"
          id="${i.id}">
            Показать больше
        </button>
    </div>`;
});

export const rssStreamFormatter = (data) => {
  return (
    `<div class="card">
        <h4>${data.title}</h4>
        <p>${data.description}</p>
    </div>`
  );
};
