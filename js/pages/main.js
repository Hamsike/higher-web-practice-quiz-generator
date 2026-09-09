
import { EventEmitter } from '../components/base/events'
import { MainPage } from '../components/model/MainPage'
import { ErrorBlockView } from '../components/view/ErrorBlockView'
import { FormGeneratorView } from '../components/view/FormGeneratorView'
import { HeaderView } from '../components/view/HeaderView'

new HeaderView(document.querySelector('.header'))
const events = new EventEmitter()
const mainPage = new MainPage(events)
const formGeneratorView = new FormGeneratorView(document.forms['formContainer'], events)
const errorBlockView = new ErrorBlockView(document.querySelector('.block__error'), events)

events.on('form:submit', (formData) => {
  mainPage.parseQuiz(formData)
});

events.on('parse:succes', async (parseData) => {
  await mainPage.savedQuiz(parseData)
})

events.on('save:succes', () => {
  window.location.href = 'quizzes.html'
})

events.on('form:error', () => {
  formGeneratorView.isErrors = true
  errorBlockView.isActive = true
})

events.on('form:initialize', () => {
  formGeneratorView.isErrors = false
  errorBlockView.isActive = false
})