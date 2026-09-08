import { Component } from "../base/Component";

export class ResultView extends Component {
  constructor(container, events) {
    super(container)
    this._events = events
    this._resultIitle = this._container.querySelector('.result__title')
    this._resultSubTitle = this._container.querySelector('.result__subtitle')
    this._resultMessage = this._container.querySelector('.result__message')
    this._buttonToAllQuizzes = this._container.querySelector('.button__to_quizzes')
    this._buttonRestart = this._container.querySelector('.result__restart')

    this._buttonToAllQuizzes.addEventListener('click', () => {
      this._events.emit('page:quizzes')
    })

    this._buttonRestart.addEventListener('click', () => {
      this._events.emit('quizz:restart')
    })
  }

  set resultTitle(value) {
    this.setText(this._resultIitle, value)
  }

  set resultSubTitle(value) {
    this.setText(this._resultSubTitle, value)
  }

  set resultMessage(value) {
    this.setText(this._resultMessage, value)
  }

  set isOpen(value) {
    this.setHidden(this._container, !value)
  }
}