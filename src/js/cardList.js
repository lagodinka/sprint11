import {userId} from "../index.js";

export default class CardList {
  constructor(container, initialCards, makeCard) {
    this.container = container;
    this.array = initialCards;
    this.render(makeCard);
    this.userId = userId;
  }

  render(makeCard) {
    this.array.forEach(function (item) {
      const newCard = makeCard(item.name, item.link, item.likes, item._id, item.owner);
      this.addCard(newCard);
    }.bind(this))
  }

  addCard(someCard) {
    this.container.appendChild(someCard.create());
  }
}

