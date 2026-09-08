import { EventEmitter } from "../components/base/events";
import { QuizzPage } from "../components/model/QuizzPage";
import { QuizzPageView } from "../components/view/QuizzPageView";
import { getUrlParams } from "../utils/getUrlParams";
import { ProgressbarView } from "../components/view/ProgressbarView";
import { HeaderView } from "../components/view/HeaderView";
import { setParamsUrl } from "../utils/setParamsUrl";
import { QuizzContentView } from "../components/view/QuizzContentView";
import { QuestionView } from "../components/view/QuestionView";
import { cloneTemplateContent } from "../utils/dom";
import { OptionView } from "../components/view/OptionView";
import { calculateQuestionResult } from "../utils/calculateResult";
import { getResultData } from "../utils/getResultData";
import { ResultView } from "../components/view/ResultView";


new HeaderView(document.querySelector('.header'))
const events = new EventEmitter()
const quizzPage = new QuizzPage(events)
const quizzPageView = new QuizzPageView(document.querySelector('.main'))
const progressbarView = new ProgressbarView(document.querySelector('.progressbar'))
const quizzContent = new QuizzContentView(document.querySelector('.quizz__question_form'), events)
const resultView = new ResultView(document.querySelector('.result'), events)
const quizzQuestion = document.querySelector('.quizz__question_info')

const singleQuestionTemplate = document.querySelector('#single-question-template')
const multipleQuestionTemplate = document.querySelector('#multiple-question-template')
const radioOptionTemplate = document.querySelector('#option-template')
const checkboxOptionTemplate = document.querySelector('#checkbox-option-template')

const templateRegistry = {
  single: {
    question: singleQuestionTemplate,
    option: radioOptionTemplate,
  },
  multiple: {
    question: multipleQuestionTemplate,
    option: checkboxOptionTemplate,
  },
}

function getId() {
  return getUrlParams(window.location.search, ['id']).get('id')
}

function getNumberQuestion() {
  return getUrlParams(window.location.search, ['question']).get('question')
}

function renderQuestion(data, result = null, userAnswers = []) {
  const optionsViews = data.options.map(
    option => {
      const isChecked = userAnswers.includes(String(option.id));
      const optionResult = result ? result.optionsResults[option.id] : null;

      const optionData = {
        option: option,
        disabled: !!result,
        checked: isChecked,
        result: optionResult
      }
      return new OptionView(cloneTemplateContent(templateRegistry[data.type].option)).render({
        optionData
      })
    }
  )

  const questionView = new QuestionView(cloneTemplateContent(templateRegistry[data.type].question)).render({
    questionTitle: data.text,
    options: optionsViews
  })

  const isLastQuestion = Number(getNumberQuestion()) === quizzPage.countQuestions;

  let buttonState = 'submit';
  if (result) {
    buttonState = isLastQuestion ? 'finish' : 'next';
  }

  quizzContent.render({
    quizzQuesion: questionView,
    curButton: buttonState
  })
}


events.on('load:succes', (quizzData) => {

  quizzPageView.render({
    title: quizzData.title,
    desc: quizzData.description,
  })

  events.emit('question:next')
})

events.on('question:next', () => {
  const curQId = quizzPage.curQuestionId

  if (curQId < quizzPage.countQuestions) {
    const newQId = curQId + 1
    quizzPage.curQuestionId = newQId
    const newUrl = setParamsUrl('question', newQId)
    window.history.pushState({ path: newUrl }, '', newUrl)
    events.emit('initial:question')
  }

  else {
    events.emit('quizz:result')
  }
})

events.on('initial:question', () => {
  const curQuestion = getNumberQuestion()
  quizzPage.progressUpdate(curQuestion)

  const data = quizzPage.dataQuestion

  renderQuestion(data)

  progressbarView.render({
    curQuestion,
    countQuestions: quizzPage.countQuestions,
    progress: quizzPage.progress
  })

})

events.on('form:submit', (selectedAnswers) => {
  const currentQuestion = quizzPage.dataQuestion
  const validationResult = calculateQuestionResult(currentQuestion, selectedAnswers)
  quizzPage.globalResult = quizzPage.globalResult + (validationResult.isCorrect ? 1 : 0)
  renderQuestion(currentQuestion, validationResult, selectedAnswers)
})

events.on('quizz:result', () => {
  quizzQuestion.style.display = 'none'
  const result = getResultData(quizzPage.globalResult, quizzPage.countQuestions)
  resultView.render({
    resultTitle: result.title,
    resultSubTitle: result.subtitle,
    resultMessage: result.message,
    isOpen: true
  })
})

events.on('page:quizzes', () => {
  window.location.href = 'quizzes.html'
})

events.on('quizz:restart', () => {
  window.location.href = `quiz.html?id=${getId()}`
})

quizzPage.initQuizz(getId())