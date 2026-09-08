import { Component } from "../base/Component";

export class ProgressbarView extends Component {
  constructor(container) {
    super(container)
    this._progressbarStateValue = this._container.querySelector('.progressbar__state_value')
    this._progressbarCountValue = this._container.querySelector('.progressbar__state_count')
    this._progressBar = this._container.querySelector('.progressbar__fill')
  }

  set progress(value) {
    this._progressBar.style.width = `${value}%`
  }

  set curQuestion(value) {
    this.setText(this._progressbarStateValue, `Вопрос ${value} `)
  }

  set countQuestions(value) {
    this.setText(this._progressbarCountValue, `из ${value}`)
  }

}