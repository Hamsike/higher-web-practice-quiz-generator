import { Component } from "../base/Component"

export class QuizzContentView extends Component {
  constructor (container, events) {
    super(container)
    this._events = events
    this._quizzQuesion = this._container.querySelector('.quiz__question');
    this._submitButton = this._container.querySelector('.quiz__submit');
    this._nextButton = this._container.querySelector('.quiz__next')
    
    this._container.addEventListener('change', () => {
      this.updateSubmitButtonState()
    })

    this._container.addEventListener('submit', (e) => {
      e.preventDefault()
      
      const formData = new FormData(this._container)
      const selectedAnswers = []
      
      for (let [name, value] of formData.entries()) {
        if (name === 'question' || name.startsWith('question_option_')) {
          selectedAnswers.push(value)
        }
      }

      this._events.emit('form:submit', selectedAnswers)
    })

    this._nextButton.addEventListener('click', () => {
      this._events.emit('question:next')
    })
  }

  updateSubmitButtonState() {
    const hasAnswer = this._container.querySelectorAll('.option__input:checked').length > 0
    this.setDisabled(this._submitButton, !hasAnswer)
  }

  set quizzQuesion(data) {
    this._quizzQuesion.replaceChildren(data)
  }

 set curButton(value) {
    this.setHidden(this._submitButton, value !== 'submit')
    
    this.setHidden(this._nextButton, value === 'submit')

    if (value === 'submit') {
      this.updateSubmitButtonState()
    }

    if (value === 'finish') {
      this.setText(this._nextButton, 'Завершить тест')
    } else {
      this.setText(this._nextButton, 'Следующий вопрос')
    }
  }

}