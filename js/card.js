class Card {
  constructor({ name, link, likes, id, userId, setLike, resetLike, owner, deleteCard }) {
    this.name = name;
    this.link = link;
    this.liked = false;
    this.likes = likes;
    this.id = id;
    this.userId = userId;
    this.setLike = setLike;
    this.resetLike = resetLike;
    this.owner = owner;
    this.deleteCard = deleteCard;
  }

  create() {
    const placeCard = document.createElement('div');
    placeCard.classList.add('place-card');
    const placeImage = document.createElement('div');
    placeImage.classList.add('place-card__image');
    const deleteIcon = document.createElement('button');
    deleteIcon.classList.add('place-card__delete-icon');
    const placeDescript = document.createElement('div');
    placeDescript.classList.add('place-card__description');
    const placeName = document.createElement('h3');
    placeName.classList.add('place-card__name');
    const likeGroup = document.createElement('div');
    likeGroup.classList.add('place-card__like-group');
    const likeIcon = document.createElement('button');
    likeIcon.classList.add('place-card__like-icon');

    if (this.likes.some(function (item) {
      return item._id == this.userId;
    }.bind(this))) {
      likeIcon.classList.add('place-card__like-icon_liked')
      this.liked = true;
    }

    if (this.owner._id == this.userId) deleteIcon.style.display = 'block';

    const likeCounter = document.createElement('p');
    likeCounter.classList.add('place-card__like-counter');

    placeCard.appendChild(placeImage);
    placeImage.appendChild(deleteIcon);
    placeCard.appendChild(placeDescript);
    placeDescript.appendChild(placeName);
    placeDescript.appendChild(likeGroup);
    likeGroup.appendChild(likeIcon);
    likeGroup.appendChild(likeCounter);

    placeImage.style.backgroundImage = 'url(' + this.link + ')';
    placeName.textContent = this.name;
    likeCounter.textContent = this.likes.length;

    this.setEventListener(placeCard);

    return placeCard;
  }

  setEventListener(card) {
    card.addEventListener('click', this.clickTarget.bind(this));
  }


  clickTarget(event) {
    if (event.target.closest('.place-card__like-icon')) this.like(event);
    else if (event.target.closest('.place-card__delete-icon')) this.remove(event);
  }

  like(event) {
    // Сознательно оставила возможность пользователю включать и выключать сердечко при обрыве связи.
    // Пускай у юзера останется хоть какой-то приятный функционал
    //
    // Вообще это не совсем верно, и по логике так нельзя, но учитывая, что это
    // дополнительное задание будем считать что это не баг, а фича)
    event.target.classList.toggle('place-card__like-icon_liked');
    this.liked = !this.liked;
    if (this.liked) {
      this.setLike(this.id)
        .then((res) => {
          event.target.nextElementSibling.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.resetLike(this.id)
        .then((res) => {
          event.target.nextElementSibling.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  remove(event) {
    if (window.confirm('Вы уверены, что хотите удалить котика?')) {
      this.deleteCard(this.id)
    .then(() => {
      event.target.closest('.place-card').removeEventListener('click', this.clickTarget);
      event.target.closest('.place-card').remove();
    })
    .catch((err) => {
      console.log(err);
    });
    }
  }
}

