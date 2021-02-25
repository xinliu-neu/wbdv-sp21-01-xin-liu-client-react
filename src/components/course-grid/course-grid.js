import React from 'react'
import CourseCard from "./course-card";
import {Link} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';


const CourseGrid = (
    {
      courses,
      updateCourse,
      deleteCourse,
    }) =>
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col d-none d-md-block">
            <h5>Recent Documents</h5>
          </div>
          <div className="col d-none d-md-block">
            <h5>Owned by me<i className="fas fa-caret-down"></i></h5>
          </div>
          <div className="col">
            <Link to="/courses/table">
              <i className="fas fa-list fa-2x float-right ml-4"></i>
            </Link>
            &nbsp;
            <i className="fas fa-sort-alpha-up-alt fa-2x float-right ml-4"></i>
            &nbsp;
            <i className="fas fa-folder fa-2x float-right"></i>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          {
            courses.map(course =>
                <CourseCard updateCourse={updateCourse}
                            deleteCourse={deleteCourse}
                            course={course}
                            title={course.title}/>
            )
          }
        </div>
      </div>
    </div>


export default CourseGrid

