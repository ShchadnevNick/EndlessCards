const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // toggle() может принимать 2-ой аргумент boolean: метод будет работать как add(), если передать true, и как remove(), если передать false.
      // isIntersecting — булево значение. true если есть пересечение элемента и наблюдаемой области.
      // target — сам наблюдаемый элемент для дальнейших манипуляций.
      entry.target.classList.toggle("show", entry.isIntersecting);
    });
  },
  {
    //threshold — порог пересечения, при котором будет срабатывать колбэк. (от 0 до 1) в %
    threshold: 1, //элемент станет полностью видимым на 100%
  }
);

//Создаем наблюдатель, который берет последний элемент
const lastCardObserver = new IntersectionObserver((entries) => {
  const lastCard = entries[0];
  //Если последняя карта не пересекается, то возвращаемся
  if (!lastCard.isIntersecting) return;
  //Создаем 10 новых карточек
  loadNewCards();
  //Удаляем последний элемент(последняя карточка) из наблюдаемых
  lastCardObserver.unobserve(lastCard.target);
  //Берем последний элемент (последнюю карточку) из новых созданных карточек
  lastCardObserver.observe(document.querySelector(".card:last-child"));
});

//Последний элемент делаем наблюдаемым (последняя карточка)
lastCardObserver.observe(document.querySelector(".card:last-child"));

cards.forEach((card) => {
  observer.observe(card);
});

//Выбираем блок с карточками
const cardContainer = document.querySelector(".card-container");
//Функция по созданию новых 10 карточек
function loadNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    card.textContent = "New Card";
    card.classList.add("card");
    observer.observe(card);
    cardContainer.append(card);
  }
}
