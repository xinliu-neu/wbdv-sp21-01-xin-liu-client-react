import React, {useState} from 'react'
import {Link} from "react-router-dom";

const CourseRow = (
    {
      course,
      lastModified,
      owner,
      title,
      deleteCourse,
      updateCourse
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
      <tr>
      <td>
        {
          !editing && <i className="fas fa-file"></i>
        }
        &nbsp;
        {
          !editing  &&
          <Link to="/courses/editor">
            {course.title}
          </Link>
        }
        {
          editing &&
          <input
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}>
          </input>
        }
      </td>
      <td className="d-none d-md-table-cell">{course.owner}</td>
      <td className="d-none d-lg-table-cell">{course.lastModified}</td>
      <td>
        {
          editing &&
          <i onClick={() => deleteCourseHelper()} className="fas fa-times text-danger fa-2x ml-4 float-right"></i>
        }

        {
          editing &&
          <i onClick={() => saveCourse()} className="fas fa-check text-success fa-2x float-right"></i>
        }

        {
          !editing &&
          <i onClick={() => setEditing(true)} className="fas fa-edit fa-2x float-right"></i>
        }
      </td>
    </tr>)}

export default CourseRow