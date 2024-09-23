import {removeCardData, putLike, removeLike} from './api'

export function createCard(data, user, onDelete, likeCard, openImgPopup) {
    const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");
    const cardElement = cardTemplate.cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');
      
    cardElement.querySelector(".card__image").src = data.link;
    cardElement.querySelector(".card__image").alt = data.name;
    cardElement.querySelector(".card__title").textContent = data.name;
    likeCounter.textContent = data.likes.length;
    const cardID = data._id;
 

   if (user._id !== data.owner._id) {
    deleteButton.classList.add('card__delete-button_disabled');
   };

   if (data.likes.some((like) => like._id === user._id)) {cardLikeButton.classList.add('card__like-button_is-active')};
    

    deleteButton.addEventListener("click", (evt) => {onDelete(evt, cardID)});
    cardLikeButton.addEventListener('click', (evt) => {likeCard(evt, cardID, likeCounter)});
    
    cardElement.querySelector(".card__image").addEventListener('click', () => {openImgPopup(data)});
    
     return cardElement;
  }

  export function handleDeleteCard(evt, cardID) {
    
   removeCardData(cardID)
    .then(() => {
    evt.target.closest('.places__item').remove();}
    )
    .catch((err) => {
      console.log(err); 
    })
  }

  export function likeCard(evt, cardID, likeCounter) {
    if (!evt.target.classList.contains("card__like-button_is-active")) {
      putLike(cardID).then((data) => {
        evt.target.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err); 
      });
    } else {
      removeLike(cardID).then((data) => {
        evt.target.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err); 
      });
    }
  }    


  
