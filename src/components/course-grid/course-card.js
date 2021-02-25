import React, {useState} from 'react'
import {Link} from "react-router-dom";

const CourseCard = (
    {
      course,
      title,
      updateCourse,
      deleteCourse,
    }) => {
  const [editing, setEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(title)
  const saveCourse = () => {
    setEditing(false)
    const newCourse = {
      ...course,
      title: newTitle
    }
    updateCourse(newCourse)
  }

  const deleteCourseHelper = () => {
    setEditing(false)
    const newCourse = {
      ...course
    }
    deleteCourse(newCourse)
  }

  return(
    <div className="row align-items-start">
      <div className="col mr-4 mb-4">
        <div className="card" style={{width: "15rem", margin: "10px"}}>
        <img src="https://www.valuecoders.com/blog/wp-content/uploads/2016/08/react.png" className="card-img-top" alt="..."/>
        <div className="card-body">
          {
            !editing  &&
            <Link to="/courses/editor">
              <h5 className="card-title">{course.title}</h5>
            </Link>
          }
          {
            editing &&
            <input
                onChange={(e) => setNewTitle(e.target.value)}
                value={newTitle}/>
          }
          <p className="card-text">Some quick example text to build on
            the card title and make up the bulk of the card's
            content.</p>
          <Link to="/courses/editor" className="btn btn-primary">
            {course.title}
          </Link>
          {
            editing &&
            <i onClick={() => deleteCourseHelper()} className="fas fa-times text-danger fa-2x ml-2 float-right"></i>
          }
          {
            editing &&
            <i onClick={() => saveCourse()} className="fas fa-check text-success fa-2x float-right"></i>
          }
          {
            !editing &&
            <i onClick={() => setEditing(true)} className="fas fa-edit fa-2x float-right"></i>
          }
        </div>
      </div>
      </div>
    </div>
  )
}


export default CourseCard