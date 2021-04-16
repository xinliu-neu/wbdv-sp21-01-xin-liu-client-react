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
            <i className="fas fa-check text-success ml-1"></i>
          }
          {
            answer !== question.correct && isGraded &&
            <i className="fas fa-times text-danger ml-1"></i>
          }
        </h4>
        <br/>
        <ul className="list-group">
          <li className="list-group-item table-success">
            <div className="form-check">
              <label><input
                  type="radio"
                  onClick={() => setAnswer("true")}
                  name={question._id}/>True
              </label>
            </div>
          </li>
          <li className="list-group-item">
            <div className="form-check">
              <label><input
                  type="radio"
                  onClick={() => setAnswer("false")}
                  name={question._id}/>False
              </label>
            </div>
          </li>
        </ul>

        Your answer: {answer}

        {/*<label><input*/}
        {/*    type="radio"*/}
        {/*    onClick={() => setAnswer("true")}*/}
        {/*    name={question._id}/>True</label>*/}
        {/*<br/>*/}
        {/*<label><input*/}
        {/*    type="radio"*/}
        {/*    onClick={() => setAnswer("false")}*/}
        {/*    name={question._id}/>False</label>*/}

        <br/>
        <br/>
        <button type="button" className="btn btn-success"
                onClick={() => setIsGraded(true)}>
          Grade
        </button>
      </div>
  )
}

export default TrueFalseQuestion;
