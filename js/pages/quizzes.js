import { EventEmitter } from "../components/base/events";
import { QuizzesPage } from "../components/model/QuizzesPage";
import { HeaderView } from "../components/view/HeaderView";
import { QuizzCardView } from "../components/view/QuizzCardView";
import { QuizzesPageView } from "../components/view/QuizzesPageView";
import { cloneTemplateContent } from "../utils/dom";

new HeaderView(document.querySelector('.header'))
const events = new EventEmitter()
const quezzesPage = new QuizzesPage(events)
const quzzesPageView = new QuizzesPageView(document.querySelector('.main'), events)

const cardTemplate = document.querySelector('#template__quizz_card')

events.on('load:error', () => {
  quzzesPageView.render( {
    content: []
  }
  )
})

events.on('load:succes', (quizzes) => {
  const cards = quizzes.map(quizz => {
    const cardView = cloneTemplateContent(cardTemplate)
    return new QuizzCardView(cardView, () => {
      window.location.href = `quiz.html?id=${quizz.id}`
    }).render({
      title: quizz.title,
      desc: quizz.description,
      count: quizz.questions.length
    })
  })
  quzzesPageView.render({
    content: cards
  })
})

quezzesPage.loadQuizes()