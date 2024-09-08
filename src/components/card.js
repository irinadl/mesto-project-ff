
export function createCard(data, onDelete, likeCard, openImgPopup) {
    const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");
    const cardElement = cardTemplate.cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const cardLikeButton = cardElement.querySelector('.card__like-button');
  
    cardElement.querySelector(".card__image").src = data.link;
    cardElement.querySelector(".card__image").alt = data.name;
    cardElement.querySelector(".card__title").textContent = data.name;
  
    deleteButton.addEventListener("click", onDelete);
    cardLikeButton.addEventListener('click', likeCard);
    cardElement.querySelector(".card__image").addEventListener('click', () => {openImgPopup(data)});
  
    return cardElement;
  }

  export function handleDeleteCard(evt) {
    document.querySelector('.places__item').remove();
  }

  export function likeCard(evt) {
    if (evt.target.classList.contains('card__like-button'))
    {evt.target.classList.toggle('card__like-button_is-active')}
  };


