import { Component } from "../base/Component";

export class OptionView extends Component {
  constructor(container) {
    super(container)
    this.input = this._container.querySelector('.option__input')
    this.label = this._container.querySelector('.option__label')
    this.text = this._container.querySelector('.option__text')
    this.message = this._container.querySelector('.option__message')
  }

  renderResult(result) {
    this.label.classList.remove('option__label--success', 'option__label--error')
    this.input.classList.remove('checkbox--success', 'checkbox--error', 'radio--success', 'radio--error')

    if (!result) {
      this.setText(this.message, '')
      this.setHidden(this.message, true)
      return
    }

    if (result.hideMessage) {
      this.setText(this.message, '')
      this.setHidden(this.message, true)
    } else {
      this.setHidden(this.message, false)
      this.setText(this.message, result.message)
    }

    const modifier = result.isCorrect ? 'success' : 'error'
    this.label.classList.add(`option__label--${modifier}`)

    if (this.input.classList.contains('checkbox')) {
      this.input.classList.add(`checkbox--${modifier}`)
    } else if (this.input.classList.contains('radio')) {
      this.input.classList.add(`radio--${modifier}`)
    }
  }

  set optionData(data) {
    const { option, disabled, checked, result } = data

    this.input.value = String(option.id)
    this.input.disabled = !!disabled
    this.input.checked = !!checked

    if (this.input.type === 'checkbox') {
      this.input.name = `question_option_${option.id}`
    } else {
      this.input.name = 'question'
    }

    this.setText(this.text, option.text)

    this.renderResult(result)
  }
}