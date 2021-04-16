import TrueFalseQuestion from "./true-false-question";
import MultipleChoiceQuestion from "./multiple-choice-question";

const Question = props => {
  return (
      <div className="container">
        <ul className="list-group">
          {
            props.question.type === "TRUE_FALSE" &&
            <TrueFalseQuestion
                question={props.question}/>
          }
          {
            props.question.type === "MULTIPLE_CHOICE" &&
            <MultipleChoiceQuestion
                question={props.question}/>
          }
        </ul>
      </div>
  )
}

export default Question;