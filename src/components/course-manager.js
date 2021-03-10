import React from 'react';
import CourseTable from "./course-table/course-table";
import CourseGrid from "./course-grid/course-grid";
import {Link, Route} from "react-router-dom";
import courseService, {
  findAllCourses,
  deleteCourse
} from "../services/course-service";
import 'bootstrap/dist/css/bootstrap.min.css';
import CourseEditor from "./course-editor/course-editor";
import moduleService from "../services/module-service";
import lessonService from "../services/lesson-service";
import topicService from "../services/topic-service";

class CourseManager extends React.Component {
  state = {
    courses: [],
    topInputBar: ""
  }

  componentDidMount() {
    courseService.findAllCourses()
    .then(courses => this.setState({
      ...this.state,
      courses: courses
    }))
  }

  updateCourse = (course) => {
    courseService.updateCourse(course._id, course)
    .then(status => {
      this.setState((prevState) => {
        let nextState = {...prevState}
        nextState.courses = prevState.courses.map(c => {
          if (c._id === course._id) {
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
    moduleService.findModulesForCourse(courseToDelete._id)
    .then(modules => modules.map(
        module => {
          lessonService.findLessonsForModule(module._id)
          .then(lessons => lessons.map(
              lesson => {
                topicService.findTopicsForLesson(lesson._id)
                .then(topics => topics.map(
                    topic => topicService.deleteTopic(topic._id)
                ))
                lessonService.deleteLesson(lesson._id)
              }
          ))
          moduleService.deleteModule(module._id)
        }
    ))

    courseService.deleteCourse(courseToDelete._id)
    .then(status => {
      this.setState((prevState) => {
        let nextState = {...prevState}
        nextState.courses = prevState.courses.filter(
            c => c._id !== courseToDelete._id)
        return nextState
      })
    })
  }

  addCourse = () => {
    const newCourse = {
      title: "New Course",
      owner: "me",
      lastModified: "2/10/2021"
    }
    courseService.createCourse(newCourse)
    .then(actualCourse => {
      this.setState({
        ...this.state,
        courses: [
          ...this.state.courses,
          actualCourse
        ]
      })
    })
  }

  addCourseWithTitle = () => {
    if (this.state.topInputBar === "") {
      return;
    }

    const newCourse = {
      title: this.state.topInputBar,
      owner: "me",
      lastModified: "2/10/2021"
    }

    courseService.createCourse(newCourse)
    .then(actualCourse => {
      this.setState({
        ...this.state,
        courses: [
          ...this.state.courses,
          actualCourse
        ]
      })
    })

    // Clear the top input bar.
    this.setState({
      ...this.state,
      topInputBar: ""
    })
  }

  render() {
    return (
        <div className="container-fluid mt-2">
          <Link to="/courses/table">
            <i onClick={this.addCourse}
               className="fa fa-plus-circle fa-3x text-danger float-right"
               style={{position: "fixed", bottom: 10, right: 10}}></i>
          </Link>
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
                <input onChange={e => this.setState({
                  ...this.state,
                  topInputBar: e.target.value
                })}
                       value={this.state.topInputBar}
                       className="form-control"/>
              </div>
              <div className="col">
                <Link to="/courses/table">
                  <i onClick={this.addCourseWithTitle}
                     className="fa fa-plus-circle fa-2x text-danger float-right"></i>
                </Link>
              </div>
            </div>
          </div>

          <Route path="/courses/table" exact={true}>
            <CourseTable updateCourse={this.updateCourse}
                         deleteCourse={this.deleteCourse}
                         courses={this.state.courses}/>
          </Route>

          <Route path="/courses/grid" exact={true}>
            <CourseGrid updateCourse={this.updateCourse}
                        deleteCourse={this.deleteCourse}
                        courses={this.state.courses}/>
          </Route>

          <Route path={[
            "/courses/:layout/edit/:courseId",
            "/courses/:layout/edit/:courseId/modules/:moduleId",
            "/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId",
            "/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId"
          ]}
                 exact={true}>
            <CourseEditor allCourses={this.state.courses}/>
          </Route>
        </div>

    )
  }
}

export default CourseManager