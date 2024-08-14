// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");

// @todo: DOM узлы

const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(data, onDelete) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = data.link;
  cardElement.querySelector(".card__image").alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  deleteButton.addEventListener("click", onDelete);

  return cardElement;
}

// @todo: Функция удаления карточки

function handleDeleteCard(evt) {
  evt.target.closest('li').remove();  
}

// @todo: Вывести карточки на страницу

function renderCard(card) {
  placesList.append(card);
}

initialCards.forEach((card) => {
  renderCard(createCard(card, handleDeleteCard));
});
