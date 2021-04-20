const QUIZZES_URL = "http://localhost:3000/api/quizzes"


const findAttemptsForQuiz = (quizId) => {
  return fetch(`${QUIZZES_URL}/${quizId}/attempts`)
  .then(response => response.json());
}

export default {
  findAttemptsForQuiz
};
