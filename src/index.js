import './pages/index.css';
import {createCard, handleDeleteCard, likeCard} from './components/card';
import {openPopup, closePopup, closeOnBackDropClick, checkEscapeKey} from './components/modal';
import {enableValidation, clearValidation} from './components/validation';
import {getInitialCards, getUserData, postNewCardData, postProfileData, postNewAvatar} from './components/api';

//Контент

const mainContent = document.querySelector('.content');
const placeList = document.querySelector(".places__list");

//Профиль

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

//Попапы и кнопки к ним

const editProfileButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.avatar__edit-button');
const popupAvatarEdit = document.querySelector('.popup_type_avatar-edit');

//Попап и поля карточки
const imagePopup = document.querySelector('.popup_type_image');
const image = document.querySelector('.popup__image');
const description = document.querySelector('.popup__caption');

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
  placeList.append(card);
}

//Функция открытия попапа карточки

export function openImgPopup(data) {
  openPopup(imagePopup);
   image.src = data.link;
  image.alt = data.name;
  description.textContent = data.name;
}

// Функция ручного добавления карточки 

function handleCreateCard(evt) {
  evt.preventDefault();
  // const addCardForm = document.forms.newplace;
  const placeName = addCardForm.elements.placename;
  const link = addCardForm.elements.link;
    const newCard = {
    name: placeName.value,
    link: link.value
  };
  renderPopupBtnLoading(true, popupAddCard);
  postNewCardData(newCard)
  .then((data) => {
    placeList.prepend(createCard(data, data.owner, handleDeleteCard, likeCard, openImgPopup));
    closePopup(popupAddCard);})
  .catch((err) => {
    console.log(err); 
  })
  .finally(() => {renderPopupBtnLoading(false, popupAddCard)}); 
}

//Функция индикация загрузки контента

function renderLoading(isLoading) {
  if (isLoading) {mainContent.classList.add('content_hidden')}
  else {mainContent.classList.remove('content_hidden')}
}

function renderPopupBtnLoading(isLoading, popup) {
  const submitBtn = popup.querySelector('.popup__button');
  if (isLoading) {submitBtn.textContent = 'Сохранение...'}
  else { submitBtn.textContent = 'Сохранить';     
  }
}

//Функция загрузки началных данных профиля

const loadUserData = (user) => {
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about; 
  profileAvatar.style.backgroundImage = `url('${user.avatar}')`;
}

// Функция отображения закгруженных данных в форме редактирования профиля

function fillEditProfileData(form) {
  form.elements.name.value = profileTitle.textContent;
  form.elements.description.value = profileDescription.textContent;
}

//Функция редактирования профиля

function submitEditProdileForm(evt) {
  evt.preventDefault();
  renderPopupBtnLoading(true, popupEditProfile);
  postProfileData(editForm.elements.name.value, editForm.elements.description.value)
  .then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    closePopup(popupEditProfile);
  })
  .catch((err) => {
    console.log(err); 
  })
  .finally(() => {renderPopupBtnLoading(false,  popupEditProfile)});  
}   

//Функция редактирования аватара

function submitNewAvatar(evt) {
  evt.preventDefault();
  renderPopupBtnLoading(true, popupAvatarEdit);  
  postNewAvatar(editAvatarForm.elements.link.value)
  .then((data) => {
    profileAvatar.style.backgroundImage = `url("${data.avatar}")`;
    closePopup(popupAvatarEdit);})
  .catch((err) => { 
    console.log(err); 
  })
  .finally(() => {renderPopupBtnLoading(false, popupAvatarEdit)});
  }

//Ручное создание  карточки 

addCardForm.addEventListener('submit', handleCreateCard);

//Открываем модальные окна

editProfileButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  fillEditProfileData(editForm); 
  clearValidation(popupEditProfile, validationConfig); 
})

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

//Отправляем формы

editForm.addEventListener('submit', submitEditProdileForm); 

editAvatarForm.addEventListener('submit', submitNewAvatar);

// Вызов функции валидации форм

enableValidation(validationConfig); 

//Загружаем началные данные с сервера

Promise.all([getUserData(), getInitialCards()])
.then(([user, cards]) => {
 renderLoading(true);  
 loadUserData(user); 
  cards.forEach((card) => {
   renderInitialCards(createCard(card, user._id, handleDeleteCard, likeCard, openImgPopup));               
   });
   })
.catch((err) => {
  console.log(err); 
})
.finally(() => {renderLoading(false)});
