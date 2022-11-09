import refsList from './refs';
import { onOpenModal } from './modal';

export function modalConnection() {
  refsList().filmsElements.forEach(card =>
    card.addEventListener('click', onOpenModal)
  );
}
