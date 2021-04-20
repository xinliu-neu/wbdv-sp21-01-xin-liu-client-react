const initialState = {
  answers: {}
}

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_ANSWER":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.answer.qid]: action.answer.answer
        }
      }
    default:
      return state
  }
}

export default quizReducer;