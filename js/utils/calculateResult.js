export function calculateQuestionResult(questionData, selectedAnswers) {
  let isQuestionCorrect = true
  const optionsResults = {}

  questionData.options.forEach(option => {
    const isSelected = selectedAnswers.includes(String(option.id))
    const isCorrectOption = !!option.correct

    let isCorrect = false
    let message = ''
    let shouldRenderResult = false
    let hideMessage = false

    if (isSelected && isCorrectOption) {
      isCorrect = true
      message = option.message
      shouldRenderResult = true
    } else if (isSelected && !isCorrectOption) {
      isCorrect = false
      message = option.message
      isQuestionCorrect = false
      shouldRenderResult = true
    } else if (!isSelected && isCorrectOption) {
      isCorrect = true
      message = '' 
      isQuestionCorrect = false
      shouldRenderResult = true 
      hideMessage = true
    }

    optionsResults[option.id] = shouldRenderResult 
      ? { isCorrect, message, hideMessage } 
      : null
  })

  return {
    isCorrect: isQuestionCorrect,
    optionsResults
  }
}
