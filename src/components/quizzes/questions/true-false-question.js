import React, {useState} from "react";

const TrueFalseQuestion = ({question, isGraded, updateAnswer}) => {
  const [answer, setAnswer] = useState("")

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
        <li className={(isGraded && "true" === question.correct)
            ? "list-group-item list-group-item-success"
            : (isGraded && "true" !== question.correct)
                ? "list-group-item list-group-item-danger"
                : "list-group-item"}>
          <div className="form-check">
            <label><input
                type="radio"
                onClick={() => {
                  setAnswer("true");
                  updateAnswer({
                    qid: question._id,
                    answer: "true"
                  });
                }}
                name={question._id}/>True
            </label>
            {
              (isGraded && "true" === question.correct) &&
                  <i className="fas fa-check float-right text-success"/>
            }
            {
              (isGraded && "true" !== question.correct) &&
              <i className="fas fa-times float-right text-danger"/>
            }
          </div>
        </li>
        <li className={(isGraded && "false" === question.correct)
            ? "list-group-item list-group-item-success"
            : (isGraded && "false" !== question.correct)
                ? "list-group-item list-group-item-danger"
                : "list-group-item"}>
          <div className="form-check">
            <label><input
                type="radio"
                onClick={() => {
                  setAnswer("false");
                  updateAnswer({
                    qid: question._id,
                    answer: "false"
                  });
                }}
                name={question._id}/>False
            </label>
            {
              (isGraded && "false" === question.correct) &&
              <i className="fas fa-check float-right text-success"/>
            }
            {
              (isGraded && "false" !== question.correct) &&
              <i className="fas fa-times float-right text-danger"/>
            }
          </div>
        </li>

        Your answer: {answer}

        <hr/>
      </div>
  )
}

export default TrueFalseQuestion;
