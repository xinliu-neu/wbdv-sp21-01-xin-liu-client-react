const QUIZZES_URL = 'http://localhost:3000/api/quizzes';
const QUESTION_URL = "http://localhost:3000/api/questions";

const findQuestionsForQuiz = (qid) => {
  return fetch(`${QUIZZES_URL}/${qid}/questions`)
  .then(response => response.json())
}


export const findAllQuestions = () => {
  return fetch(`${QUESTION_URL}`)
  .then(response => response.json());
}
export default {
  findQuestionsForQuiz,
  findAllQuestions
}

