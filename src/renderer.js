export const rssListItemFormatter = data => data.map(i => `<div class="card">
        <a href="${i.link}">${i.title}</a>
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#modal"
          data-href="${i.link}">
            Показать больше
        </button>
    </div>`);

export const rssStreamFormatter = data => (
  `<div class="card">
        <h4>${data.title}</h4>
        <p>${data.description}</p>
    </div>`
);

export const modalContentFormatter = data => (
  `
      <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitle">${data.title}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="modalBody">
              ${data.description}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
      </div>
    `
);
