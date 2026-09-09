import { saveQuiz } from "../../utils/storage"
import { quizSchema } from "../../utils/validation"

export class MainPage {

  constructor(events) {
    this._events = events
  }

  parseQuiz(formData) {
    let parsedData
      try {
        parsedData = JSON.parse(formData)
        const errors = quizSchema.safeParse(parsedData)
        if (errors.success) {
          this._events.emit('parse:succes', parsedData)
          return
        }
        throw new Error('parsError')
      }
      catch {
        this._events.emit('form:error')
      }
  }

  async savedQuiz(data) {
    await saveQuiz(data)
    this._events.emit('save:succes')
  }
}