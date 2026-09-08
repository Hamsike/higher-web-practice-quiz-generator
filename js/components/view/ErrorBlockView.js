import { Component } from "../base/Component";

export class ErrorBlockView extends Component {
  constructor(container, events) {
    super(container)
    this._events = events
    this._retryButton = this._container.querySelector('.button')
    this._retryButton.addEventListener('click', (e) => {
      this._events.emit('form:initialize')
    })
  }

  set isActive(value) {
    this.toggleClass(this._container, 'active', value)
  }
}