import './pages/index.css';
import {initialCards} from './components/cards';
import {createCard} from './components/card';
import {handleDeleteCard} from './components/card';
import {renderCard} from './components/card';
import {cardLikeBtn} from './components/card';
import {cardPopupOpen} from './components/modal';
import {closeOnBackDropClick} from './components/modal';
import {handleFormSubmit} from './components/modal';
import {newPopupOpen} from './components/modal';
import {newClosePopup} from './components/modal';
import {handleCreateCard} from './components/card';


//Попапы и кнопки к ним
const editProfileButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const imagePopup = document.querySelector('.popup_type_image');

//Формы 
const editForm = document.forms.editprofile;
const addCardForm = document.forms.newplace;

//  Функция создания карточки

initialCards.forEach((card) => {
  renderCard(createCard(card, handleDeleteCard, cardLikeBtn, cardPopupOpen));
});

//Ручное создание  карточки 

addCardForm.addEventListener('submit', handleCreateCard);

//Открываем модальные окна

editProfileButton.addEventListener('click', (evt) => {
  newPopupOpen(popupEditProfile);
  initialEditProfileData(editForm);  
})

function initialEditProfileData(form) {
  form.elements.name.value = document.querySelector('.profile__title').textContent;
  form.elements.description.value = document.querySelector('.profile__description').textContent;
}

addCardButton.addEventListener('click', (evt) => {
  newPopupOpen(popupAddCard);  
 })

//Закрываем модальные окна

popupEditProfile.addEventListener('click', closeOnBackDropClick);
popupAddCard.addEventListener('click', closeOnBackDropClick);
imagePopup.addEventListener('click', closeOnBackDropClick);

popupEditProfile.querySelector('.popup__close').addEventListener('click',() => {
  newClosePopup(popupEditProfile);
  editForm.reset();
})

popupAddCard.querySelector('.popup__close').addEventListener('click',() => {
  newClosePopup(popupAddCard);
  addCardForm.reset();
})

imagePopup.querySelector('.popup__close').addEventListener('click',() => {
  newClosePopup(imagePopup);
})

//Редактируем профиль

editForm.addEventListener('submit', handleFormSubmit); 
