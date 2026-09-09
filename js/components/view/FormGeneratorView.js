import { Component } from "../base/Component";

export class FormGeneratorView extends Component {
  constructor(formContainer, events) {
    super(formContainer)
    this._events = events
    this._generateButton = this._container['generate']

    this._container.addEventListener('submit', (e) => {
      e.preventDefault()
      this._events.emit('form:submit', this._container['json'].value)
    })

    this._container.addEventListener('input', () => {
      this._events.emit('form:initialize')
    })
  }

  set isErrors(value) {
    this.toggleClass(this._container['json'], 'error', value)
    this.setDisabled(this._generateButton, value)
  }

  set isLoading(value) {
    this.setDisabled(this._generateButton, value)
  }
}