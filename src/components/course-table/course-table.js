import React from "react"
import CourseRow from "./course-row";
import {Link} from "react-router-dom";

const CourseTable = (
    {
      courses,
      updateCourse,
      deleteCourse,
    }) =>
    <div className="container-fluid mt-4">
      <table className="table">
        <tr>
          <td>
            <h5>Title</h5>
          </td>
          <td className="d-none d-md-table-cell">
            <h5>Owned by</h5>
          </td>
          <td className="d-none d-lg-table-cell">
            <h5>Last modified</h5>
          </td>
          <td>
            <Link to="/courses/grid">
              <i className="fas fa-th fa-2x ml-4 float-right"></i>
            </Link>
            <i className="fas fa-sort-alpha-up-alt fa-2x ml-4 float-right"></i>
            <i className="fas fa-folder fa-2x float-right"></i>
          </td>
        </tr>
        {
          courses.map(course =>
              <CourseRow
                  deleteCourse={deleteCourse}
                  updateCourse ={updateCourse}
                  course={course}
                  title={course.title}
                  lastModified={course.lastModified}
                  owner={course.owner}/>)
        }
      </table>
    </div>

export default CourseTable