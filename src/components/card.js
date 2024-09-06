import {cardPopupOpen} from './modal'

export function createCard(data, onDelete, cardLike, popupOpen) {
    const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");
    const cardElement = cardTemplate.cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const cardLikeButton = cardElement.querySelector('.card__like-button');
  
    cardElement.querySelector(".card__image").src = data.link;
    cardElement.querySelector(".card__image").alt = data.name;
    cardElement.querySelector(".card__title").textContent = data.name;
  
    deleteButton.addEventListener("click", onDelete);
    cardLikeButton.addEventListener('click', cardLike);
    cardElement.querySelector(".card__image").addEventListener('click', popupOpen);
  
    return cardElement;
  }

  export function handleDeleteCard(evt) {
    evt.target.closest('li').remove();  
  }

  export function renderCard(card) {
    const placesList = document.querySelector(".places__list");
    placesList.append(card);
  }
  
  export function cardLikeBtn(evt) {
    if (evt.target.classList.contains('card__like-button'))
    {evt.target.classList.toggle('card__like-button_is-active')}
  };

 export function handleCreateCard(evt) {
    evt.preventDefault();
    const addCardForm = document.forms.newplace;
    const placeName = addCardForm.elements.placename;
    const link = addCardForm.elements.link;
      const newCard = {
      name: placeName.value,
      link: link.value
    }
    document.querySelector(".places__list").prepend(createCard(newCard, handleDeleteCard, cardLikeBtn, cardPopupOpen));
    document.querySelector('.popup_type_new-card').classList.remove("popup_is-opened"); 
    addCardForm.reset()
  }

