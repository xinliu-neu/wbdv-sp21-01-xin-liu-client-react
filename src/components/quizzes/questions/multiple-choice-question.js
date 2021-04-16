import React, {useState} from "react";

const MultipleChoiceQuestion = ({question}) => {
  const [answer, setAnswer] = useState('');
  const [isGraded, setIsGraded] = useState(false);

  return (
      <div className="container">
        <h4>
          {
            isGraded &&
            <>
              {question.question}
              {
                question.correct === answer &&
                <i className="fas fa-check text-success float-right"/>
              }
              {
                question.correct !== answer &&
                <i className="fas fa-times text-danger float-right"/>
              }
            </>
          }
          {
            !isGraded &&
            <>
              {question.question}
            </>
          }
        </h4>
        {
          isGraded &&
          question.choices.map((choice) => {
            return (
                <>
                  {answer === question.correct && answer === choice &&
                  <li className='list-group-item list-group-item-success'>
                    <div className="form-check">
                      <label>
                        <input type="radio" className=''
                               name={question._id} checked
                               disabled/>
                        {choice}
                      </label>
                      <i className="fas fa-check text-success float-right"/>
                    </div>
                  </li>
                  }
                  {
                    answer === question.correct && answer !== choice
                    &&
                    <li className='list-group-item'>
                      <div className="form-check">
                        <label>
                          <input type='radio'
                                 className=''
                                 name={question._id}
                                 disabled
                          />
                          {choice}
                        </label>
                      </div>
                    </li>
                  }
                  {
                    answer !== question.correct && answer === choice
                    && choice !== question.correct &&
                    <li className='list-group-item list-group-item-danger'>
                      <div className="form-check">
                        <label>
                          <input type='radio'
                                 className=''
                                 name={question._id}
                                 checked
                                 disabled
                          />
                          {choice}
                        </label>

                        <i className="fas fa-times text-danger float-right"/>
                      </div>
                    </li>
                  }
                  {
                    answer !== question.correct && answer !== choice
                    && choice === question.correct &&
                    <li className='list-group-item list-group-item-success'>

                      <div className="form-check">
                        <label>
                          <input type='radio'
                                 className=''
                                 name={question._id}
                                 disabled
                          />
                          {choice}
                        </label>
                        <i className="fas fa-check text-success float-right"/>
                      </div>
                    </li>
                  }
                  {
                    answer !== question.correct && answer !== choice
                    && choice !== question.correct &&
                    <li className='list-group-item'>
                      <div className="form-check">
                        <label>
                          <input type='radio'
                                 className=''
                                 name={question._id}
                                 disabled
                          />
                          {choice}
                        </label>
                      </div>
                    </li>
                  }
                </>
            )
          })
        }
        {
          !isGraded && question.choices.map((choice) => {
            return (
                <li className="list-group-item">
                  <div className="form-check">
                    <label>
                      <input type='radio'
                             className=''
                             onClick={() => {
                               setAnswer(choice)
                             }}
                             name={question._id}/> {choice}
                    </label>
                  </div>
                </li>
            )
          })
        }
        <p>
          Your answer: {answer}
        </p>
        <button type="button"
                className="btn btn-success"
                onClick={() => {
                    if (answer === '') {
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
export default MultipleChoiceQuestion;