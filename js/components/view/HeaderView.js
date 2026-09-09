import { Component } from "../base/Component";

export class HeaderView extends Component {
  constructor(container, events) {
    super(container)
    this._events = events
    this._button__logo = this._container.querySelector('.button__logo')
    this._buttonsContainer = this._container.querySelector('.mobile__nav')
    this._buttonToAllQuizzes = this._container.querySelectorAll('.navigate__to_quizzes')
    this._buttonToGenerator = this._container.querySelectorAll('.navigate__to_generator')

    this._button__logo.addEventListener('click', () => {
      this.toggleClass(this._buttonsContainer, 'active')
    })

    if (this._buttonToAllQuizzes.length) {
      this._buttonToAllQuizzes.forEach(button => {
        button.addEventListener('click', () => {
        window.location.href = 'quizzes.html'
    })
      })
    }

    if (this._buttonToGenerator.length) {
      this._buttonToGenerator.forEach(button => {
        button.addEventListener('click', () => {
          window.location.href = 'index.html'
        })
      })
    }

  }
}