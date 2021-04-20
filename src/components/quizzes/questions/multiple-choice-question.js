import React, {useState} from "react";

const MultipleChoiceQuestion = ({question, isGraded, updateAnswer}) => {
  const [answer, setAnswer] = useState('');

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

        {
          question.choices.map(choice =>
              <li className={(isGraded && choice === question.correct)
                  ? "list-group-item list-group-item-success"
                  : (isGraded && "true" !== question.correct)
                      ? "list-group-item list-group-item-danger"
                      : "list-group-item"}>
                <div className="form-check">
                  <label><input
                      type="radio"
                      onClick={() => {
                        setAnswer(choice);
                        updateAnswer({
                          qid: question._id,
                          answer: choice
                        });
                      }}
                      name={question._id}/>{choice}
                  </label>
                  {
                    (isGraded && choice === question.correct) &&
                    <i className="fas fa-check float-right text-success"/>
                  }
                  {
                    (isGraded && choice !== question.correct) &&
                    <i className="fas fa-times float-right text-danger"/>
                  }
                </div>
              </li>
          )
        }

        Your answer: {answer}

        <hr/>
      </div>
  )
}
export default MultipleChoiceQuestion;