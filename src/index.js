import "./index.css";
import API from './js/API.js';
import Card from './js/card.js';
import CardList from './js/cardList.js';
import FormValidator from './js/formValidator.js';
import Popup from './js/popup.js';
import UserInfo from './js/userInfo.js';

const container = document.querySelector('.places-list');
// Можно лучше
// Адрес и токен лучше вынести в константы
// Так будет удобнее менять в случае чего
const api = new API('https://praktikum.tk/cohort10', '0305adca-6a84-4609-9e59-440e52e1cbdf');
let list = {};
let userId = '';

api.getUserInfo()
  .then((data) => {
    document.querySelector('.user-info__job').textContent = data.about;
    document.querySelector('.user-info__name').textContent = data.name;
    document.querySelector('.user-info__photo').style.backgroundImage = `url(${data.avatar})`;
    userId = data._id;
  })
  .catch((err) => {
    console.log(err);
  });

api.getCards()
  .then((data) => {
    console.log(data);
    list = new CardList(container, data, makeNewCard);
  })
  .catch((err) => {
    console.log(err);
  })

const addPlace = new Popup('#addPlace');
const editInfo = new Popup('#editInfo');
const infoChanges = new UserInfo({
  userElem: document.querySelector('.user-info__name'),
  jobElem: document.querySelector('.user-info__job'),
  userInput: document.forms.edit.elements.name,
  jobInput: document.forms.edit.elements.about,
});
const showPicture = new Popup('#showPicture');
const editForm = new FormValidator(document.forms.edit);
const addForm = new FormValidator(document.forms.new);

const editAvatar = new Popup('#editAvatar');
// Надо исправить
// updateAvatar и sendAvatar используются до их определения
document.querySelector('.user-info__photo').addEventListener('click', () => updateAvatar());
const avatarForm = new FormValidator(document.forms.avatar);
document.forms.avatar.addEventListener('submit', (event) => sendAvatar(event));

function updateAvatar() {
  editAvatar.open();
  document.forms.avatar.reset();
}

function sendAvatar(event) {
  event.preventDefault();
  const changeAvatar = api.changeAvatar.bind(api);
  changeAvatar(document.forms.avatar.elements.link.value)
    .then(function (data) {
      document.querySelector('.user-info__photo').style.backgroundImage = `url(${data.avatar})`;
      editAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
}

function openUserInfo() {
  addForm.setSubmitButtonState(false);
  addPlace.open();
  document.forms.new.reset();
}

function editUserInfo() {
  editInfo.open();
  infoChanges.resetUserInput();
  editForm.validateAll();
}

function submitForm(data) {
  infoChanges.setUserInfo(data.name, data.about);
  editInfo.close();
}

function showMePicture(event) {
  if (event.target.classList.contains('place-card__image')) {
    let img = event.target.style.backgroundImage.substring(5);
    img = img.substring(0, img.length - 2);
    showPicture.open();
    document.querySelector('.popup__picture').src = `${img}`;
  }
}

function makeNewCard(name, link, likes, id, owner) {
  const newCard = new Card({
    name: name,
    link: link,
    likes: likes,
    id: id,
    userId: userId,
    setLike: api.like.bind(api),
    resetLike: api.dislike.bind(api),
    owner: owner,
    deleteCard: api.deleteCard.bind(api)
  });
  return newCard;
}

function addFromForm(data) {
  const someCard = makeNewCard(data.name, data.link, data.likes, data._id, data.owner);
  list.addCard(someCard);
  addPlace.close();
}

function addFromFormToServer(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const postCard = api.postCard.bind(api);
  postCard(document.forms.new.elements.name.value, document.forms.new.elements.link.value)
    .then((data) => {
      addFromForm(data);
      form.reset();
    })
    .catch((err) => {
      console.log(err);
    });
}

function submitEditForm(event) {
  event.preventDefault();
  const editProfile = api.editProfile.bind(api);
  editProfile(document.forms.edit.elements.name.value, document.forms.edit.elements.about.value)
    .then((data) => submitForm(data))
    .catch((err) => {
      console.log(err);
    });
}

document.querySelector('.user-info__button').addEventListener('click', () => openUserInfo());
document.querySelector('.user-info__edit').addEventListener('click', () => editUserInfo());
document.forms.edit.addEventListener('submit', (event) => submitEditForm(event));
container.addEventListener('click', (event) => showMePicture(event));
document.forms.new.addEventListener('submit', (event) => addFromFormToServer(event));
editForm.form.closest('.popup').querySelector('.popup__close').addEventListener('click',
  () => editForm.resetErrors());
addForm.form.closest('.popup').querySelector('.popup__close').addEventListener('click',
  () => addForm.resetErrors());

// См. Review2.md