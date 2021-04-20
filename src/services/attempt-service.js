// const QUIZZES_URL = "http://localhost:3000/api/quizzes"
const QUIZZES_URL = 'https://wbdv-sp21-xin-liu-server-node.herokuapp.com/api/quizzes';


const findAttemptsForQuiz = (quizId) => {
  return fetch(`${QUIZZES_URL}/${quizId}/attempts`)
  .then(response => response.json());
}

export default {
  findAttemptsForQuiz
};
