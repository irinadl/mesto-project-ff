import './pages/index.css';
import {initialCards} from './components/cards';
import {createCard, handleDeleteCard, likeCard} from './components/card';
import {openPopup, closePopup, closeOnBackDropClick, checkEscapeKey} from './components/modal';

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

function renderInitialCards(card) {
  const placesList = document.querySelector(".places__list");
  placesList.append(card);
}

initialCards.forEach((card) => {
  renderInitialCards(createCard(card, handleDeleteCard, likeCard, openImgPopup));
});

function handleCreateCard(evt) {
  evt.preventDefault();
  const addCardForm = document.forms.newplace;
  const placeName = addCardForm.elements.placename;
  const link = addCardForm.elements.link;
    const newCard = {
    name: placeName.value,
    link: link.value
  }
  document.querySelector(".places__list").prepend(createCard(newCard, handleDeleteCard, likeCard, openImgPopup));
  document.querySelector('.popup_type_new-card').classList.remove("popup_is-opened"); 
  addCardForm.reset()
}


//Ручное создание  карточки 

addCardForm.addEventListener('submit', handleCreateCard);

//Открываем модальные окна

editProfileButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  fillEditProfileData(editForm);  
})

function fillEditProfileData(form) {
  form.elements.name.value = document.querySelector('.profile__title').textContent;
  form.elements.description.value = document.querySelector('.profile__description').textContent;
}

addCardButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  addCardForm.reset();  
 })

 export function openImgPopup(data) {
  openPopup(imagePopup);
  document.addEventListener('keydown', checkEscapeKey);
  const image = imagePopup.querySelector('.popup__image');
  const description = imagePopup.querySelector('.popup__caption');
  image.src = data.link;
  image.alt = data.name;
  description.textContent = data.name;
}

//Закрываем модальные окна

popupEditProfile.addEventListener('click', closeOnBackDropClick);
popupAddCard.addEventListener('click', closeOnBackDropClick);
imagePopup.addEventListener('click', closeOnBackDropClick);

popupEditProfile.querySelector('.popup__close').addEventListener('click',() => {
  closePopup(popupEditProfile);  
})

popupAddCard.querySelector('.popup__close').addEventListener('click',() => {
  closePopup(popupAddCard);
 })

imagePopup.querySelector('.popup__close').addEventListener('click',() => {
  closePopup(imagePopup);
})

//Редактируем профиль

 function submitEditProdileForm(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = editForm.elements.name.value;
  document.querySelector('.profile__description').textContent = editForm.elements.description.value; 
  closePopup(popupEditProfile);  
}   

editForm.addEventListener('submit', submitEditProdileForm); 
