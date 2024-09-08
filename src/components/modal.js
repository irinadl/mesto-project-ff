
  export function openPopup(popup) {
    popup.classList.add("popup_is-opened");
    popup.classList.add('popup_is-animated');
    document.addEventListener('keydown', checkEscapeKey);
  }

  export function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', checkEscapeKey);
  }

        export function closeOnBackDropClick({ currentTarget, target }) {
        const dialog = currentTarget
        const isClickedOnBackDrop = target === dialog
        if (isClickedOnBackDrop) {
         closePopup(dialog);
        }
      }

  export function checkEscapeKey(evt) {
    if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');        
    closePopup(popup);}
}