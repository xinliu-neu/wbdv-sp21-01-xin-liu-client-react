import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import quizzesService from "../../services/quizzes-service";

const QuizzesList = () => {
  const {courseId} = useParams();
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    quizzesService.findAllQuizzes()
    .then((quizzes) => {
      setQuizzes(quizzes)
    })
  }, [])

  return (
      <div>
        <div className="container">
          <h2>Quizzes</h2>
          <ul className="list-group">
            {
              quizzes.map((quiz) => {
                return (
                    <li className="list-group-item">
                        <Link
                            to={`/courses/${courseId}/quizzes/${quiz._id}`}>
                          {quiz.title}
                        </Link>
                        &nbsp;
                        <button type="button"
                                className="btn btn-primary">
                          <Link style={{color: 'white'}}
                              to={`/courses/${courseId}/quizzes/${quiz._id}`}>
                            Start
                          </Link>
                        </button>
                    </li>
                )
              })
            }
          </ul>
        </div>
      </div>
  )
}
export default QuizzesList;