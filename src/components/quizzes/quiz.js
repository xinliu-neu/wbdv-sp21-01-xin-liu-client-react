import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom'

import questionService from "../../services/questions-service";
import Question from "./questions/question";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const {quizId} = useParams();

  useEffect(() => {
    questionService.findQuestionsForQuiz(quizId)
    .then(questions => setQuestions(questions))
  }, [])

  return (
      <div>
        {
          questions.map(question =>
              <Question question={question}/>
          )
        }
      </div>
  );
}

export default Quiz;