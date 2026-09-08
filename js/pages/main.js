
import { EventEmitter } from '../components/base/events.js'
import { MainPage } from '../components/model/MainPage.js'
import { ErrorBlockView } from '../components/view/ErrorBlockView.js'
import { FormGeneratorView } from '../components/view/FormGeneratorView.js'
import { HeaderView } from '../components/view/HeaderView.js'

new HeaderView(document.querySelector('.header'))
const events = new EventEmitter()
const mainPage = new MainPage(events)
const formGeneratorView = new FormGeneratorView(document.forms['formContainer'], events)
const errorBlockView = new ErrorBlockView(document.querySelector('.block__error'), events)

events.onAll((eventName, data) => {
  console.log('Event:', eventName, 'Data:', data);
});

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