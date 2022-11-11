import refsList from './refs';

const refs = refsList();

let paginationBlock = '';

export default async function paginationMarkup(amountPages, currentPage) {
  refs.paginationNew.classList.remove('pagination--off');
  if (refsList().paginationBlock) {
    refsList().paginationBlock.innerHTML = '';
    paginationBlock = '';
    // Left Arrow
    if (currentPage !== 1)
      refsList().leftArrow.classList.remove('visually-hidden');
    if (currentPage === 1)
      refsList().leftArrow.classList.add('visually-hidden');

    if (amountPages < 9) {
      for (let i = 1; i <= amountPages; i += 1) {
        if (i === currentPage) {
          paginationBlock += `<button type="button" class="pagination__button pagination__button--active" data-number='${i}'>${i}</button>`;
          continue;
        }

        paginationBlock += `<button type="button" class="pagination__button" data-number='${i}'>${i}</button>`;
      }
    }
    if (amountPages > 9) {
      for (let i = 1; i <= amountPages; i += 1) {
        if (i === currentPage) {
          paginationBlock += `<button type="button" class="pagination__button pagination__button--active" data-number='${i}'>${i}</button>`;
          continue;
        }
        if (currentPage > amountPages - 4) {
          if (i === 1)
            paginationBlock += `<button type="button" class="pagination__button" data-number='${i}'>${i}</button>`;

          if (i > amountPages - 5)
            paginationBlock += `<button type="button" class="pagination__button" data-number='${i}'>${i}</button>`;

          if (i === amountPages - 6)
            paginationBlock += `<div><p class='pagination__dots'>...<p></div>`;
        }
        if (currentPage >= 5 && currentPage <= amountPages - 4) {
          if (i === currentPage) {
            paginationBlock += `<button type="button" class="pagination__button pagination__button--active" data-number='${i}'>${i}</button>`;
            continue;
          }
          if (i === 1)
            paginationBlock += `<button type="button" class="pagination__button" data-number='${i}'>${i}</button>`;

          if (i === currentPage - 3)
            paginationBlock += `<div><p class='pagination__dots'>...<p></div>`;

          if (i === currentPage + 3)
            paginationBlock += `<div><p class='pagination__dots'>...<p></div>`;

          if (i < currentPage - 2 && i > currentPage + 2) {
            continue;
          }
          if (i > currentPage - 3 && i < currentPage + 3 && i !== amountPages) {
            paginationBlock += `<button type="button" class="pagination__button" data-number='${i}'>${i}</button>`;
          }
          if (i === amountPages) {
            paginationBlock += `<button type="button" class="pagination__button" data-number='${i}'>${i}</button>`;
          }
        }
        if (currentPage < 5) {
          if (i <= 5) {
            paginationBlock += `<button type="button" class="pagination__button" data-number='${i}'>${i}</button>`;
          }
          if (i === 6) {
            paginationBlock += `<div><p class='pagination__dots'>...<p></div>`;
          }
          if (i === amountPages) {
            paginationBlock += `<button type="button" class="pagination__button" data-number='${i}'>${i}</button>`;
          }
        }
      }
    }
    refsList().paginationBlock.insertAdjacentHTML('beforeend', paginationBlock);

    // Right Arrow
    if (currentPage !== amountPages) {
      refsList().rightArrow.classList.remove('visually-hidden');
    }
    if (currentPage === amountPages)
      refsList().rightArrow.classList.add('visually-hidden');
  }
}
