import React, {useState} from "react";

const TrueFalseQuestion = ({question}) => {
  const [answer, setAnswer] = useState(null)
  const [isGraded, setIsGraded] = useState(false);

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
                      setIsGraded(!isGraded)
                    }
                  }
                }>
          Grade
        </button>
        <hr/>
      </div>
  )
}

export default TrueFalseQuestion;
