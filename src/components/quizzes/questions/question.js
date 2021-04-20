import TrueFalseQuestion from "./true-false-question";
import MultipleChoiceQuestion from "./multiple-choice-question";

const Question = props => {
  return (
      <div className="container">
        <ul className="list-group">
          {
            props.question.type === "TRUE_FALSE" &&
            <TrueFalseQuestion
                question={props.question} isGraded={props.isGraded}
                updateAnswer={props.updateAnswer}/>
          }
          {
            props.question.type === "MULTIPLE_CHOICE" &&
            <MultipleChoiceQuestion
                question={props.question} isGraded={props.isGraded}
                updateAnswer={props.updateAnswer}/>
          }
        </ul>
      </div>
  )
}

export default Question;