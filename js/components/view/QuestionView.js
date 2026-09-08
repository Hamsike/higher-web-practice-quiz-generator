import { Component } from "../base/Component";

export class QuestionView extends Component {
  constructor(container) {
    super(container)
    this._questionTitle = this._container.querySelector('.question__text')
    this._optionsContainer = this._container.querySelector('.question__options')
  }
  
  set questionTitle(value) {
    this.setText(this._questionTitle, value)
  }

  set options(data) {
    this._optionsContainer.replaceChildren(...data)
  }
}