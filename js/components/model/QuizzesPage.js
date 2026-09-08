import { getAllQuizzes } from "../../utils/storage"

export class QuizzesPage {
  constructor(events) {
    this._events = events
  }

  async loadQuizes() {
    const allQuizz = await getAllQuizzes()
    
    if (allQuizz.length === 0) {
      this._events.emit('load:error')
      return
    }

    this._events.emit('load:succes', allQuizz)
  }
}