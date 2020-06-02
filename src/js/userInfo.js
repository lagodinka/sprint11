export default class UserInfo {
  constructor({ userElem, jobElem, userInput, jobInput }) {
    this.name = '';
    this.job = '';
    this.userElem = userElem;
    this.jobElem = jobElem;
    this.userInput = userInput;
    this.jobInput = jobInput;
  }

  setUserInfo(name, job) {
    this.name = name;
    this.job = job;
    this.userInput.value = name;
    this.jobInput.value = job;
    this.updateUserInfo();
  }

  updateUserInfo() {
    this.userElem.textContent = this.userInput.value;
    this.jobElem.textContent = this.jobInput.value;
  }

  resetUserInput() {
    this.userInput.value = this.userElem.textContent;
    this.jobInput.value = this.jobElem.textContent;
  }
}
