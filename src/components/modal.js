
  export function newPopupOpen(popup) {
    popup.classList.add("popup_is-opened");
    popup.classList.add('popup_is-animated');
    document.addEventListener('keydown', checkEscapeKey);
  }

  export function newClosePopup(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', checkEscapeKey);
  }

  export function cardPopupOpen(evt) {
    const imagePopup = document.querySelector('.popup_type_image');
    imagePopup.classList.add("popup_is-opened");
    imagePopup.classList.add("popup_is-animated");
    document.addEventListener('keydown', checkEscapeKey);
    const image = imagePopup.querySelector('.popup__image');
    const description = imagePopup.querySelector('.popup__caption');
    image.src = evt.target.src;
    image.alt = evt.target.alt;
    description.textContent = evt.target.alt;
  }


      export function closeOnBackDropClick({ currentTarget, target }) {
        const dialog = currentTarget
        const isClickedOnBackDrop = target === dialog
        if (isClickedOnBackDrop) {
          dialog.classList.remove("popup_is-opened");
          document.forms.editprofile.reset();
          document.forms.newplace.reset();
        }
      }

    
  export function handleFormSubmit(evt) {
    evt.preventDefault();
    const editForm = document.forms.editprofile;
    document.querySelector('.profile__title').textContent = editForm.elements.name.value;
    document.querySelector('.profile__description').textContent = editForm.elements.description.value; 
    document.querySelector('.popup_type_edit').classList.remove("popup_is-opened");
    editForm.reset();
  }    

  export function checkEscapeKey(evt) {
    const popup = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape') {        
      popup.classList.remove("popup_is-opened");}
  }
