import { getQuiz } from "../../utils/storage"

export class QuizzPage {

  constructor(events) {
    this._events = events
    this._globalResult = 0
    this._progressBar = null
    this._curQuizzData = null
    this._curQuestionId = null
    this._curQuestionData = null
    this._curQuiestionUserResult = null
  }

  async initQuizz(id) {
    this._curQuizzData = await getQuiz(id)
    this._events.emit('load:succes', this._curQuizzData)
  }

  progressUpdate(value) {
    this._progressBar = value / this.countQuestions * 100
    this._curQuestionData = this._curQuizzData.questions.find(q => q.id == value);
  }

  get countQuestions() {
    return this._curQuizzData.questions.length
  }

  get progress() {
    return this._progressBar
  }

  get dataQuestion() {
    return this._curQuestionData
  }

  set curQuestionId(value) {
    this._curQuestionId = value
  }

  get curQuestionId() {
    return this._curQuestionId
  }

  set globalResult(value) {
    this._globalResult = value
  }

  get globalResult() {
    return this._globalResult
  }

}