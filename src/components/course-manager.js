import React from 'react'
import CourseTable from "./course-table/course-table";
import CourseGrid from "./course-grid/course-grid";
import {Link, Route} from "react-router-dom";
import courseService, {findAllCourses, deleteCourse} from "../services/course-service";
import 'bootstrap/dist/css/bootstrap.min.css';

class CourseManager extends React.Component{
  state = {
    courses: []
  }

  componentDidMount() {
    courseService.findAllCourses()
      .then(courses => this.setState({courses}))
  }

  updateCourse = (course) => {
    courseService.updateCourse(course._id, course)
      .then(status => {
          this.setState((prevState) => {
            let nextState = {...prevState}
            nextState.courses = prevState.courses.map(c => {
              if(c._id === course._id) {
                  return course
              } else {
                  return c
              }
            })
            return nextState
          })
      })
  }

  deleteCourse = (courseToDelete) => {
    courseService.deleteCourse(courseToDelete._id)
        .then(status => {
          this.setState((prevState) => {
            let nextState = {...prevState}
            nextState.courses = prevState.courses.filter(c => c._id !== courseToDelete._id)
            return nextState
          })
        })
  }

  addCourse = () => {
    const newCourse ={
      title:"New Course",
      owner:"me",
      lastModified:"2/10/2021"
    }
    courseService.createCourse(newCourse)
        .then(actualCourse => {
          this.state.courses.push(actualCourse)
          this.setState(this.state)
        })

  }

  render(){
    return(
        <div className="container-fluid mt-2">
            <i onClick={this.addCourse} className="fa fa-plus-circle fa-3x text-danger float-right" style={{position: "fixed", bottom: 10, right: 10}}></i>
            <div className="nav-bar">
              <div className="row">
                <div className="col">
                  <Link to="/">
                    <i className="fa fa-bars fa-2x"></i>
                  </Link>
                </div>
                <div className="d-none d-lg-block">
                  <h3>Course Manager</h3>
                </div>
                <div className="col-8 col-sm-8 col-md-8 col-lg-7 col-xl-7">
                  <input className="form-control"/>
                </div>
                <div className="col">
                  <i onClick={this.addCourse} className="fa fa-plus-circle fa-2x text-danger float-right"></i>
                </div>
              </div>
            </div>

            <Route path="/courses/table" component={CourseTable}>
              <CourseTable updateCourse={this.updateCourse}
                           deleteCourse={this.deleteCourse}
                           courses={this.state.courses}/>
            </Route>

            <Route path="/courses/grid" component={CourseGrid}>
              <CourseGrid updateCourse={this.updateCourse}
                          deleteCourse={this.deleteCourse}
                          courses={this.state.courses}/>
            </Route>
        </div>

    )
  }
}
export default CourseManager