import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom'

import quizzesService from "../../services/quizzes-service";
import questionService from "../../services/questions-service";
import Question from "./questions/question";
import attemptService from "../../services/attempt-service";
import {connect} from "react-redux";

const Quiz = ({answers = {}, updateAnswer}) => {
  const [questions, setQuestions] = useState([]);
  const {quizId} = useParams();
  const [quiz, setQuiz] = useState([]);
  const [isGraded, setIsGraded] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const [currentAttempt, setCurrentAttempt] = useState([]);

  useEffect(() => {
    quizzesService.findQuizById(quizId)
    .then(quiz => {
      setQuiz(quiz)
    })
    questionService.findQuestionsForQuiz(quizId)
    .then(questions => setQuestions(questions))
  }, [quizId])

  const findAttempt = () => {
    attemptService.findAttemptsForQuiz(quizId)
    .then(attempts => {
      setAttempts(attempts)
    })
  }

  console.log(questions)

  return (
      <div className="container">
        {
          questions.map(question =>
              <Question question={question} isGraded={isGraded}
                        updateAnswer={updateAnswer}/>
          )
        }
        <div type="button" className="btn btn-success"
             onClick={() => {
               setIsGraded(true);
               let answeredQuestions = [...questions];
               answeredQuestions.map(question => {
                 question['answer'] = answers[question._id];
               })

               quizzesService.submitQuiz(quiz._id, answeredQuestions).then(
                   attempt => {
                     findAttempt();
                     setCurrentAttempt(attempt)
                   })
             }}>
          Submit
        </div>
        {
          isGraded &&
          <ul className={"list-group my-2"}>
            <h5>Your Score : {currentAttempt.score}</h5>
            <hr/>

            {
              attempts.length > 1 &&
              <h5>Past Attempts:</h5>
            }
            {
              attempts.filter(
                  attempt => attempt._id !== currentAttempt._id).sort(
                  (a, b) => {
                    let dateA = new Date(a.createdAt);
                    let dateB = new Date(b.createdAt);
                    return dateB.getTime() - dateA.getTime()
                  }).map(attempt =>
                  <li className={"list-group-item"}>
                    <h6>Time: {(new Date(
                        attempt.createdAt)).toLocaleString()}</h6>
                    <h6>Score: {attempt.score}</h6>
                  </li>
              )
            }
          </ul>
        }
      </div>
  );
}

const stpm = (state) => {
  return {
    answers: state.quizReducer.answers
  }
}

const dtpm = (dispatch) => {
  return {
    updateAnswer: (answer) => {
      dispatch({
        type: "UPDATE_ANSWER",
        answer: answer
      })
    },
  }
}

export default connect(stpm, dtpm)(Quiz);