import React, {useEffect, useState} from "react";
import quizzesService from "../../../services/quizzes-service";
import attemptService from "../../../services/attempt-service";
import questionService from "../../../services/questions-service"
import {useParams} from "react-router-dom";

const TrueFalseQuestion = ({question}) => {
  const [answer, setAnswer] = useState(null)
  const [isGraded, setIsGraded] = useState(false);

  const [quiz, setQuiz] = useState([])
  const [questions, setQuestions] = useState([])
  const [attempts, setAttempts] = useState([])

  const {quizId} = useParams();

  const findAttempt = () => {
    attemptService.findAttemptsForQuiz(quizId)
    .then((attempts) => {
      setAttempts(attempts)
    })
  }

  useEffect(() => {
    quizzesService.findQuizById(quizId)
    .then((quiz) => {
      setQuiz(quiz)
    })
    questionService.findQuestionsForQuiz(quizId)
    .then((questions) => {
      setQuestions(questions)
    })
  }, [])

  return (
      <div className="container">
        <h4>
          {question.question}
          {
            answer === question.correct && isGraded &&
            <i className="fas fa-check float-right text-success"/>
          }
          {
            answer !== question.correct && isGraded &&
            <i className="fas fa-times float-right text-danger"/>
          }
        </h4>
        <br/>
          <li className={isGraded ? "list-group-item list-group-item-success" : "list-group-item"}>
            <div className="form-check">
              <label><input
                  type="radio"
                  onClick={() => setAnswer("true")}
                  name={question._id}/>True
              </label>
              <i className={isGraded ? "fas fa-check float-right" : ""}
                 style={{color: '#5cb85c'}}/>
            </div>
          </li>
          <li className={(isGraded && answer !== question.correct) ? "list-group-item list-group-item-danger" : "list-group-item"}>
            <div className="form-check">
              <label><input
                  type="radio"
                  onClick={() => setAnswer("false")}
                  name={question._id}/>False
              </label>
              <i className={isGraded && answer !== question.correct ? "fas fa-times float-right" : ""}
                 style={{color: '#d9534f'}}/>
            </div>
          </li>

        Your answer: {answer}

        <br/>
        <br/>
        <button type="button" className="btn btn-success"
                onClick={() => {
                    if (answer === null) {
                      alert('Please choose an answer.')
                    } else {
                      console.log(questions)
                      quizzesService.submitQuiz(quizId, questions).then((attempt) => {
                        findAttempt();
                        // setCurrentAttempt(attempt);
                            setIsGraded(true);
                      }
                      )
                    }
                  }
                }>
          Submit
        </button>
        <hr/>
      </div>
  )
}

export default TrueFalseQuestion;
