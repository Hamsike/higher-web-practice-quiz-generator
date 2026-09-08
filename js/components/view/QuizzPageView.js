import { Component } from "../base/Component";

export class QuizzPageView extends Component {
  constructor(container) {
    super(container)
    this._titleQuizz = this._container.querySelector('.quizz__title')
    this._descQuizz = this._container.querySelector('.quizz__desc')
  }
  
  set title(value) {
    this.setText(this._titleQuizz, value)
  }

  set desc(value) {
    this.setText(this._descQuizz, value)
  }

}