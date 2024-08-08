// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function addCard(cards, funct) {
  cards.forEach(function (element) {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector(".card__image").src = element.link;
    cardElement.querySelector(".card__image").alt = element.name;
    cardElement.querySelector(".card__title").textContent = element.name;

    funct(cardElement);

    placesList.append(cardElement);
  });
}

function removeCard(btn) {
  const deleteButton = btn.querySelector(".card__delete-button");

   deleteButton.addEventListener("click", () => {
   deleteButton.parentElement.remove();
  });
}

addCard(initialCards, removeCard);
