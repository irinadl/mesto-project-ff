import './pages/index.css';
import {createCard, handleDeleteCard, likeCard} from './components/card';
import {openPopup, closePopup, closeOnBackDropClick, checkEscapeKey} from './components/modal';
import {enableValidation, clearValidation} from './components/validation';
import {getInitialCards, getUserData, postNewCardData, postProfileData, postNewAvatar} from './components/api';

//Попапы и кнопки к ним

const editProfileButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const imagePopup = document.querySelector('.popup_type_image');
const avatarEditButton = document.querySelector('.avatar__edit-button');
const popupAvatarEdit = document.querySelector('.popup_type_avatar-edit');

//Формы 

const editForm = document.forms.editprofile;
const addCardForm = document.forms.newplace;
const editAvatarForm = document.forms.avatar;

//Конфигурация валидации

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


//  Функция создания карточки

function renderInitialCards(card) {
  const placesList = document.querySelector(".places__list");
  placesList.append(card);
}

//Функция индикация загрузки контента
function renderLoading(isLoading) {
  if (isLoading) {document.querySelector('.content').classList.add('content_hidden')}
  else {document.querySelector('.content').classList.remove('content_hidden')}
}

function renderPopupBtnLoading(isLoading, popup) {
  const submitBtn = popup.querySelector('.popup__button');
  if (isLoading) {submitBtn.textContent = 'Сохранение...'}
  else {submitBtn.textContent = 'Сохранить'}
}


//Функция загрузки началных данных профиля
const loadUserData = (user) => {
  document.querySelector('.profile__title').textContent = user.name;
  document.querySelector('.profile__description').textContent = user.about; 
 document.querySelector('.profile__image').style.backgroundImage = `url('${user.avatar}')`;
}

//Загружаем началные данные с сервера

Promise.all([getUserData(), getInitialCards()])
.then(([user, cards]) => {
  renderLoading(true);
 loadUserData(user); 
  cards.forEach((card) => {
   renderInitialCards(createCard(card, user, handleDeleteCard, likeCard, openImgPopup));               
   });
   })
.catch((err) => {
  console.log(err); 
})
.finally(() => {renderLoading(false)});

// Функция ручного добавления карточки 

function handleCreateCard(evt) {
  evt.preventDefault();
  const addCardForm = document.forms.newplace;
  const placeName = addCardForm.elements.placename;
  const link = addCardForm.elements.link;
    const newCard = {
    name: placeName.value,
    link: link.value
  };
  renderPopupBtnLoading(true, popupAddCard);
  postNewCardData(newCard)
  .then((data) => {document.querySelector(".places__list").prepend(createCard(data, data.owner, handleDeleteCard, likeCard, openImgPopup)) })
  .catch((err) => {
    console.log(err); 
  })
  .finally(() => {renderPopupBtnLoading(false, popupAddCard)});
  closePopup(popupAddCard);
  addCardForm.reset(); 
}

//Ручное создание  карточки 

addCardForm.addEventListener('submit', handleCreateCard);

//Открываем модальные окна

editProfileButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  fillEditProfileData(editForm); 
  clearValidation(popupEditProfile, validationConfig); 
})

function fillEditProfileData(form) {
  form.elements.name.value = document.querySelector('.profile__title').textContent;
  form.elements.description.value = document.querySelector('.profile__description').textContent;
}

addCardButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  addCardForm.reset(); 
  clearValidation(popupAddCard, validationConfig);
 })

 avatarEditButton.addEventListener('click', () => {
  openPopup(popupAvatarEdit);
  editAvatarForm.reset(); 
  clearValidation(popupAvatarEdit, validationConfig);
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
popupAvatarEdit.addEventListener('click', closeOnBackDropClick);

popupEditProfile.querySelector('.popup__close').addEventListener('click',() => {
  closePopup(popupEditProfile);  
})

popupAddCard.querySelector('.popup__close').addEventListener('click',() => {
  closePopup(popupAddCard);
 })

popupAvatarEdit.querySelector('.popup__close').addEventListener('click',() => {
  closePopup(popupAvatarEdit);
 })

imagePopup.querySelector('.popup__close').addEventListener('click',() => {
  closePopup(imagePopup);
})

//Редактируем профиль

 function submitEditProdileForm(evt) {
  evt.preventDefault();
  renderPopupBtnLoading(true, popupEditProfile);
  postProfileData(editForm.elements.name.value, editForm.elements.description.value)
  .then((data) => {
  document.querySelector('.profile__title').textContent = data.name;
  document.querySelector('.profile__description').textContent = data.about;
  })
  .catch((err) => {
    console.log(err); 
  })
  .finally(() => {renderPopupBtnLoading(false,  popupEditProfile)});
  closePopup(popupEditProfile);  
}   

editForm.addEventListener('submit', submitEditProdileForm); 

// Редактируем аватар

function submitNewAvatar(evt) {
  evt.preventDefault();
  renderPopupBtnLoading(true, popupAvatarEdit);  
  postNewAvatar(editAvatarForm.elements.link.value)
  .then((data) => {document.querySelector('.profile__image').style.backgroundImage = `url("${data.avatar}")`})
  .catch((err) => {
    console.log(err); 
  })
  .finally(() => {renderPopupBtnLoading(false, popupAvatarEdit)});
  closePopup(popupAvatarEdit);
}

editAvatarForm.addEventListener('submit', submitNewAvatar);

// Вызов функции валидации форм

enableValidation(validationConfig); 

