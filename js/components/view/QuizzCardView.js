import { Component } from "../base/Component";

export class QuizzCardView extends Component {
  constructor(container, action) {
    super(container)
    
    this._linkToToQuizz = this._container.querySelector('.quiz_link')
    this._quizzTitle = this._container.querySelector('.quizz__title')
    this._quizzDesc = this._container.querySelector('.quizz__desc')
    this._quizzCountQ = this._container.querySelector('.quiz__count_question')

    this._linkToToQuizz.addEventListener('click', action)
  }

  set title(value) {
    this.setText(this._quizzTitle, value)
  }

  set desc(value) {
    this.setText(this._quizzDesc, value)
  }

  set count(value) {
    let itogValue = `${value} вопросов`
    if (value === 1) {
      itogValue = '1 вопрос'
    }
    else if (value > 1 && value < 5) {
      itogValue = `${value} вопроса`
    }
    this.setText(this._quizzCountQ, itogValue)
  }

}